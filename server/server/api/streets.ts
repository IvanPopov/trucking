/// <reference path="../idl/winston.d.ts" />
/// <reference path="../idl/express.d.ts" />
/// <reference path="../idl/passport.d.ts" />

import winston = require("winston");
import express = require("express");
import passport = require("passport");

import db = require("../libs/db");
import type = require("../libs/type");

var revalidator = require("revalidator");

function init(app: express.Express, log: winston.Logger) {
	/**
	 * @api {get} /api/streets Get all streets.
	 * @apiName GetStreets
	 * @apiGroup Streets
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} [count] Number of streets for display.
	 * @apiParam {Integer} [from] From number of street.
	 */

	app.get("/api/streets",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
		
			//all
			db.streets.streets.get((err: Error, streets: trucking.db.IStreet[]) => {
				if (err) return done(err);
				res.json(streets);
			}, req.query);
			
		});

	function createCond(req) {
		var cond = {};
		var street = req.params.street;

		//search by id
		if (type.isInt(street)) {
			cond["id_street"] = parseInt(street);
		}
		else { //search by name
			cond["name"] = street;
		}

		return cond;
	}


	/**
	 * @api {get} /api/streets/:street/metro/stations Get street metro.
	 * @apiName GetMetroStationsByStreetID
	 * @apiGroup Streets
	 * @apiPermission emploee
	 */
	app.get("/api/streets/:street/metro/stations",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var street = req.params.street;

			db.catalogs.metrostreets.find({ id_street: parseInt(street) || 0 },
				(err: Error, metro: trucking.db.IMetroStreets[]) => {
					if (err) return done(err);
					res.json(metro);
				}, req.query);
		});

	/**
	 * @api {post} /api/streets/:street/metro/stations Attach metro station to street.
	 * @apiName AttachMetroStationToStreet
	 * @apiGroup Streets
	 * @apiPermission emploee
	 */
	app.post("/api/streets/:street/metro/stations",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var check = revalidator.validate(req.body, {
				properties: {
					id_metro: {
						type: 'integer',
						required: true
					}
				}
			});

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			var data = {
				id_street: parseInt(req.params.street) || 0,
				id_metro: parseInt(req.body.id_metro)
			};

			db.catalogs.metrostreets.create(data, (err, result) => {
				if (err) return done(err);
				res.json(201, result);
			});
		});

	/**
	 * @api {del} /api/streets/:street/metro/stations/:station Detach metro station from street.
	 * @apiName DetachMetroStationFromStreet
	 * @apiGroup Metro
	 * @apiPermission emploee
	 */
	app.del("/api/streets/:street/metro/stations/:station",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var check = revalidator.validate(req.params, {
				properties: {
					street: {
						type: 'integer',
						required: true
					},
					station: {
						ype: 'integer',
						required: true
					}
				}
			}, { cast: true });

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			var data = {
				id_metro: parseInt(req.params.station),
				id_street: parseInt(req.params.street)
			};

			db.catalogs.metrostreets.del(data, (err) => {
				if (err) return done(err);
				res.json(204, null);
			});
		});

	/**
	 * @api {get} /api/streets/:id Get street by id.
	 * @apiName GetStreetById
	 * @apiGroup Streets
	 * @apiPermission emploee
	 * 
	 * @apiParam {Integer} id Street unique id.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "id_street": "1",
	 *       "name": "4-я улица Марьиной рощи",
	 *       "comment": "Стратегически важная улица"
	 *     }
	 */

	/**
	 * @api {get} /api/streets/:name Get street by name.
	 * @apiName GetStreetByName
	 * @apiGroup Streets
	 * @apiPermission emploee
	 * 
	 * @apiParam {String} name Street unique name.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "id_street": "1",
	 *       "name": "4-я улица Марьиной рощи",
	 *       "comment": "Стратегически важная улица"
	 *     }
	 */

	app.get("/api/streets/:street",
		passport.authenticate("bearer", { session: false }),
		(req, res) => {
			var cond = createCond(req);

			db.streets.streets.findRow(cond, (err: Error, street: trucking.db.IStreet): void => {
				if (err || !street) {
					res.status(404).json({ error: "Street not found" });
					return;
				}
				
				res.json(street);
			});
		});

	/**
	 * @api {post} /api/streets/ Create street.
	 * @apiName CreateStreet
	 * @apiGroup Streets
	 * @apiPermission emploee
	 * 
	 *
	 * @apiParam {String} name Street name.
	 * @apiParam {String} [comment] Comment.
	 *
	 * @apiSuccessStructure Created
	 */


	app.post("/api/streets",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var check = revalidator.validate(req.body, {
				properties: {
					name: {
						type: 'string',
						maxLength: 128,
						required: true
					},
					comment: {
						type: ["string", "null"],
						required: false
					}
				}
			});

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			db.catalogs.streets.create(req.body, (e: Error, result) => {
				if (e) return done(e);
				res.json(201, result);
			});
		});

	/**
	 * @api {patch} /api/streets/:id Change street by id.
	 * @apiName ChangeStreetById
	 * @apiGroup Streets
	 * @apiPermission emploee
	 * 
	 * @apiParam {Integer} id Street id.
	 *
	 * @apiParam {String} [name] Street name.
	 * @apiParam {String} [comment] Comment.
	 *
	 * @apiSuccessStructure Patched
	 */

	/**
	 * @api {patch} /api/streets/:street Change street by name.
	 * @apiName ChangeStreetByName
	 * @apiGroup Streets
	 * @apiPermission emploee
	 * 
	 * @apiParam {String} street Street name.
	 *
	 * @apiParam {String} [name] Street name.
	 * @apiParam {String} [comment] Comment.
	 *
	 * @apiSuccessStructure Patched
	 */

	app.patch("/api/streets/:street",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var cond = createCond(req);

			var check = revalidator.validate(req.body, {
				properties: {
					name: {
						type: 'string',
						maxLength: 128,
						required: false
					},
					comment: {
						type: ["string", "null"],
						required: false
					}
				}
			});

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			db.catalogs.streets.patch(cond, req.body, (e: Error, result) => {
				if (e) return done(e);
				res.json(result);
			});
		});


	/**
	 * @api {delete} /api/streets/:street Delete street by name.
	 * @apiName DeleteStreetByName
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 *
	 * @apiParam {String} street Street unique name.
	 *
	 * @apiSuccessStructure Deleted
	 */

	/**
	 * @api {delete} /api/streets/:id Delete street by id.
	 * @apiName DeleteStreetById
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} id Street unique id.
	 *
	 * @apiSuccessStructure Deleted
	 */
	app.del("/api/streets/:street",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var cond = createCond(req);
			db.catalogs.streets.del(cond, (e: Error) => {
				if (e) return done(e);
				res.json(204, null);
			});
		});


}

export = init;  