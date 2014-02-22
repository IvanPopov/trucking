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


class Contractors {
	connect: mysql.Connection;
	constructor(
		public contractors: CatalogModel<trucking.db.IContractor>,
		public holdings: CatalogModel<trucking.db.IHolding>) {
		this.connect = this.contractors.connect || this.holdings.connect;
	}

	getHolding(
		idContractor: number,
		cb: (err: Error, branch: trucking.db.IHolding) => void): void {
		//this.connect.query("")
	}
}

export = Contractors;
