/// <reference path="../../idl/mysql.d.ts" />
/// <reference path="../../idl/node.d.ts" />
/// <reference path="../../idl/db.d.ts" />

import mysql = require("mysql");
import crypto = require("crypto");
import db = require("db");
import type = require("../type");

import Model = require("./Model");

import IQueryCond = trucking.db.IQueryCond;

class CatalogModel<ENTRY_T> extends Model {
	findRow(cond: any, cb: (err: Error, entry: ENTRY_T) => void): void {
		this.connect.queryRow("SELECT * FROM " + this.table + " where ?", cond, cb);
	}

	find(cond: any, cb: (err: Error, entry: ENTRY_T[]) => void): void {
		this.connect.query("SELECT * FROM " + this.table + " where ?", cond, cb);
	}

	//get all rows
	get(cb: (err: Error, rows: ENTRY_T[]) => void, cond?: IQueryCond): void {
		this.connect.query("SELECT * FROM " + this.table + "" + Model.parseLimitCond(cond), cb);
	}

	patch(cond: Object, data: Object, cb: (err: Error, result: any) => void): void {
		this.connect.query("UPDATE " + this.table + " SET ? WHERE ?", [data, cond], (err, res) => {
			if (err) return cb(err, false);
			cb(null, { patched: res.affectedRows > 0});
		});
	}

	create(data: Object, cb: (err: Error, result: any) => void): void {
		this.connect.query("INSERT INTO " + this.table + " SET ?", [data], (err, res) => {
			if (err) return cb(err, false);
			cb(null, { created: res.affectedRows > 0});
		});
	}
}

export = CatalogModel; 
