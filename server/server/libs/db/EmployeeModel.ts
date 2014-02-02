/// <reference path="../../idl/mysql.d.ts" />
/// <reference path="../../idl/node.d.ts" />
/// <reference path="../../idl/db.d.ts" />

import mysql = require("mysql");
import crypto = require("crypto");
import db = require("db");
import type = require("../type");

import Model = require("./Model");

import IEmployee = trucking.db.IEmployee;

class EmployeeModel extends Model {
	findByEmail(email: string, cb: (err: Error, emploee: IEmployee) => void): void {
		if (!type.isEmail(email)) {
			cb(new Error("Invalid email was used."), null);
		}

		this.connect.queryRow("SELECT * FROM " + this.table + " where email=" + mysql.escape(email), cb);
	}

	findByID(id: number, cb: (err: Error, emploee: IEmployee) => void): void {
		this.connect.queryRow("SELECT * FROM " + this.table + " where id_employee=?", parseInt(<any>id), cb);
	}

	static checkPassword(password: string, employee: IEmployee): boolean {
		return EmployeeModel.encryptPassword(password, employee.salt) === employee.hashed_password;
	}

	static encryptPassword(password: string, salt: string): string {
		return crypto.createHmac("sha1", salt).update(password).digest("hex");
	}

	/** Generate 32 byte salt. */
	static salt(): string {
		return crypto.randomBytes(32).toString("base64");
	}
}

export = EmployeeModel;