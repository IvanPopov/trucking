/// <reference path="../../idl/mysql.d.ts" />
/// <reference path="../../idl/node.d.ts" />
/// <reference path="../../idl/db.d.ts" />

import mysql = require("mysql");
import crypto = require("crypto");
import db = require("db");
import type = require("../type");

import Model = require("./Model");

import IToken = trucking.db.IToken;

class TokenModel extends Model {
	findByValue(value: string, cb: (err: Error, token: IToken) => void): void {
		this.connect.queryRow("SELECT * FROM " + this.table + " where value=" + mysql.escape(value), cb);
	}

	removeByEmployeeAndClient(id_employee: number, id_clientapp: string, cb: (err: Error) => void): void {
		this.connect.query("DELETE FROM " + this.table + " WHERE (id_employee = ?) AND (id_clientapp = ?)",
			[id_employee, id_clientapp], cb);
	}

	removeByValue(value: string, cb: (err: Error) => void): void {
		this.connect.query("DELETE FROM " + this.table + " WHERE (value = ?)", value, cb);
	}

	insert(token: IToken, cb: (err: Error, token: IToken) => void): void {
		this.connect.query("INSERT INTO " + this.table + " SET ?", token, (err: Error) => {
			cb(err, token);
		});
	}
}

export = TokenModel; 
