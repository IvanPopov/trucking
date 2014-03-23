/// <reference path="../../idl/mysql.d.ts" />
/// <reference path="../../idl/db.d.ts" />
var mysql = require("mysql");
var type = require("../type");
var config = require("../config");

var Model = (function () {
    function Model(connection, table) {
        this.table = table;
        this.connection = connection;

        if (config.get('env') == "development") {
            this.table = this.table.toLowerCase();
        }
    }
    Object.defineProperty(Model.prototype, "connect", {
        get: function () {
            return this.connection.connect;
        },
        enumerable: true,
        configurable: true
    });

    Model.parseCond = function (cond) {
        var limitString = "";
        var orderString = "";

        if (!type.isDefAndNotNull(cond)) {
            return "";
        }

        var from = 0;
        var count = 0xffffffff;

        if (type.isDefAndNotNull(cond.from)) {
            from = parseInt(cond.from) || 0;
        }

        if (type.isDefAndNotNull(cond.count)) {
            count = parseInt(cond.count) || 0;
        }

        if (type.isDefAndNotNull(cond.page)) {
            from = Math.max((parseInt(cond.page) || 1) - 1, 0) * count;
        }

        limitString = " LIMIT " + from + "," + count + " ";

        if (type.isDefAndNotNull(cond.sorting) && typeof cond === "object") {
            var field = Object.keys(cond.sorting)[0];

            if (type.isString(field)) {
                var orderType = "asc";
                if (cond.sorting[field].toLowerCase() === "desc") {
                    orderType = "desc";
                }

                orderString = mysql.format(" ORDER BY ?? " + orderType.toUpperCase(), decodeURI(field));
            }
        }

        return orderString + limitString;
    };

    Model.parseFilter = function (cond, where) {
        if (type.isDefAndNotNull(cond.filter) && typeof cond === "object") {
            var field = Object.keys(cond.filter)[0];

            if (type.isString(field)) {
                where = where || {};
                where[mysql.format("??", field)] = "*" + decodeURI(cond.filter[field]) + "*";

                return where;
            }
        }

        return where || null;
    };

    Model.parseError = function (e) {
        //var parsedError: Error = new Error();
        //switch (e.code) {
        //	case "ER_ROW_IS_REFERENCED_":
        //		e.message = "";
        //}
        return e;
    };
    return Model;
})();

module.exports = Model;
