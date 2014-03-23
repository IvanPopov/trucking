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
import IQueryResultList = trucking.db.IQueryResultList;
/**
 * @apiDefineSuccessStructure Created
 * @apiSuccess {Boolean} created Is created.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
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
	private pkName: string = null; //primary key Name
	private pk: mysql.PrimaryKeyInfo = null;

	constructor(connect: db.IConnectionWrapper, table: string) {
		super(connect, table);

		var model = this;
		this.connection.on('connect', () => {
			this.connect.primary(this.table, ((e: Error, primary: mysql.PrimaryKeyInfo) => {
				if (e) {
					throw e;
				}

				if (primary) {
					this.pk = primary;
					this.pkName = primary['Column_name'];
				}
			}).bind(model));
		});
	}

	findRow(cond: any, cb: (err: Error, entry: ENTRY_T) => void): void {
		this.connect.queryRow("SELECT * FROM " + this.table + " where " +
			this.connect.where(cond), cb);
	}

	find(where: any, cb: (err: Error, result: IQueryResultList<ENTRY_T>) => void, cond?: IQueryCond): void;
	find(where: any, cb: (err: Error, rows: ENTRY_T[]) => void, cond?: IQueryCond): void;
	find(where: any, cb: Function, cond?: IQueryCond) {
		where = Model.parseFilter(cond, where);

		var q = mysql.format("SELECT * FROM " + this.table + 
			(where ? " WHERE " + this.connect.where(where) : "") + " " +
			Model.parseCond(cond));
		//console.log(q);
		this.connect.query(q,
			(e: Error, rows: ENTRY_T[]) => {
				if (e) { return cb(e, null); }
				
				if (!cond || !cond.extended) {
					return cb(e, rows);
				}
				
				this.connect.count(this.table, where, (e: MysqlError, count: number) => {
					if (e) { return cb(e, null); }

					var result: IQueryResultList<ENTRY_T> = {
						conditions: cond || null,
						count: rows.length,
						items: rows,
						total: count
					}

					return cb(null, result);
				});
			});
	}

	//get all rows
	get(cb: (e: Error, result: IQueryResultList<ENTRY_T>) => void, cond?: IQueryCond): void;
	get(cb: (e: Error, rows: ENTRY_T[]) => void, cond?: IQueryCond): void;
	get(cb: Function, cond?: IQueryCond): void {
		this.find(null, <(e: Error, rows: ENTRY_T[]) => void>cb, cond);
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

		var q = mysql.format("UPDATE ?? SET ? WHERE " + this.connect.where(cond), [this.table, data]);
		//console.log(q);

		this.connect.query(q, (err, res) => {
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

		var q = mysql.format("INSERT INTO " + this.table + " SET ?", [data]);

		this.connect.query(q, (err, res) => {
			if (err) return cb(err, false);
			if (res.affectedRows > 0 && res.insertId != 0) {
				var cond = {};
				cond[this.pkName] = res.insertId;
				console.log(cond);
				return this.findRow(cond, cb);
			}

			return cb(null, "");
		});
	}

	del(cond: Object, cb: (err: Error, result: any) => void): void {
		var q = mysql.format("DELETE FROM ?? WHERE " + this.connect.where(cond), [this.table]);
		this.connect.query(q, (err, res) => {
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
}

export = CatalogModel; 
