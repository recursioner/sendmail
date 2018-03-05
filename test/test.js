process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
var expect = require('Chai').expect;
chai.use(chaiHttp);

describe('/POST single recipient', ()=>{
    it('It should send the mail and reply 200', (done)=> {
        let req = {
            "recipients": ["recursionersitemindertest@gmail.com", "tuco.bpjr.ramirez@gmail.com", "recursioner@gmail.com"],
            "subject": "Hello raw json",
            "text": "hello",
            "sender": "recursioner@gmail.com"
        }
        
        chai.request(app)
        .post('/sendmail')
        .send(req)
        .end((err, res)=>{
            res.should.have.status(200);
            done();
        })
    });
}
);


describe('/POST multi recipient', ()=>{
    it('It should send the mail and reply 200', (done)=> {
        let req = {
            "recipients": ["recursionersitemindertest@gmail.com", "tuco.bpjr.ramirez@gmail.com", "recursioner@gmail.com"],
            "subject": "Hello raw json",
            "text": "hello",
            "sender": "recursioner@gmail.com"
        }
        
        chai.request(app)
        .post('/sendmail')
        .send(req)
        .end((err, res)=>{
            res.should.have.status(200);
            done();
        })
    });
}
);


describe('/POST multi recipients and cc bcc', ()=>{
    it('It should send the mail and reply 200', (done)=> {
        let req = {
            "recipients": ["recursionersitemindertest@gmail.com", "tuco.bpjr.ramirez@gmail.com", "recursioner@gmail.com"],
            "carboncopys": ["recursioner@gmail.com", "recursioner@gmail.com"],
            "blindcarboncopys": ["tuco.bpjr.ramirez@gmail.com"],
            "subject": "Hello raw json",
            "text": "hello",
            "sender": "recursioner@gmail.com"
        }
        
        chai.request(app)
        .post('/sendmail')
        .send(req)
        .end((err, res)=>{
            res.should.have.status(200);
            done();
        })
    });
}
);


describe('/POST no recipient', ()=>{
    it('It should return 400', (done)=> {
        let req = {
            "subject": "Hello raw json",
            "text": "hello",
            "sender": "recursioner@gmail.com"
        }
        
        chai.request(app)
        .post('/sendmail')
        .send(req)
        .end((err, res)=>{
            res.should.have.status(400);
            done();
        })
    });
}
);

describe('/POST with cc bcc but no recipients', ()=>{
    it('It should reply 400', (done)=> {
        let req = {
            "carboncopys": ["recursioner@gmail.com", "recursioner@gmail.com"],
            "blindcarboncopys": ["tuco.bpjr.ramirez@gmail.com"],
            "subject": "Hello raw json",
            "text": "hello",
            "sender": "recursioner@gmail.com"
        }
        
        chai.request(app)
        .post('/sendmail')
        .send(req)
        .end((err, res)=>{
            res.should.have.status(400);
            done();
        })
    });
}
);


describe('/POST wrong email address', ()=>{
    it('It should reply 400', (done)=> {
        let req = {
            "recipients": ["wrong$email.com", "tuco.bpjr.ramirez@gmail.com", "recursioner@gmail.com"],
            "carboncopys": ["recursioner@gmail.com", "recursioner@gmail.com"],
            "blindcarboncopys": ["tuco.bpjr.ramirez@gmail.com"],
            "subject": "Hello raw json",
            "text": "hello",
            "sender": "recursioner@gmail.com"
        }
        
        chai.request(app)
        .post('/sendmail')
        .send(req)
        .end((err, res)=>{
            res.should.have.status(400);
            done();
        })
    });
}
);


describe('/POST wrong email address in cc', ()=>{
    it('It should reply 400', (done)=> {
        let req = {
            "recipients": ["tuco.bpjr.ramirez@gmail.com", "recursioner@gmail.com"],
            "carboncopys": ["wrong$email.com", "recursioner@gmail.com", "recursioner@gmail.com"],
            "blindcarboncopys": ["tuco.bpjr.ramirez@gmail.com"],
            "subject": "Hello raw json",
            "text": "hello",
            "sender": "recursioner@gmail.com"
        }
        
        chai.request(app)
        .post('/sendmail')
        .send(req)
        .end((err, res)=>{
            res.should.have.status(400);
            done();
        })
    });
}
);


describe('/POST wrong email address in bcc', ()=>{
    it('It should reply 400', (done)=> {
        let req = {
            "recipients": ["tuco.bpjr.ramirez@gmail.com", "recursioner@gmail.com"],
            "carboncopys": ["recursioner@gmail.com", "recursioner@gmail.com"],
            "blindcarboncopys": ["wrong$email.com", "tuco.bpjr.ramirez@gmail.com"],
            "subject": "Hello raw json",
            "text": "hello",
            "sender": "recursioner@gmail.com"
        }
        
        chai.request(app)
        .post('/sendmail')
        .send(req)
        .end((err, res)=>{
            res.should.have.status(400);
            done();
        })
    });
}
);

describe('/POST without subject', ()=>{
    it('It should reply 400', (done)=> {
        let req = {
            "recipients": ["tuco.bpjr.ramirez@gmail.com", "recursioner@gmail.com"],
            "carboncopys": ["recursioner@gmail.com", "recursioner@gmail.com"],
            "blindcarboncopys": ["tuco.bpjr.ramirez@gmail.com"],
            "text": "hello",
            "sender": "recursioner@gmail.com"
        }
        
        chai.request(app)
        .post('/sendmail')
        .send(req)
        .end((err, res)=>{
            res.should.have.status(400);
            done();
        })
    });
}
);

describe('/POST without text', ()=>{
    it('It should reply 400', (done)=> {
        let req = {
            "recipients": ["tuco.bpjr.ramirez@gmail.com", "recursioner@gmail.com"],
            "carboncopys": ["recursioner@gmail.com", "recursioner@gmail.com"],
            "blindcarboncopys": ["tuco.bpjr.ramirez@gmail.com"],
            "subject": "hello",
            "sender": "recursioner@gmail.com"
        }
        
        chai.request(app)
        .post('/sendmail')
        .send(req)
        .end((err, res)=>{
            res.should.have.status(400);
            done();
        })
    });
}
);

