/// <reference path="../idl/request.d.ts" />
/// <reference path="../idl/jasmine.d.ts" />
/// <reference path="../idl/jasmine-matchers.d.ts" />
/// <reference path="../idl/spec.d.ts" />
/// <reference path="../idl/db.d.ts" />
var request = require("request");
var setups = require("./setups");
var auth = require("./auth");

require("jasmine-expect");

describe("worktypes api", function () {
    var grant = null;
    auth(function (e, res, body) {
        grant = body;
    });

    beforeEach(function () {
        return waitsFor(function () {
            return !!grant;
        });
    });

    it("create worktype group", function (done) {
        request.post({
            uri: setups.path("/api/catalogs/worktypes/groups"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: { name: "test group" }
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body.created).toBeTruthy();
            done();
        });
    });

    it("delete worktype group", function (done) {
        request.del({
            uri: setups.path("/api/catalogs/worktypes/groups/test group"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body.deleted).toBeTruthy();
            done();
        });
    });

    it("read worktype groups", function (done) {
        request.get({
            uri: setups.path("/api/catalogs/worktypes/groups"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body).toBeArray();
            done();
        });
    });

    it("read worktypes", function (done) {
        request.get({
            uri: setups.path("/api/catalogs/worktypes"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body).toBeArray();
            done();
        });
    });

    it("read worktypes by group (1)", function (done) {
        request.get({
            uri: setups.path("/api/catalogs/worktypes?group=1"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body).toBeArray();
            done();
        });
    });
});
