//var rp = require('request-promise')
var request = require('request');
var config = require('config')

const reducer = function(acc, cur, i){
    acc[i]={email: cur};
    return acc
};

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
        
        var options = {
            method: 'POST',
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

        // rp(options)
        // .then(function(response, body) {
        //     console.log(response);
        //     console.log(body);
        //     res.send('Diliverd by SendGrid!');
        // })
        // .catch(function(err){
        //     console.log(err);
        //     next();
        // });
        request.post(options, function(err, response, body) {
            if(err){
                // failover to other mail service
                console.log(err);
                next();
            }else{
                console.log(response.statusCode);
                console.log(body)
                if(response.statusCode >=200 && response.statusCode<=299){
                    res.send('Dilivered')
                }else{
                    next();
                }
            }
        });
    }
}

module.exports = {send: send}
