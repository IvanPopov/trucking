/// <reference path="../idl/nconf.d.ts" />
import nconf = require("nconf");
nconf.argv().env().file({ file: './config.json' });

nconf.set('env', process.env.NODE_ENV || "development");

export = nconf;

