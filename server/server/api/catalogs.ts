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

			db.catalogs.units.patch({ unit: unit }, req.body, (err, result) => {
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
			db.catalogs.units.del({ unit: unit }, (err: MysqlError, result) => {
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
	 * @apiParam {Integer} [id_toolgroup] Group.
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
					},
					id_toolgroup: {
						type: 'integer'
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
	 * @apiParam {Integer} [id_toolgroup] Group.
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
	 * @apiParam {Integer} [id_toolgroup] Group.
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
					},
					id_toolgroup: {
						type: 'integer'
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
	 * @apiGroup Catalogs
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






	/******************************************************************
	 *
	 *		Worktypes API
	 *
	 ******************************************************************/

	/**
	 * @api {get} /api/catalogs/worktypes/groups Get worktype groups.
	 * @apiName GetWorkTypeGroups
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 * 
	 * @apiParam {Integer} [from] View from number.
	 * @apiParam {Integer} [count] View number of groups.
	 *
	 * @apiSuccess {Object[]} worktypeGroup List of worktype groups.
	 * @apiSuccess {Integer}  worktypeGroup.id_worktypegroup Group.
	 * @apiSuccess {String}   worktypeGroup.name  Name.
	 * 
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     [
	 *			{
	 *				"id_worktypegroup": 0,
	 *				"name": "loaders"
	 *			}
	 *     ]
	 */
	app.get("/api/catalogs/worktypes/groups",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			db.catalogs.worktypegroups.get((err: Error, groups: trucking.db.IWorkTypeGroup[]) => {
				if (err) return done(err);
				res.json(groups);
			}, req.query);
		});

	/**
	 * @api {post} /api/catalogs/worktypes/groups Create new worktype group.
	 * @apiName CreateWorkTypeGroup
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 *
	 * @apiParam {String} name Name.
	 *
	 * @apiSuccessStructure Created
	 */

	app.post("/api/catalogs/worktypes/groups",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var check = revalidator.validate(req.body, {
				properties: {
					name: {
						type: 'string',
						maxLength: 128,
						required: true
					}
				}
			});

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			db.catalogs.worktypegroups.create(req.body, (err, result) => {
				if (err) return done(err);
				res.json(result);
			});
		});

	/**
	 * @api {delete} /api/catalogs/worktypes/groups/:group Delete worktype group by id.
	 * @apiName DelWorkTypeGroupById
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} group Worktype group unique id.
	 *
	 * @apiSuccessStructure Deleted
	 */
	/**
	 * @api {delete} /api/catalogs/worktypes/groups/:group Delete worktype group by name.
	 * @apiName DelWorkTypeGroupByName
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 *
	 * @apiParam {String} group Worktype group unique name.
	 *
	 * @apiSuccessStructure Deleted
	 */
	app.del("/api/catalogs/worktypes/groups/:group",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var cond = {};
			var group = req.params.group;

			if (type.isInt(group)) //search by id
				cond["id_worktypegroup"] = parseInt(group);
			else //search by name
				cond["name"] = group;
			

			db.catalogs.worktypegroups.del(cond, (err, result) => {
				if (err) return done(err);
				res.json(result);
			});
		});


	/**
	 * @api {get} /api/catalogs/worktypes Get worktypes.
	 * @apiName GetWorkTypes
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 * 
	 * @apiParam {Integer} [from] View from number.
	 * @apiParam {Integer} [count] View number of worktypes.
	 * @apiParam {Integer} [group] WorkType group.
	 *
	 * @apiSuccess {Object[]} worktypes List of worktypes.
	 * @apiSuccess {String}   worktypes.name  Name.
	 * @apiSuccess {String}   worktypes.short_name Short name.
	 * @apiSuccess {String}   worktypes.unit Unit.
	 * @apiSuccess {Number}   worktypes.rate Rate.
	 * @apiSuccess {Number}   worktypes.unit_sec Unit second.
	 * @apiSuccess {Number}   worktypes.rate_sec Rate second.
	 * @apiSuccess {Integer}  worktypes.id_worktype Work type.
	 * @apiSuccess {Integer}  worktypes.id_worktypegroup Group.
	 * 
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     [
	 *			{
	 *				"name": "loader",
	 *				"short_name": "ld",
	 *				"unit": "kg",
	 *				"rate": 200.0,
	 *				"unit_sec": null,
	 *				"rate_sec": 0,
	 *				"type": 0,
	 *				"id_worktype": 25,
	 *				"id_worktypegroup": 0
	 *			}
	 *     ]
	 */

	app.get("/api/catalogs/worktypes",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			if (type.isString(req.query.group)) {
				var cond = { id_worktypegroup: parseInt(req.query.group) || 0 };
				db.catalogs.worktypes.find(cond, (err: Error, worktypes: trucking.db.IWorkType[]) => {
					if (err) return done(err);
					res.json(worktypes);
				}, req.query);
			}
			else {
				db.catalogs.worktypes.get(
					(err: Error, worktypes: trucking.db.IWorkType[]): void => {
						if (err) return done(err);
						res.json(worktypes);
					}, req.query);
			}

		});

	/**
	 * @api {get} /api/catalogs/worktypes/:worktype
	 * @apiName GetWorkType
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 */
	app.get("/api/catalogs/worktypes/:worktype",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var cond = { id_worktype: parseInt(req.params.worktype) || 0 };

			db.catalogs.worktypes.findRow(cond,
				(err: Error, worktype: trucking.db.IWorkType): void => {
					if (err) return done(err);
					res.json(worktype);
				});
		});


	/**
	 * @api {get} /api/catalogs/worktypes/:worktype/tools Get tools for worktype.
	 * @apiName GetWorkTypeTools
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 */
	app.get("/api/catalogs/worktypes/:worktype/tools",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var id = parseInt(req.params.worktype) || 0;

			db.catalogs.worktypestools.connect.query(
				"SELECT t.* FROM " +
				db.catalogs.worktypestools.table + " wtt, " +
				db.catalogs.tools.table +
				" t WHERE wtt.id_worktype = ? AND t.id_tool = wtt.id_tool", [id],
				(err, rows: trucking.db.ITool[]) => {
					if (err) return done(err);
					res.json(rows);
				});
		});

	/**
	 * @api {post} /api/catalogs/worktypes/:worktype/tools Add tool in worktype.
	 * @apiName AddToolInWorkType
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} worktype Worktype unique id.
	 * @apiParam {Integer} id_tool Tool, that will be added.
	 */
	app.post("/api/catalogs/worktypes/:worktype/tools",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var id = parseInt(req.params.worktype) || 0;

			var check = revalidator.validate(req.body, {
				properties: {
					id_tool: {
						type: 'integer',
						required: true
					}
				}
			});

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			db.catalogs.worktypestools.create(
				{
					id_worktype: id,
					id_tool: req.body.id_tool
				},
				(err, result) => {
					if (err) return done(err);
					res.json(result);
				});
		});

	/**
	 * @api {delete} /api/catalogs/worktypes/:worktype/tools Delete tool in worktype.
	 * @apiName DelToolInWorkType
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} worktype Worktype unique id.
	 * @apiParam {Integer} id_tool Tool, that will be removed.
	 */
	app.del("/api/catalogs/worktypes/:worktype/tools",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var id = parseInt(req.params.worktype) || 0;

			var check = revalidator.validate(req.body, {
				properties: {
					id_tool: {
						type: 'integer',
						required: true
					}
				}
			});

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			db.catalogs.worktypestools.del(
				{
					id_worktype: id,
					id_tool: req.body.id_tool
				},
				(err, result) => {
					if (err) return done(err);
					res.json(result);
				});
		});

	/**
	 * @api {post} /api/catalogs/tools Create new worktype.
	 * @apiName CreateWorkType
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 *
	 * @apiParam {String} name Tool name.
	 * @apiParam {String} short_name Short name.
	 * @apiParam {String} unit Unit.
	 * @apiParam {Number} rate Rate.
	 * @apiParam {String} [unit_sec] Second unit.
	 * @apiParam {Number} [rate_sec] Second rate.
	 * @apiParam {Integer} [id_worktypegroup] Group.
	 *
	 * @apiSuccessStructure Created
	 */
	app.post("/api/catalogs/worktypes",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var check = revalidator.validate(req.body, {
				properties: {
					name: {
						type: 'string',
						maxLength: 256,
						required: true
					},
					short_name: {
						type: "string",
						maxLength: 45,
						required: true
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
					},
					id_worktypegroup: {
						type: 'integer'
					}
				}
			});

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			db.catalogs.worktypes.create(req.body, (err, result) => {
				if (err) return done(err);
				res.json(result);
			});
		});

	/**
	 * @api {patch} /api/catalogs/worktypes/:worktype Change worktype.
	 * @apiName ChangeWorkTypeById
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 * 
	 * @apiParam {Integer} worktype Worktype id.
	 *
	 * @apiParam {String} [name] Tool name.
	 * @apiParam {String} [short_name] Description.
	 * @apiParam {String} [unit] Unit.
	 * @apiParam {Number} [rate] Rate.
	 * @apiParam {String} [unit_sec] Second unit.
	 * @apiParam {Number} [rate_sec] Second rate.
	 * @apiParam {Integer} [id_worktypegroup] Group.
	 *
	 * @apiSuccessStructure Patched
	 */
	app.patch("/api/catalogs/worktypes/:worktype",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var cond = { id_worktype: parseInt(req.params.worktype) || 0 };

			var check = revalidator.validate(req.body, {
				properties: {
					name: {
						type: 'string',
						maxLength: 256,
					},
					short_name: {
						type: "string",
						maxLength: 45,
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
					},
					id_worktypegroup: {
						type: 'integer'
					}
				}
			});

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			db.catalogs.worktypes.patch(cond, req.body, (err, result) => {
				if (err) return done(err);
				res.json(result);
			});
		});

	/**
	 * @api {delete} /api/catalogs/worktypes/:worktype Delete worktype by id.
	 * @apiName DelWorkType
	 * @apiGroup Catalogs
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} worktype Worktype unique id.
	 *
	 * @apiSuccessStructure Deleted
	 */
	app.del("/api/catalogs/worktypes/:worktype",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var cond = { id_worktype: parseInt(req.params.worktype) || 0 };

			db.catalogs.worktypes.del(cond, (err, result) => {
				if (err) return done(err);
				res.json(result);
			});
		});

	/******************************************************************
	 *
	 *		Catalogs common API
	 *
	 ******************************************************************/

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
}

export = init;
