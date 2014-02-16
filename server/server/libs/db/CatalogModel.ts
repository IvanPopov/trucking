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

class CatalogModel<ENTRY_T> extends Model {
	findRow(cond: any, cb: (err: Error, entry: ENTRY_T) => void): void {
		this.connect.queryRow("SELECT * FROM " + this.table + " where ?", cond, cb);
	}

	find(cond: any, cb: (err: Error, entry: ENTRY_T[]) => void): void {
		this.connect.query("SELECT * FROM " + this.table + " where ?", cond, cb);
	}

	//get all rows
	get(cb: (err: Error, rows: ENTRY_T[]) => void, cond?: IQueryCond): void {
		this.connect.query("SELECT * FROM " + this.table + "" + Model.parseLimitCond(cond),
			(err: Error, rows: ENTRY_T[]): void => {
				if (err) {
					return cb(err, null);
				}

				cb(null, rows);
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
			cb(null, xlsx);
		});
	}

	patch(cond: Object, data: Object, cb: (err: Error, result: any) => void): void {
		this.connect.query("UPDATE " + this.table + " SET ? WHERE ?", [data, cond], (err, res) => {
			if (err) return cb(err, false);
			cb(null, { patched: res.affectedRows > 0 });
		});
	}

	create(data: Object, cb: (err: Error, result: any) => void): void {
		this.connect.query("INSERT INTO " + this.table + " SET ?", [data], (err, res) => {
			if (err) return cb(err, false);
			cb(null, { created: res.affectedRows > 0 });
		});
	}

	del(cond: Object, cb: (err: Error, result: any) => void): void {
		this.connect.query("DELETE FROM " + this.table + " WHERE ?", cond, (err, res) => {
			if (err) return cb(Model.parseError(err), false);
			cb(null, { deleted: res.affectedRows > 0 });
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
}

export = CatalogModel; 
