# SendMail

Simple RESTFUL API for sending text only emails

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Latest Node and NPM

```
Give examples
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

## Run service
```
npm start
```

## Access service
```
curl -X POST -H "Content-Type: application/json" --data '{"recipients": ["somebody@example.com","someoneelse@example.com"],"carboncopys": ["abc@example.com"],"blindcarboncopys":["xyz@example.com"],"subject": "Hello world","text": "Long long ago...","sender": "humpty@dumpty.com"}' http://yoururl:3000/sendmail/
```
## Explaination
recipients: required. Multiple email addresses are supported. 
carboncopys: optional.
blindcarboncopys: optional.
subject: required.
text: required.
sender: required.

Missing required fields or wrong email format will be rejected and 400 will be returned. 

