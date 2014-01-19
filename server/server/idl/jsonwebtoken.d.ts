declare module "jsonwebtoken" {
	export function sign(payload, secretOrPrivateKey, options): string;
}