/// <reference path="../idl/nconf.d.ts" />
var nconf = require("nconf");

var Config = (function () {
    function Config() {
    }
    Config.get = function (key) {
        return nconf.get(key);
    };
    return Config;
})();

module.exports = Config;
//# sourceMappingURL=config.js.map
