/// <reference path="../idl/passport.d.ts" />
/// <reference path="../idl/nconf.d.ts" />
var config = require('nconf');
var passport = require('passport');
var passportHttp = require('passport-http');
var passportOauth2ClientPassword = require('passport-oauth2-client-password');
var passportHttpBearer = require('passport-http-bearer');
var db = require('./db');

var BasicStrategy = passportHttp.BasicStrategy;
var ClientPasswordStrategy = passportOauth2ClientPassword.Strategy;
var BearerStrategy = passportHttpBearer.Strategy;

var clients = db.clients;
var accessTokens = db.accessTokens;
var users = db.users;

config.argv().env().file({ file: './config.json' });

passport.use(new BasicStrategy(function (username, password, done) {
    console.log("BasicStrategy", username, password);
    clients.findById(username, function (err, client) {
        if (err) {
            return done(err);
        }
        if (!client) {
            return done(null, false);
        }
        if (client.secret != password) {
            return done(null, false);
        }

        return done(null, client);
    });
}));

passport.use(new ClientPasswordStrategy(function (clientId, clientSecret, done) {
    console.log("ClientPasswordStrategy", clientId, clientSecret);
    clients.findById(clientId, function (err, client) {
        if (err) {
            return done(err);
        }
        if (!client) {
            return done(null, false);
        }
        if (client.secret != clientSecret) {
            return done(null, false);
        }

        return done(null, client);
    });
}));

passport.use(new BearerStrategy(function (accessToken, done) {
    accessTokens.findByValue(accessToken, function (err, token) {
        if (err) {
            return done(err);
        }
        if (!token) {
            return done(null, false);
        }

        if (Math.round((Date.now() - token.created.getTime()) / 1000) > config.get('security:tokenLife')) {
            accessTokens.removeByValue(accessToken, function (err) {
                if (err)
                    return done(err);
            });
            return done(null, false, { message: 'Token expired' });
        }

        users.findById(token.userId, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Unknown user' });
            }

            var info = { scope: '*' };
            done(null, user, info);
        });
    });
}));
//# sourceMappingURL=auth.js.map
