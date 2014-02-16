/// <reference path="../../idl/mysql.d.ts" />
/// <reference path="../../idl/db.d.ts" />
import mysql = require("mysql");
import type = require("../type");
import config = require("../config");

import IQueryCond = trucking.db.IQueryCond;


class Model {
	constructor(public connect: mysql.Connection, public table: string) {
		if (config.get('env') == "development") {
			this.table = this.table.toLowerCase();
		}
	}

	static parseLimitCond(cond?: IQueryCond): string {
		if (!type.isDef(cond)) {
			return "";
		}

		var from: number = 0;
		var count: number = 0xffffffff;

		if (type.isDefAndNotNull(cond.from)) {
			from = parseInt(<any>cond.from) || 0;
		}

		if (type.isDefAndNotNull(cond.count)) {
			count = parseInt(<any>cond.count) || 0;
		}

		return " LIMIT " + from + "," + count + " ";
	}

	static parseError(e: MysqlError): Error {
		//var parsedError: Error = new Error();
		//switch (e.code) {
		//	case "ER_ROW_IS_REFERENCED_":
		//		e.message = "";
		//}
		return e;
	}
}

export = Model;