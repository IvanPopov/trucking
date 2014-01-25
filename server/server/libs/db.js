var crypto = require('crypto');

var db;
(function (db) {
    var User = (function () {
        function User() {
            this._plainPassword = null;
        }
        User.prototype.encryptPassword = function (password) {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
            //more secure - return crypto.pbkdf2Sync(password, this.salt, 10000, 512);
        };

        User.prototype.checkPassword = function (password) {
            return this.encryptPassword(password) === this.hashedPassword;
        };

        Object.defineProperty(User.prototype, "password", {
            get: function () {
                return this._plainPassword;
            },
            set: function (password) {
                this._plainPassword = password;
                this.salt = crypto.randomBytes(32).toString('base64');

                //more secure - this.salt = crypto.randomBytes(128).toString('base64');
                this.hashedPassword = this.encryptPassword(password);
            },
            enumerable: true,
            configurable: true
        });

        return User;
    })();
    db.User = User;

    var UserModel = (function () {
        function UserModel() {
            this.users = [];
            var user = new User;
            user.id = 1;
            user.name = "andrey";
            user.password = "simplepassword";
            user.created = new Date;

            this.users.push(user);
        }
        UserModel.prototype.findByName = function (username, callback) {
            if (this.users[0].name === username) {
                return callback(null, this.users[0]);
            }

            callback(new Error("User not found"), null);
        };

        UserModel.prototype.findById = function (id, callback) {
            if (this.users[0].id === id) {
                return callback(null, this.users[0]);
            }

            callback(new Error("User not found"), null);
        };
        return UserModel;
    })();
    db.UserModel = UserModel;

    var Token = (function () {
        function Token(token, clientId, userId, created) {
            if (typeof created === "undefined") { created = new Date; }
            this.token = token;
            this.clientId = clientId;
            this.userId = userId;
            this.created = created;
        }
        return Token;
    })();
    db.Token = Token;

    var TokenModel = (function () {
        function TokenModel() {
            this.tokens = [];
        }
        TokenModel.prototype.remove = function (userId, clientId, callback) {
            this.tokens.forEach(function (value, i, tokens) {
                if (value.userId === userId || value.clientId === clientId) {
                    tokens.splice(i, 1);
                    return callback(null);
                }
            });

            callback(null);
        };

        TokenModel.prototype.removeByValue = function (token, callback) {
            this.tokens.forEach(function (value, i, tokens) {
                if (value.token === token) {
                    tokens.splice(i, 1);
                    return callback(null);
                }
            });

            callback(null);
        };

        TokenModel.prototype.save = function (token, callback) {
            this.tokens.push(token);
            callback(null);
        };

        TokenModel.prototype.findByValue = function (tokenValue, callback) {
            this.tokens.forEach(function (value, i, tokens) {
                if (value.token === tokenValue) {
                    return callback(null, value);
                }
            });

            callback(new Error("Token not found"), null);
        };
        return TokenModel;
    })();
    db.TokenModel = TokenModel;

    var Client = (function () {
        function Client() {
        }
        return Client;
    })();
    db.Client = Client;

    var ClientModel = (function () {
        function ClientModel() {
            this.clients = [];
            var client = new Client;
            client.name = "OurService iOS client v1";
            client.id = "mobileV1";
            client.secret = "abc123456";

            this.clients.push(client);
        }
        ClientModel.prototype.findById = function (id, callback) {
            if (this.clients[0].id === id) {
                return callback(null, this.clients[0]);
            }

            callback(new Error("Client not found"), null);
        };
        return ClientModel;
    })();
    db.ClientModel = ClientModel;

    db.clients = new ClientModel;
    db.users = new UserModel;
    db.accessTokens = new TokenModel;
    db.refreshTokens = new TokenModel;
})(db || (db = {}));

module.exports = db;
//# sourceMappingURL=db.js.map
