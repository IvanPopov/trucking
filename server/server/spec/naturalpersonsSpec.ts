/// <reference path="../idl/request.d.ts" />
/// <reference path="../idl/jasmine.d.ts" />
/// <reference path="../idl/jasmine-matchers.d.ts" />
/// <reference path="../idl/spec.d.ts" />
/// <reference path="../idl/db.d.ts" />

import request = require("request");
import setups = require("./setups");
import auth = require("./auth");
import type = require("../libs/type");
require("jasmine-expect");


describe("naturalpersons api", () => {
	var grant: IOAuth2Grant = null;
	auth((e, res, body) => { grant = body; });

	beforeEach(() => waitsFor((): boolean => !!grant));

	it("get naturalpersons", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/naturalpersons"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body).toBeArray();
				done();
			});
	});

	it("get naturalpersons brigades", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/naturalpersons/brigades"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body).toBeArray();
				done();
			});
	});

	it("get naturalpersons (4) emails", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/naturalpersons/4/emails"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body).toBeArray();
				done();
			});
	});

	it("get naturalpersons (4) worktypes", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/naturalpersons/4/worktypes"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body).toBeArray();
				done();
			});
	});

	it("get naturalpersons (4) phones", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/naturalpersons/4/phones"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body).toBeArray();
				done();
			});
	});

	it("get naturalperson (4)", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/naturalpersons/4"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(type.isString(body["name"])).toBeTruthy();
				done();
			});
	});

	it("get naturalperson status (4)", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/naturalpersons/4/status"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body.status).toBeDefined();
				done();
			});
	});

	it("create naturalpersons", (done: () => void) => {
		request.post(
			{
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
					id_leading_type_of_work: null
				}
			}, (e, res, body) => {
				//console.log(body);
				expect(e).toBeNull();
				expect(res.statusCode).toBe(201);
				expect(body.height).toBe(180);
				done();
			});
	});

	it("change naturalpersons 4000-600000", (done: () => void) => {
		request.patch(
			{
				uri: setups.path("/api/naturalpersons/4000-600000"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: {
					name: "Петров Петр Львович",
					card_number: 1000000000001,
					id_brigade: null
				}
			}, (e, res, body) => {
				//console.log(body);
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				done();
			});
	});

	it("add naturalperson email", (done: () => void) => {
		request.post(
			{
				uri: setups.path("/api/naturalpersons/4/emails"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: {
					email: "some@example.org"
				}
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(201);
				done();
			});
	});

	it("del naturalperson email", (done: () => void) => {
		request.del(
			{
				uri: setups.path("/api/naturalpersons/4/emails/some@example.org"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(204);
				done();
			});
	});

	it("add naturalperson phone", (done: () => void) => {
		request.post(
			{
				uri: setups.path("/api/naturalpersons/4/phones"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: {
					phone: "+7 (917) 516-6641"
				}
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(201);
				done();
			});
	});

	it("del naturalperson phones", (done: () => void) => {
		request.del(
			{
				uri: setups.path("/api/naturalpersons/4/phones/+7 (917) 516-6641"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(204);
				done();
			});
	});

	it("add naturalperson worktype", (done: () => void) => {
		request.post(
			{
				uri: setups.path("/api/naturalpersons/4/worktypes"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: {
					id_worktype: 2
				}
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(201);
				done();
			});
	});

	it("change naturalperson worktype", (done: () => void) => {
		var rate = Math.floor(Math.random() * 500);
		request.patch(
			{
				uri: setups.path("/api/naturalpersons/4/worktypes/2"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: {
					personal_rate: rate
				}
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body.personal_rate).toBe(rate);
				done();
			});
	});

	it("del naturalperson worktype", (done: () => void) => {
		request.del(
			{
				uri: setups.path("/api/naturalpersons/4/worktypes/2"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(204);
				done();
			});
	});

	it("add naturalperson tool", (done: () => void) => {
		request.post(
			{
				uri: setups.path("/api/naturalpersons/4/tools"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: {
					id_tool: 9
				}
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(201);
				done();
			});
	});

	it("change naturalperson tool", (done: () => void) => {
		var rate = Math.floor(Math.random() * 500);
		request.patch(
			{
				uri: setups.path("/api/naturalpersons/4/tools/9"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: {
					personal_rate: rate
				}
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body.personal_rate).toBe(rate);
				done();
			});
	});

	it("del naturalperson tool", (done: () => void) => {
		request.del(
			{
				uri: setups.path("/api/naturalpersons/4/tools/9"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(204);
				done();
			});
	});




	it("delete naturalpersons", (done: () => void) => {
		request.del(
			{
				uri: setups.path("/api/naturalpersons/4000-600000"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(204);
				done();
			});
	});

});
allowEmpty: true
