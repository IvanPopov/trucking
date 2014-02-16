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
var nodeExcel = require("excel-export");

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
        this.connect.query("SELECT * FROM " + this.table + "" + Model.parseLimitCond(cond), function (err, rows) {
            if (err) {
                return cb(err, null);
            }

            cb(null, rows);
        });
    };

    CatalogModel.prototype.convertToXlsx = function (rows, cb) {
        this.createExcelConfig(function (e, conf) {
            if (e) {
                return cb(e, null);
            }

            for (var i = 0; i < rows.length; ++i) {
                var row = [];

                for (var key in rows[i]) {
                    row.push(rows[i][key]);
                }

                conf.rows.push(row);
            }

            var xlsx = nodeExcel.execute(conf);
            cb(null, xlsx);
        });
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

    CatalogModel.prototype.del = function (cond, cb) {
        this.connect.query("DELETE FROM " + this.table + " WHERE ?", cond, function (err, res) {
            if (err)
                return cb(Model.parseError(err), false);
            cb(null, { deleted: res.affectedRows > 0 });
        });
    };

    CatalogModel.prototype.createExcelConfig = function (cb) {
        var conf = { rows: [], cols: [] };

        this.connect.fields(this.table, function (err, fields) {
            if (err) {
                return cb(err, null);
            }

            for (var name in fields) {
                var field = fields[name];
                var col = {
                    caption: field.Field,
                    type: CatalogModel.mysqlTypeToJSType(field.Type)
                };

                if (col.type === null) {
                    //could not determ type
                    return cb(new Error("Could not determ column type for excel export."), null);
                }

                conf.cols.push(col);
            }

            cb(null, conf);
        });
    };

    CatalogModel.mysqlTypeToJSType = function (type) {
        type = type.toUpperCase();

        for (var i = 0; i < CatalogModel.MYSQL_NUMBER_TYPES.length; ++i) {
            if (type.indexOf(CatalogModel.MYSQL_NUMBER_TYPES[i]) != -1) {
                return "number";
            }
        }

        for (var i = 0; i < CatalogModel.MYSQL_STRING_TYPES.length; ++i) {
            if (type.indexOf(CatalogModel.MYSQL_STRING_TYPES[i]) != -1) {
                return "string";
            }
        }

        for (var i = 0; i < CatalogModel.MYSQL_DATE_TYPES.length; ++i) {
            if (type.indexOf(CatalogModel.MYSQL_DATE_TYPES[i]) != -1) {
                return "date";
            }
        }

        return null;
    };
    CatalogModel.MYSQL_NUMBER_TYPES = [
        "TINYINT",
        "SMALLINT",
        "MEDIUMINT",
        "INT",
        "INTEGER",
        "BIGINT",
        "FLOAT",
        "DOUBLE",
        "DOUBLE PRECISION",
        "REAL",
        "DECIMAL",
        "NUMERIC"
    ];

    CatalogModel.MYSQL_STRING_TYPES = [
        "CHAR", "VARCHAR", "TINYTEXT", "TEXT", "MEDIUMTEXT", "LONGTEXT"
    ];

    CatalogModel.MYSQL_DATE_TYPES = [
        "DATE", "DATETIME", "TIMESTAMP", "TIME", "YEAR"
    ];
    return CatalogModel;
})(Model);

module.exports = CatalogModel;
