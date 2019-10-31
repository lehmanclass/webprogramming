const expect  = require('chai').expect;
const app = require("../index.js");
const DB = require("../Database.js");

var request = require('request');

it('Test_One', function(done) {
    request('http://localhost:3000' , function(error, response, body) {
        expect(body).to.equal(fruit, cake);
        done();
    });
});