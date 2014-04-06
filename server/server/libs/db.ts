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


export interface IConnectionWrapper {
	connect: mysql.Connection;
	on(event: 'connect', cb: Function): void;
	on(event: string, cb: Function): void;
}

class ConnectionWrapper implements IConnectionWrapper {
	private handlers: IMap<Function[]> = {};
	public connect: mysql.Connection;

	constructor() {
	}

	setup(connect: mysql.Connection) {
		this.connect = connect;
		this.emit("connect");
	}

	on(event: string, cb: Function): void {
		this.handlers[event] = this.handlers[event] || [];
		this.handlers[event].push(cb);
	}

	private emit(event: string): void {
		var list = this.handlers[event];
		if (list) {
			list.forEach((listener: Function) => {
				listener(this.connect);
			});
		}
	}
}

function handleDisconnect(cb: (e: Error, connect: mysql.Connection) => void = null): IConnectionWrapper {
	var connection: mysql.Connection = mysql.createConnection(dbConfig);				// Recreate the connection, since
	// the old one cannot be reused.
	var wrapper = new ConnectionWrapper();

	connection.connect((err: Error) => {						// The server is either down
		if (err) {												// or restarting (takes a while sometimes).
			logger.error('error when connecting to db:', err);
			setTimeout(handleDisconnect, 2000);					// We introduce a delay before attempting to reconnect,
			return;												// to avoid a hot loop, and to allow our node script to
		}														// process asynchronous requests in the meantime.

		mysqlUtilities.upgrade(connection);
		mysqlUtilities.introspection(connection);

		wrapper.setup(connection);

		if (cb) {
			cb(null, connection);
		}
	});
	// If you're also serving http, display a 503 error.
	connection.on('error', (err: Error) => {
		logger.error('db error', err);
		if ((<any>err).code === 'PROTOCOL_CONNECTION_LOST') {	// Connection to the MySQL server is usually
			handleDisconnect(cb);									// lost due to either server restart, or a
		} else {												// connnection idle timeout (the wait_timeout
			throw err;											// server variable configures this)
		}
	});

	return wrapper;
}

export function isAdmin(user: trucking.db.IEmployee): boolean {
	return user.permissions == 1;
}

export function isEmployee(user: trucking.db.IEmployee): boolean {
	return true;
}

export var clients = null;
export var users = null;
export var accessTokens = null;
export var refreshTokens = null;

//all catalogues
export var catalogs = {
	metrobranches: <CatalogModel<trucking.db.IMetroBranch>>null,
	//metro stations
	metro: <CatalogModel<trucking.db.IMetro>>null,
	territorialsigns: <CatalogModel<trucking.db.ITerritorialSign>>null,
	metrostreets: <CatalogModel<trucking.db.IMetroStreets>>null,
	streets: <CatalogModel<trucking.db.IStreet>>null,

	tools: <CatalogModel<trucking.db.ITool>>null,
	toolgroups: <CatalogModel<trucking.db.IToolGroup>>null,

	paymentterms: <CatalogModel<trucking.db.IPaymentTerm>>null,
	prepaymentterms: <CatalogModel<trucking.db.IPrepaymentTerm>>null,
	сonditionsofwork: <CatalogModel<trucking.db.IСonditionOfWork>>null,
	addresstype: <CatalogModel<trucking.db.IAddressType>>null,
	holdings: <CatalogModel<trucking.db.IHolding>>null,

	worktypes: <CatalogModel<trucking.db.IWorkType>>null,
	worktypegroups: <CatalogModel<trucking.db.IWorkTypeGroup>>null,
	worktypestools: <CatalogModel<trucking.db.IWorkTypeTool>>null,

	contractors: <CatalogModel<trucking.db.IContractor>>null,
	contractortypes: <CatalogModel<trucking.db.IContractorType>>null,
	units: <CatalogModel<trucking.db.IUnit>>null,
	brigades: <CatalogModel<trucking.db.IBrigade>>null,

	naturalpersons: <CatalogModel<trucking.db.INaturalPerson>>null,

};

export var naturalpersons: NaturalPersonModel = null;

//for admin
export var systemCatalogs = {
	clientapps: <CatalogModel<trucking.db.IClientApp>>null
};

export var metro: Metro = null;
export var streets: Streets = null;


var connection = handleDisconnect();

clients = new ClientAppModel(connection, "ClientApps");
users = new EmployeeModel(connection, "Employees");
accessTokens = new TokenModel(connection, "AccessTokens");
refreshTokens = new TokenModel(connection, "RefreshTokens");

catalogs.metrobranches = new CatalogModel<trucking.db.IMetroBranch>(connection, "MetroBranches");
//metro stations
catalogs.metro = new CatalogModel<trucking.db.IMetro>(connection, "Metro");
catalogs.territorialsigns = new CatalogModel<trucking.db.ITerritorialSign>(connection, "TerritorialSigns");
catalogs.metrostreets = new CatalogModel<trucking.db.IMetroStreets>(connection, "MetroStreets");
catalogs.streets = new CatalogModel<trucking.db.IStreet>(connection, "Streets");

catalogs.tools = new CatalogModel<trucking.db.ITool>(connection, "Tools");
catalogs.toolgroups = new CatalogModel<trucking.db.IToolGroup>(connection, "ToolGroups");

catalogs.paymentterms = new CatalogModel<trucking.db.IPaymentTerm>(connection, "PaymentTerms");
catalogs.prepaymentterms = new CatalogModel<trucking.db.IPrepaymentTerm>(connection, "PrepaymentTerms");
catalogs.сonditionsofwork = new CatalogModel<trucking.db.IСonditionOfWork>(connection, "ConditionsOfWork");
catalogs.addresstype = new CatalogModel<trucking.db.IAddressType>(connection, "AddressType");
catalogs.holdings = new CatalogModel<trucking.db.IHolding>(connection, "Holdings");

catalogs.worktypes = new CatalogModel<trucking.db.IWorkType>(connection, "WorkTypes");
catalogs.worktypegroups = new CatalogModel<trucking.db.IWorkTypeGroup>(connection, "WorkTypeGroups");
catalogs.worktypestools = new CatalogModel<trucking.db.IWorkTypeTool>(connection, "WorkTypesTools");

catalogs.contractors = new CatalogModel<trucking.db.IContractor>(connection, "Contractors");
catalogs.contractortypes = new CatalogModel<trucking.db.IContractorType>(connection, "ContractorTypes");
catalogs.units = new CatalogModel<trucking.db.IUnit>(connection, "Units");
catalogs.brigades = new CatalogModel<trucking.db.IBrigade>(connection, "Brigades");

systemCatalogs.clientapps = new CatalogModel<trucking.db.IClientApp>(connection, "ClientApps");

naturalpersons = catalogs.naturalpersons = new NaturalPersonModel(connection, catalogs.worktypes, catalogs.tools);

metro = new Metro(catalogs.metrobranches, catalogs.metro);
streets = new Streets("territorialsignsstreets", catalogs.streets, catalogs.territorialsigns);

