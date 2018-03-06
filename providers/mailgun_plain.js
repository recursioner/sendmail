'use strict';

var rp = require('request-promise');
var config = require('config');

var send = function () {
    return function (req, res, next) {
        var options = {
            method: 'POST',
            url: config.get('mailgun.apiBaseUrl'),
            headers: {
                Authorization: 'Basic ' + new Buffer('api:' + config.get('mailgun.apiKey')).toString('base64')
            },
            form: {
                from: req.body.sender,
                to: req.body.recipients,
                cc: req.body.carboncopys,
                bcc: req.body.blindcarboncopys,
                subject: req.body.subject,
                text: req.body.text
            }
        };

        rp(options)
            .then(function (body) {
                if (body.indexOf('Queued. Thank you.') >= 0) { // This is a bit tricky, may need refactor
                    res.send('Delivered');
                } else {
                    next();
                }
            })
            .catch(function (err) {
                next();
            });
    };
};

module.exports = {send: send};
