var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();
chai.use(chaiHttp);
var expect = require('chai').expect;
var prefixTree = require('../routes/prefixTree');


describe('testing prefixTree api', function() {
// it(err, should);
    it('it should get err for empty', function(done) {
        chai.request(app)
            .get('/prefixTree')
            .end(function(err, res){
                res.should.have.status(400);
                res.should.be.json;
                done();
            });
    });

    it('it should contain all 26 letters', function(done) {
        expect(prefixTree.translate).to.have.property('z', '9');
        done();
    });

    it('it should send non valid input', function(done) {
        chai.request(app)
            .get('/prefixTree?dialed=ab')
            .end(function(err, res){
                res.should.have.status(400);
                done();
            });
    });

    it('it should return one', function(done) {
        chai.request(app)
            .get('/prefixTree?dialed=294')
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.equal('axis');
                done();
            });
    });


    it('it should return at least 5', function(done) {
        chai.request(app)
            .get('/prefixTree?dialed=2')
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data.length.should.to.be.at.least(5);
                done();
            });
    });

});

