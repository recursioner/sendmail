
var request = require('request')
var config = require('config')
// var apiBaseUrl = 'https://api.mailgun.net/v3/sandbox122a6c78db1f4e6697058cf991e6bd7b.mailgun.org';
// var apiKey     = 'key-1758fe0977b8932e43aafd24f5f262bd';
// var from       = 'recursioner@gmail.com';
// var to         = 'recursioner@gmail.com';
// var subject    = 'Hello';
// var text       = 'Testing some Mailgun awesomness!';

var send = function() {
    return function(req, res, next) {
        var mailgunOpts = {
            url: config.get('mailgun.apiBaseUrl') + '/messages',
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
        
        request.post(mailgunOpts, function(err, response, body) {
            if(err){
                // failover to other mail service
                console.log(err);
                next();
            }else{
                console.log(response);
                console.log(body)
                res.send('Dilivered by MailGun!')
            }
        });
        
    }
}

module.exports = {send: send}
