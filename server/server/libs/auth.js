/// <reference path="../idl/passport.d.ts" />
/// <reference path="../idl/nconf.d.ts" />
var config = require('./config');
var passport = require('passport');
var passportHttp = require('passport-http');
var passportOauth2ClientPassword = require('passport-oauth2-client-password');
var passportHttpBearer = require('passport-http-bearer');
var passportVkontakte = require('passport-vkontakte');
var db = require('./db');

var BasicStrategy = passportHttp.BasicStrategy;
var ClientPasswordStrategy = passportOauth2ClientPassword.Strategy;
var BearerStrategy = passportHttpBearer.Strategy;
var AuthVKStrategy = passportVkontakte.Strategy;

var clients = db.clients;
var accessTokens = db.accessTokens;
var users = db.users;

passport.use(new BasicStrategy(function (username, password, done) {
    clients.findByID(username, function (err, client) {
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

/*
passport.use(new AuthVKStrategy({
clientID: "",
clientSecret: "",
callbackURL: "your_domain" + "/auth/vk/callback"
},
function (accessToken, refreshToken, profile, done) {
console.log(profile);
return done(null, {
username: profile.displayName,
photoUrl: profile.photos[0].value,
profileUrl: profile.profileUrl
});
}
));
passport.serializeUser((user, done) => {
done(null, JSON.stringify(user));
});
passport.deserializeUser((data, done) => {
try {
done(null, JSON.parse(data));
} catch (e) {
done(e);
}
});
*/
passport.use(new ClientPasswordStrategy(function (clientId, clientSecret, done) {
    clients.findByID(clientId, function (err, client) {
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

        if (Math.round((Date.now() - token.created) / 1000) > config.get('security:tokenLife')) {
            accessTokens.removeByValue(accessToken, function (err) {
                if (err)
                    return done(err);
            });
            return done(null, false, { message: 'Token expired' });
        }

        users.findByID(token.id_employee, function (err, user) {
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
