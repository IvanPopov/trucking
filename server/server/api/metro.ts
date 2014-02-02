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
	app.get("/api/metro/branches/:branch",
		passport.authenticate("bearer", { session: false }),
		(req, res) => {
			var cond = {};

			//search by id
			if (parseInt(req.params.branch) == req.params.branch) {
				cond["id_metrobranch"] = parseInt(req.params.branch);
			}
			else { //search by name
				cond["name"] = req.params.branch;
			}

			db.metro.getBranch(cond, (err: Error, branch: trucking.db.IMetroBranch): void => {
				if (err) {
					res.status(404).json({ error: "Branch not found" });
					return;
				}

				res.json(branch);
			});
		});

	app.post("/api/metro/branches/",
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
				res.json(check);
				return;
			}

			db.metro.branches.create(req.body, (err, result) => {
				if (err) return done(err);
				res.json(result);
			});
		});

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
				res.json(check.errors);
				return;
			}

			db.metro.branches.patch(cond, req.body, (err, result) => {
				if (err) return done(err);
				res.json(result);
			});
		});


	app.get("/api/metro/stations",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			db.metro.stations.get((err: Error, stations: trucking.db.IMetro[]) => {
				if (err) return done(err);
				res.json(stations);
			}, req.query);
		});

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
						required: true
					}
				}
			});

			if (!check.valid) {
				res.json(check.errors);
				return;
			}

			db.metro.stations.patch(cond, req.body, (err, result) => {
				if (err) return done(err);
				res.json(result);
			});
		});

	app.post("/api/metro/stations/",
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
				res.json(check);
				return;
			}

			db.metro.stations.create(req.body, (err, result) => {
				if (err) return done(err);
				res.json(result);
			});
		});
}

export = init;