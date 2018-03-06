'use strict';

var Joi = require('joi');

module.exports = {
    sendmail: Joi.object().keys({
        sender: Joi.string().email().required(),
        recipients: Joi.array().items(
            Joi.string().email()
        ).required().min(1),

        carboncopys: Joi.array().items(
            Joi.string().email()
        ).optional(),

        blindcarboncopys: Joi.array().items(
            Joi.string().email()
        ).optional(),

        subject: Joi.string().required(),
        text: Joi.string().required()
    }),
};
