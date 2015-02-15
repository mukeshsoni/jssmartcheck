var gen = require('../src/generators/basic');
var _ = require('lodash');
var expect = require('chai').expect;

describe('basic generators', () => {
    it('should generate byte between 0 and 255', () => {
        _.times(30, () => expect(gen.byte()).to.be.within(0, 255));
    });
    
    it('generate a random character', function () {
        _.times(30, () => {
            var char = gen.char();
            expect(char).to.be.a('string');
            expect(char).to.have.length(1);
        });
    });    
});
