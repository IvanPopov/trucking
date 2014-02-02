declare module "oauth2orize" {
	export function createServer(): any;
	export var exchange: {
		refreshToken: (
		fn: (client: any,
		refreshToken: string,
		scope: any,
		done: (err: Error, tokenValue: string, refreshTokenValue, tokenInfo: any) => void) => void) => void;

		password: (fn: (client, username, passowrd, scope, done) => void) => void;
	};
}