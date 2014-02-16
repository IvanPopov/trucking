/// <reference path="../idl/request.d.ts" />
/// <reference path="../idl/jasmine.d.ts" />
/// <reference path="../idl/spec.d.ts" />
var request = require("request");
var setups = require("./setups");

function auth(cb) {
    request.post({
        uri: setups.path("/oauth/token"),
        method: "POST",
        json: {
            "grant_type": "password",
            "username": setups.USERNAME,
            "password": setups.PASSWORD,
            "client_id": setups.CLIENT_ID,
            "client_secret": setups.CLIENT_SECRET
        }
    }, function (e, res, body) {
        cb(e, res, body);
    });
}
module.exports = auth;
