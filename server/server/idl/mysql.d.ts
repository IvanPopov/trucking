/// <reference path="node.d.ts"/>

declare module "mysql" {
	import events = require("events");
	
	function createConnection(config: any): Connection;
	function createPool(config: any);

	interface MysqlError extends Error {
		code: any;
	}

	interface QueryCallback {
		(err: any, result: any): void;
	}

	interface Field {
		Field: string;
		Type: string;
		Collation: string;
		Null: string;
		Key: string;
		Default: any;
		Extra: string;
		Privileges: string;
		Comment: string;
	}

	class Connection extends events.EventEmitter {
		// class Connection implements EventEmitter {
		static createQuery(sql, values?, cb?): any;
		connect(cb?): void;
		changeUser(options, cb): any;
		query(sql, values?, cb?: QueryCallback): void;
		ping(cb): void;
		statistics(cb): void;
		end(cb): void;
		destroy(): void;
		pause(): void;
		resume(): void;
		escape(value): string;
		format(sql, values): string;

		// // EventEmitter Interface
		// addListener(event: string, listener: Function);
		// on(event: string, listener: Function);
		// once(event: string, listener: Function): void;
		// removeListener(event: string, listener: Function): void;
		// removeAllListener(event: string): void;
		// setMaxListeners(n: number): void;
		// listeners(event: string):  {Function;}[];
		// emit(event: string, arg1?: any, arg2?: any): void;

		//mysql-utilities
		queryRow(sql, values?, cb?: QueryCallback): void;
		fields(table: string, cb: QueryCallback): void;
	}

	function escape(value): string;
	function format(sql, values?): string;
}


declare module "mysql-utilities" {
	import mysql = require("mysql");

	function upgrade(connection: mysql.Connection): void;
	function introspection(connection: mysql.Connection): void;
}