/// <reference path="../idl/winston.d.ts" />
var mysql = require("mysql");
var mysqlUtilities = require("mysql-utilities");
var config = require("./config");
var logger = require("winston");

var EmployeeModel = require("./db/EmployeeModel");
exports.EmployeeModel = EmployeeModel;
var TokenModel = require("./db/TokenModel");
exports.TokenModel = TokenModel;
var ClientAppModel = require("./db/ClientAppModel");
exports.ClientAppModel = ClientAppModel;

var CatalogModel = require("./db/CatalogModel");
exports.CatalogModel = CatalogModel;

var Metro = require("./db/Metro");
exports.Metro = Metro;
var Streets = require("./db/Streets");
exports.Streets = Streets;

var NaturalPersonModel = require("./db/NaturalPersonModel");
exports.NaturalPersonModel = NaturalPersonModel;

//seetup databse config
var dbConfig = {
    host: config.get("mysql:host"),
    user: config.get("mysql:user"),
    password: config.get("mysql:password"),
    database: config.get("mysql:db")
};

var ConnectionWrapper = (function () {
    function ConnectionWrapper() {
        this.handlers = {};
    }
    ConnectionWrapper.prototype.setup = function (connect) {
        this.connect = connect;
        this.emit("connect");
    };

    ConnectionWrapper.prototype.on = function (event, cb) {
        this.handlers[event] = this.handlers[event] || [];
        this.handlers[event].push(cb);
    };

    ConnectionWrapper.prototype.emit = function (event) {
        var _this = this;
        var list = this.handlers[event];
        if (list) {
            list.forEach(function (listener) {
                listener(_this.connect);
            });
        }
    };
    return ConnectionWrapper;
})();

function handleDisconnect(cb) {
    if (typeof cb === "undefined") { cb = null; }
    var connection = mysql.createConnection(dbConfig);

    // the old one cannot be reused.
    var wrapper = new ConnectionWrapper();

    connection.connect(function (err) {
        if (err) {
            logger.error('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
            return;
        }

        mysqlUtilities.upgrade(connection);
        mysqlUtilities.introspection(connection);

        wrapper.setup(connection);

        if (cb) {
            cb(null, connection);
        }
    });

    // If you're also serving http, display a 503 error.
    connection.on('error', function (err) {
        logger.error('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(cb); // lost due to either server restart, or a
        } else {
            throw err;
        }
    });

    return wrapper;
}

function isAdmin(user) {
    return user.permissions == 1;
}
exports.isAdmin = isAdmin;

function isEmployee(user) {
    return true;
}
exports.isEmployee = isEmployee;

exports.clients = null;
exports.users = null;
exports.accessTokens = null;
exports.refreshTokens = null;

//all catalogues
exports.catalogs = {
    metrobranches: null,
    //metro stations
    metro: null,
    territorialsigns: null,
    metrostreets: null,
    streets: null,
    tools: null,
    toolgroups: null,
    paymentterms: null,
    prepaymentterms: null,
    сonditionsofwork: null,
    addresstype: null,
    holdings: null,
    worktypes: null,
    worktypegroups: null,
    worktypestools: null,
    contractors: null,
    contractortypes: null,
    units: null,
    brigades: null,
    naturalpersons: null
};

exports.naturalpersons = null;

//for admin
exports.systemCatalogs = {
    clientapps: null
};

exports.metro = null;
exports.streets = null;

var connection = handleDisconnect();

exports.clients = new exports.ClientAppModel(connection, "ClientApps");
exports.users = new exports.EmployeeModel(connection, "Employees");
exports.accessTokens = new exports.TokenModel(connection, "AccessTokens");
exports.refreshTokens = new exports.TokenModel(connection, "RefreshTokens");

exports.catalogs.metrobranches = new exports.CatalogModel(connection, "MetroBranches");

//metro stations
exports.catalogs.metro = new exports.CatalogModel(connection, "Metro");
exports.catalogs.territorialsigns = new exports.CatalogModel(connection, "TerritorialSigns");
exports.catalogs.metrostreets = new exports.CatalogModel(connection, "MetroStreets");
exports.catalogs.streets = new exports.CatalogModel(connection, "Streets");

exports.catalogs.tools = new exports.CatalogModel(connection, "Tools");
exports.catalogs.toolgroups = new exports.CatalogModel(connection, "ToolGroups");

exports.catalogs.paymentterms = new exports.CatalogModel(connection, "PaymentTerms");
exports.catalogs.prepaymentterms = new exports.CatalogModel(connection, "PrepaymentTerms");
exports.catalogs.сonditionsofwork = new exports.CatalogModel(connection, "ConditionsOfWork");
exports.catalogs.addresstype = new exports.CatalogModel(connection, "AddressType");
exports.catalogs.holdings = new exports.CatalogModel(connection, "Holdings");

exports.catalogs.worktypes = new exports.CatalogModel(connection, "WorkTypes");
exports.catalogs.worktypegroups = new exports.CatalogModel(connection, "WorkTypeGroups");
exports.catalogs.worktypestools = new exports.CatalogModel(connection, "WorkTypesTools");

exports.catalogs.contractors = new exports.CatalogModel(connection, "Contractors");
exports.catalogs.contractortypes = new exports.CatalogModel(connection, "ContractorTypes");
exports.catalogs.units = new exports.CatalogModel(connection, "Units");
exports.catalogs.brigades = new exports.CatalogModel(connection, "Brigades");

exports.systemCatalogs.clientapps = new exports.CatalogModel(connection, "ClientApps");

exports.naturalpersons = exports.catalogs.naturalpersons = new exports.NaturalPersonModel(connection, exports.catalogs.worktypes, exports.catalogs.tools);

exports.metro = new exports.Metro(exports.catalogs.metrobranches, exports.catalogs.metro);
exports.streets = new exports.Streets("territorialsignsstreets", exports.catalogs.streets, exports.catalogs.territorialsigns);
