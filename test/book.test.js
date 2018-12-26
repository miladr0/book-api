const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../start');
const should = chai.should();
const mongoose = require('mongoose');
const Book = mongoose.model('Book');

chai.use(chaiHttp);

describe(`Test All Book API'S`, function() {
    it(`should list ALL Books /book/api/v1/all_books/1/1 GET`, function(done) {
        chai.request(server)
            .get('/book/api/v1/all_books/1/1')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('books');
                res.body.should.have.property('page');
                res.body.should.have.property('pages');
                res.body.should.have.property('count');
                res.body.books.should.be.a('array');
                res.body.books[0].should.have.property('_id');
                res.body.books[0].should.have.property('name');
                res.body.books[0].should.have.property('pageCount');
                done();
            })
    });
    it(`should list ALL Books DESC Based on Creation Date on /book/api/v1/all_books/1/1 GET`, function(done) {
        chai.request(server)
            .get('/book/api/v1/all_books/1/1')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('books');
                res.body.should.have.property('page');
                res.body.should.have.property('pages');
                res.body.should.have.property('count');
                res.body.books.should.be.a('array');
                res.body.books[0].should.have.property('_id');
                res.body.books[0].should.have.property('name');
                res.body.books[0].should.have.property('pageCount');
                res.body.books[0]['created'].should.be.above(res.body.books[1]['created']);
                done();
            })
    });
    it('should list ALL Books DESC Based on Page Count Of Every Book on /book/api/v1/all_books/1/2 GET', function(done) {
        chai.request(server)
            .get('/book/api/v1/all_books/1/2')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('books');
                res.body.should.have.property('page');
                res.body.should.have.property('pages');
                res.body.should.have.property('count');
                res.body.books.should.be.a('array');
                res.body.books[0].should.have.property('_id');
                res.body.books[0].should.have.property('name');
                res.body.books[0].should.have.property('pageCount');
                res.body.books[0]['pageCount'].should.be.above(res.body.books[1]['pageCount']);
                done();
            });
    });


    it('should add a SINGLE Book on /book/api/v1/add POST', function(done) {
        const data = {name: 'Alice in the WonderLand', pageCount: 228};
        Book(data).save(function (err, res) {
            res.should.be.a('object');
            res.should.have.property('_id');
            res.should.have.property('name');
            res.should.have.property('pageCount');
            done();
        });
    });

    it('should list a SINGLE Book on /book/api/v1/get_book/<id> GET', function(done) {
        this.timeout(4000);
        const data = {name: 'Alice in the WonderLand', pageCount: 228};
        Book(data).save(function (err, result) {
            chai.request(server)
                .get(`/book/api/v1/get_book/${result._id}`)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('book');
                    res.body.book.should.be.a('object');
                    res.body.book.should.have.property('_id');
                    res.body.book.should.have.property('name');
                    res.body.book.should.have.property('pageCount');
                    done();
                });
        });
    });

    it('should update a SINGLE Book on /book/api/v1/edit/<id> POST', function(done) {
        this.timeout(4000);
        const data = {name: 'Alice in the WonderLand', pageCount: 228};
        Book(data).save(function (err, result) {
            chai.request(server)
                .post(`/book/api/v1/edit`)
                .send({_id: result._id, name: "Alice in the Normal Land","pageCount":800})
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('updatedBook');
                    res.body.updatedBook.should.be.a('object');
                    res.body.updatedBook.should.have.property('_id');
                    res.body.updatedBook.should.have.property('name');
                    res.body.updatedBook.should.have.property('pageCount');
                    done();
                });
        });
    });

    it('should delete a SINGLE Book on /book/api/v1/delete/<id> GET', function(done) {
        this.timeout(4000);
        const data = {name: 'Alice in the WonderLand', pageCount: 228};
        Book(data).save(function (err, result) {
            chai.request(server)
                .get(`/book/api/v1/delete/${result._id}`)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('book');
                    res.body.book.should.be.a('object');
                    res.body.book.should.have.property('ok');
                    done();
                });
        });
    });
});