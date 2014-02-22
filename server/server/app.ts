/// <reference path="idl/express.d.ts" />
/// <reference path="idl/winston.d.ts" />
/// <reference path="idl/passport.d.ts" />

import express = require("express");
import winston = require("winston");
import config = require("./libs/config");
import passport = require("passport");
import oauth2 = require("./libs/oauth2");
import db = require("./libs/db");
import http = require("http");
import https = require("https");
import fs = require("fs");
import type = require("./libs/type");

var revalidator = require("revalidator");
var cors = require("cors");
var ArgumentParser = require("argparse").ArgumentParser;
var parser = new ArgumentParser({
	version: "0.0.1",
	addHelp: true,
	description: "Trucking server"
});

parser.addArgument(["-p", "--port"], { help: "Specify port." });
parser.addArgument(["-d", "--debug"], { help: "Debug mode.", action: "storeTrue" });
parser.addArgument(["--https"], { help: "Use HTTPS.", action: "storeTrue" });

var args = parser.parseArgs();
var log: winston.Logger = require("./libs/log")(module);
var app = express();

app.use(express.bodyParser());
app.use(express.favicon());
app.use(express.logger("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(passport.initialize());
app.use(express.methodOverride());
app.use(cors());
app.use(app.router);

require("./libs/auth");

if ("development" == <any>app.get("env")) {
	//app.use(express.errorHandler());
}

app.use((req, res, next) => {
	res.status(404);
	res.json({ error: 'Not found' });
});


app.use((err, req, res, next) => {
	// we may use properties of the error object
	// here and next(err) appropriately, or if
	// we possibly recovered from the error, simply next().
	log.error("Internal error(%d): %s", res.statusCode, err.message);
	res.status(err.status || 500);
	res.json({ error: err });
});


/**
 * @apiDefinePermission employee Emploee access rights needed. 
 */

/**
 * @apiDefinePermission admin Admin access rights needed. 
 */


/**
 * @api {get} /api
 * @apiPermission employee
 */
app.get("/api", passport.authenticate("bearer", { session: false }), (req: express.Request, res: express.Response): void => {
	res.send("API is running");
});


/*
app.get('/auth/vk',
	passport.authenticate('vkontakte', {
		scope: ['friends']
	}),
	function (req, res) {
		// The request will be redirected to vk.com 
		// for authentication, so
		// this function will not be called.
	});

app.get('/auth/vk/callback',
	passport.authenticate('vkontakte', {
		failureRedirect: '/auth'
	}),
	function (req, res) {
		// Successful authentication
		//, redirect home.
		res.redirect('/');
	});
*/

//FIXME: avoid <any> converion
app.post("/oauth/token", (<any>oauth2).token);


import metro = require("./api/metro");
import catalogs = require("./api/catalogs");
import userinfo = require("./api/userinfo");
import streets = require("./api/streets");
import contractors = require("./api/contractors");

metro(app, log);
catalogs(app, log);
userinfo(app, log);
streets(app, log);
contractors(app, log);

var port: number = parseInt(args.port) || config.get("port");
var useHttps: boolean = type.isDef(args.https) ? !!args.https : config.get("https");

if (useHttps) {
	var privateKey: string = fs.readFileSync(config.get("security:key"), 'utf8').toString();
	var certificate: string = fs.readFileSync(config.get("security:cert"), 'utf8').toString();
	var passphrase: string = config.get("security:passphrase");

	https.createServer({ key: privateKey, cert: certificate, passphrase: passphrase }, app).listen(port, () => {
		if ("development" == <any>app.get("env")) {
			log.info("Express/https server listening on port " + port);
		}
	});
}
else {
	http.createServer(app).listen(port, () => {
		if ("development" == <any>app.get("env")) {
			log.info("Express/http server listening on port " + port);
		}
	});
}


