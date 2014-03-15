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

var type = require("../type");
var nodeExcel = require("excel-export");

var Model = require("./Model");

/**
* @apiDefineSuccessStructure Created
* @apiSuccess {Boolean} created Is created.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 201 Created
*/
/**
* @apiDefineSuccessStructure Deleted
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 204 No Content
*/
/**
* @apiDefineSuccessStructure Patched
* @apiSuccess {Boolean} patched Is patched.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*/
var CatalogModel = (function (_super) {
    __extends(CatalogModel, _super);
    function CatalogModel(connect, table) {
        var _this = this;
        _super.call(this, connect, table);
        this.pkName = null;

        this.connect.query("SHOW KEYS FROM ?? WHERE Key_name = 'PRIMARY'", [this.table], function (e, rows) {
            if (type.isArray(rows) && rows.length > 0) {
                _this.pkName = rows[0]['Column_name'];
            }
        });
    }
    CatalogModel.prototype.findRow = function (cond, cb) {
        this.connect.queryRow("SELECT * FROM " + this.table + " where " + CatalogModel.stringifyWhereClause(cond), cb);
    };

    CatalogModel.prototype.find = function (cond, cb, limit) {
        this.connect.query("SELECT * FROM " + this.table + " where ?" + " " + Model.parseLimitCond(limit), cond, cb);
    };

    //get all rows
    CatalogModel.prototype.get = function (cb, cond) {
        var q = mysql.format("SELECT * FROM " + this.table + "" + Model.parseLimitCond(cond));

        this.connect.query(q, function (err, rows) {
            if (err) {
                return cb(err, null);
            }

            return cb(null, rows);
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
            return cb(null, xlsx);
        });
    };

    CatalogModel.prototype.patch = function (cond, data, cb) {
        var _this = this;
        if (!type.isDefAndNotNull(data)) {
            return cb(new Error("Data for patching not specified."), null);
        }

        var q = mysql.format("UPDATE ?? SET ? WHERE " + CatalogModel.stringifyWhereClause(cond), [this.table, data]);

        //console.log(q);
        this.connect.query(q, function (err, res) {
            if (err)
                return cb(err, null);

            for (var i in data) {
                if (type.isDef(cond[i]))
                    cond[i] = data[i];
            }

            _this.findRow(cond, cb);
        });
    };

    CatalogModel.prototype.create = function (data, cb) {
        var _this = this;
        if (!type.isDefAndNotNull(data)) {
            cb(null, { created: false });
        }

        var q = mysql.format("INSERT INTO " + this.table + " SET ?", [data]);

        this.connect.query(q, function (err, res) {
            if (err)
                return cb(err, false);
            if (res.affectedRows > 0 && res.insertId != 0) {
                var cond = {};
                cond[_this.pkName] = res.insertId;
                return _this.findRow(cond, cb);
            }

            return cb(null, "");
        });
    };

    CatalogModel.prototype.del = function (cond, cb) {
        var q = mysql.format("DELETE FROM ?? WHERE " + CatalogModel.stringifyWhereClause(cond), [this.table]);
        this.connect.query(q, function (err, res) {
            //console.log(res);
            if (err)
                return cb(Model.parseError(err), false);
            cb(null, true);
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

    CatalogModel.stringifyWhereClause = function (cond) {
        var where = "";
        for (var field in cond) {
            where += (where.length ? " AND " : "") + mysql.format("?? = ?", [field, cond[field]]);
        }

        //where += " LIMIT 1";
        return where;
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