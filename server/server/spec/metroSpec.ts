/// <reference path="../idl/request.d.ts" />
/// <reference path="../idl/jasmine.d.ts" />
/// <reference path="../idl/jasmine-matchers.d.ts" />
/// <reference path="../idl/spec.d.ts" />
/// <reference path="../idl/db.d.ts" />

import request = require("request");
import setups = require("./setups");
import auth = require("./auth");
require("jasmine-expect");

import db = trucking.db;

describe("metro api", () => {
	var grant: IOAuth2Grant = null;
	auth((e, res, body) => { grant = body; });

	beforeEach(() => waitsFor((): boolean => !!grant));

	it("get branches", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/metro/branches"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body: db.IMetroBranch[]) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body).toBeArray();
				done();
			});
	});

	it("get branche (1)", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/metro/branches/1"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body: db.IMetroBranch) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body.name).toBe("Сокольническая");
				done();
			});
	});

	it("get branche (Сокольническая)", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/metro/branches/Сокольническая"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body: db.IMetroBranch) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body.name).toBe("Сокольническая");
				done();
			});
	});

	it("change branche color (1)", (done: () => void) => {
		request.patch(
			{
				uri: setups.path("/api/metro/branches/1"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: {
					color: 0xFF0000
				}
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body.color).toBe(0xFF0000);
				done();
			});
	});

	it("delete branch (Сокольническая) / obtaining reference error", (done: () => void) => {
		request.del(
			{
				uri: setups.path("/api/metro/branches/1"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(500);
				expect(body.error).toBeDefined();
				done();
			});
	});

	it("get stations", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/metro/stations"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body: db.IMetro[]) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body).toBeArray();
				done();
			});
	});

	it("get station (Охотный ряд)", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/metro/stations/Охотный ряд"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body: db.IMetro) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body.station).toBe("Охотный ряд");
				done();
			});
	});

	it("change station branch (3 | Охотный ряд)", (done: () => void) => {
		request.patch(
			{
				uri: setups.path("/api/metro/stations/3"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: {
					id_metrobranch: 1
				}
			}, (e, res, body) => {
			
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body.id_metrobranch).toBe(1);
				done();
			});
	});

	it("delete station (Марьина роща)", (done: () => void) => {
		request.del(
			{
				uri: setups.path("/api/metro/stations/Марьина роща"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(204);
				done();
			});
	});

	it("create station (Марьина роща)", (done: () => void) => {
		request.post(
			{
				uri: setups.path("/api/metro/stations"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: {
					station: "Марьина роща",
					id_metrobranch: 1
				}
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(201);
				done();
			});
	});
});

