/// <reference path="../idl/request.d.ts" />
/// <reference path="../idl/jasmine.d.ts" />
/// <reference path="../idl/jasmine-matchers.d.ts" />
/// <reference path="../idl/spec.d.ts" />
/// <reference path="../idl/db.d.ts" />
var request = require("request");
var setups = require("./setups");
var auth = require("./auth");

require("jasmine-expect");

describe("catalogs api", function () {
    var grant = null;
    auth(function (e, res, body) {
        grant = body;
    });

    beforeEach(function () {
        return waitsFor(function () {
            return !!grant;
        });
    });

    it("get catalogs list", function (done) {
        request.get({
            uri: setups.path("/api/catalogs"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body).toBeArray();
            done();
        });
    });

    it("read catalog (streets)", function (done) {
        request.get({
            uri: setups.path("/api/catalogs/streets"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body).toBeArray();
            done();
        });
    });

    it("export catalog into XLSX (streets)", function (done) {
        request.get({
            uri: setups.path("/api/catalogs/streets?format=xlsx"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            done();
        });
    });

    it("create unit", function (done) {
        request.post({
            uri: setups.path("/api/catalogs/units"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: { unit: "kg", description: "kilogramm" }
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(201);
            expect(body.created).toBeTruthy();
            done();
        });
    });

    it("patch unit", function (done) {
        request.patch({
            uri: setups.path("/api/catalogs/units/kg"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: { unit: "kilo" }
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body.unit).toBe("kilo");
            done();
        });
    });

    it("create tool", function (done) {
        request.post({
            uri: setups.path("/api/catalogs/tools"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: { name: "tool", unit: "kilo", rate: 10 }
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(201);
            expect(body.created).toBeTruthy();
            done();
        });
    });

    it("patch tool", function (done) {
        request.patch({
            uri: setups.path("/api/catalogs/tools/tool"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: { description: "description" }
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body.description).toBe("description");
            done();
        });
    });

    it("delete tool", function (done) {
        request.del({
            uri: setups.path("/api/catalogs/tools/tool"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(204);
            done();
        });
    });

    it("delete unit", function (done) {
        request.del({
            uri: setups.path("/api/catalogs/units/kilo"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(204);
            done();
        });
    });
});
