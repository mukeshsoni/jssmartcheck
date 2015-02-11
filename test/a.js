var gen = require('../src/jssmartcheck');
console.log('gen: ', gen);
var expect = require('chai').expect;

describe('a', function() {
    it('should pass', function() {

    });

    it('should also pass', function() {
        expect(true).to.be.true;
    }); 
});