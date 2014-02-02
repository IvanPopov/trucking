/// <reference path="../idl/winston.d.ts" />
/// <reference path="../idl/express.d.ts" />
/// <reference path="../idl/passport.d.ts" />
var passport = require("passport");

var db = require("../libs/db");

var revalidator = require("revalidator");

function init(app, log) {
    app.get("/api/catalogs/:name", passport.authenticate("bearer", { session: false }), function (req, res) {
        var catalogName = (req.params.name || "").toLowerCase();
        var query = req.query;

        switch (catalogName) {
            case "metro":
            case "metrobranches":
            case "streets":
                db.catalogs[catalogName].get(function (err, rows) {
                    if (err) {
                        log.error(err);
                        res.json({ error: "Unknown error" });
                        return;
                    }

                    res.json(rows);
                }, query);
                break;
            default:
                res.status(404).json({ error: "Catalog not found" });
        }
    });
}

module.exports = init;
//# sourceMappingURL=catalog.js.map
