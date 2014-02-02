/// <reference path="../idl/passport.d.ts" />
/// <reference path="../idl/oauth2orize.d.ts" />
/// <reference path="../idl/nconf.d.ts" />
/// <reference path="../idl/db.d.ts" />
var oauth2orize = require('oauth2orize');
var passport = require('passport');
var crypto = require('crypto');
var config = require('./config');
var db = require('./db');

var EmployeeModel = require("./db/EmployeeModel");

var users = db.users;
var accessTokens = db.accessTokens;
var refreshTokens = db.refreshTokens;

// create OAuth 2.0 server
var server = oauth2orize.createServer();

// Exchange username & password for access token.
server.exchange(oauth2orize.exchange.password(function (client, email, password, scope, done) {
    users.findByEmail(email, function (err, employee) {
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
            if (err)
                return done(err);
        });
        accessTokens.removeByEmployeeAndClient(employee.id_employee, client.id_client, function (err) {
            if (err)
                return done(err);
        });

        var tokenValue = crypto.randomBytes(32).toString('base64');
        var refreshTokenValue = crypto.randomBytes(32).toString('base64');

        var token = {
            id_employee: employee.id_employee,
            id_clientapp: client.id_client,
            value: tokenValue
        };

        var refreshToken = {
            id_employee: employee.id_employee,
            id_clientapp: client.id_client,
            value: refreshTokenValue
        };

        refreshTokens.insert(refreshToken, function (err) {
            if (err) {
                return done(err);
            }
        });

        var info = { scope: '*' };

        accessTokens.insert(token, function (err) {
            if (err) {
                return done(err);
            }

            done(null, tokenValue, refreshTokenValue, { 'expires_in': config.get('security:tokenLife') });
        });
    });
}));

// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken(function (client, refreshToken, scope, done) {
    refreshTokens.findByValue(refreshToken, function (err, token) {
        if (err) {
            return done(err);
        }
        if (!token) {
            return done(null, false);
        }
        if (!token) {
            return done(null, false);
        }

        users.findByID(token.id_employee, function (err, employee) {
            if (err) {
                return done(err);
            }
            if (!employee) {
                return done(null, false);
            }
            refreshTokens.removeByEmployeeAndClient(employee.id_employee, client.id_client, function (err) {
                if (err)
                    return done(err);
            });
            accessTokens.removeByEmployeeAndClient(employee.id_employee, client.id_client, function (err) {
                if (err)
                    return done(err);
            });

            var tokenValue = crypto.randomBytes(32).toString('base64');
            var refreshTokenValue = crypto.randomBytes(32).toString('base64');
            var token = {
                id_employee: employee.id_employee,
                id_clientapp: client.id_client,
                value: tokenValue
            };

            var refreshToken = {
                id_employee: employee.id_employee,
                id_clientapp: client.id_client,
                value: refreshTokenValue
            };

            refreshTokens.insert(refreshToken, function (err, token) {
                if (err) {
                    return done(err);
                }
            });

            var info = { scope: '*' };

            accessTokens.insert(token, function (err, token) {
                if (err) {
                    return done(err);
                }
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
//# sourceMappingURL=oauth2.js.map
