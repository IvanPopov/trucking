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


class MetroAPI {
	constructor(
		public branches: CatalogModel<trucking.db.IMetroBranch>,
		public stations: CatalogModel<trucking.db.IMetro>) {
	}

	getBranch(
		cond: Object,
		cb: (err: Error, branch: trucking.db.IMetroBranch) => void): void {
			this.branches.findRow(cond,
			(err: Error, branch: trucking.db.IMetroBranch): void => {
				if (err) { return cb(err, null); }

				this.stations.find({ id_metrobranch: branch.id_metrobranch },
					(err: Error, stations: trucking.db.IMetro[]): void => {
						if (err) { return cb(err, null); }
						branch.stations = stations;
						cb(null, branch);
					});
			});
	}
}

export = MetroAPI;
