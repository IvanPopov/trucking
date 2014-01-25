/// <reference path="../idl/passport.d.ts" />
/// <reference path="../idl/oauth2orize.d.ts" />
/// <reference path="../idl/nconf.d.ts" />
var oauth2orize = require('oauth2orize');
var passport = require('passport');
var crypto = require('crypto');
var config = require('nconf');
var db = require('./db');

var users = db.users;
var accessTokens = db.accessTokens;
var refreshTokens = db.refreshTokens;
var Token = db.Token;

config.argv().env().file({ file: './config.json' });

// create OAuth 2.0 server
var server = oauth2orize.createServer();

// Exchange username & password for access token.
server.exchange(oauth2orize.exchange.password(function (client, username, password, scope, done) {
    users.findByName(username, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        if (!user.checkPassword(password)) {
            return done(null, false);
        }

        refreshTokens.remove(user.id, client.clientId, function (err) {
            if (err)
                return done(err);
        });
        accessTokens.remove(user.id, client.clientId, function (err) {
            if (err)
                return done(err);
        });

        var tokenValue = crypto.randomBytes(32).toString('base64');
        var refreshTokenValue = crypto.randomBytes(32).toString('base64');
        var token = new Token(tokenValue, client.clientId, user.id);
        var refreshToken = new Token(refreshTokenValue, client.clientId, user.id);

        refreshTokens.save(refreshToken, function (err) {
            if (err) {
                return done(err);
            }
        });
        var info = { scope: '*' };
        accessTokens.save(token, function (err) {
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

        users.findById(token.userId, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }

            refreshTokens.remove(user.id, client.clientId, function (err) {
                if (err)
                    return done(err);
            });
            accessTokens.remove(user.id, client.clientId, function (err) {
                if (err)
                    return done(err);
            });

            var tokenValue = crypto.randomBytes(32).toString('base64');
            var refreshTokenValue = crypto.randomBytes(32).toString('base64');
            var token = new Token(tokenValue, client.clientId, user.id);
            var refreshToken = new Token(refreshTokenValue, client.clientId, user.id);
            refreshTokens.save(refreshToken, function (err) {
                if (err) {
                    return done(err);
                }
            });
            var info = { scope: '*' };
            accessTokens.save(token, function (err) {
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
