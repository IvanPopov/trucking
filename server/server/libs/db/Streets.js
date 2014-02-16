/// <reference path="../../idl/mysql.d.ts" />
/// <reference path="../../idl/node.d.ts" />
/// <reference path="../../idl/db.d.ts" />
var Model = require("./Model");
var CatalogModel = require("./CatalogModel");

var Streets = (function () {
    /**
    * @param territorialsignsstreets Name of map table with sign and streets.
    */
    function Streets(territorialsignsstreets, streets, territorialsigns) {
        this.territorialsignsstreets = territorialsignsstreets;
        this.streets = streets;
        this.territorialsigns = territorialsigns;
        this.connect = this.streets.connect || this.territorialsigns.connect;
    }
    Streets.prototype.findBySign = function (sign, cb, cond) {
        this.connect.query("SELECT t2.* FROM " + this.territorialsignsstreets + " t1, " + this.streets.table + " t2 WHERE t1.id_territorialsign = ? " + Model.parseLimitCond(cond), sign, cb);
    };
    return Streets;
})();

module.exports = Streets;
