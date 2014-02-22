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
	 * @api {get} /api/nomenclatures/groups Get nomenclature groups.
	 * @apiName GetNomenclatureGroups
	 * @apiGroup Nomenclatures
	 * @apiPermission emploee
	 * 
	 * @apiParam {Integer} [from] View from number.
	 * @apiParam {Integer} [count] View number of groups.
	 *
	 * @apiSuccess {Object[]} nomenclatureGroup List of nomenclature groups.
	 * @apiSuccess {Integer}  nomenclatureGroup.id_nomenclaturegroup Group.
	 * @apiSuccess {String}   nomenclatureGroup.name  Name.
	 * 
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     [
	 *			{
	 *				"id_nomenclaturegroup": 0,
	 *				"name": "loaders"
	 *			}
	 *     ]
	 */
	app.get("/api/nomenclatures/groups",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			db.catalogs.nomenclaturegroups.get((err: Error, branches: trucking.db.INomenclatureGroup[]) => {
				if (err) return done(err);
				res.json(branches);
			}, req.query);
		});

	/**
	 * @api {get} /api/nomenclatures Get nomenclatures.
	 * @apiName GetNomenclatures
	 * @apiGroup Nomenclatures
	 * @apiPermission emploee
	 * 
	 * @apiParam {Integer} [from] View from number.
	 * @apiParam {Integer} [count] View number of nomenclatures.
	 * @apiParam {Integer} [group] Nomenclature group.
	 *
	 * @apiSuccess {Object[]} nomenclatures List of nomenclatures.
	 * @apiSuccess {String}   nomenclatures.name  Name.
	 * @apiSuccess {String}   nomenclatures.description Description.
	 * @apiSuccess {String}   nomenclatures.unit Unit.
	 * @apiSuccess {Number}   nomenclatures.rate Rate.
	 * @apiSuccess {Integer}  nomenclatures.type Can have two values​​: 0 - service, 1 - goods.
	 * @apiSuccess {Integer}  nomenclatures.id_worktype Work type.
	 * @apiSuccess {Integer}  nomenclatures.id_nomenclaturegroup Group.
	 * 
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     [
	 *			{
	 *				"name": "loader",
	 *				"description": "Loading operations",
	 *				"unit": "kg",
	 *				"rate": 200.0,
	 *				"type": 0,
	 *				"id_worktype": 25,
	 *				"id_nomenclaturegroup": 0
	 *			}
	 *     ]
	 */

	app.get("/api/nomenclatures",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var check = revalidator.validate(req.query, {
				properties: {
					name: {
						description: 'view nomenclature in group',
						type: 'string',
						pattern: /^[12]{1}$/,
					}
				}
			});

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			if (type.isString(req.query.group)) {
				var cond = { id_nomenclaturegroup: parseInt(req.query.group) || 0 };
				db.catalogs.nomenclatures.find(cond, (err: Error, branches: trucking.db.INomenclature[]) => {
					if (err) return done(err);
					res.json(branches);
				}, req.query);
			}
			else {
				db.catalogs.nomenclatures.get(
					(err: Error, branches: trucking.db.INomenclature[]): void => {
					if (err) return done(err);
					res.json(branches);
				}, req.query);
			}

		});
}

export = init;  