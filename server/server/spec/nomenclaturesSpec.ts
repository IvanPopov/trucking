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

describe("nomenclatures api", ()=> {
	var grant: IOAuth2Grant = null;
	auth((e, res, body)=> { grant = body; });

	beforeEach(()=> waitsFor((): boolean=> !!grant));

	it("read nomenclature groups", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/nomenclatures/groups"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body: db.IMetroBranch[]) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body).toBeArray();
				done();
			});
	});

	it("read nomenclatures", (done: ()=> void)=> {
		request.get(
		{
			uri: setups.path("/api/nomenclatures"),
			headers: { "Authorization": ("Bearer " + grant.access_token) },
			json: true
		}, (e, res, body: db.IMetroBranch[])=> {
			expect(e).toBeNull();
			expect(res.statusCode).toBe(200);
			expect(body).toBeArray();
			done();
		});
	});

	it("read nomenclatures by group (1)", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/nomenclatures?group=1"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body: db.IMetroBranch[]) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body).toBeArray();
				done();
			});
	});
});
