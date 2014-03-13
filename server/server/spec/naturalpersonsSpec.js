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
                id_metro: 3,
                DOB: "21 July 1990",
                height: 180,
                id_leading_type_of_work: 1
            }
        }, function (e, res, body) {
            //console.log(body);
            expect(e).toBeNull();
            expect(res.statusCode).toBe(201);
            expect(body.height).toBe(180);
            done();
        });
    });

    it("change naturalpersons 4000-600000", function (done) {
        request.patch({
            uri: setups.path("/api/naturalpersons/4000-600000"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: {
                name: "Петров Петр Львович",
                card_number: 1000000000001,
                id_brigade: null
            }
        }, function (e, res, body) {
            //console.log(body);
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            done();
        });
    });

    it("add naturalperson email", function (done) {
        request.post({
            uri: setups.path("/api/naturalpersons/4/emails"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: {
                email: "some@example.org"
            }
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(201);
            done();
        });
    });

    it("del naturalperson email", function (done) {
        request.del({
            uri: setups.path("/api/naturalpersons/4/emails/some@example.org"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(204);
            done();
        });
    });

    it("add naturalperson phone", function (done) {
        request.post({
            uri: setups.path("/api/naturalpersons/4/phones"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: {
                phone: "+7 (917) 516-6641"
            }
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(201);
            done();
        });
    });

    it("del naturalperson phones", function (done) {
        request.del({
            uri: setups.path("/api/naturalpersons/4/phones/+7 (917) 516-6641"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(204);
            done();
        });
    });

    it("add naturalperson worktype", function (done) {
        request.post({
            uri: setups.path("/api/naturalpersons/4/worktypes"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: {
                id_worktype: 2
            }
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(201);
            done();
        });
    });

    it("change naturalperson worktype", function (done) {
        var rate = Math.floor(Math.random() * 500);
        request.patch({
            uri: setups.path("/api/naturalpersons/4/worktypes/2"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: {
                rate: rate
            }
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body.rate).toBe(rate);
            done();
        });
    });

    it("del naturalperson worktype", function (done) {
        request.del({
            uri: setups.path("/api/naturalpersons/4/worktypes/2"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(204);
            done();
        });
    });

    it("add naturalperson tool", function (done) {
        request.post({
            uri: setups.path("/api/naturalpersons/4/tools"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: {
                id_tool: 9
            }
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(201);
            done();
        });
    });

    it("change naturalperson tool", function (done) {
        var rate = Math.floor(Math.random() * 500);
        request.patch({
            uri: setups.path("/api/naturalpersons/4/tools/9"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: {
                rate: rate
            }
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(body.rate).toBe(rate);
            done();
        });
    });

    it("del naturalperson tool", function (done) {
        request.del({
            uri: setups.path("/api/naturalpersons/4/tools/9"),
            headers: { "Authorization": ("Bearer " + grant.access_token) },
            json: true
        }, function (e, res, body) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(204);
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
