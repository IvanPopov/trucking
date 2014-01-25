/// <reference path="../idl/winston.d.ts" />

import winston = require('winston');

function getLogger(module): winston.Logger {
	var path: string = module.filename.split('/').slice(-2).join('/');

	return new winston.Logger({
		transports: [
			new winston.transports.Console({
				colorize: true,
				level: 'debug',
				label: path
			})
		]
	});
}

module.exports = getLogger;