var config = {
    HOST: "https://localhost:3000",
    OAUTH_REQUEST: require("./oauth.json"),
    path: function (path) {
        return config.HOST + path;
    }
};

//do not reject self-signed cert
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports = config;
