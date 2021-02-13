const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');

const server = require('../server');
const models = require('../models');

chai.use(chaiHttp);

describe('Book Review API', function() {

    beforeEach(function (done){
        var newBook = new models.Book ({
            title: 'Mensagem',
            author: 'Fernando Pessoa',
            pages: '250',
            content: 'iconic'
            
        });
        newBook.save(function(err){
            if (err) done(err);
            else done();
        });
    });

    afterEach(function(done) {
        models.Book.deleteOne({})
        .then(function(){})
        .catch(function(){ console.warn('Colection may not exists')})
        done()
    });

    it('shold list All Reviews on /books GET', function(done){
        chai.request(server)
            .get('/books')
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('content');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('pages');
                res.body[0].should.have.property('author');
                res.body[0].should.have.property('_id');
                done();
            });
    });

    it('shold return a single review on /books/<id> GET', function(done){
        chai.request(server)
            .get('/books')
            .end(function(err,res){
                chai.request(server)
                    .get('/books/' + res.body[0]._id)
                    .end(function(err,res){
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('content');
                        res.body.should.have.property('title');
                        res.body.should.have.property('pages');
                        res.body.should.have.property('author');
                        res.body.should.have.property('_id');
                        done();
                    });
            });
    });

})
