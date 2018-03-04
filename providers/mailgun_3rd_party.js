var mailgun = require("mailgun-js");
var api_key = 'key-1758fe0977b8932e43aafd24f5f262bd';
var DOMAIN = 'sandbox122a6c78db1f4e6697058cf991e6bd7b.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

var send = function(){
    return function(req, res, next){
        var input = req.body;
        var data = {
            from: input.sender,
            to: input.recipients,
            cc: input.carboncopys,
            bcc: input.blindcarboncopys,
            subject: input.subject,
            text: input.text
        };
          
        mailgun.messages().send(data, function (error, body) {
            if(error){
                console.log(error);
                console.log(body);
                next();
            }else{
                res.send('Dilivered by MailGun');
            }
        });
        
    }
}

module.exports = {send: send}
