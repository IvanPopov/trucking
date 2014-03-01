
interface MysqlError extends Error {
	code: any;
}

interface IMap<T> {
	[key: string]: T;
}

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


	///Catalogs

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

		unit: string;
		rate: number;

		unit_sec: number;
		rate_sec: number;

		id_toolgroup: number;
	}

	interface IToolGroup {
		id_toolgroup: number;
		name: string;
	}

	interface IUnit {
		unit: string;
		description: string;
	}

	interface IPaymentTerm {
		id_prepaymentterm: number;
		terms: string;
		description: string;
	}

	interface IPrepaymentTerm {
		id_prepaymentterm: number;
		terms: string;
		description: string;
	}

	interface IСonditionOfWork {
		id_сonditionofwork: number;
		terms: string;
		description: string;
	}

	interface IAddressType {
		id_addresstype: number;
		type: string;
		description: string;
	}

	interface IHolding {
		id_holding: number;
		name: string;
		short_name: string;
	}

	interface IWorkType {
		id_worktype: number;
		name: string;
		short_name: string;
		unit: string;
		rate: number;
		type: number; //0 - услуга, 1 - товар
		id_worktypegroup: number;
	}

	interface IWorkTypeGroup {
		id_nomenclaturegroup: number;
		name: string;
	}

	//соответствие между таблицами WorkTypes и Tools
	//т.е. какие инструменты закреплены за типом работ
	interface IWorkTypeTool {
		id_worktype: number;
		id_tool: number;
	}

	interface IContractor {
		id_contractor: number;
		id_holding: number;
		id_employee: number;
		name: string;
		short_name: string;

		id_contractortype: number; // 0 - клиент, 1 - клиент

	}

	interface IContractorType {
		id_contractortype: number;
		name: string;
	}

	///////////////////

	interface IQueryCond {
		//number of rowns 
		count?: number;
		//select from row with number...
		from?: number;
	}
}