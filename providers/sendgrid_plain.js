
var request = require('request')
var config = require('config')
// var apiBaseUrl = 'https://api.mailgun.net/v3/sandbox122a6c78db1f4e6697058cf991e6bd7b.mailgun.org';
// var apiKey     = 'key-1758fe0977b8932e43aafd24f5f262bd';
// var from       = 'recursioner@gmail.com';
// var to         = 'recursioner@gmail.com';
// var subject    = 'Hello';
// var text       = 'Testing some Mailgun awesomness!';

const reducer = function(acc, cur, i){acc[i]={email: cur}; return acc};

var send = function() {
    return function(req, res, next) {
        var recipients = req.body.recipients && req.body.recipients.reduce(reducer, []);
        var carboncopys = req.body.carboncopys && req.body.carboncopys.reduce(reducer, []);
        var blindcarboncopys = req.body.blindcarboncopys && req.body.blindcarboncopys.reduce(reducer, []);

        var personalization = {"subject": req.body.subject, "to": recipients};
        
        var jsonData = {};
        jsonData["personalizations"] = [];
        jsonData["personalizations"].push(personalization);
        jsonData["from"] = {"email": req.body.sender};
        jsonData["content"] = [];
        jsonData["content"].push({"type": "text/plain", "value": req.body.text});
        

        
        var mail = {
            url: config.get('sendgrid.apiBaseUrl'),
            headers: {
                Authorization: 'Bearer ' + config.get('sendgrid.apiKey'),
            },
            json: jsonData
            // json: {
            //     "personalizations": [
            //       {
            //         "subject": req.body.subject,
            //         "to": recipients,
            //         "cc": carboncopys,
            //         "bcc": blindcarboncopys
            //       }
            //     ],
            //     "from": {
            //       "email": req.body.sender
            //     },
            //     "content": [
            //       {
            //         "type": "text/plain",
            //         "value": req.body.text
            //       }
            //     ]
            //   }
        };
        
        request.post(mail, function(err, response, body) {
            if(err){
                // failover to other mail service
                console.log(err);
                next();
            }else{
                console.log(response);
                console.log(body)
                res.send('Dilivered by SendGrid!')
            }
        });
        
    }
}

module.exports = {send: send}
