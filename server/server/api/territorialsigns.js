/// <reference path="../idl/winston.d.ts" />
/// <reference path="../idl/express.d.ts" />
/// <reference path="../idl/passport.d.ts" />
var express = require("express");
var passport = require("passport");

var db = require("../libs/db");

var revalidator = require("revalidator");

function init(app, log) {
    app.get("/api/territorialsigns", passport.authenticate("bearer", { session: false }), function (req, res, done) {
        db.catalogs.territorialsigns.get(function (err, signs) {
            if (err)
                return done(err);
            res.json(signs);
        }, req.query);
    });
}

module.exports = init;
