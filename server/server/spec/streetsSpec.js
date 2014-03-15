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

    it("get street list", function (done) {
        request.get({
            uri: setups.path("/api/streets"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body).toBeArray();
            done();
        });
    });

    it("get street by sign (1)", function (done) {
        request.get({
            uri: setups.path("/api/streets?sign=1&from=0&count=1"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body).toBeArray();
            done();
        });
    });

    it("get street by id (1)", function (done) {
        request.get({
            uri: setups.path("/api/streets/1"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body.id_street).toBe(1);
            done();
        });
    });

    it("change street by id (1)", function (done) {
        request.patch({
            uri: setups.path("/api/streets/1"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: { comment: "about street...." }
        }, function (e, res) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            done();
        });
    });

    it("change street by name (1)", function (done) {
        request.patch({
            uri: setups.path("/api/streets/1"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: { comment: null }
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body.comment).toBe(null);
            done();
        });
    });

    it("create street", function (done) {
        request.post({
            uri: setups.path("/api/streets"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: { name: "Комсомольская", comment: null }
        }, function (e, res) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(201);
            done();
        });
    });

    it("delete street", function (done) {
        request.del({
            uri: setups.path("/api/streets/Комсомольская"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(204);
            done();
        });
    });
});
