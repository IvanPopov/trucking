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
	app.get("/api/catalogs/:name",
		passport.authenticate("bearer", { session: false }),
		(req, res) => {
			var catalogName: string = (req.params.name || "").toLowerCase();
			var query = req.query;

			switch (catalogName) {
				case "metro":
				case "metrobranches":
				case "streets":
					db.catalogs[catalogName].get((err, rows): void => {
						if (err) {
							log.error(err);
							res.json({ error: "Unknown error" });
							return;
						}

						res.json(rows);
					}, <trucking.db.IQueryCond>query);
					break;
				default:
					res.status(404).json({ error: "Catalog not found" });
			}
		});
}

export  = init;