var rp = require('request-promise')
var config = require('config')

var send = function() {
    return function(req, res, next) {
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
        .then(function(body){
            console.log(body);
            if(body.message == 'Queued. Thank you.'){
                res.send('Dilivered by MailGun!');
            }
            next();
        })
        .catch(function(err){
            console.log(err);
            next();
        });
    }
}

module.exports = {send: send}
