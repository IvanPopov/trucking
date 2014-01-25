/// <reference path="idl/express.d.ts" />
/// <reference path="idl/express-jwt.d.ts" />
/// <reference path="idl/jsonwebtoken.d.ts" />
/// <reference path="idl/winston.d.ts" />
/// <reference path="idl/passport.d.ts" />
var express = require('express');

var config = require('nconf');
var passport = require('passport');
var oauth2 = require('./libs/oauth2');

config.argv().env().file({ file: './config.json' });

var log = require('./libs/log')(module);
var app = express();
var secret = "[your private key]";

app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(passport.initialize());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(app.router);

require("./libs/auth");

app.use(function (err, req, res, next) {
    res.status(404);
    log.debug('Not found URL: %s', req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function (err, req, res, next) {
    //FIXME: avoid <any> type conversion
    res.status(err.status || 500);
    log.error('Internal error(%d): %s', res.statusCode, err.message);
    res.send({ error: err.message });
    return;
});

app.get('/api', passport.authenticate('bearer', { session: false }), function (req, res) {
    res.send('API is running');
});

//FIXME: avoid <any> converion
app.post('/oauth/token', oauth2.token);

app.get('/api/userInfo', passport.authenticate('bearer', { session: false }), function (req, res) {
    // req.authInfo is set using the `info` argument supplied by
    // `BearerStrategy`.  It is typically used to indicate scope of the token,
    // and used in access control checks.  For illustrative purposes, this
    // example simply returns the scope in the response.
    res.json({ user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope });
});

app.get('/ErrorExample', function (req, res, next) {
    next(new Error('Random error!'));
});

app.listen(config.get('port'));
log.info('Express started on port ' + config.get('port'));
//# sourceMappingURL=app.js.map
