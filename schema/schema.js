var Joi = require('joi');

module.exports = {
    sendmail: Joi.object().keys({
        sender: Joi.string().email(),
        recipients: Joi.array().items(
            Joi.string().email()
        ).required(),

        carboncopys: Joi.array().items(
            Joi.string().email()
        ).optional(),

        blindcarboncopys: Joi.array().items(
            Joi.string().email()
        ).optional(),

        subject: Joi.string().required(),
        text: Joi.string().optional()
    }),
};
