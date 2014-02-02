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

var MetroAPI = require("./db/MetroAPI");
exports.MetroAPI = MetroAPI;

//seetup databse config
var dbConfig = {
    host: config.get("mysql:host"),
    user: config.get("mysql:user"),
    password: config.get("mysql:password"),
    database: config.get("mysql:db")
};

var connection = null;

function handleDisconnect() {
    connection = mysql.createConnection(dbConfig); // Recreate the connection, since

    // the old one cannot be reused.
    connection.connect(function (err) {
        if (err) {
            logger.error('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
            return;
        }

        mysqlUtilities.upgrade(connection);
    });

    // If you're also serving http, display a 503 error.
    connection.on('error', function (err) {
        logger.error('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(); // lost due to either server restart, or a
        } else {
            throw err;
        }
    });
}

handleDisconnect();

exports.clients = new exports.ClientAppModel(connection, "ClientApps");
exports.users = new exports.EmployeeModel(connection, "Employees");
exports.accessTokens = new exports.TokenModel(connection, "AccessTokens");
exports.refreshTokens = new exports.TokenModel(connection, "RefreshTokens");

//all catalogues
exports.catalogs = {
    metrobranches: new exports.CatalogModel(connection, "MetroBranches"),
    //metro stations
    metro: new exports.CatalogModel(connection, "Metro"),
    streets: new exports.CatalogModel(connection, "Streets")
};

exports.metro = new exports.MetroAPI(exports.catalogs.metrobranches, exports.catalogs.metro);
//# sourceMappingURL=db.js.map
