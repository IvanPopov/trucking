/// <reference path="../idl/request.d.ts" />
/// <reference path="../idl/jasmine.d.ts" />
var request = require("request");
var setups = require("./setups");
var auth = require("./auth");

describe("OAuth2", function () {
    it("Authorization request", function (done) {
        auth(function (e, res, grant) {
            expect(e).toBeNull();
            expect(res.statusCode).toBe(200);

            //grant params
            expect(grant.access_token).toBeDefined();
            expect(grant.refresh_token).toBeDefined();
            expect(grant.expires_in).toMatch(/\d+/);
            expect(grant.token_type).toBe("bearer");

            done();
        });
    }, 250);
});

describe("OAuth2", function () {
    it("Refresh token request", function (done) {
        auth(function (e, res, grant) {
            request.post({
                uri: setups.path("/oauth/token"),
                method: "POST",
                json: {
                    "grant_type": "refresh_token",
                    "client_id": setups.CLIENT_ID,
                    "client_secret": setups.CLIENT_SECRET,
                    "refresh_token": grant.refresh_token
                }
            }, function (e, res, body) {
                expect(e).toBeNull();
                expect(res.statusCode).toBe(200);
                done();
            });
        });
    }, 500);
});
