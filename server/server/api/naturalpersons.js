/// <reference path="../idl/winston.d.ts" />
/// <reference path="../idl/express.d.ts" />
/// <reference path="../idl/passport.d.ts" />
/// <reference path="../idl/db.d.ts" />
var express = require("express");
var passport = require("passport");

var db = require("../libs/db");
var type = require("../libs/type");

var revalidator = require("revalidator");

function init(app, log) {
    /**
    * @api {get} /api/naturalpersons/:id Get natural person list.
    * @apiName GetNaturalPersons
    * @apiGroup NaturalPersons
    * @apiPermission emploee
    *
    * @apiParam {Integer} [brigade] Brigade unique id.
    */
    app.get("/api/naturalpersons", passport.authenticate("bearer", { session: false }), function (req, res, done) {
        var brigade = req.query.brigade;

        if (type.isInt(brigade)) {
            db.naturalpersons.find({ id_brigade: parseInt(brigade) }, function (err, groups) {
                if (err)
                    return done(err);
                res.json(groups);
            }, req.query);
            return;
        }

        db.naturalpersons.get(function (err, groups) {
            if (err)
                return done(err);
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
    app.get("/api/naturalpersons/brigades", passport.authenticate("bearer", { session: false }), function (req, res, done) {
        db.naturalpersons.getBrigades(function (err, brigades) {
            if (err)
                return done(err);
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
    app.get("/api/naturalpersons/:id/emails", passport.authenticate("bearer", { session: false }), function (req, res, done) {
        var id = parseInt(req.params.id) || 0;

        db.naturalpersons.getEmails(id, function (err, emails) {
            if (err)
                return done(err);
            res.json(emails);
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
    app.get("/api/naturalpersons/:id/worktypes", passport.authenticate("bearer", { session: false }), function (req, res, done) {
        var id = parseInt(req.params.id) || 0;

        db.naturalpersons.getWorktypes(id, function (err, types) {
            if (err)
                return done(err);
            res.json(types);
        });
    });

    /**
    * @api {get} /api/naturalpersons/:id/phones Get phones.
    * @apiName GetNaturalPersonPhones
    * @apiGroup NaturalPersons
    * @apiPermission emploee
    *
    * @apiParam {Integer} id Person unique id.
    */
    app.get("/api/naturalpersons/:id/phones", passport.authenticate("bearer", { session: false }), function (req, res, done) {
        var id = parseInt(req.params.id) || 0;

        db.naturalpersons.getPhones(id, function (err, phones) {
            if (err)
                return done(err);
            res.json(phones);
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
    app.get("/api/naturalpersons/:id", passport.authenticate("bearer", { session: false }), function (req, res, done) {
        var cond = {};
        var id = req.params.id;
        var pass;

        //search by id
        if (type.isInt(id)) {
            cond["id_naturalperson"] = parseInt(id);
            db.naturalpersons.findRow(cond, function (err, person) {
                if (err)
                    return done(err);
                if (!person)
                    return res.json(404, { error: "Person not found." });
                res.json(person);
            });
        } else if (pass = id.match(/^(\d{4})\-(\d{6})$/)) {
            db.naturalpersons.findByPassport(parseInt(pass[1]), parseInt(pass[2]), function (err, person) {
                if (err)
                    return done(err);
                if (!person)
                    return res.json(404, { error: "Person not found." });
                res.json(person);
            });
        } else {
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
    * @apiParam {String} name
    * @apiParam {Integer} [pass_serial]
    * @apiParam {Integer} [pass_number]
    * @apiParam {String} [pass_issued]
    * @apiParam {Integer} [card_number]
    * @apiParam {String} [requisites_comment]
    * @apiParam {Integer} [id_leading_type_of_work]
    * @apiParam {String} address
    * @apiParam {Integer} id_metro
    * @apiParam {Integer} [id_brigade]
    * @apiParam {Date} DOB
    * @apiParam {Date} [date_of_employment]
    * @apiParam {Integer} [status]
    * @apiParam {Boolean} [fired]
    * @apiParam {String} [firing_comments]
    * @apiParam {String} [clothing_size]
    * @apiParam {Number} height
    *
    * @apiSuccessStructure Created
    */
    app.post("/api/naturalpersons", passport.authenticate("bearer", { session: false }), function (req, res, done) {
        var check = revalidator.validate(req.body, {
            properties: {
                name: {
                    type: 'string',
                    maxLength: 256,
                    minLength: 3,
                    allowEmpty: false,
                    required: true,
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
                    conform: function (x) {
                        return (x === null || (parseInt(x) > 1000000000000 && parseInt(x) < 9999999999999999));
                    },
                    required: false,
                    allowEmpty: true
                },
                requisites_comment: {
                    type: 'string',
                    maxLength: 256,
                    required: false
                },
                id_leading_type_of_work: {
                    type: 'integer',
                    required: false
                },
                address: {
                    type: 'string',
                    maxLength: 256,
                    required: true
                },
                id_metro: {
                    type: 'integer',
                    required: true
                },
                id_brigade: {
                    type: ['integer', 'null'],
                    required: false
                },
                DOB: {
                    type: 'string',
                    conform: function (v) {
                        return Date.parse(v) !== NaN;
                    },
                    required: true
                },
                date_of_employment: {
                    type: 'string',
                    conform: function (v) {
                        return Date.parse(v) !== NaN;
                    },
                    required: false,
                    default: new Date
                },
                status: {
                    type: 'integer',
                    maxLength: 4,
                    required: false
                },
                fired: {
                    type: 'boolean',
                    required: false,
                    default: false
                },
                firing_comments: {
                    type: 'string',
                    maxLength: 256,
                    required: false
                },
                clothing_size: {
                    type: 'string',
                    maxLength: 45,
                    required: false
                },
                height: {
                    type: 'number',
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

        var person = req.body;

        person.date_of_employment = person.date_of_employment || new Date;
        person.fired = type.isDef(person.fired) ? person.fired : false;
        person.id_employee = req.user.id_employee;
        person.DOB = new Date(Date.parse(person.DOB));

        if (type.isString(person.card_number)) {
            person.card_number = parseInt(person.card_number);
        }

        db.naturalpersons.create(person, function (e, result) {
            if (e)
                return done(e);
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
    app.patch("/api/naturalpersons/:id", passport.authenticate("bearer", { session: false }), function (req, res, done) {
        var pass;
        var id = req.params.id;

        var check = revalidator.validate(req.body, {
            properties: {
                name: {
                    type: 'string',
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
                    type: 'string',
                    maxLength: 256
                },
                card_number: {
                    type: 'any',
                    conform: function (x) {
                        return (x === null || (parseInt(x) > 1000000000000 && parseInt(x) < 9999999999999999));
                    },
                    allowEmpty: true
                },
                requisites_comment: {
                    type: 'string',
                    maxLength: 256
                },
                id_leading_type_of_work: {
                    type: 'integer'
                },
                address: {
                    type: 'string',
                    maxLength: 256
                },
                id_metro: {
                    type: 'integer'
                },
                id_brigade: {
                    type: ['integer', 'null']
                },
                DOB: {
                    type: 'string',
                    conform: function (v) {
                        return Date.parse(v) !== NaN;
                    }
                },
                date_of_employment: {
                    type: 'string',
                    conform: function (v) {
                        return Date.parse(v) !== NaN;
                    }
                },
                status: {
                    type: 'integer',
                    maxLength: 4
                },
                fired: {
                    type: 'boolean'
                },
                firing_comments: {
                    type: 'string',
                    maxLength: 256
                },
                clothing_size: {
                    type: 'string',
                    maxLength: 45
                },
                height: {
                    type: 'number',
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

        var person = req.body;

        if (type.isString(person.card_number)) {
            person.card_number = parseInt(person.card_number);
        }

        if (type.isDef(person.DOB)) {
            person.DOB = new Date(Date.parse(person.DOB));
        }

        if (type.isInt(id)) {
            db.naturalpersons.patch({ id_naturalperson: id }, req.body, function (err, result) {
                if (err)
                    return done(err);
                res.json(result);
            });
        } else if (pass = id.match(/^(\d{4})\-(\d{6})$/)) {
            db.naturalpersons.patchByPassport(parseInt(pass[1]), parseInt(pass[2]), req.body, function (err, result) {
                if (err)
                    return done(err);
                res.json(result);
            });
        } else {
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
    app.del("/api/naturalpersons/:id", passport.authenticate("bearer", { session: false }), function (req, res, done) {
        var pass;
        var id = req.params.id;

        if (type.isInt(id)) {
            db.naturalpersons.del({ id_naturalperson: parseInt(id) }, function (err) {
                if (err)
                    return done(err);
                res.json(204, null);
            });
        } else if (pass = id.match(/^(\d{4})\-(\d{6})$/)) {
            db.naturalpersons.delByPassport(parseInt(pass[1]), parseInt(pass[2]), function (err) {
                if (err)
                    return done(err);
                res.json(204, null);
            });
        } else {
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
    app.get("/api/naturalpersons/search/:query", passport.authenticate("bearer", { session: false }), function (req, res, done) {
        db.naturalpersons.search(req.params.query, function (e, persons) {
            if (e)
                return done(e);
            res.json(persons);
        });
    });
}

module.exports = init;
