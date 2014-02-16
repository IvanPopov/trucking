var type = require("../type");
var config = require("../config");

var Model = (function () {
    function Model(connect, table) {
        this.connect = connect;
        this.table = table;
        if (config.get('env') == "development") {
            this.table = this.table.toLowerCase();
        }
    }
    Model.parseLimitCond = function (cond) {
        if (!type.isDef(cond)) {
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

        return " LIMIT " + from + "," + count + " ";
    };
    return Model;
})();

module.exports = Model;
