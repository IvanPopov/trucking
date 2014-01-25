
import crypto = require('crypto');

module db {

	export class User {
		id: number;
		name: string;
		hashedPassword: string;
		salt: string;
		created: Date;

		private _plainPassword: string = null;

		encryptPassword(password: string): string {
			return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
			//more secure - return crypto.pbkdf2Sync(password, this.salt, 10000, 512);
		}

		checkPassword(password) {
			return this.encryptPassword(password) === this.hashedPassword;
		}

		get password(): string {
			return this._plainPassword;
		}

		set password(password: string) {
			this._plainPassword = password;
			this.salt = crypto.randomBytes(32).toString('base64');
			//more secure - this.salt = crypto.randomBytes(128).toString('base64');
			this.hashedPassword = this.encryptPassword(password);
		}
	}


	export class UserModel {
		users: User[] = [];

		constructor() {
			var user = new User;
			user.id = 1;
			user.name = "andrey";
			user.password = "simplepassword";
			user.created = new Date;

			this.users.push(user);
		}

		findByName(username: string, callback: (err: Error, user: User) => void): void {
			if (this.users[0].name === username) {
				return callback(null, this.users[0]);
			}

			callback(new Error("User not found"), null);
		}

		findById(id: number, callback: (err: Error, user: User) => void): void {
			if (this.users[0].id === id) {
				return callback(null, this.users[0]);
			}

			callback(new Error("User not found"), null);
		}
	}



	export class Token {
		constructor(public token: string, public clientId: string, public userId: number, public created: Date = new Date) {

		}
	}


	export class TokenModel {
		tokens: Token[] = [];

		remove(userId: number, clientId: string, callback: (err: Error) => void): void {
			this.tokens.forEach((value: Token, i: number, tokens: Token[]) => {
				if (value.userId === userId || value.clientId === clientId) {
					tokens.splice(i, 1);
					return callback(null);
				}
			});

			callback(null);
		}

		removeByValue(token: string, callback: (err: Error) => void): void {
			this.tokens.forEach((value: Token, i: number, tokens: Token[]) => {
				if (value.token === token) {
					tokens.splice(i, 1);
					return callback(null);
				}
			});

			callback(null);
		}

		save(token: Token, callback: (err: Error) => void): void {
			this.tokens.push(token);
			callback(null);
		}

		findByValue(tokenValue: string, callback: (err: Error, token: Token) => void): void {
			this.tokens.forEach((value: Token, i: number, tokens: Token[]) => {
				if (value.token === tokenValue) {
					return callback(null, value);
				}
			});

			callback(new Error("Token not found"), null);
		}
	}


	export class Client {
		name: string;
		id: string;
		secret: string;
	}

	export class ClientModel {
		clients: Client[] = [];

		constructor() {
			var client = new Client;
			client.name = "OurService iOS client v1";
			client.id = "mobileV1";
			client.secret = "abc123456";

			this.clients.push(client);
		}

		findById(id: string, callback: (err: Error, user: Client) => void): void {
			if (this.clients[0].id === id) {
				return callback(null, this.clients[0]);
			}

			callback(new Error("Client not found"), null);
		}
	}

	export var clients: ClientModel = new ClientModel;
	export var users = new UserModel;
	export var accessTokens = new TokenModel;
	export var refreshTokens = new TokenModel;

}


export = db;