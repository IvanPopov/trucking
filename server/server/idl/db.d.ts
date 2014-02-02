declare module trucking.db {

	interface IEmployee {
		id_employee: number;
		name: string;
		email: string;
		hashed_password: string;
		salt: string;
		permissions: number;
		created?: number;
	}

	interface IToken {
		id_employee: number;
		id_clientapp: string;
		value: string;
		created?: number;
	}

	interface IClientApp {
		id_client: string;
		name: string;
		secret: string;
	}


	///Catelogs

	interface IMetroBranch {
		id_metrobranch: number;
		name: string;
		color: number;
		stations?: IMetro[];
	}

	interface IMetro {
		id_metro: number;
		id_metrobranch: number;
		station: string;
	}

	interface IStreet {
		id_street: number;
		name: string;
		comment: string;
	}

	interface ITerritorialSign {
		id_territorialsign: number;
		name: string;
	}

	interface ITool {
		id_tool: number;
		name: string;
		description: string;
	}

	interface IWorkType {
		id_worktype;
		short_name: string;
		name: string;
		description: string;
	}

	///////////////////

	interface IQueryCond {
		//number of rowns 
		count?: number;
		//select from row with number...
		from?: number;
	}
}
