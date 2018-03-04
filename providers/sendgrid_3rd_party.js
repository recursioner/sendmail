const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

var send = function(){
    return function(req, res, next){
        const msg = {
          to: 'recursioner@gmail.com',
          from: 'test@example.com',
          subject: 'Sending with SendGrid is Fun',
          text: 'and easy to do anywhere, even with Node.js',
          html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        var result = sgMail.send(msg);
        //res.send('mail delivered');
        next();
    }
}

module.exports = {send: send}