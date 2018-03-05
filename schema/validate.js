var Joi = require('joi'),
    util = require('util'),
    _ = require('lodash');

var schema = require('./schema');

var BadRequestError = function (errors) {
    Error.captureStackTrace(this, this.constructor);
    this.name = 'BadRequestError';
    this.message = 'Bad Request Error';
    this.errors = errors;
};

util.inherits(BadRequestError, Error);

var validate = function () {
    return function (req, res, next) {
        var body = _.extend({}, req.body);
        delete body.access_token; //remove access token for api calls

        Joi.validate(body, schema.sendmail, {abortEarly: false}, function (err, schemaResult) {
            if (err) {
                var details = [];
                err.details.forEach(function (d) {
                    details.push({message: d.message, path: d.path});
                });

                res.status(400);
                res.send('Bad Request');
            }else{
                req.schema = schemaResult;
                return next();
            }
        });
    }
};

module.exports = {
    validate: validate,
    BadRequestError: BadRequestError
};
