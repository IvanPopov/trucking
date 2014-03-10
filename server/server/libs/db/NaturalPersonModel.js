/// <reference path="../../idl/mysql.d.ts" />
/// <reference path="../../idl/node.d.ts" />
/// <reference path="../../idl/db.d.ts" />
/// <reference path="../../idl/excel-export.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mysql = require("mysql");

var Model = require("./Model");
var CatalogModel = require("./CatalogModel");

var NaturalPersonModel = (function (_super) {
    __extends(NaturalPersonModel, _super);
    function NaturalPersonModel(connect, worktypes) {
        _super.call(this, connect, "NaturalPersons");
        this.worktypes = worktypes;

        this.brigades = new CatalogModel(connect, "Brigades");
        this.emails = new CatalogModel(connect, "NaturalPersonsEmails");
        this.phones = new CatalogModel(connect, "NaturalPersonsPhones");
        this.naturalpersonsworktypes = new CatalogModel(connect, "NaturalPersonsWorkTypes");
    }
    NaturalPersonModel.prototype.findByPassport = function (serial, numb, cb) {
        this.connect.queryRow("SELECT * FROM " + this.table + " where `pass_serial` = ? AND `pass_number` = ?", [serial, numb], cb);
    };

    NaturalPersonModel.prototype.delByPassport = function (serial, numb, cb) {
        this.connect.query("DELETE FROM ?? WHERE `pass_serial` = ? AND `pass_number` = ?", [this.table, serial, numb], function (err, res) {
            if (err)
                return cb(Model.parseError(err), false);
            cb(null, true);
        });
    };

    NaturalPersonModel.prototype.patchByPassport = function (serial, numb, data, cb) {
        var _this = this;
        this.connect.query("UPDATE ?? SET ? WHERE `pass_serial` = ? AND `pass_number` = ?", [this.table, data, serial, numb], function (err, res) {
            if (err)
                return cb(err, null);
            _this.findByPassport(serial, numb, cb);
        });
    };

    NaturalPersonModel.prototype.search = function (query, cb) {
        var _this = this;
        this.connect.fields(this.table, function (e, fields) {
            if (e) {
                return cb(e, null);
            }
            var v = [_this.table];
            var q = "SELECT * FROM ?? WHERE ";
            ["name", "pass_serial", "pass_number", "id_naturalperson"].forEach(function (field, i, arr) {
                q += field + " like ? " + (i < arr.length - 1 ? "OR " : "");
                v.push('%' + query + '%');
            });
            console.log(mysql.format(q, v));
            _this.connect.query(q, v, cb);
        });
    };

    NaturalPersonModel.prototype.getBrigades = function (cb) {
        this.brigades.get(cb);
    };

    NaturalPersonModel.prototype.getEmails = function (id, cb) {
        this.connect.query("SELECT npe.email  FROM ?? np, ?? npe WHERE np.id_naturalperson = ? AND npe.id_naturalperson = np.id_naturalperson", [this.table, this.emails.table, id], cb);
    };

    NaturalPersonModel.prototype.getPhones = function (id, cb) {
        this.connect.query("SELECT npp.phone  FROM ?? np, ?? npp WHERE np.id_naturalperson = ? AND npp.id_naturalperson = np.id_naturalperson", [this.table, this.phones.table, id], cb);
    };

    NaturalPersonModel.prototype.getWorktypes = function (id, cb) {
        this.connect.query("SELECT wt.*, npwt.rate as personal_rate  FROM ?? np, ?? wt, ?? npwt WHERE np.id_naturalperson = ? AND npwt.id_naturalperson = np.id_naturalperson AND wt.id_worktype = npwt.id_worktype", [this.table, this.worktypes.table, this.naturalpersonsworktypes.table, id], cb);
    };
    return NaturalPersonModel;
})(CatalogModel);

module.exports = NaturalPersonModel;
