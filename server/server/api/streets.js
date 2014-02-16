/// <reference path="../idl/winston.d.ts" />
/// <reference path="../idl/express.d.ts" />
/// <reference path="../idl/passport.d.ts" />
var express = require("express");
var passport = require("passport");

var db = require("../libs/db");
var type = require("../libs/type");

var revalidator = require("revalidator");

function init(app, log) {
    /**
    * @api {get} /api/streets Get all streets.
    * @apiName GetStreets
    * @apiGroup Streets
    * @apiPermission emploee
    *
    * @apiParam {Integer} [sign] Only streets assigned with this territorial sign.
    * @apiParam {Integer} [count] Number of streets for display.
    * @apiParam {Integer} [from] From number of street.
    */
    app.get("/api/streets", passport.authenticate("bearer", { session: false }), function (req, res, done) {
        var sign = null;

        if (type.isDefAndNotNull(req.query.sign)) {
            sign = parseInt(req.query.sign);
        }

        if (type.isDefAndNotNull(sign)) {
            //by sign
            db.streets.findBySign(req.query.sign, function (err, streets) {
                if (err || !streets)
                    return done(err);
                res.json(streets);
            }, req.query);
        } else {
            //all
            db.streets.streets.get(function (err, streets) {
                if (err)
                    return done(err);
                res.json(streets);
            }, req.query);
        }
    });

    /**
    * @api {get} /api/streets/:id Get street by id.
    * @apiName GetStreetById
    * @apiGroup Streets
    * @apiPermission emploee
    *
    * @apiParam {Integer} id Street unique id.
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "id_street": "1",
    *       "name": "4-я улица Марьиной рощи",
    *       "comment": "Стратегически важная улица"
    *     }
    */
    /**
    * @api {get} /api/streets/:name Get street by name.
    * @apiName GetStreetByName
    * @apiGroup Streets
    * @apiPermission emploee
    *
    * @apiParam {String} name Street unique name.
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "id_street": "1",
    *       "name": "4-я улица Марьиной рощи",
    *       "comment": "Стратегически важная улица"
    *     }
    */
    app.get("/api/streets/:street", passport.authenticate("bearer", { session: false }), function (req, res) {
        var cond = {};
        var street = req.params.street;

        //search by id
        if (type.isInt(street)) {
            cond["id_street"] = parseInt(street);
        } else {
            cond["name"] = street;
        }

        db.streets.streets.findRow(cond, function (err, street) {
            if (err || !street) {
                res.status(404).json({ error: "Street not found" });
                return;
            }

            res.json(street);
        });
    });
}

module.exports = init;
