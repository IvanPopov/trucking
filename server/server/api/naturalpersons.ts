/// <reference path="../idl/winston.d.ts" />
/// <reference path="../idl/express.d.ts" />
/// <reference path="../idl/passport.d.ts" />
/// <reference path="../idl/db.d.ts" />

import winston = require("winston");
import express = require("express");
import passport = require("passport");

import db = require("../libs/db");
import type = require("../libs/type");

var revalidator = require("revalidator");


function init(app: express.Express, log: winston.Logger) {
	/**
	 * @api {get} /api/naturalpersons/:id Get natural person list.
	 * @apiName GetNaturalPersons
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} [brigade] Brigade unique id.
	 */
	app.get("/api/naturalpersons",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var brigade = req.query.brigade;

			if (type.isInt(brigade)) {
				db.naturalpersons.find({ id_brigade: parseInt(brigade) }, (err: Error, groups: trucking.db.INaturalPerson[]) => {
					if (err) return done(err);
					res.json(groups);
				}, req.query);
				return;
			}

			db.naturalpersons.get((err: Error, groups: trucking.db.INaturalPerson[]) => {
				if (err) return done(err);
				res.json(groups);
			}, req.query);
		});

	/**
	 * @api {get} /api/naturalpersons/brigades Get brigades list.
	 * @apiName GetBrigades
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 */
	app.get("/api/naturalpersons/brigades",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			db.naturalpersons.getBrigades((err: Error, brigades: trucking.db.IBrigade[]) => {
				if (err) return done(err);
				res.json(brigades);
			});
		});

	/**
	 * @api {get} /api/naturalpersons/:id/emails Get emails.
	 * @apiName GetNaturalPersonEmails
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} id Person unique id.
	 */
	app.get("/api/naturalpersons/:id/emails",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var id = parseInt(req.params.id) || 0;

			db.naturalpersons.getEmails(id, (err: Error, emails: trucking.db.INaturalPersonEmail[]) => {
				if (err) return done(err);
				res.json(emails);
			});
		});

	/**
	 * @api {post} /api/naturalpersons/:id/emails Create natural person email.
	 * @apiName CreateNaturalPersonEmail
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} id Person unique id.
	 * @apiParam {String} email Person unique email.
	 */
	app.post("/api/naturalpersons/:id/emails",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var id = parseInt(req.params.id) || 0;
			var check = revalidator.validate(req.body, {
				properties: {
					email: {
						type: 'string',
						format: 'email',
						required: true
					}
				}
			}, { validateFormatsStrict: true, validateFormats: true, cast: true });

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			db.naturalpersons.emails.create({ id_naturalperson: id, email: req.body.email },
				(err: Error, result) => {
					if (err) return done(err);
					res.json(201, result);
				});
		});

	/**
	 * @api {delete} /api/naturalpersons/:id/emails/:email Delete natural person email.
	 * @apiName DeleteNaturalPersonEmail
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} id Person unique id.
	 * @apiParam {String} email Person unique email.
	 */
	app.del("/api/naturalpersons/:id/emails/:email",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var id = parseInt(req.params.id) || 0;
			var email = req.params.email;


			db.naturalpersons.emails.del({ email: email },
				(err: Error, result) => {
					if (err) return done(err);
					res.json(204, null);
				});
		});

	/**
	 * @api {get} /api/naturalpersons/:id/worktypes Get worktypes.
	 * @apiName GetNaturalPersonWorkTypes
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} id Person unique id.
	 */
	app.get("/api/naturalpersons/:id/worktypes",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var id = parseInt(req.params.id) || 0;

			db.naturalpersons.getWorktypes(id, (err: Error, types: trucking.db.IWorkType[]) => {
				if (err) return done(err);
				res.json(types);
			});
		});

	/**
	 * @api {post} /api/naturalpersons/:id/worktypes Create natural person worktype.
	 * @apiName CreateNaturalPersonWorktype
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} id Person unique id.
	 * @apiParam {Integer} id_worktype Person worktype.
	 */
	app.post("/api/naturalpersons/:id/worktypes",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var id = parseInt(req.params.id) || 0;

			var check = revalidator.validate(req.body, {
				properties: {
					id_worktype: {
						type: 'integer',
						required: true
					}
				}
			});

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			db.naturalpersons.naturalpersonsworktypes.create(
				{ id_naturalperson: id, id_worktype: req.body.id_worktype },
				(err: Error, result) => {
					if (err) return done(err);
					res.json(201, result);
				});
		});

	/**
	 * @api {patch} /api/naturalpersons/:id/worktypes/:worktype Change natural person worktype.
	 * @apiName ChangeNaturalPersonWorktype
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} id Person unique id.
	 * @apiParam {Integer} worktype Person unique worktype id.
	 *
	 * @apiParam {Number} rate Rate.
	 */
	app.patch("/api/naturalpersons/:id/worktypes/:worktype",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var id = parseInt(req.params.id) || 0;
			var worktype = parseInt(req.params.worktype) || 0;

			var check = revalidator.validate(req.body, {
				properties: {
					rate: {
						type: ['number', 'null'],
						required: true
					}
				}
			}, { validateFormatsStrict: true, validateFormats: true, cast: true });

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			db.naturalpersons.naturalpersonsworktypes.patch(
				{ id_naturalperson: id, id_worktype: worktype },
				req.body,
				(err: Error, result) => {
					if (err) return done(err);
					res.json(result);
				});
		});

	/**
	 * @api {delete} /api/naturalpersons/:id/worktypes/:worktype Delete natural person worktype.
	 * @apiName DeleteNaturalPersonWorktype
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} id Person unique id.
	 * @apiParam {Integer} worktype Person unique worktype id.
	 */
	app.del("/api/naturalpersons/:id/worktypes/:worktype",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var id = parseInt(req.params.id) || 0;
			var worktype = parseInt(req.params.worktype) || 0;

			db.naturalpersons.naturalpersonsworktypes.del(
				{ id_naturalperson: id, id_worktype: worktype },
				(err: Error, result) => {
					if (err) return done(err);
					res.json(204, null);
				});
		});

	//---------------------- TOOLS BEGIN ----------------------------

	/**
	 * @api {get} /api/naturalpersons/:id/tools Get tools.
	 * @apiName GetNaturalPersonTools
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} id Person unique id.
	 */
	app.get("/api/naturalpersons/:id/tools",
		//passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var id = parseInt(req.params.id) || 0;

			db.naturalpersons.getTools(id, (err: Error, types: trucking.db.ITool[]) => {
				if (err) return done(err);
				res.json(types);
			});
		});

	/**
	 * @api {post} /api/naturalpersons/:id/tools Create natural person tool.
	 * @apiName CreateNaturalPersonTool
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} id Person unique id.
	 * @apiParam {Integer} id_tool Person tool.
	 */
	app.post("/api/naturalpersons/:id/tools",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var id = parseInt(req.params.id) || 0;

			var check = revalidator.validate(req.body, {
				properties: {
					id_tool: {
						type: 'integer',
						required: true
					}
				}
			});

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			db.naturalpersons.naturalpersonstools.create(
				{ id_naturalperson: id, id_tool: req.body.id_tool },
				(err: Error, result) => {
					if (err) return done(err);
					res.json(201, result);
				});
		});

	/**
	 * @api {patch} /api/naturalpersons/:id/tools/:tool Change natural person tool.
	 * @apiName ChangeNaturalPersonTool
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} id Person unique id.
	 * @apiParam {Integer} tool Person unique tool id.
	 *
	 * @apiParam {Number} rate Rate.
	 */
	app.patch("/api/naturalpersons/:id/tools/:tool",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var id = parseInt(req.params.id) || 0;
			var tool = parseInt(req.params.tool) || 0;

			var check = revalidator.validate(req.body, {
				properties: {
					rate: {
						type: ['number', 'null'],
						required: true
					}
				}
			}, { validateFormatsStrict: true, validateFormats: true, cast: true });

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			db.naturalpersons.naturalpersonstools.patch(
				{ id_naturalperson: id, id_tool: tool },
				req.body,
				(err: Error, result) => {
					if (err) return done(err);
					res.json(result);
				});
		});

	/**
	 * @api {delete} /api/naturalpersons/:id/tools/:tool Delete natural person tool.
	 * @apiName DeleteNaturalPersonTool
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} id Person unique id.
	 * @apiParam {Integer} tool Person unique tool id.
	 */
	app.del("/api/naturalpersons/:id/tools/:tool",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var id = parseInt(req.params.id) || 0;
			var tool = parseInt(req.params.tool) || 0;

			db.naturalpersons.naturalpersonstools.del(
				{ id_naturalperson: id, id_tool: tool },
				(err: Error, result) => {
					if (err) return done(err);
					res.json(204, null);
				});
		});

	//---------------------- TOOLS END ------------------------------


	/**
	 * @api {get} /api/naturalpersons/:id/phones Get phones.
	 * @apiName GetNaturalPersonPhones
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} id Person unique id.
	 */
	app.get("/api/naturalpersons/:id/phones",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var id = parseInt(req.params.id) || 0;

			db.naturalpersons.getPhones(id, (err: Error, phones: trucking.db.INaturalPersonPhone[]) => {
				if (err) return done(err);
				res.json(phones);
			});
		});

	function formatPhoneNumber(tel: string): string {
		if (!tel) { return ''; }

		var tel = tel.toString().trim();
		var value = tel.replace(/^\+/, '').replace(/[\-\(\)\s]/g, '');

		if (value.match(/[^0-9]+/)) {
			return null;
		}

		var country, city, number;

		switch (value.length) {
			case 10: // +1PPP####### -> C (PPP) ###-####
				country = 1;
				city = value.slice(0, 3);
				number = value.slice(3);
				break;

			case 11: // +CPPP####### -> CCC (PP) ###-####
				country = value[0];
				city = value.slice(1, 4);
				number = value.slice(4);
				break;

			case 12: // +CCCPP####### -> CCC (PP) ###-####
				country = value.slice(0, 3);
				city = value.slice(3, 5);
				number = value.slice(5);
				break;

			default:
				return null;
		}

		if (country == 1) {
			country = "";
		}

		number = number.slice(0, 3) + '-' + number.slice(3);

		return ((tel[0] === '+' ? '+' : '') + country + " (" + city + ") " + number).trim();
	};

	/**
	 * @api {post} /api/naturalpersons/:id/phones Create natural person phone.
	 * @apiName CreateNaturalPersonPhone
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} id Person unique id.
	 * @apiParam {String} phone Person unique phone.
	 */
	app.post("/api/naturalpersons/:id/phones",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var id = parseInt(req.params.id) || 0;
			var pattern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)[\d\- ]{7,10}$/;
			var phone = req.body.phone;

			var check = revalidator.validate(req.body, {
				properties: {
					phone: {
						type: 'string',
						pattern: pattern,
						required: true
					}
				}
			});

			if (!check.valid) {
				res.json(400, check);
				return;
			}


			db.naturalpersons.phones.create({ id_naturalperson: id, phone: formatPhoneNumber(phone) },
				(err: Error, result) => {
					if (err) return done(err);
					res.json(201, result);
				});
		});

	/**
	 * @api {delete} /api/naturalpersons/:id/phones/:phone Delete natural person phone.
	 * @apiName DeleteNaturalPersonPhone
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} id Person unique id.
	 * @apiParam {String} phone Person unique phone.
	 */
	app.del("/api/naturalpersons/:id/phones/:phone",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var id = parseInt(req.params.id) || 0;
			var phone = req.params.phone;


			db.naturalpersons.phones.del({ phone: phone },
				(err: Error, result) => {
					if (err) return done(err);
					res.json(204, null);
				});
		});

	/**
	 * @api {get} /api/naturalpersons/:id Get natural person by id.
	 * @apiName GetNaturalPersonById
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} id Person unique id.
	 */
	/**
	 * @api {get} /api/naturalpersons/:passport Get natural person by passport.
	 * @apiName GetNaturalPersonByPassport
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 * @apiParam {String} passport Passport serial and number in format 0000-000000.
	 *
	 */
	app.get("/api/naturalpersons/:id",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var cond = {};
			var id = req.params.id;
			var pass;

			//search by id
			if (type.isInt(id)) {
				cond["id_naturalperson"] = parseInt(id);
				db.naturalpersons.findRow(cond, (err: Error, person: trucking.db.INaturalPerson) => {
					if (err) return done(err);
					if (!person)
						return res.json(404, { error: "Person not found." });
					res.json(person);
				});
			}
			else if (pass = id.match(/^(\d{4})\-(\d{6})$/)) { //search pass serial-number
				db.naturalpersons.findByPassport(parseInt(pass[1]), parseInt(pass[2]), (err: Error, person: trucking.db.INaturalPerson) => {
					if (err) return done(err);
					if (!person)
						return res.json(404, { error: "Person not found." });
					res.json(person);
				});
			}
			else {
				return res.json(400, { error: "Invalid user id or pass number used." });
			}
		});

	/**
	 * @api {post} /api/naturalpersons/:id Create person.
	 * @apiName CreateNaturalPerson
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 * 
	 *
	 * @apiParam {String} [name]
	 * @apiParam {Integer} [pass_serial] 
	 * @apiParam {Integer} [pass_number]
	 * @apiParam {String} [pass_issued] 
	 * @apiParam {Integer} [card_number] 
	 * @apiParam {String} [requisites_comment] 
	 * @apiParam {Integer} [id_leading_type_of_work] 
	 * @apiParam {String} [address] 
	 * @apiParam {Integer} [id_metro] 
	 * @apiParam {Integer} [id_brigade] 
	 * @apiParam {Date} [DOB] 
	 * @apiParam {Date} [date_of_employment] 
	 * @apiParam {Integer} [status] 
	 * @apiParam {Boolean} [fired] 
	 * @apiParam {String} [firing_comments] 
	 * @apiParam {String} [clothing_size] 
	 * @apiParam {Number} [height] 
	 *
	 * @apiSuccessStructure Created
	 */
	app.post("/api/naturalpersons",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var check = revalidator.validate(req.body, {
				properties: {
					name: {
						type: ['string', 'null'],
						maxLength: 256,
						minLength: 3,
						allowEmpty: false,
						required: false,
						pattern: '^([a-zA-Zа-яА-Я]{2,}\\s*)+$'
					},
					pass_serial: {
						type: ['integer', 'null'],
						exclusiveMinimum: 1,
						exclusiveMaximum: 9999,
						required: false,
						allowEmpty: true
					},
					pass_number: {
						type: ['integer', 'null'],
						exclusiveMinimum: 1,
						exclusiveMaximum: 999999,
						required: false,
						allowEmpty: true
					},
					pass_issued: {
						type: ['string', 'null'],
						maxLength: 256,
						required: false,
						allowEmpty: true
					},
					card_number: {
						type: 'any',
						conform: (x) => (x === null || (parseInt(x) > 1000000000000 && parseInt(x) < 9999999999999999)),
						required: false,
						allowEmpty: true
					},
					requisites_comment: {
						type: ['string', 'null'],
						maxLength: 256,
						required: false
					},
					id_leading_type_of_work: {
						type: ['integer', 'null'],
						required: false
					},
					address: {
						type: ['string', 'null'],
						maxLength: 256,
						required: false
					},
					id_metro: {
						type: ['integer', 'null'],
						required: false
					},
					id_brigade: {
						type: ['integer', 'null'],
						required: false
					},
					DOB: {
						type: ['string', 'null'],
						conform: (v) => v === null || Date.parse(v) !== NaN,
						required: false
					},
					date_of_employment: {
						type: ['string', 'null'],
						conform: (v) => v === null || Date.parse(v) !== NaN,
						required: false,
						default: new Date
					},
					//FIXME: this field will be removed !!
					status: {
						type: ['integer', 'null'],
						maxLength: 4,
						required: false
					},
					fired: {
						type: 'boolean',
						required: false,
						default: false
					},
					firing_comments: {
						type: ['string', 'null'],
						maxLength: 256,
						required: false
					},
					clothing_size: {
						type: ['string', 'null'],
						maxLength: 45,
						required: false
					},
					height: {
						type: ['number', 'null'],
						required: true,
						exclusiveMinimum: 60,
						exclusiveMaximum: 250
					}
				}
			}, { validateFormatsStrict: true, validateFormats: true, cast: true });

			if (!check.valid) {
				res.json(400, check);
				return;
			}

			var person: trucking.db.INaturalPerson = req.body;

			person.date_of_employment = person.date_of_employment || new Date;
			person.fired = type.isDef(person.fired) ? person.fired : false;
			person.id_employee = req.user.id_employee;
			person.DOB = new Date(Date.parse(<any>person.DOB));

			if (type.isString(person.card_number)) {
				person.card_number = parseInt(<any>person.card_number);
			}

			db.naturalpersons.create(person, (e: Error, result) => {
				if (e) return done(e);
				res.json(201, result);
			});
		});

	/**
	 * @api {patch} /api/naturalpersons/:id Change natural person by id.
	 * @apiName ChangeNaturalPersonById
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 * 
	 * @apiParam {Integer} id Id.
	 *
	 * @apiParam {String} [name]
	 * @apiParam {Integer} [pass_serial] 
	 * @apiParam {Integer} [pass_number]
	 * @apiParam {String} [pass_issued] 
	 * @apiParam {Integer} [card_number] 
	 * @apiParam {String} [requisites_comment] 
	 * @apiParam {Integer} [id_leading_type_of_work] 
	 * @apiParam {String} [address] 
	 * @apiParam {Integer} [id_metro] 
	 * @apiParam {Integer} [id_brigade] 
	 * @apiParam {Date} [DOB] 
	 * @apiParam {Date} [date_of_employment] 
	 * @apiParam {Integer} [status] 
	 * @apiParam {Boolean} [fired] 
	 * @apiParam {String} [firing_comments] 
	 * @apiParam {String} [clothing_size] 
	 * @apiParam {Number} [height] 
	 *
	 * @apiSuccessStructure Patched
	 */
	/**
	 * @api {patch} /api/naturalpersons/:passport Change natural person passport.
	 * @apiName ChangeNaturalPersonByPassport
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 * 
	 * @apiParam {String} passport Passport serial/number if romat 0000-000000.
	 *
	 * @apiParam {String} [name]
	 * @apiParam {Integer} [pass_serial] 
	 * @apiParam {Integer} [pass_number]
	 * @apiParam {String} [pass_issued] 
	 * @apiParam {Integer} [card_number] 
	 * @apiParam {String} [requisites_comment] 
	 * @apiParam {Integer} [id_leading_type_of_work] 
	 * @apiParam {String} [address] 
	 * @apiParam {Integer} [id_metro] 
	 * @apiParam {Integer} [id_brigade] 
	 * @apiParam {Date} [DOB] 
	 * @apiParam {Date} [date_of_employment] 
	 * @apiParam {Integer} [status] 
	 * @apiParam {Boolean} [fired] 
	 * @apiParam {String} [firing_comments] 
	 * @apiParam {String} [clothing_size] 
	 * @apiParam {Number} [height] 
	 *
	 * @apiSuccessStructure Patched
	 */
	app.patch("/api/naturalpersons/:id",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var pass;
			var id = req.params.id;

			var check = revalidator.validate(req.body, {
				properties: {
					name: {
						type: ['string', 'null'],
						maxLength: 256,
						minLength: 3,
						allowEmpty: false,
						pattern: '^([a-zA-Zа-яА-Я]{2,}\\s*)+$'
					},
					pass_serial: {
						type: ['integer', 'null'],
						exclusiveMinimum: 1,
						exclusiveMaximum: 9999,
						allowEmpty: true
					},
					pass_number: {
						type: ['integer', 'null'],
						exclusiveMinimum: 1,
						exclusiveMaximum: 999999,
						allowEmpty: true
					},
					pass_issued: {
						type: ['string', 'null'],
						maxLength: 256,
					},
					card_number: {
						type: 'any',
						conform: (x) => (x === null || (parseInt(x) > 1000000000000 && parseInt(x) < 9999999999999999)),
						allowEmpty: true
					},
					requisites_comment: {
						type: ['string', 'null'],
						maxLength: 256,
					},
					id_leading_type_of_work: {
						type: ['integer', 'null'],
					},
					address: {
						type: ['string', 'null'],
						maxLength: 256,
					},
					id_metro: {
						type: ['integer', 'null'],
					},
					id_brigade: {
						type: ['integer', 'null'],
					},
					DOB: {
						type: ['string', 'null'],
						conform: (v) => v === null || Date.parse(v) !== NaN,
					},
					date_of_employment: {
						type: ['string', 'null'],
						conform: (v) => v === null || Date.parse(v) !== NaN,
					},
					status: {
						type: ['integer', 'null'],
						maxLength: 4,
					},
					fired: {
						type: 'boolean',
					},
					firing_comments: {
						type: ['string', 'null'],
						maxLength: 256,
					},
					clothing_size: {
						type: ['string', 'null'],
						maxLength: 45,
					},
					height: {
						type: ['number', 'null'],
						exclusiveMinimum: 60,
						exclusiveMaximum: 250
					}
				}
			}, { validateFormatsStrict: true, validateFormats: true, cast: true });

			if (!check.valid) {
				console.log(req.body);
				res.json(400, check);
				return;
			}

			var person: trucking.db.INaturalPerson = req.body;

			if (type.isString(person.card_number)) {
				person.card_number = parseInt(<any>person.card_number);
			}

			if (type.isDef(person.DOB)) {
				person.DOB = new Date(Date.parse(<any>person.DOB));
			}

			if (type.isInt(id)) {
				db.naturalpersons.patch({ id_naturalperson: id }, req.body, (err, result) => {
					if (err) return done(err);
					res.json(result);
				});
			}
			else if (pass = id.match(/^(\d{4})\-(\d{6})$/)) {
				db.naturalpersons.patchByPassport(parseInt(pass[1]), parseInt(pass[2]), req.body,
					(err: MysqlError, result) => {
						if (err) return done(err);
						res.json(result);
					});
			}
			else {
				res.json(400, { error: "Invalid user id or pass serial/number." });
			}
		});

	/**
	 * @api {delete} /api/naturalpersons/:id Delete person by id.
	 * @apiName DeleteNaturalPersonById
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 * @apiParam {Integer} id Person unique id.
	 *
	 * @apiSuccessStructure Deleted
	 */
	/**
	 * @api {delete} /api/naturalpersons/:passport Delete person by passport.
	 * @apiName DeleteNaturalPersonByPassport
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 * @apiParam {Passport} passport Person passport in format 0000-000000.
	 *
	 * @apiSuccessStructure Deleted
	 */
	app.del("/api/naturalpersons/:id",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			var pass;
			var id = req.params.id;

			if (type.isInt(id)) {
				db.naturalpersons.del({ id_naturalperson: parseInt(id) },
					(err: MysqlError) => {
						if (err) return done(err);
						res.json(204, null);
					});
			}
			else if (pass = id.match(/^(\d{4})\-(\d{6})$/)) {
				db.naturalpersons.delByPassport(parseInt(pass[1]), parseInt(pass[2]),
					(err: MysqlError) => {
						if (err) return done(err);
						res.json(204, null);
					});
			}
			else {
				res.json(400, { error: "Invalid user id or pass serial/number." });
			}
		});

	/**
	 * @api {get} /api/naturalpersons/search/:query Search natural persons.
	 * @apiDescription
	 * <span class="alert alert-error">Experimental API. Search occurs in the fields: name, pass_serial, pass_number, id_naturalperson</span>
	 *
	 * @apiName SearchNaturalPersons
	 * @apiGroup NaturalPersons
	 * @apiPermission emploee
	 *
	 * @apiParam {String} query Query string.
	 *
	 */
	app.get("/api/naturalpersons/search/:query",
		passport.authenticate("bearer", { session: false }),
		(req, res, done) => {
			db.naturalpersons.search(req.params.query, (e: Error, persons) => {
				if (e) return done(e);
				res.json(persons);
			});
		});
}

export = init;
