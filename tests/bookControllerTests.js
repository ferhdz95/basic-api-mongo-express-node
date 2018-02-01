var should = require('should');
var sinon = require('sinon');

describe ('Book Controller Tests', () => {
    describe('Post', () =>{
        it('Should not allow an empty title on post', () =>{
            var Book = (book) => {
                this.save = ()=>{}
            };

            var req = {
                body: {
                    author : 'Just Me'
                }
            }

            var res = {
                status : sinon.spy(),
                send : sinon.spy()
            }

            var bookController = require('../controllers/bookController')(Book);
            
            bookController.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('Title is Required').should.equal(true);
        })
    })
});