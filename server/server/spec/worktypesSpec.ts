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

describe("worktypes api", ()=> {
	var grant: IOAuth2Grant = null;
	auth((e, res, body)=> { grant = body; });

	beforeEach(()=> waitsFor((): boolean=> !!grant));


	it("create worktype group", (done: () => void) => {
		request.post(
			{
				uri: setups.path("/api/catalogs/worktypes/groups"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: {name: "test group"}
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(201);
				expect(body.created).toBeTruthy();
				done();
			});
	});

	it("delete worktype group", (done: () => void) => {
		request.del(
			{
				uri: setups.path("/api/catalogs/worktypes/groups/test group"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res) => {
			console.log(res.statusCode);
				expect(e).toBeNull();
				expect(res.statusCode).toBe(204);
				done();
			});
	});

	it("read worktype groups", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/catalogs/worktypes/groups"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res, body: db.IMetroBranch[]) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body).toBeArray();
				done();
			});
	});

	it("read worktypes", (done: ()=> void)=> {
		request.get(
		{
			uri: setups.path("/api/catalogs/worktypes"),
			headers: { "Authorization": ("Bearer " + grant.access_token) },
			json: true
		}, (e, res, body: db.IMetroBranch[])=> {
			expect(e).toBeNull();
			expect(res.statusCode).toBe(200);
			expect(body).toBeArray();
			done();
		});
	});

	it("read worktypes by group (1)", (done: () => void) => {
		request.get(
			{
				uri: setups.path("/api/catalogs/worktypes?group=1"),
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
