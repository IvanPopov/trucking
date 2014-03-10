/// <reference path="../idl/request.d.ts" />
/// <reference path="../idl/jasmine.d.ts" />
/// <reference path="../idl/jasmine-matchers.d.ts" />
/// <reference path="../idl/spec.d.ts" />
/// <reference path="../idl/db.d.ts" />
var request = require("request");
var setups = require("./setups");
var auth = require("./auth");
var type = require("../libs/type");
require("jasmine-expect");

describe("naturalpersons api", function () {
    var grant = null;
    auth(function (e, res, body) {
        grant = body;
    });

    beforeEach(function () {
        return waitsFor(function () {
            return !!grant;
        });
    });

    it("get naturalpersons", function (done) {
        request.get({
            uri: setups.path("/api/naturalpersons"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body).toBeArray();
            done();
        });
    });

    it("get naturalpersons brigades", function (done) {
        request.get({
            uri: setups.path("/api/naturalpersons/brigades"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body).toBeArray();
            done();
        });
    });

    it("get naturalpersons (4) emails", function (done) {
        request.get({
            uri: setups.path("/api/naturalpersons/4/emails"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body).toBeArray();
            done();
        });
    });

    it("get naturalpersons (4) worktypes", function (done) {
        request.get({
            uri: setups.path("/api/naturalpersons/4/worktypes"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body).toBeArray();
            done();
        });
    });

    it("get naturalpersons (4) phones", function (done) {
        request.get({
            uri: setups.path("/api/naturalpersons/4/phones"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body).toBeArray();
            done();
        });
    });

    it("get naturalpersons (4)", function (done) {
        request.get({
            uri: setups.path("/api/naturalpersons/4"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(type.isString(body["name"])).toBeTruthy();
            done();
        });
    });

    it("create naturalpersons", function (done) {
        request.post({
            uri: setups.path("/api/naturalpersons"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: {
                name: "Петров Петр Петрович",
                pass_serial: 4000,
                pass_number: 600000,
                pass_issued: "Красногорским УВД, Красногорского района 0059",
                address: "Бульварное кольцо, 10, Москва, 10000",
                card_number: null,
                id_metro: "3",
                DOB: "21 July 1990",
                height: 180
            }
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(201);
            expect(body.created).toBeTruthy();
            done();
        });
    });

    it("change naturalpersons 4000-600000", function (done) {
        request.patch({
            uri: setups.path("/api/naturalpersons/4000-600000"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: {
                name: "Петров Петр Львович",
                card_number: 1000000000001
            }
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            done();
        });
    });

    it("delete naturalpersons", function (done) {
        request.del({
            uri: setups.path("/api/naturalpersons/4000-600000"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(204);
            done();
        });
    });
});
allowEmpty:
true;
