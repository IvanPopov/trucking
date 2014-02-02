/// <reference path="../idl/passport.d.ts" />
/// <reference path="../idl/oauth2orize.d.ts" />
/// <reference path="../idl/nconf.d.ts" />
/// <reference path="../idl/db.d.ts" />

import oauth2orize = require('oauth2orize');
import passport = require('passport');
import crypto = require('crypto');
import config = require('./config');
import db = require('./db');

import EmployeeModel = require("./db/EmployeeModel");

import IEmployee = trucking.db.IEmployee;
import IToken = trucking.db.IToken;
import IClientApp = trucking.db.IClientApp;

var users = db.users;
var accessTokens = db.accessTokens;
var refreshTokens = db.refreshTokens;


// create OAuth 2.0 server
var server = oauth2orize.createServer();


// Exchange username & password for access token.

server.exchange(oauth2orize.exchange.password((client: IClientApp, email: string, password: string, scope, done): void => {
	users.findByEmail(email, (err: Error, employee: IEmployee): void => {
		if (err) {
			return done(err);
		}

		if (!employee) {
			return done(null, false);
		}

		if (!EmployeeModel.checkPassword(password, employee)) {
			return done(null, false);
		}

		refreshTokens.removeByEmployeeAndClient(employee.id_employee, client.id_client, function (err) {
			if (err) return done(err);
		});
		accessTokens.removeByEmployeeAndClient(employee.id_employee, client.id_client, function (err) {
			if (err) return done(err);
		});

		var tokenValue = crypto.randomBytes(32).toString('base64');
		var refreshTokenValue = crypto.randomBytes(32).toString('base64');

		var token: IToken = {
			id_employee: employee.id_employee,
			id_clientapp: client.id_client,
			value: tokenValue
		};

		var refreshToken: IToken = {
			id_employee: employee.id_employee,
			id_clientapp: client.id_client,
			value: refreshTokenValue
		};

		refreshTokens.insert(refreshToken, (err) => {
			if (err) {
				return done(err);
			}
		});

		var info = { scope: '*' }

		accessTokens.insert(token, (err) => {
			if (err) {
				return done(err);
			}

			done(null, tokenValue, refreshTokenValue, { 'expires_in': config.get('security:tokenLife') });
		});
	});
}));

// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken((client: IClientApp, refreshToken: string, scope, done): void => {
	refreshTokens.findByValue(refreshToken, (err: Error, token: IToken): void => {

		if (err) { return done(err); }
		if (!token) { return done(null, false); }
		if (!token) { return done(null, false); }

		users.findByID(token.id_employee, function (err, employee) {
			if (err) { return done(err); }
			if (!employee) { return done(null, false); }
			refreshTokens.removeByEmployeeAndClient(employee.id_employee, client.id_client, (err: Error): void => {
				if (err) return done(err);
			});
			accessTokens.removeByEmployeeAndClient(employee.id_employee, client.id_client, (err: Error): void => {
				if (err) return done(err);
			});

			var tokenValue = crypto.randomBytes(32).toString('base64');
			var refreshTokenValue = crypto.randomBytes(32).toString('base64');
			var token: IToken = {
				id_employee: employee.id_employee,
				id_clientapp: client.id_client,
				value: tokenValue
			};

			var refreshToken: IToken = {
				id_employee: employee.id_employee,
				id_clientapp: client.id_client,
				value: refreshTokenValue
			};

			refreshTokens.insert(refreshToken, (err: Error, token: IToken): void => {
				if (err) { return done(err); }
			});

			var info = { scope: '*' };

			accessTokens.insert(token, function (err: Error, token: IToken) {
				if (err) { return done(err); }
				done(null, tokenValue, refreshTokenValue, { 'expires_in': config.get('security:tokenLife') });
			});
		});
	});
}));

// token endpoint
//
// `token` middleware handles client requests to exchange authorization grants
// for access tokens.  Based on the grant type being exchanged, the above
// exchange middleware will be invoked to handle the request.  Clients must
// authenticate when making requests to this endpoint.

module.exports.token = [
	passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
	server.token(),
	server.errorHandler()
];
