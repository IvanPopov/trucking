/// <reference path="express.d.ts" />

declare module "passport" {
	import express = require("express");

	export function authenticate(
		type: string,
		options: any): express.RequestFunction;
	export function authenticate(
		types: string[],
		options: any): express.RequestFunction;

	export function initialize(): express.RequestFunction;
	export function use(opt: any): void;
}

declare module "passport-http" {
	import express = require("express");

	interface BasicStrategy {

	}

	export var BasicStrategy: {

		new (fn: (username, password, done) => void): BasicStrategy;
	};
}

declare module "passport-oauth2-client-password" {
	import express = require("express");

	interface Strategy {

	}

	export var Strategy: {

		new (fn: (username, password, done) => void): Strategy;
	};
}

declare module "passport-http-bearer" {
	import express = require("express");

	interface Strategy {

	}

	export var Strategy: {

		new (fn: (username, password, done) => void): Strategy;
	};
}