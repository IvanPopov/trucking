/// <reference path="../../idl/mysql.d.ts" />
/// <reference path="../../idl/node.d.ts" />
/// <reference path="../../idl/db.d.ts" />
var Model = require("./Model");
var CatalogModel = require("./CatalogModel");

var Metro = (function () {
    function Metro(branches, stations) {
        this.branches = branches;
        this.stations = stations;
    }
    Metro.prototype.getBranch = function (cond, cb) {
        var _this = this;
        this.branches.findRow(cond, function (err, branch) {
            if (err) {
                return cb(err, null);
            }

            _this.stations.find({ id_metrobranch: branch.id_metrobranch }, function (err, stations) {
                if (err) {
                    return cb(err, null);
                }
                branch.stations = stations.items;
                cb(null, branch);
            });
        });
    };
    return Metro;
})();

module.exports = Metro;
