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
	 * @api {get} /api/catalogs Get catalogs list.
	 * @apiDescription 
	 * <strong>Note: Admin view more catalogs, then employeers.</strong>
	 *
	 * @apiGroup Catalogs
	 * @apiName GetCatalogs
	 * @apiPermission emploee
	 *
	 * @apiSuccess {String[]} catalogs List of available catalogs.
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     [
	 *       "streets",
	 *       "metro",
	 *       "holdings"
	 *       "paymentterms",
	 *       "addresstype"
	 *     ]
	 */

	app.get("/api/catalogs",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			res.json(
				Object.keys(db.catalogs).concat(
					db.isAdmin(req.user) ?
					Object.keys(db.systemCatalogs) :
					[]));
		});
	 

	/**
	 * @api {get} /api/catalogs/:name Read catalog.
	 * @apiName ReadCatalog
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 * 
	 * @apiParam {String} name Catalog name.
	 * 
	 * @apiParam (Parameters only for admin users:) {String} [export] Export into format. Supported: xlsx.
	 *
	 */
	app.get("/api/catalogs/:name",
		passport.authenticate("bearer", { session: false }),
		(req, res) => {
			var catalogName: string = (req.params.name || "").toLowerCase();
			var query = req.query;

			var catalog: db.CatalogModel<any> = db.catalogs[catalogName];

			if (type.isDefAndNotNull(catalog)) {
				catalog.get((err, rows) => {
					if (err) {
						log.error(err.message);
						res.json({ error: "Unknown error" });
						return;
					}

					if (req.query.format == "xlsx" && db.isAdmin(req.user)) {
						catalog.convertToXlsx(rows, (e: Error, xlsx: NodeBuffer) => {
							if (e) {
								return res.json(500, {
									error: "Could not export catalog to XLSX"
								});
							}

							res.setHeader('Content-Type', 'application/vnd.openxmlformats');
							res.setHeader("Content-Disposition", "attachment; filename=" + catalogName + ".xlsx");
							res.end(xlsx, 'binary');
						});
					}
					else {
						res.json(rows);
					}
				}, <trucking.db.IQueryCond>query);
			}
			else {
				res.status(404).json({ error: "Catalog not found" });
			}
		});

	/**
	 * @api {post} /api/catalogs/units Create new unit.
	 * @apiName CreateUnit
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 *
	 * @apiParam {String} unit Unit name.
	 * @apiParam {String} [description] Description.
	 *
	 * @apiSuccessStructure Created
	 */

	app.post("/api/catalogs/units",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var check = revalidator.validate(req.body, {
				properties: {
					unit: {
						type: 'string',
						maxLength: 16,
						required: true
					},
					description: {
						type: "string",
						maxLength: 128,
					}
				}
			});

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			db.catalogs.units.create(req.body, (err, result) => {
				if (err) return done(err);
				res.json(result);
			});
		});

	/**
	 * @api {patch} /api/catalogs/units/:unit Change unit.
	 * @apiName ChangeUnit
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 *
	 * @apiParam {String} unit Unit.
	 * @apiParam {String} [unit] Unit name.
	 * @apiParam {String} [description] Description.
	 *
	 * @apiSuccessStructure Patched
	 */
	app.patch("/api/catalogs/units/:unit",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var unit = req.params.unit;

			var check = revalidator.validate(req.body, {
				properties: {
					unit: {
						type: 'string',
						maxLength: 16,
					},
					description: {
						type: "string",
						maxLength: 128,
					}
				}
			});

			if (!check.valid) {
				res.json(400, check.errors);
				return;
			}

			db.catalogs.units.patch({unit: unit}, req.body, (err, result) => {
				if (err) return done(err);
				res.json(result);
			});
		});

	/**
	 * @api {delete} /api/catalogs/units/:unit Delete unit.
	 * @apiName DeleteUnit
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 *
	 * @apiParam {String} unit Unit.
	 *
	 * @apiSuccessStructure Deleted
	 */
	app.del("/api/catalogs/units/:unit",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var unit = req.params.unit;
			db.catalogs.units.del({unit: unit}, (err: MysqlError, result) => {
				if (err) return done(err);
				res.json(result);
			});
		});


	/**
	 * @api {post} /api/catalogs/tools Create new tool.
	 * @apiName CreateTool
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 *
	 * @apiParam {String} name Tool name.
	 * @apiParam {String} [description] Description.
	 * @apiParam {String} unit Unit.
	 * @apiParam {Number} rate Rate.
	 * @apiParam {String} [unit_sec] Second unit.
	 * @apiParam {Number} [rate_sec] Second rate.
	 *
	 * @apiSuccessStructure Created
	 */

	app.post("/api/catalogs/tools",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var check = revalidator.validate(req.body, {
				properties: {
					name: {
						type: 'string',
						maxLength: 45,
						required: true
					},
					description: {
						type: "string",
						maxLength: 256,
					},
					unit: {
						type: 'string',
						maxLength: 16,
						required: true
					},
					rate: {
						type: 'number',
						required: true
					},
					unit_sec: {
						type: 'string',
						maxLength: 16
					},
					rate_sec: {
						type: 'number'
					}
				}
			});

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			db.catalogs.tools.create(req.body, (err, result) => {
				if (err) return done(err);
				res.json(result);
			});
		});

	/**
	 * @api {patch} /api/catalogs/tools/:tool Change tool by id.
	 * @apiName ChangeToolById
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 * 
	 * @apiParam {Integer} tool Tool id.
	 *
	 * @apiParam {String} [name] Tool name.
	 * @apiParam {String} [description] Description.
	 * @apiParam {String} [unit] Unit.
	 * @apiParam {Number} [rate] Rate.
	 * @apiParam {String} [unit_sec] Second unit.
	 * @apiParam {Number} [rate_sec] Second rate.
	 *
	 * @apiSuccessStructure Patched
	 */

	/**
	 * @api {patch} /api/catalogs/tools/:tool Change tool by name.
	 * @apiName ChangeToolByName
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 * 
	 * @apiParam {String} tool Tool name.
	 *
	 * @apiParam {String} [name] Tool name.
	 * @apiParam {String} [description] Description.
	 * @apiParam {String} [unit] Unit.
	 * @apiParam {Number} [rate] Rate.
	 * @apiParam {String} [unit_sec] Second unit.
	 * @apiParam {Number} [rate_sec] Second rate.
	 *
	 * @apiSuccessStructure Patched
	 */

	app.patch("/api/catalogs/tools/:tool",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var cond = {};
			var tool = req.params.tool;

			if (type.isInt(tool)) //search by id
				cond["id_tool"] = parseInt(tool);
			else //search by name
				cond["name"] = tool;

			var check = revalidator.validate(req.body, {
				properties: {
					name: {
						type: 'string',
						maxLength: 45,
					},
					description: {
						type: "string",
						maxLength: 256,
					},
					unit: {
						type: 'string',
						maxLength: 16,
					},
					rate: {
						type: 'number',
					},
					unit_sec: {
						type: 'string',
						maxLength: 16
					},
					rate_sec: {
						type: 'number'
					}
				}
			});

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			db.catalogs.tools.patch(cond, req.body, (err, result) => {
				if (err) return done(err);
				res.json(result);
			});
		});

	/**
	 * @api {delete} /api/catalogs/tools/:tool Delete tool by name.
	 * @apiName DeleteToolByName
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 *
	 * @apiParam {String} tool Tool unique name.
	 *
	 * @apiSuccessStructure Deleted
	 */

	/**
	 * @api {delete} /api/catalogs/tools/:tool Delete tool by id.
	 * @apiName Catalogs
	 * @apiGroup Metro
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} tool Tool unique id.
	 *
	 * @apiSuccessStructure Deleted
	 */
	app.del("/api/catalogs/tools/:tool",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var cond = {};
			var tool = req.params.tool;

			if (type.isInt(tool)) //search by id
				cond["id_tool"] = parseInt(tool);
			else //search by name
				cond["name"] = tool;


			db.catalogs.tools.del(cond, (err, result) => {
				if (err) return done(err);
				res.json(result);
			});
		});
}

export = init;
