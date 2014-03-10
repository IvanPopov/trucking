/// <reference path="../../idl/mysql.d.ts" />
/// <reference path="../../idl/node.d.ts" />
/// <reference path="../../idl/db.d.ts" />
/// <reference path="../../idl/excel-export.d.ts" />

import mysql = require("mysql");
import crypto = require("crypto");
import db = require("db");
import type = require("../type");
import nodeExcel = require("excel-export");

import Model = require("./Model");

import IQueryCond = trucking.db.IQueryCond;

/**
 * @apiDefineSuccessStructure Created
 * @apiSuccess {Boolean} created Is created.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "created": true
 *     } 
 */

/**
 * @apiDefineSuccessStructure Deleted
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 No Content
 */


/**
 * @apiDefineSuccessStructure Patched
 * @apiSuccess {Boolean} patched Is patched.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 */


class CatalogModel<ENTRY_T> extends Model {
	findRow(cond: any, cb: (err: Error, entry: ENTRY_T) => void): void {
		this.connect.queryRow("SELECT * FROM " + this.table + " where ?", cond, cb);
	}

	find(cond: any, cb: (err: Error, entry: ENTRY_T[]) => void, limit?: IQueryCond): void {
		this.connect.query("SELECT * FROM " + this.table + " where ?" + " " + Model.parseLimitCond(limit), cond, cb);
	}

	//get all rows
	get(cb: (err: Error, rows: ENTRY_T[]) => void, cond?: IQueryCond): void {
		this.connect.query("SELECT * FROM " + this.table + "" + Model.parseLimitCond(cond),
			(err: Error, rows: ENTRY_T[]) => {
				if (err) {
					return cb(err, null);
				}

				return cb(null, rows);
			});
	}

	convertToXlsx(rows: ENTRY_T[], cb: (e: Error, xlsx: NodeBuffer) => void): void {
		this.createExcelConfig((e: Error, conf: nodeExcel.IExcelConfig) => {
			if (e) { return cb(e, null); }

			//convert mysql rows to any[][] notation on nodeExcel::rows
			for (var i = 0; i < rows.length; ++i) {
				var row = [];

				for (var key in rows[i]) {
					row.push(rows[i][key]);
				}

				conf.rows.push(row);
			}

			var xlsx: NodeBuffer = nodeExcel.execute(conf);
			return cb(null, xlsx);
		});
	}

	patch(cond: Object, data: Object, cb: (err: Error, result: any) => void): void {
		if (!type.isDefAndNotNull(data)) {
			return cb(new Error("Data for patching not specified."), null);
		}

		console.log(mysql.format("UPDATE ?? SET ? WHERE " + CatalogModel.where(cond), [this.table, data]));

		this.connect.query("UPDATE ?? SET ? WHERE " + CatalogModel.where(cond), [this.table, data], (err, res) => {
			if (err) return cb(err, null);

			//avoid conflicts in condition dependent data.
			for (var i in data) {
				if (type.isDef(cond[i]))
					cond[i] = data[i];
			}

			this.findRow(cond, cb);
		});
	}

	create(data: Object, cb: (err: Error, result: any) => void): void {
		if (!type.isDefAndNotNull(data)) {
			cb(null, { created: false });
		}
		//console.log(mysql.format("INSERT INTO " + this.table + " SET ?", [data]));
		this.connect.query("INSERT INTO " + this.table + " SET ?", [data], (err, res) => {
			if (err) return cb(err, false);
			//console.log(res);
			return cb(null, { created: res.affectedRows > 0 });
		});
	}

	del(cond: Object, cb: (err: Error, result: any) => void): void {
		this.connect.query("DELETE FROM ?? WHERE " + CatalogModel.where(cond), [this.table], (err, res) => {
			//console.log(res);
			if (err) return cb(Model.parseError(err), false);
			cb(null, /*res.affectedRows > 0*/true);
		});
	}

	createExcelConfig(cb: (e: Error, conf: nodeExcel.IExcelConfig) => void): void {
		var conf: nodeExcel.IExcelConfig = { rows: [], cols: [] };

		this.connect.fields(this.table, (err, fields: IMap<mysql.Field>) => {
			if (err) { return cb(err, null); }

			for (var name in fields) {
				var field: mysql.Field = fields[name];
				var col: nodeExcel.IExcelColumn = {
					caption: field.Field,
					type: CatalogModel.mysqlTypeToJSType(field.Type)
				};

				if (col.type === null) {
					//could not determ type
					return cb(new Error("Could not determ column type for excel export."), null);
				}

				conf.cols.push(col);
			}

			cb(null, conf);
		});
	}

	static MYSQL_NUMBER_TYPES: string[] = [
		"TINYINT",
		"SMALLINT",
		"MEDIUMINT",
		"INT",
		"INTEGER",
		"BIGINT",
		"FLOAT",
		"DOUBLE",
		"DOUBLE PRECISION",
		"REAL",
		"DECIMAL",
		"NUMERIC"
	];

	static MYSQL_STRING_TYPES: string[] = [
		"CHAR", "VARCHAR", "TINYTEXT", "TEXT", "MEDIUMTEXT", "LONGTEXT"
	];

	static MYSQL_DATE_TYPES: string[] = [
		"DATE", "DATETIME", "TIMESTAMP", "TIME", "YEAR"
	];

	static mysqlTypeToJSType(type: string): string {
		type = type.toUpperCase();

		for (var i = 0; i < CatalogModel.MYSQL_NUMBER_TYPES.length; ++i) {
			if (type.indexOf(CatalogModel.MYSQL_NUMBER_TYPES[i]) != -1) {
				return "number";
			}
		}

		for (var i = 0; i < CatalogModel.MYSQL_STRING_TYPES.length; ++i) {
			if (type.indexOf(CatalogModel.MYSQL_STRING_TYPES[i]) != -1) {
				return "string";
			}
		}

		for (var i = 0; i < CatalogModel.MYSQL_DATE_TYPES.length; ++i) {
			if (type.indexOf(CatalogModel.MYSQL_DATE_TYPES[i]) != -1) {
				return "date";
			}
		}

		return null;
	}

	static where(cond: any): string {
		var where: string = "";
		for (var field in cond) {
			where += (where.length ? " AND " : "") + mysql.format("?? = ?", [field, cond[field]]);
		}

		where += " LIMIT 1";

		return where;
	}
}

export = CatalogModel; 
