/// <reference path="../idl/nconf.d.ts" />
var nconf = require("nconf");
nconf.argv().env().file({ file: './config.json' });

nconf.set('env', process.env.NODE_ENV || "development");

module.exports = nconf;
