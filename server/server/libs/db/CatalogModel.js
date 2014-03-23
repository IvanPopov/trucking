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
        this.pk = null;

        var model = this;
        this.connection.on('connect', function () {
            _this.connect.primary(_this.table, (function (e, primary) {
                if (e) {
                    throw e;
                }

                if (primary) {
                    _this.pk = primary;
                    _this.pkName = primary['Column_name'];
                }
            }).bind(model));
        });
    }
    CatalogModel.prototype.findRow = function (cond, cb) {
        this.connect.queryRow("SELECT * FROM " + this.table + " where " + this.connect.where(cond), cb);
    };

    CatalogModel.prototype.find = function (where, cb, cond) {
        var _this = this;
        where = Model.parseFilter(cond, where);

        var q = mysql.format("SELECT * FROM " + this.table + (where ? " WHERE " + this.connect.where(where) : "") + " " + Model.parseCond(cond));

        //console.log(q);
        this.connect.query(q, function (e, rows) {
            if (e) {
                return cb(e, null);
            }

            if (!cond || !cond.extended) {
                return cb(e, rows);
            }

            _this.connect.count(_this.table, where, function (e, count) {
                if (e) {
                    return cb(e, null);
                }

                var result = {
                    conditions: cond || null,
                    count: rows.length,
                    items: rows,
                    total: count
                };

                return cb(null, result);
            });
        });
    };

    CatalogModel.prototype.get = function (cb, cond) {
        this.find(null, cb, cond);
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

        var q = mysql.format("UPDATE ?? SET ? WHERE " + this.connect.where(cond), [this.table, data]);

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
                console.log(cond);
                return _this.findRow(cond, cb);
            }

            return cb(null, "");
        });
    };

    CatalogModel.prototype.del = function (cond, cb) {
        var q = mysql.format("DELETE FROM ?? WHERE " + this.connect.where(cond), [this.table]);
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
