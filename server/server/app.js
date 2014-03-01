/// <reference path="idl/express.d.ts" />
/// <reference path="idl/winston.d.ts" />
/// <reference path="idl/passport.d.ts" />
var express = require("express");

var config = require("./libs/config");
var passport = require("passport");
var oauth2 = require("./libs/oauth2");

var http = require("http");
var https = require("https");
var fs = require("fs");
var type = require("./libs/type");

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
var log = require("./libs/log")(module);
var app = express();

app.use(express.bodyParser());
app.use(express.favicon());
app.use(express.logger("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(passport.initialize());
app.use(express.methodOverride());
app.use(cors({ methods: ["GET", "POST", "PATCH", "DELETE"] }));
app.use(app.router);

require("./libs/auth");

if ("development" == app.get("env")) {
    //app.use(express.errorHandler());
}

app.use(function (req, res, next) {
    res.status(404);
    res.json({ error: 'Not found' });
});

app.use(function (err, req, res, next) {
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
app.get("/api", passport.authenticate("bearer", { session: false }), function (req, res) {
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
app.post("/oauth/token", oauth2.token);

var metro = require("./api/metro");
var catalogs = require("./api/catalogs");
var userinfo = require("./api/userinfo");
var streets = require("./api/streets");
var contractors = require("./api/contractors");

metro(app, log);
catalogs(app, log);
userinfo(app, log);
streets(app, log);
contractors(app, log);

var port = parseInt(args.port) || config.get("port");
var useHttps = type.isDef(args.https) ? !!args.https : config.get("https");

if (useHttps) {
    var privateKey = fs.readFileSync(config.get("security:key"), 'utf8').toString();
    var certificate = fs.readFileSync(config.get("security:cert"), 'utf8').toString();
    var passphrase = config.get("security:passphrase");

    https.createServer({ key: privateKey, cert: certificate, passphrase: passphrase }, app).listen(port, function () {
        if ("development" == app.get("env")) {
            log.info("Express/https server listening on port " + port);
        }
    });
} else {
    http.createServer(app).listen(port, function () {
        if ("development" == app.get("env")) {
            log.info("Express/http server listening on port " + port);
        }
    });
}
