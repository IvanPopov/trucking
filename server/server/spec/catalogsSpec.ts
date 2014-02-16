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

import db = trucking.db;

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
			}, (e, res, body: db.IMetroBranch[]) => {
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
			}, (e, res, body: db.IMetroBranch[]) => {
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
			}, (e, res, body: db.IMetroBranch[]) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				done();
			});
	});
}); 

