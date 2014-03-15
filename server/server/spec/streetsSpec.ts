/// <reference path="../idl/request.d.ts" />
/// <reference path="../idl/jasmine.d.ts" />
/// <reference path="../idl/jasmine-matchers.d.ts" />
/// <reference path="../idl/spec.d.ts" />
/// <reference path="../idl/db.d.ts" />

import request = require("request");
import setups = require("./setups");
import auth = require("./auth");
require("jasmine-expect");


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
			}, (e, res, body: trucking.db.IMetroBranch[]) => {
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
			}, (e, res, body: trucking.db.IMetroBranch[]) => {
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
			}, (e, res, body: trucking.db.IStreet) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body.id_street).toBe(1);
				done();
			});
	});

	it("change street by id (1)", (done: () => void) => {
		request.patch(
			{
				uri: setups.path("/api/streets/1"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: {comment: "about street...."}
			}, (e, res) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				done();
			});
	});

	it("change street by name (1)", (done: () => void) => {
		request.patch(
			{
				uri: setups.path("/api/streets/1"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: { comment: null }
			}, (e, res, body) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(200);
				expect(body.comment).toBe(null);
				done();
			});
	});

	it("create street", (done: () => void) => {
		request.post(
			{
				uri: setups.path("/api/streets"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: { name: "Комсомольская", comment: null }
			}, (e, res) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(201);
				done();
			});
	});



	it("delete street", (done: () => void) => {
		request.del(
			{
				uri: setups.path("/api/streets/Комсомольская"),
				headers: { "Authorization": ("Bearer " + grant.access_token) },
				json: true
			}, (e, res) => {
				expect(e).toBeNull();
				expect(res.statusCode).toBe(204);
				done();
			});
	});

}); 

 