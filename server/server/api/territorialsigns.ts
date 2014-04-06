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
	app.get("/api/territorialsigns",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			db.catalogs.territorialsigns.get((err: Error, signs: trucking.db.ITerritorialSign[]) => {
				if (err) return done(err);
				res.json(signs);
			}, req.query);
		});

}


export = init;