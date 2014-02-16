/// <reference path="../idl/request.d.ts" />
/// <reference path="../idl/jasmine.d.ts" />
/// <reference path="../idl/jasmine-matchers.d.ts" />
/// <reference path="../idl/spec.d.ts" />
/// <reference path="../idl/db.d.ts" />
var request = require("request");
var setups = require("./setups");
var auth = require("./auth");
require("jasmine-expect");

describe("metro api", function () {
    var grant = null;
    auth(function (e, res, body) {
        grant = body;
    });

    beforeEach(function () {
        return waitsFor(function () {
            return !!grant;
        });
    });

    it("get branches", function (done) {
        request.get({
            uri: setups.path("/api/metro/branches"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body).toBeArray();
            done();
        });
    });

    it("get branche (1)", function (done) {
        request.get({
            uri: setups.path("/api/metro/branches/1"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body.name).toBe("Сокольническая");
            done();
        });
    });

    it("get branche (Сокольническая)", function (done) {
        request.get({
            uri: setups.path("/api/metro/branches/Сокольническая"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body.name).toBe("Сокольническая");
            done();
        });
    });

    it("change branche color (1)", function (done) {
        request.patch({
            uri: setups.path("/api/metro/branches/1"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: {
                color: 0xFF0000
            }
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body.patched).toBeTruthy();
            done();
        });
    });

    it("delete branch (Сокольническая) / obtaining reference error", function (done) {
        request.del({
            uri: setups.path("/api/metro/branches/1"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(500);
            expect(body.error).toBeDefined();
            done();
        });
    });

    it("get stations", function (done) {
        request.get({
            uri: setups.path("/api/metro/stations"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body).toBeArray();
            done();
        });
    });

    it("get station (Охотный ряд)", function (done) {
        request.get({
            uri: setups.path("/api/metro/stations/Охотный ряд"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body.station).toBe("Охотный ряд");
            done();
        });
    });

    it("change station branch (3 | Охотный ряд)", function (done) {
        request.patch({
            uri: setups.path("/api/metro/stations/3"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: {
                id_metrobranch: 1
            }
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body.patched).toBeTruthy();
            done();
        });
    });

    it("delete station (Марьина роща)", function (done) {
        request.del({
            uri: setups.path("/api/metro/stations/Марьина роща"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body.deleted).toBeTruthy();
            done();
        });
    });

    it("create station (Марьина роща)", function (done) {
        request.post({
            uri: setups.path("/api/metro/stations"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: {
                station: "Марьина роща",
                id_metrobranch: 1
            }
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body.created).toBeTruthy();
            done();
        });
    });
});
