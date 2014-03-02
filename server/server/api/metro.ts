/// <reference path="../idl/winston.d.ts" />
/// <reference path="../idl/express.d.ts" />
/// <reference path="../idl/passport.d.ts" />
/// <reference path="../idl/db.d.ts" />

import winston = require("winston");
import express = require("express");
import passport = require("passport");

import db = require("../libs/db");
import type = require("../libs/type");

var revalidator = require("revalidator");


function init(app: express.Express, log: winston.Logger) {


	/**
	 * @api {get} /api/metro/branches Get metro branches list.
	 * @apiName GetBranches
	 * @apiGroup Metro
	 * @apiPermission emploee
	 * 
	 * @apiParam {Integer} [from] View from number.
	 * @apiParam {Integer} [count] View number of branches.
	 *
	 * @apiSuccess {Object[]} branches List of metro branches.
	 * @apiSuccess {String}   branches.name  Branch name.
	 * @apiSuccess {Integer}  branches.id_metrobranch Branch unique id.
	 */

	app.get("/api/metro/branches",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			db.metro.branches.get((err: Error, branches: trucking.db.IMetroBranch[]) => {
				if (err) return done(err);
				res.json(branches);
			}, req.query);
		});


	/**
	 * @apiDefineSuccessStructure MetroBranch
	 * @apiSuccess {String} name Branch unique name.
	 * @apiSuccess {Integer} id_metrobranch Branch unique id.
	 * @apiSuccess {Integer} color Branch unique color.
	 * @apiSuccess {Object[]} stations Branch stations.
	 * @apiSuccess {String} stations.station Branch station name.
	 */

	/**
	 * @api {get} /api/metro/branches/:id Get branch by id.
	 * @apiName GetBranchById
	 * @apiGroup Metro
	 * @apiPermission emploee
	 * 
	 * @apiParam {Integer} id Branch unique id.
	 *
	 * @apiSuccessStructure MetroBranch
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "id_metrobranch": "1",
	 *       "name": "Сокольническая",
	 *       "color": 0xFF0000
	 *     }
	 */

	/**
	 * @api {get} /api/metro/branches/:branchName Get branch by Name.
	 * @apiName GetBranchByName
	 * @apiGroup Metro
	 * @apiPermission emploee
	 * 
	 * @apiParam {String} branchName Branch unique name.
	 *
	 * @apiSuccessStructure MetroBranch
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "id_metrobranch": "1",
	 *       "name": "Сокольническая",
	 *       "color": 0xFF0000
	 *     }
	 */

	app.get("/api/metro/branches/:branch",
		passport.authenticate("bearer", { session: false }),
		(req, res) => {
			var cond = {};
			var branch = req.params.branch;

			//search by id
			if (type.isInt(branch)) {
				cond["id_metrobranch"] = parseInt(branch);
			}
			else { //search by name
				cond["name"] = branch;
			}

			db.metro.getBranch(cond, (err: Error, branch: trucking.db.IMetroBranch): void => {
				if (err) {
					res.status(404).json({ error: "Branch not found" });
					return;
				}

				res.json(branch);
			});
		});

	/**
	 * @api {post} /api/metro/branches Create branch.
	 * @apiName CreateBranch
	 * @apiGroup Metro
	 * @apiPermission emploee
	 * 
	 * @apiParam {String} name New branch name.
	 * @apiParam {Integer} color New branch color.
	 *
	 * @apiSuccessStructure Created
	 */


	app.post("/api/metro/branches",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var check = revalidator.validate(req.body, {
				properties: {
					name: {
						type: 'string',
						maxLength: 128,
						required: true
					},
					color: {
						type: "integer",
						required: true
					}
				}
			});

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			db.metro.branches.create(req.body, (err, result) => {
				if (err) return done(err);
				res.json(201, result);
			});
		});

	/**
	 * @api {patch} /api/metro/branches/:branchName Change branch by name.
	 * @apiName ChangeBranchByName
	 * @apiGroup Metro
	 * @apiPermission emploee
	 * 
	 * @apiParam {String} [name] New branch name.
	 * @apiParam {Integer} [color] New branch color.
	 *
	 * @apiSuccessStructure Patched
	 */

	/**
	 * @api {patch} /api/metro/branches/:id Change branch by id.
	 * @apiName ChangeBranchById
	 * @apiGroup Metro
	 * @apiPermission emploee
	 * 
	 * @apiParam {String} [name] New branch name.
	 * @apiParam {Integer} [color] New branch color.
	 *
	 * @apiSuccessStructure Patched
	 */

	app.patch("/api/metro/branches/:branch",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var cond = {};
			var branch = req.params.branch;

			if (type.isInt(branch)) //search by id
				cond["id_metrobranch"] = parseInt(branch);
			else //search by name
				cond["name"] = branch;

			var check = revalidator.validate(req.body, {
				properties: {
					name: {
						type: 'string',
						maxLength: 128
					},
					color: {
						type: "integer",
					}
				}
			});

			if (!check.valid) {
				res.json(400, check.errors);
				return;
			}

			db.metro.branches.patch(cond, req.body, (err, result) => {
				if (err) return done(err);
				res.json(result);
			});
		});

	/**
	 * @api {delete} /api/metro/branches/:name Delete branch by name.
	 * @apiName DeleteBranchByName
	 * @apiGroup Metro
	 * @apiPermission emploee
	 *
	 * @apiParam {String} name Branch unique name.
	 *
	 * @apiSuccessStructure Deleted
	 */

	/**
	 * @api {delete} /api/metro/branches/:id Delete branch by id.
	 * @apiName DeleteBranchById
	 * @apiGroup Metro
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} id Branch unique id.
	 *
	 * @apiSuccessStructure Deleted
	 */

	app.del("/api/metro/branches/:branch",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var cond = {};
			var branch = req.params.branch;

			if (type.isInt(branch)) //search by id
				cond["id_metrobranch"] = parseInt(branch);
			else //search by name
				cond["name"] = branch;
			
			db.metro.branches.del(cond, (err: MysqlError) => {
				if (err) return done(err);
				res.json(204, null);
			});
		});


	/**
	 * @api {get} /api/metro/stations Get stations list.
	 * @apiName GetStations
	 * @apiGroup Metro
	 * @apiPermission emploee
	 * 
	 * @apiParam {Integer} [from] View from number.
	 * @apiParam {Integer} [count] View number of branches.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *		[
	 *			{
	 *				"id_metro": 3,
	 *				"id_metrobranch": 1,
	 *				"station": "Охотный ряд"
	 *			},
	 *			{
	 *				"id_metro": 7,
	 *				"id_metrobranch": 1,
	 *				"station": "Марьина роща"
	 *			}
	 *		]
	 */

	app.get("/api/metro/stations",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			db.metro.stations.get((err: Error, stations: trucking.db.IMetro[]) => {
				if (err) return done(err);
				res.json(stations);
			}, req.query);
		});

	/**
	 * @apiDefineSuccessStructure Metro
	 * @apiSuccess {Integer} id_metro Station unique id.
	 * @apiSuccess {Integer} id_metrobranch Branch unique id.
	 * @apiSuccess {String} station Station unique name.
	 */

	/**
	 * @api {get} /api/metro/stations/:id Get station by id.
	 * @apiName GetStationhById
	 * @apiGroup Metro
	 * @apiPermission emploee
	 * 
	 * @apiParam {Integer} id Station unique id.
	 *
	 * @apiSuccessStructure Metro
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *		 "id_metro": "1",
	 *		 "id_metrobranch": 5
	 *		 "station": "Охотный ряд",
	 *     }
	 */

	/**
	 * @api {get} /api/metro/stations/:name Get station by name.
	 * @apiName GetStationByName
	 * @apiGroup Metro
	 * @apiPermission emploee
	 * 
	 * @apiParam {String} name Station unique name.
	 *
	 * @apiSuccessStructure Metro
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *		 "id_metro": "1",
	 *		 "id_metrobranch": 5
	 *		 "station": "Охотный ряд",
	 *     }
	 */

	app.get("/api/metro/stations/:station",
		passport.authenticate("bearer", { session: false }),
		(req, res) => {
			var cond = {};
			var station = req.params.station;

			//search by id
			if (type.isInt(station)) {
				cond["id_metro"] = parseInt(station);
			}
			else { //search by name
				cond["station"] = station;
			}

			db.metro.stations.findRow(cond, (err: Error, station: trucking.db.IMetro): void => {
				if (err) {
					res.status(404).json({ error: "Station not found" });
					return;
				}

				res.json(station);
			});
		});

	/**
	 * @api {patch} /api/metro/stations/:name Change station by name.
	 * @apiName ChangeStationByName
	 * @apiGroup Metro
	 * @apiPermission emploee
	 * 
	 * @apiParam {String} [station] New station name.
	 * @apiParam {Integer} [id_metrobranch] New station branch.
	 *
	 * @apiSuccessStructure Patched
	 */

	/**
	 * @api {patch} /api/metro/stations/:id Change station by id.
	 * @apiName ChangeStationById
	 * @apiGroup Metro
	 * @apiPermission emploee
	 * 
	 * @apiParam {String} [station] New station name.
	 * @apiParam {Integerpa [id_metrobranch] New station branch.
	 *
	 * @apiSuccessStructure Patched
	 */

	app.patch("/api/metro/stations/:station",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var cond = {};
			var station = req.params.station;

			if (type.isInt(station)) //search by id
				cond["id_metro"] = parseInt(station);
			else //search by name
				cond["station"] = station;

			var check = revalidator.validate(req.body, {
				properties: {
					station: {
						type: 'string',
						maxLength: 128,
						required: false
					},
					id_metrobranch: {
						type: 'integer'
					}
				}
			});

			if (!check.valid) {
				res.json(400, check.errors);
				return;
			}

			db.metro.stations.patch(cond, req.body, (err, result) => {
				if (err) return done(err);
				res.json(result);
			});
		});

	/**
	 * @api {post} /api/metro/stations/ Create station.
	 * @apiName CreateStation
	 * @apiGroup Metro
	 * @apiPermission emploee
	 * 
	 * @apiParam {String} station New station name.
	 * @apiParam {Integer} id_metrobranch New station branch.
	 *
	 * @apiSuccessStructure Created
	 */

	app.post("/api/metro/stations",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var check = revalidator.validate(req.body, {
				properties: {
					station: {
						type: 'string',
						maxLength: 128,
						required: true
					},
					id_metrobranch: {
						type: "integer",
						required: true
					}
				}
			});

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			db.metro.stations.create(req.body, (err, result) => {
				if (err) return done(err);
				res.json(201, result);
			});
		});


	/**
	 * @api {delete} /api/metro/stations/:name Delete station by name.
	 * @apiName DeleteStationByName
	 * @apiGroup Metro
	 * @apiPermission emploee
	 *
	 * @apiParam {String} name Station unique name.
	 *
	 * @apiSuccessStructure Deleted
	 */

	/**
	 * @api {delete} /api/metro/stations/:id Delete station by id.
	 * @apiName DeleteStationById
	 * @apiGroup Metro
	 * @apiPermission emploee
	 *
	 * @apiParam {String} id Station unique id.
	 *
	 * @apiSuccessStructure Deleted
	 */

	app.del("/api/metro/stations/:station",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var cond = {};
			var station = req.params.station;

			if (type.isInt(station)) //search by id
				cond["id_metro"] = parseInt(station);
			else //search by name
				cond["station"] = station;

			db.metro.stations.del(cond, (err) => {
				if (err) return done(err);
				res.json(204, null);
			});
		});
}

export = init;
