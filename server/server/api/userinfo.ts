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
	app.get("/api/userinfo",
		passport.authenticate("bearer", { session: false }),
		(req, res) => {
			// req.authInfo is set using the `info` argument supplied by
			// `BearerStrategy`.  It is typically used to indicate scope of the token,
			// and used in access control checks.  For illustrative purposes, this
			// example simply returns the scope in the response.
			var employee: trucking.db.IEmployee = req.user;

			res.json({
				user_id: employee.id_employee,
				name: employee.name,
				permissions: employee.permissions,
				scope: (<any>req).authInfo.scope
			});
		});
}

export = init; 