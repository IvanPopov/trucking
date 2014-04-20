/// <reference path="../../idl/mysql.d.ts" />
/// <reference path="../../idl/node.d.ts" />
/// <reference path="../../idl/db.d.ts" />
var Model = require("./Model");
var CatalogModel = require("./CatalogModel");

var Streets = (function () {
    /**
    * @param territorialsignsstreets Name of map table with sign and streets.
    */
    function Streets(streets, territorialsigns) {
        this.streets = streets;
        this.territorialsigns = territorialsigns;
        this.connect = this.streets.connect || this.territorialsigns.connect;
    }
    return Streets;
})();

module.exports = Streets;
