/// <reference path="../../idl/mysql.d.ts" />
/// <reference path="../../idl/node.d.ts" />
/// <reference path="../../idl/db.d.ts" />

import mysql = require("mysql");
import crypto = require("crypto");
import db = require("db");
import type = require("../type");

import Model = require("./Model");

import IClientApp = trucking.db.IClientApp;

class ClientAppModel extends Model {
	findByID(id: string, cb: (err: Error, clientApp: IClientApp) => void): void {
		this.connect.queryRow("SELECT * FROM " + this.table + " where id_client=?", id, cb);
	}
}

export = ClientAppModel;