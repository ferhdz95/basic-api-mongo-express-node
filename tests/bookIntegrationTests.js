var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    agent = request.agent(app);

describe('Book Crud Test', () => {
    it('Should Allow a Book to be post it and return a read and _id', (done) => {
        var bookPost = ({
            title: 'Test Book',
            author: 'Mocha',
            genre: 'Horror'
        });
        agent.post('/api/books')
            .send(bookPost).expect(200)
            .end( (err, result) =>{
                result.body.read.should.equal(false);
                result.body.should.have.property('_id');
                done();
            });
    })

    afterEach((done)=>{
        Book.remove().exec();
        done();
    });
});