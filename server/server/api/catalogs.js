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
    * @api {get} /api/catalogs Get catalogs list.
    * @apiDescription
    * <strong>Note: Admin view more catalogs, then employeers.</strong>
    *
    * @apiGroup Catalogs
    * @apiName GetCatalogs
    * @apiPermission emploee
    *
    * @apiSuccess {String[]} catalogs List of available catalogs.
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *     [
    *       "streets",
    *       "metro",
    *       "holdings"
    *       "paymentterms",
    *       "addresstype"
    *     ]
    */
    app.get("/api/catalogs", passport.authenticate("bearer", { session: false }), function (req, res, done) {
        res.json(Object.keys(db.catalogs).concat(db.isAdmin(req.user) ? Object.keys(db.systemCatalogs) : []));
    });

    /**
    * @api {get} /api/catalogs/:name Read catalog.
    * @apiName ReadCatalog
    * @apiGroup Catalogs
    * @apiPermission emploee
    *
    * @apiParam {String} name Catalog name.
    *
    * @apiParam {String} export Export into format. Supported: xlsx.
    *
    */
    app.get("/api/catalogs/:name", passport.authenticate("bearer", { session: false }), function (req, res) {
        var catalogName = (req.params.name || "").toLowerCase();
        var query = req.query;

        var catalog = db.catalogs[catalogName];

        if (type.isDefAndNotNull(catalog)) {
            catalog.get(function (err, rows) {
                if (err) {
                    log.error(err);
                    res.json({ error: "Unknown error" });
                    return;
                }

                if (req.query.format == "xlsx") {
                    catalog.convertToXlsx(rows, function (e, xlsx) {
                        if (e) {
                            return res.json(500, {
                                error: "Could not export catalog to XLSX"
                            });
                        }

                        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
                        res.setHeader("Content-Disposition", "attachment; filename=" + catalogName + ".xlsx");
                        res.end(xlsx, 'binary');
                    });
                } else {
                    res.json(rows);
                }
            }, query);
        } else {
            res.status(404).json({ error: "Catalog not found" });
        }
    });
}

module.exports = init;
