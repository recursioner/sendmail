var request = require('request');
var config = require('config')

var send = function() {
    return function(req, res, next) {
        // helper function and array for filtering duplicates
        var filterArray = [];
        const reducer = function(acc, cur){
            if(filterArray.indexOf(cur) < 0){
                acc.push({email: cur});
                filterArray.push(cur);
            }
            return acc;
        };

        var personalization = {};
        personalization.subject = req.body.subject;
        personalization.to = req.body.recipients.reduce(reducer, []);
        if(req.body.carboncopys){
            var cc = (req.body.carboncopys.reduce(reducer, []));
            if(cc.length > 0){
                personalization.cc = cc;
            }
        }
        if(req.body.blindcarboncopys){
            var bcc = (req.body.blindcarboncopys.reduce(reducer, []));
            if(bcc.length > 0){
                personalization.bcc = bcc;
            }
        }
        
        var jsonData = {};
        jsonData.personalizations = [];
        jsonData.personalizations.push(personalization);
        jsonData.from = {"email": req.body.sender};
        jsonData.content = [];
        jsonData.content.push({"type": "text/plain", "value": req.body.text});
        
        var options = {
            method: 'POST',
            url: config.get('sendgrid.apiBaseUrl'),
            headers: {
                Authorization: 'Bearer ' + config.get('sendgrid.apiKey'),
            },
            json: jsonData
        };

        request.post(options, function(err, response, body) {
            if(err){
                console.debug(err);
                next();
            }else{
                console.debug(response.statusCode);
                console.debug(body)
                if(response.statusCode >=200 && response.statusCode<=299){
                    res.send('Delivered')
                }else{
                    next();
                }
            }
        });
    }
}

module.exports = {send: send}
