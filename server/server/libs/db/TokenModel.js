/// <reference path="../../idl/mysql.d.ts" />
/// <reference path="../../idl/node.d.ts" />
/// <reference path="../../idl/db.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mysql = require("mysql");

var Model = require("./Model");

var TokenModel = (function (_super) {
    __extends(TokenModel, _super);
    function TokenModel() {
        _super.apply(this, arguments);
    }
    TokenModel.prototype.findByValue = function (value, cb) {
        this.connect.queryRow("SELECT * FROM " + this.table + " where value=" + mysql.escape(value), cb);
    };

    TokenModel.prototype.removeByEmployeeAndClient = function (id_employee, id_clientapp, cb) {
        this.connect.query("DELETE FROM " + this.table + " WHERE (id_employee = ?) AND (id_clientapp = ?)", [id_employee, id_clientapp], cb);
    };

    TokenModel.prototype.removeByValue = function (value, cb) {
        this.connect.query("DELETE FROM " + this.table + " WHERE (value = ?)", value, cb);
    };

    TokenModel.prototype.insert = function (token, cb) {
        this.connect.query("INSERT INTO " + this.table + " SET ?", token, function (err) {
            cb(err, token);
        });
    };
    return TokenModel;
})(Model);

module.exports = TokenModel;
