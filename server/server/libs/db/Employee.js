/// <reference path="../../idl/mysql.d.ts" />
/// <reference path="../../idl/node.d.ts" />
/// <reference path="../../idl/db.d.ts" />
var crypto = require("crypto");

var EmployeeModel = (function () {
    function EmployeeModel() {
    }
    EmployeeModel.prototype.findByName = function (name, callback) {
    };

    EmployeeModel.encryptPassword = function (password, salt) {
        return crypto.createHmac('sha1', salt).update(password).digest('hex');
    };

    /** Generate 32 byte salt. */
    EmployeeModel.salt = function () {
        return crypto.randomBytes(32).toString('base64');
    };
    return EmployeeModel;
})();

module.exports = EmployeeModel;
//# sourceMappingURL=Employee.js.map
