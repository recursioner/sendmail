# SendMail

Simple RESTFUL API for sending text only emails

### Prerequisites


```
node v8.9.4 or later

npm 5.6.0 or later

```

### Installing

After clone the project, enter project root folder "sendmail", run
```
npm install
```
This will install all dependencies.

## Running the tests

run the following command to test the server
```
npm test
```
## Before Running

This project use MailGun and SendGrid as service providers, so you need to register your own account with these two sites and replace access key in config/default.json
```
config/default.json
{
    "mailgun" : {
        "apiBaseUrl" : "https://api.mailgun.net/v3/sandboxXXXXXXXXXXXXXXXXXXXXXXXXXXX.mailgun.org/messages",
        "apiKey"     : "key-YYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"
    },

    "sendgrid" : {
        "apiBaseUrl" : "https://api.sendgrid.com/v3/mail/send",
        "apiKey"     : "SG.ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"
    }
}

```


## Run service
```
npm start
```
If the server starts normally, you will see
```
> node ./bin/www
```
If npm fail to start due to some dependency missing, like below, 
```
Error: Cannot find module 'xxxxx'
    at Function.Module._resolveFilename (module.js:469:15)
    at Function.Module._load (module.js:417:25)
    at Module.require (module.js:497:17)
    at require (internal/module.js:20:19)
    at Object.<anonymous> (/home/xxx/xxx/sendmail/app.js:1:77)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)

```
try delete "node_modules" folder and rerun 
```
npm install
```


## Access service
Use POST to request service

```
Content-Type: application/json
```
```
Payload should be legal json data
```

Here's just an exmple to show how you can access it
```
curl -X POST -H "Content-Type: application/json" --data '{"recipients": ["somebody@example.com","someoneelse@example.com"],"carboncopys": ["abc@example.com"],"blindcarboncopys":["xyz@example.com"],"subject": "Hello world","text": "Long long ago...","sender": "humpty@dumpty.com"}' http://yoururl:3000/sendmail/
```
See below for what is legal format of message

## Explaination
|Field | Required or Optional | Explaination |
| ------------- |:-------------:| -----:|
|recipients| required| Multiple email addresses are supported|
|carboncopys| optional| Multiple email addresses are supported|
| blindcarboncopys |  optional|  Multiple email addresses are supported|
| subject|  required | |
| text|  required | |
| sender |  required| |


Missing required fields or wrong email format will be rejected and 400 will be returned. 

## Extra

When using fake email address together with real email addresses, it's possible that even the real email address won't recieve the message. It's MailGun and SendGrid problem. So please try using some real test email address. 