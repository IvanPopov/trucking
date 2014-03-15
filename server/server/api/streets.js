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

    function createCond(req) {
        var cond = {};
        var street = req.params.street;

        //search by id
        if (type.isInt(street)) {
            cond["id_street"] = parseInt(street);
        } else {
            cond["name"] = street;
        }

        return cond;
    }

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
        var cond = createCond(req);

        db.streets.streets.findRow(cond, function (err, street) {
            if (err || !street) {
                res.status(404).json({ error: "Street not found" });
                return;
            }

            res.json(street);
        });
    });

    /**
    * @api {post} /api/streets/ Create street.
    * @apiName CreateStreet
    * @apiGroup Streets
    * @apiPermission emploee
    *
    *
    * @apiParam {String} name Street name.
    * @apiParam {String} [comment] Comment.
    *
    * @apiSuccessStructure Created
    */
    app.post("/api/streets", passport.authenticate("bearer", { session: false }), function (req, res, done) {
        var check = revalidator.validate(req.body, {
            properties: {
                name: {
                    type: 'string',
                    maxLength: 128,
                    required: true
                },
                comment: {
                    type: ["string", "null"],
                    required: false
                }
            }
        });

        if (!check.valid) {
            res.json(400, check);
            return;
        }

        db.catalogs.streets.create(req.body, function (e, result) {
            if (e)
                return done(e);
            res.json(201, result);
        });
    });

    /**
    * @api {patch} /api/streets/:id Change street by id.
    * @apiName ChangeStreetById
    * @apiGroup Streets
    * @apiPermission emploee
    *
    * @apiParam {Integer} id Street id.
    *
    * @apiParam {String} [name] Street name.
    * @apiParam {String} [comment] Comment.
    *
    * @apiSuccessStructure Patched
    */
    /**
    * @api {patch} /api/streets/:street Change street by name.
    * @apiName ChangeStreetByName
    * @apiGroup Streets
    * @apiPermission emploee
    *
    * @apiParam {String} street Street name.
    *
    * @apiParam {String} [name] Street name.
    * @apiParam {String} [comment] Comment.
    *
    * @apiSuccessStructure Patched
    */
    app.patch("/api/streets/:street", passport.authenticate("bearer", { session: false }), function (req, res, done) {
        var cond = createCond(req);

        var check = revalidator.validate(req.body, {
            properties: {
                name: {
                    type: 'string',
                    maxLength: 128,
                    required: false
                },
                comment: {
                    type: ["string", "null"],
                    required: false
                }
            }
        });

        if (!check.valid) {
            res.json(400, check);
            return;
        }

        db.catalogs.streets.patch(cond, req.body, function (e, result) {
            if (e)
                return done(e);
            res.json(result);
        });
    });

    /**
    * @api {delete} /api/streets/:street Delete street by name.
    * @apiName DeleteStreetByName
    * @apiGroup Catalogs
    * @apiPermission emploee
    *
    * @apiParam {String} street Street unique name.
    *
    * @apiSuccessStructure Deleted
    */
    /**
    * @api {delete} /api/streets/:id Delete street by id.
    * @apiName DeleteStreetById
    * @apiGroup Catalogs
    * @apiPermission emploee
    *
    * @apiParam {Integer} id Street unique id.
    *
    * @apiSuccessStructure Deleted
    */
    app.del("/api/streets/:street", passport.authenticate("bearer", { session: false }), function (req, res, done) {
        var cond = createCond(req);
        db.catalogs.streets.del(cond, function (e) {
            if (e)
                return done(e);
            res.json(204, null);
        });
    });
}

module.exports = init;
