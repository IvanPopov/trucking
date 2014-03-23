/// <reference path="../../idl/mysql.d.ts" />
/// <reference path="../../idl/db.d.ts" />
import mysql = require("mysql");
import type = require("../type");
import config = require("../config");
import db = require("../db");

import IQueryCond = trucking.db.IQueryCond;


class Model {
	connection: db.IConnectionWrapper;

	get connect(): mysql.Connection {
		return this.connection.connect;
	}

	constructor(connection: db.IConnectionWrapper, public table: string) {
		this.connection = connection;

		if (config.get('env') == "development") {
			this.table = this.table.toLowerCase();
		}
	}

	static parseCond(cond?: IQueryCond): string {
		var limitString = "";
		var orderString = "";

		if (!type.isDefAndNotNull(cond)) {
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

		if (type.isDefAndNotNull(cond.page)) {
			from = Math.max((parseInt(<any>cond.page) || 1) - 1, 0) * count;
		}

		limitString = " LIMIT " + from + "," + count + " ";

		if (type.isDefAndNotNull(cond.sorting) && typeof cond === "object") {
			var field = Object.keys(cond.sorting)[0];

			if (type.isString(field)) {
				var orderType = "asc";
				if (cond.sorting[field].toLowerCase() === "desc") {
					orderType = "desc";
				}

				orderString = mysql.format(" ORDER BY ?? " + orderType.toUpperCase(), decodeURI(field));
			}
		}

		return orderString + limitString;
	}

	static parseFilter(cond?: IQueryCond, where?: Object): Object {
		if (type.isDefAndNotNull(cond.filter) && typeof cond === "object") {
			var field = Object.keys(cond.filter)[0];

			if (type.isString(field)) {
				where = where || {};
				where[mysql.format("??", field)] = "*" + decodeURI(cond.filter[field]) + "*";

				return where;
			}
		}

		return where || null;
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