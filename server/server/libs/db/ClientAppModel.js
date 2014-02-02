/// <reference path="../../idl/mysql.d.ts" />
/// <reference path="../../idl/node.d.ts" />
/// <reference path="../../idl/db.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Model = require("./Model");

var ClientAppModel = (function (_super) {
    __extends(ClientAppModel, _super);
    function ClientAppModel() {
        _super.apply(this, arguments);
    }
    ClientAppModel.prototype.findByID = function (id, cb) {
        this.connect.queryRow("SELECT * FROM " + this.table + " where id_client=?", id, cb);
    };
    return ClientAppModel;
})(Model);

module.exports = ClientAppModel;
//# sourceMappingURL=ClientAppModel.js.map
