/// <reference path="../idl/winston.d.ts" />
/// <reference path="../idl/express.d.ts" />
/// <reference path="../idl/passport.d.ts" />
var express = require("express");
var passport = require("passport");

var revalidator = require("revalidator");

function init(app, log) {
    app.get("/api/userinfo", passport.authenticate("bearer", { session: false }), function (req, res) {
        // req.authInfo is set using the `info` argument supplied by
        // `BearerStrategy`.  It is typically used to indicate scope of the token,
        // and used in access control checks.  For illustrative purposes, this
        // example simply returns the scope in the response.
        var employee = req.user;

        res.json({
            user_id: employee.id_employee,
            name: employee.name,
            permissions: employee.permissions,
            scope: req.authInfo.scope
        });
    });
}

module.exports = init;
//# sourceMappingURL=userinfo.js.map
