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

export function isAdmin(user: trucking.db.IEmployee): boolean {
	return user.permissions == 1;
}

export function isEmployee(user: trucking.db.IEmployee): boolean {
	return true;
}

export var clients = new ClientAppModel(connection, "ClientApps");
export var users = new EmployeeModel(connection, "Employees");
export var accessTokens = new TokenModel(connection, "AccessTokens");
export var refreshTokens = new TokenModel(connection, "RefreshTokens");

//all catalogues
export var catalogs = {
	metrobranches: new CatalogModel<trucking.db.IMetroBranch>(connection, "MetroBranches"),
	//metro stations
	metro: new CatalogModel<trucking.db.IMetro>(connection, "Metro"),
	territorialsigns: new CatalogModel<trucking.db.ITerritorialSign>(connection, "TerritorialSigns"),
	streets: new CatalogModel<trucking.db.IStreet>(connection, "Streets"),

	tools: new CatalogModel<trucking.db.ITool>(connection, "Tools"),
	toolgroups: new CatalogModel<trucking.db.IToolGroup>(connection, "ToolGroups"),

	paymentterms: new CatalogModel<trucking.db.IPaymentTerm>(connection, "PaymentTerms"),
	prepaymentterms: new CatalogModel<trucking.db.IPrepaymentTerm>(connection, "PrepaymentTerms"),
	сonditionsofwork: new CatalogModel<trucking.db.IСonditionOfWork>(connection, "СonditionsOfWork"),
	addresstype: new CatalogModel<trucking.db.IAddressType>(connection, "AddressType"),
	holdings: new CatalogModel<trucking.db.IHolding>(connection, "Holdings"),

	worktypes: new CatalogModel<trucking.db.IWorkType>(connection, "WorkTypes"),
	worktypegroups: new CatalogModel<trucking.db.IWorkTypeGroup>(connection, "WorkTypeGroups"),
	worktypestools: new CatalogModel<trucking.db.IWorkTypeTool>(connection, "WorkTypesTools"),

	contractors: new CatalogModel<trucking.db.IContractor>(connection, "Contractors"),
	contractortypes: new CatalogModel<trucking.db.IContractorType>(connection, "ContractorTypes"),
	units: new CatalogModel<trucking.db.IUnit>(connection, "Units"),
	brigades: new CatalogModel<trucking.db.IBrigade>(connection, "Brigades"),

	naturalpersons: null
};

export var naturalpersons = catalogs.naturalpersons = new NaturalPersonModel(connection, catalogs.worktypes, catalogs.tools);

//for admin
export var systemCatalogs = {
	clientapps: new CatalogModel<trucking.db.IClientApp>(connection, "ClientApps")
};

export var metro = new Metro(catalogs.metrobranches, catalogs.metro);
export var streets = new Streets("territorialsignsstreets", catalogs.streets, catalogs.territorialsigns);