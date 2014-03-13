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
import CatalogModel = require("./CatalogModel");

import IQueryCond = trucking.db.IQueryCond;

class NaturalPersonModel extends CatalogModel<trucking.db.INaturalPerson> {
	public brigades: CatalogModel<trucking.db.IBrigade>;
	public emails: CatalogModel<trucking.db.INaturalPersonEmail>;
	public phones: CatalogModel<trucking.db.INaturalPersonPhone>;
	public naturalpersonsworktypes: CatalogModel<trucking.db.INaturalPersonWorkType>;
	public naturalpersonstools: CatalogModel<trucking.db.INaturalPersonTool>;

	constructor(connect: mysql.Connection, public worktypes: CatalogModel<trucking.db.IWorkType>, public tools: CatalogModel<trucking.db.ITool>) {
		super(connect, "NaturalPersons");

		this.brigades = new CatalogModel<trucking.db.IBrigade>(connect, "Brigades");
		this.emails = new CatalogModel<trucking.db.INaturalPersonEmail>(connect, "NaturalPersonsEmails");
		this.phones = new CatalogModel<trucking.db.INaturalPersonPhone>(connect, "NaturalPersonsPhones");
		this.naturalpersonsworktypes = new CatalogModel<trucking.db.INaturalPersonWorkType>(connect, "NaturalPersonsWorkTypes");
		this.naturalpersonstools = new CatalogModel<trucking.db.INaturalPersonTool>(connect, "NaturalPersonsTools");
	}

	findByPassport(serial: number, numb: number,
		cb: (e: Error, person: trucking.db.INaturalPerson) => void): void {
		this.connect.queryRow("SELECT * FROM " + this.table + " where `pass_serial` = ? AND `pass_number` = ?", [serial, numb], cb);
	}

	delByPassport(serial: number, numb: number,
		cb: (e: Error, result) => void): void {
		this.connect.query("DELETE FROM ?? WHERE `pass_serial` = ? AND `pass_number` = ?",
			[this.table, serial, numb], (err, res) => {
				if (err) return cb(Model.parseError(err), false);
				cb(null, true);
			});
	}

	patchByPassport(serial: number, numb: number, data: Object,
		cb: (e: Error, result) => void): void {
			this.connect.query("UPDATE ?? SET ? WHERE `pass_serial` = ? AND `pass_number` = ?",
				[this.table, data, serial, numb], (err, res) => {
				if (err) return cb(err, null);
					this.findByPassport(serial, numb, cb);
			});
	}

	search(query: string, cb: (e: Error, person: trucking.db.INaturalPerson) => void): void {
		this.connect.fields(this.table, (e: Error, fields: IMap<mysql.Field>) => {
			if (e) {
				return cb(e, null);
			}
			var v = [this.table];
			var q = "SELECT * FROM ?? WHERE ";
			["name", "pass_serial", "pass_number", "id_naturalperson"].forEach((field: string, i, arr) => {
				q += field + " like ? " + (i < arr.length - 1 ? "OR " : "");
				v.push('%' + query + '%');
			});
			console.log(mysql.format(q, v));
			this.connect.query(q, v, cb);
		});
	}

	getBrigades(cb: (e: Error, brigades: trucking.db.IBrigade[]) => void): void {
		this.brigades.get(cb);
	}

	getEmails(id: number, cb: (e: Error, emails: trucking.db.INaturalPersonEmail[]) => void): void {
		this.connect.query("SELECT npe.email  FROM ?? np, ?? npe WHERE np.id_naturalperson = ? AND npe.id_naturalperson = np.id_naturalperson",
			[this.table, this.emails.table, id], cb);
	}

	getPhones(id: number, cb: (e: Error, emails: trucking.db.INaturalPersonPhone[]) => void): void {
		this.connect.query("SELECT npp.phone  FROM ?? np, ?? npp WHERE np.id_naturalperson = ? AND npp.id_naturalperson = np.id_naturalperson",
			[this.table, this.phones.table, id], cb);
	}

	getWorktypes(id: number, cb: (e: Error, types: trucking.db.IWorkType[]) => void): void {
		this.connect.query("SELECT wt.*, npwt.rate as personal_rate  FROM ?? np, ?? wt, ?? npwt WHERE np.id_naturalperson = ? AND npwt.id_naturalperson = np.id_naturalperson AND wt.id_worktype = npwt.id_worktype",
			[this.table, this.worktypes.table, this.naturalpersonsworktypes.table, id], cb);
	}

	getTools(id: number, cb: (e: Error, types: trucking.db.ITool[]) => void): void {
		this.connect.query("SELECT t.*, npt.rate as personal_rate, npt.personal, npt.count  FROM ?? np, ?? t, ?? npt WHERE np.id_naturalperson = ? AND npt.id_naturalperson = np.id_naturalperson AND t.id_tool = npt.id_tool",
			[this.table, this.tools.table, this.naturalpersonstools.table, id], cb);
	}
}

export = NaturalPersonModel;
