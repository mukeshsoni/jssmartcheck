var gen = require('../src/generators/function');
var numberGen = require('../src/generators/number');
var _ = require('lodash');
var utils = require('../src/utils');
var expect = require('chai').expect;

describe('function generators', function () {
    it('should generate function which returns a constant', function () {
        var randomFunction = gen.fn(1, 2, 'hi');
        expect(randomFunction()).to.equal('hi');
    });

    it('should generate a function whose return type is the generator passed as argument', function () {
        var randomFunction = gen.fn(1, 2, numberGen.int);
        _.times(30, () => {
            expect(randomFunction(numberGen.intUpto(20))).to.be.a('number');
            expect(randomFunction(numberGen.intUpto(20))).to.be.a('number');
            expect(randomFunction(numberGen.intUpto(20))).to.be.a('number');
        });
    });
});