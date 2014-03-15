/// <reference path="../idl/request.d.ts" />
/// <reference path="../idl/jasmine.d.ts" />
/// <reference path="../idl/jasmine-matchers.d.ts" />
/// <reference path="../idl/spec.d.ts" />
/// <reference path="../idl/db.d.ts" />

import request = require("request");
import setups = require("./setups");
import auth = require("./auth");
import fs = require("fs");

require("jasmine-expect");


describe("catalogs api", () => {
	var grant: IOAuth2Grant = null;
	auth((e, res, body) => { grant = body; });

	beforeEach(() => waitsFor((): boolean => !!grant));

	it("get catalogs list", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/catalogs"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body: Array<any>) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body).toBeArray();
				done();
			});
	});

	it("read catalog (streets)", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/catalogs/streets"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body: trucking.db.IStreet[]) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body).toBeArray();
				done();
			});
	});

	it("export catalog into XLSX (streets)", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/catalogs/streets?format=xlsx"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				done();
			});
	});

	it("create unit", (done: () => void) => {
		request.post(
			{
				uri: setups.path("/api/catalogs/units"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: { unit: "kg", description: "kilogramm" }
			}, (e, res, body: any) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(201);
				done();
			});
	});

	it("patch unit", (done: () => void) => {
		request.patch(
			{
				uri: setups.path("/api/catalogs/units/kg"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: { unit: "kilo" }
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body.unit).toBe("kilo");
				done();
			});
	});

	it("get tool groups", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/catalogs/tools/groups"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body: any) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				done();
			});
	});

	it("get tool", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/catalogs/tools/9"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body: any) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body.id_tool).toBe(9);
				done();
			});
	});

	it("create tool group", (done: () => void) => {
		request.post(
			{
				uri: setups.path("/api/catalogs/tools/groups"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: {name: "test group"}
			}, (e, res, body: any) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(201);
				done();
			});
	});

	it("create tool", (done: () => void) => {
		request.post(
			{
				uri: setups.path("/api/catalogs/tools"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: { name: "tool", unit: "kilo", rate: 10 }
			}, (e, res, body: any) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(201);
				done();
			});
	});

	it("patch tool", (done: () => void) => {
		request.patch(
			{
				uri: setups.path("/api/catalogs/tools/tool"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: { description: "description", id_toolgroup: null }
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body.description).toBe("description");
				done();
			});
	});


	it("delete tool", (done: () => void) => {
		request.del(
			{
				uri: setups.path("/api/catalogs/tools/tool"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(204);
				done();
			});
	});

	it("delete tool group", (done: () => void) => {
		request.del(
			{
				uri: setups.path("/api/catalogs/tools/groups/test group"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body: any) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(204);
				done();
			});
	});

	it("delete unit", (done: () => void) => {
		request.del(
			{
				uri: setups.path("/api/catalogs/units/kilo"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(204);
				done();
			});
	});
});

