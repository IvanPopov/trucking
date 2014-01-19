/// <reference path="idl/express.d.ts" />
/// <reference path="idl/express-jwt.d.ts" />
/// <reference path="idl/jsonwebtoken.d.ts" />

import express = require('express');
import expressJwt = require('express-jwt');
import jwt = require('jsonwebtoken');

var app = express();
var secret = "[your private key]";

// We are going to protect /api routes with JWT
app.use('/api', expressJwt({ secret: secret }));

app.use(express.json());
app.use(express.urlencoded());

//User validation
var auth = express.basicAuth((user: string, passwd: string): boolean => {
	return (user == "admin" && passwd == "admin");
});

//Password protected area
app.get('/authenticate', auth, (req: express.Request, res: express.Response): void => {

	var profile = {
		email: 'admin@example.com',
		id: 1
	};

	// We are sending the profile inside the token
	var token = jwt.sign(profile, secret, { expiresInMinutes: 60 * 5 });

	res.json({ token: token });
});


app.get('/api/restricted', function (req, res) {
	console.log('user ' + req.user.email + ' is calling /api/restricted');
	res.json(req.user);
});

app.listen(3000);
console.log('Express started on port 3000');