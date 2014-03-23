/// <reference path="../../idl/mysql.d.ts" />
/// <reference path="../../idl/node.d.ts" />
/// <reference path="../../idl/db.d.ts" />

import mysql = require("mysql");
import crypto = require("crypto");
import db = require("db");
import type = require("../type");

import Model = require("./Model");
import CatalogModel = require("./CatalogModel");

import IQueryCond = trucking.db.IQueryCond;


class Streets {
	public connect: mysql.Connection;

	/**
	 * @param territorialsignsstreets Name of map table with sign and streets.
	 */
	constructor(
		public territorialsignsstreets: string,
		public streets: CatalogModel<trucking.db.IStreet>,
		public territorialsigns: CatalogModel<trucking.db.ITerritorialSign>) {
			this.connect = this.streets.connect || this.territorialsigns.connect;
	}

	findBySign(sign: number, cb: (err: Error, branch: trucking.db.IStreet[]) => void, cond?: IQueryCond): void {
		this.connect.query("SELECT t2.* FROM " + this.territorialsignsstreets + " t1, " +
			this.streets.table + " t2 WHERE t1.id_territorialsign = ? " +
			Model.parseCond(cond), sign, cb);
	}
}

export = Streets;
 