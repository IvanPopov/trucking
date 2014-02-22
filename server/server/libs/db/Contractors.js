/// <reference path="../../idl/mysql.d.ts" />
/// <reference path="../../idl/node.d.ts" />
/// <reference path="../../idl/db.d.ts" />
var Model = require("./Model");
var CatalogModel = require("./CatalogModel");

var Contractors = (function () {
    function Contractors(contractors, holdings) {
        this.contractors = contractors;
        this.holdings = holdings;
        this.connect = this.contractors.connect || this.holdings.connect;
    }
    Contractors.prototype.getHolding = function (idContractor, cb) {
        //this.connect.query("")
    };
    return Contractors;
})();

module.exports = Contractors;
