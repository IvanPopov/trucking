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
var crypto = require("crypto");

var type = require("../type");

var Model = require("./Model");

var EmployeeModel = (function (_super) {
    __extends(EmployeeModel, _super);
    function EmployeeModel() {
        _super.apply(this, arguments);
    }
    EmployeeModel.prototype.findByEmail = function (email, cb) {
        if (!type.isEmail(email)) {
            cb(new Error("Invalid email was used."), null);
        }

        this.connect.queryRow("SELECT * FROM " + this.table + " where email=" + mysql.escape(email), cb);
    };

    EmployeeModel.prototype.findByID = function (id, cb) {
        this.connect.queryRow("SELECT * FROM " + this.table + " where id_employee=?", parseInt(id), cb);
    };

    EmployeeModel.checkPassword = function (password, employee) {
        return EmployeeModel.encryptPassword(password, employee.salt) === employee.hashed_password;
    };

    EmployeeModel.encryptPassword = function (password, salt) {
        return crypto.createHmac("sha1", salt).update(password).digest("hex");
    };

    /** Generate 32 byte salt. */
    EmployeeModel.salt = function () {
        return crypto.randomBytes(32).toString("base64");
    };
    return EmployeeModel;
})(Model);

module.exports = EmployeeModel;
