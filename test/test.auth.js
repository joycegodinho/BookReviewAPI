const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');

const server = require('../server');
const models = require('../models')

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
        models.Book.deleteMany({})
        .then(function(){})
        .catch(function(){ console.warn('Colection may not exists')})
        done()
        

    });

    afterEach(function(done) {
        models.User.deleteMany({})
        .then(function(){})
        .catch(function(){ console.warn('Colection may not exists')})
        done()
    })

    it('should logup, login, check token and delete a book on /books/<id> DELETE', function(done) {
        chai.request(server)
            .post('/auth/signup')
            .send({ 
                'email': 'agata@email',
                'username': 'agata',
                'password': 'test'
            })
            .end(function(err,res){
                res.should.have.status(201);
              
                chai.request(server)
                .post('/auth/signin')
                .send({ 
                    'email': 'agata@email',
                    'password': 'test'
                })
                .end(function(err,res){
                    res.body.should.have.property('token');
                    var token = res.body.token;

                    chai.request(server)
                    .get('/books')
                    .end(function(err,res){
                        
                        chai.request(server)
                            .delete('/books/' + res.body[0]._id)
                            .set('Authorization' , token)
                        
                            .end(function(err,res){
                                res.should.have.status(200);
                                res.body.should.have.property('message');
                                res.body.message.should.equal('Deleted');
                                done();
                            });
                    });                    
                });
            });
    });

    it('should logup, login, check token and update a book on /books/<id> UPDATE', function(done) {
        chai.request(server)
            .post('/auth/signup')
            .send({ 
                'email': 'agata@email',
                'username': 'agata',
                'password': 'test'
            })
            .end(function(err,res){
                res.should.have.status(201);
              
                chai.request(server)
                .post('/auth/signin')
                .send({ 
                    'email': 'agata@email',
                    'password': 'test'
                })
                .end(function(err,res){
                    res.body.should.have.property('token');
                    var token = res.body.token;

                    chai.request(server)
                    .get('/books')
                    .end(function(err,res){
                        
                        chai.request(server)
                            .put('/books/' + res.body[0]._id)
                            .set('Authorization' , token)
                            .send({
                                'title': 'Mensagem tested',
                                'author': 'Fernando Pessoa tested',
                                'pages': '250 tested',
                                'content': 'iconic tested'
                            })
                            .end(function(err,res){
                                res.should.have.status(200);
                                res.should.be.json;
                                res.body.should.be.a('object');
                                res.body.should.have.property('content');
                                res.body.should.have.property('title');
                                res.body.should.have.property('author');
                                res.body.should.have.property('pages');
                                res.body.should.have.property('_id');
                                res.body.content.should.equal('iconic tested');
                                res.body.title.should.equal('Mensagem tested')
                                res.body.pages.should.equal('250 tested')
                                res.body.author.should.equal('Fernando Pessoa tested')
                                done();
                            });
                    });                    
                });
            });
    });

    it('should logup, login, check token and add a book on /books POST', function(done) {
        chai.request(server)
            .post('/auth/signup')
            .send({ 
                'email': 'agata@email',
                'username': 'agata',
                'password': 'test'
            })
            .end(function(err,res){
                res.should.have.status(201);
              
                chai.request(server)
                .post('/auth/signin')
                .send({ 
                    'email': 'agata@email',
                    'password': 'test'
                })
                .end(function(err,res){
                    res.body.should.have.property('token');
                    var token = res.body.token;

                    chai.request(server)
                    .get('/books')
                    .end(function(err,res){
                        
                        chai.request(server)
                            .post('/books')
                            .set('Authorization' , token)
                            .send({
                                'title': 'Mensagem tested',
                                'author': 'Fernando Pessoa tested',
                                'pages': '250 tested',
                                'content': 'iconic tested'
                            })
                            .end(function(err,res){
                                res.should.have.status(201);
                                res.should.be.json;
                                res.body.should.be.a('object');
                                res.body.should.have.property('content');
                                res.body.should.have.property('title');
                                res.body.should.have.property('author');
                                res.body.should.have.property('pages');
                                res.body.should.have.property('_id');
                                res.body.content.should.equal('iconic tested');
                                res.body.title.should.equal('Mensagem tested')
                                res.body.pages.should.equal('250 tested')
                                res.body.author.should.equal('Fernando Pessoa tested')
                                done();
                            });
                    });                    
                });
            });
    });

    it('should logup, login, check token and toggle a favorite on /books PUT', function(done) {
        chai.request(server)
            .post('/auth/signup')
            .send({ 
                'email': 'agata@email',
                'username': 'agata',
                'password': 'test'
            })
            .end(function(err,res){
                res.should.have.status(201);
              
                chai.request(server)
                .post('/auth/signin')
                .send({ 
                    'email': 'agata@email',
                    'password': 'test'
                })
                .end(function(err,res){
                    res.body.should.have.property('token');
                    var token = res.body.token;

                    chai.request(server)
                    .get('/books')
                    .end(function(err,res){
                        
                        chai.request(server)
                            .put('/books')
                            .set('Authorization' , token)
                            .send({
                                '_id': res.body[0]._id,
                            })
                            .end(function(err,res){
                                res.should.have.status(200);
                                res.should.be.json;
                                res.body.should.be.a('object');
                                res.body.should.have.property('message');
                                res.body.message.should.equal('Favorited');
                                done();
                            });
                    });                    
                });
            });
    });

    it('should logup, login, check token, toggle a favorite and return favorites on /books/favorites GET', function(done) {
        chai.request(server)
            .post('/auth/signup')
            .send({ 
                'email': 'agata@email',
                'username': 'agata',
                'password': 'test'
            })
            .end(function(err,res){
                res.should.have.status(201);
              
                chai.request(server)
                .post('/auth/signin')
                .send({ 
                    'email': 'agata@email',
                    'password': 'test'
                })
                .end(function(err,res){
                    res.body.should.have.property('token');
                    var token = res.body.token;

                    chai.request(server)
                    .get('/books')
                    .end(function(err,res){
                        
                        chai.request(server)
                            .put('/books')
                            .set('Authorization' , token)
                            .send({
                                '_id': res.body[0]._id,
                            })
                            .end(function(err,res){
                                
                                chai.request(server)
                                .get('/books/favorites')
                                .set('Authorization' , token)
                                .end(function(err,res){
                                    res.body.should.be.a('array');
                                    res.body[0].should.have.property('content');
                                    res.body[0].should.have.property('title');
                                    res.body[0].should.have.property('pages');
                                    res.body[0].should.have.property('author');
                                    res.body[0].should.have.property('_id');
                                    done();
                                })

                                
                            });
                    });                    
                });
            });
    });

})


