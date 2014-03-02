/// <reference path="../idl/winston.d.ts" />

import crypto = require("crypto");
import mysql = require("mysql");
import mysqlUtilities = require("mysql-utilities");
import config = require("./config");
import logger = require("winston");

export import EmployeeModel = require("./db/EmployeeModel");
export import TokenModel = require("./db/TokenModel");
export import ClientAppModel = require("./db/ClientAppModel");

export import CatalogModel = require("./db/CatalogModel");

export import Metro = require("./db/Metro");
export import Streets = require("./db/Streets");

export import NaturalPersonModel = require("./db/NaturalPersonModel");

//seetup databse config
var dbConfig = {
	host: config.get("mysql:host"),
	user: config.get("mysql:user"),
	password: config.get("mysql:password"),
	database: config.get("mysql:db")
};

var connection: mysql.Connection = null;

function handleDisconnect(): void {
	connection = mysql.createConnection(dbConfig);				// Recreate the connection, since
	// the old one cannot be reused.

	connection.connect((err: Error) => {						// The server is either down
		if (err) {												// or restarting (takes a while sometimes).
			logger.error('error when connecting to db:', err);
			setTimeout(handleDisconnect, 2000);					// We introduce a delay before attempting to reconnect,
			return;												// to avoid a hot loop, and to allow our node script to
		}														// process asynchronous requests in the meantime.

		mysqlUtilities.upgrade(connection);
		mysqlUtilities.introspection(connection);
	});															
	// If you're also serving http, display a 503 error.
	connection.on('error', (err: Error) => {
		logger.error('db error', err);
		if ((<any>err).code === 'PROTOCOL_CONNECTION_LOST') {	// Connection to the MySQL server is usually
			handleDisconnect();									// lost due to either server restart, or a
		} else {												// connnection idle timeout (the wait_timeout
			throw err;											// server variable configures this)
		}
	});
}

handleDisconnect();

import db = trucking.db;

export function isAdmin(user: db.IEmployee): boolean {
	return user.permissions == 1;
}

export function isEmployee(user: db.IEmployee): boolean {
	return true;
}

export var clients = new ClientAppModel(connection, "ClientApps");
export var users = new EmployeeModel(connection, "Employees");
export var accessTokens = new TokenModel(connection, "AccessTokens");
export var refreshTokens = new TokenModel(connection, "RefreshTokens");

//all catalogues
export var catalogs = {
	metrobranches: new CatalogModel<db.IMetroBranch>(connection, "MetroBranches"),
	//metro stations
	metro: new CatalogModel<db.IMetro>(connection, "Metro"),
	territorialsigns: new CatalogModel<db.ITerritorialSign>(connection, "TerritorialSigns"),
	streets: new CatalogModel<db.IStreet>(connection, "Streets"),

	tools: new CatalogModel<db.ITool>(connection, "Tools"),

	paymentterms: new CatalogModel<db.IPaymentTerm>(connection, "PaymentTerms"),
	prepaymentterms: new CatalogModel<db.IPrepaymentTerm>(connection, "PrepaymentTerms"),
	сonditionsofwork: new CatalogModel<db.IСonditionOfWork>(connection, "СonditionsOfWork"),
	addresstype: new CatalogModel<db.IAddressType>(connection, "AddressType"),
	holdings: new CatalogModel<db.IHolding>(connection, "Holdings"),

	worktypes: new CatalogModel<db.IWorkType>(connection, "WorkTypes"),
	worktypegroups: new CatalogModel<db.IWorkTypeGroup>(connection, "WorkTypeGroups"),
	worktypestools: new CatalogModel<db.IWorkTypeTool>(connection, "WorkTypesTools"),

	contractors: new CatalogModel<db.IContractor>(connection, "Contractors"),
	contractortypes: new CatalogModel<db.IContractorType>(connection, "ContractorTypes"),
	units: new CatalogModel<db.IUnit>(connection, "Units")
};

export var naturalpersons = new NaturalPersonModel(connection, catalogs.worktypes);

//for admin
export var systemCatalogs = {
	clientapps: new CatalogModel<db.IClientApp>(connection, "ClientApps")
};

export var metro = new Metro(catalogs.metrobranches, catalogs.metro);
export var streets = new Streets("territorialsignsstreets", catalogs.streets, catalogs.territorialsigns);
