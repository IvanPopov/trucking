/// <reference path="../../idl/mysql.d.ts" />
/// <reference path="../../idl/node.d.ts" />
/// <reference path="../../idl/db.d.ts" />
var Model = require("./Model");
var CatalogModel = require("./CatalogModel");

var MetroAPI = (function () {
    function MetroAPI(branches, stations) {
        this.branches = branches;
        this.stations = stations;
    }
    MetroAPI.prototype.getBranch = function (cond, cb) {
        var _this = this;
        this.branches.findRow(cond, function (err, branch) {
            if (err) {
                return cb(err, null);
            }

            _this.stations.find({ id_metrobranch: branch.id_metrobranch }, function (err, stations) {
                if (err) {
                    return cb(err, null);
                }
                branch.stations = stations;
                cb(null, branch);
            });
        });
    };
    return MetroAPI;
})();

module.exports = MetroAPI;
