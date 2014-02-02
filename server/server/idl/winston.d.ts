declare module "winston" {
	interface Transport {
	}

	interface Console extends Transport {
		json: boolean;
		colorize: boolean;
		prettyPrint: boolean;

		name: string;
		log(level, msg, meta, callback): void;
	}

	interface Transports {
		Console: {
			new (options?: any): Console;
			prototype: Console;
		};
	}

	interface Logger {
		transports: Transports;
		exitOnError: boolean;


		log(level: string, message: string, ...metadata: any[]);
		info(message: string, ...metadata: any[]);
		warn(message: string, ...metadata: any[]);
		error(message: string, ...metadata: any[]);
		debug(message: string, ...metadata: any[]);

		add(transport: Transport, options: any);
		remove(transport: Transport);

		profile(name: string);

		query(options: any, done: (err: any, results: any) => void);

		stream(options: any): any;

		handleExceptions(transport: Transport);
	}

	export var transports: Transports;

	export var Logger: {
		new (options?: {
			transports?: any;
		}): Logger;
		prototype: Logger;
	};

	//default logger
	function log(level: string, message: string, ...metadata: any[]);
	function info(message: string, ...metadata: any[]);
	function warn(message: string, ...metadata: any[]);
	function error(message: string, ...metadata: any[]);
	function debug(message: string, ...metadata: any[]);
} 
