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

describe("catalogs api", () => {
	var grant: IOAuth2Grant = null;
	auth((e, res, body) => { grant = body; });

	beforeEach(() => waitsFor((): boolean => !!grant));

	it("get street list", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/streets"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body: db.IMetroBranch[]) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body).toBeArray();
				done();
			});
	});

	it("get street by sign (1)", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/streets?sign=1&from=0&count=1"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body: db.IMetroBranch[]) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body).toBeArray();
				done();
			});
	});

	it("get street by id (1)", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/streets/1"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body: db.IStreet) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body.id_street).toBe(1);
				done();
			});
	});
}); 

 