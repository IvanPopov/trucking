var setups = {
	HOST: "https://localhost:3000",
	USERNAME: "admin@example.org",
	PASSWORD: "admin",
	CLIENT_ID: "web_v1",
	CLIENT_SECRET: "abc123456",

	path: (path): string => {
		return setups.HOST + path;
	},

	authHeader: (grant: IOAuth2Grant) => {
		return { "Authorization": ("Bearer " + grant.access_token) };
	}
};

//do not reject self-signed cert
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export = setups;
