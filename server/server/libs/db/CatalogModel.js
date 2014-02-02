/// <reference path="../../idl/mysql.d.ts" />
/// <reference path="../../idl/node.d.ts" />
/// <reference path="../../idl/db.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Model = require("./Model");

var CatalogModel = (function (_super) {
    __extends(CatalogModel, _super);
    function CatalogModel() {
        _super.apply(this, arguments);
    }
    CatalogModel.prototype.findRow = function (cond, cb) {
        this.connect.queryRow("SELECT * FROM " + this.table + " where ?", cond, cb);
    };

    CatalogModel.prototype.find = function (cond, cb) {
        this.connect.query("SELECT * FROM " + this.table + " where ?", cond, cb);
    };

    //get all rows
    CatalogModel.prototype.get = function (cb, cond) {
        this.connect.query("SELECT * FROM " + this.table + "" + Model.parseLimitCond(cond), cb);
    };

    CatalogModel.prototype.patch = function (cond, data, cb) {
        this.connect.query("UPDATE " + this.table + " SET ? WHERE ?", [data, cond], function (err, res) {
            if (err)
                return cb(err, false);
            cb(null, { patched: res.affectedRows > 0 });
        });
    };

    CatalogModel.prototype.create = function (data, cb) {
        this.connect.query("INSERT INTO " + this.table + " SET ?", [data], function (err, res) {
            if (err)
                return cb(err, false);
            cb(null, { created: res.affectedRows > 0 });
        });
    };
    return CatalogModel;
})(Model);

module.exports = CatalogModel;
//# sourceMappingURL=CatalogModel.js.map
