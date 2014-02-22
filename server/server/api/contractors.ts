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
	 * @api {get} /api/contractors/holdings Get holdings.
	 *
	 * @apiGroup Contractors
	 * @apiName GetHoldings
	 * @apiPermission emploee
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     [
	 *       {
	 *			id_holding: 1, 
	 *			name: "Pharma", 
	 *			short_name: "ph"
	 *		 }
	 *     ]
	 */
	app.get("/api/contractors/holdings",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			db.catalogs.holdings.get((err: Error, holdings: trucking.db.IHolding[]) => {
				if (err) return done(err);
				res.json(holdings);
			}, req.query);
		});

	/**
	 * @api {get} /api/contractors/types
	 * @apiDescription 
	 * Get all contractor types.
	 */

	app.get("/api/contractors/types",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			db.catalogs.contractortypes.get((err: Error, types: trucking.db.IContractorType[]) => {
				if (err) return done(err);
				res.json(types);
			}, req.query);
		});

	/**
	 * @api {get} /api/contractors Get contractors.
	 *
	 * @apiGroup Contractors
	 * @apiName GetContractors
	 * @apiPermission emploee
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     [
	 *       {id_contractor: 1, name: "Pharma", ...},
	 *     ]
	 */

	app.get("/api/contractors",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			db.catalogs.contractors.get((err: Error, branches: trucking.db.IContractor[]) => {
				if (err) return done(err);
				res.json(branches);
			}, req.query);
		});

	/**
	 * @api {get} /api/contractors/:contractor/holding
	 * @apiDescription 
	 * <strong style="color: red;">NOT IMPLEMENTED</strong>
	 * Get holding information for current contractor.
	 */
	app.get("/api/contractors/:contractor/holding",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			
		});

}

export = init;
