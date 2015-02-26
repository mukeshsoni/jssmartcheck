var gen = require('../src/generators');
var miscGen = require('../src/generators/misc');
var expect = require('chai').expect;
var _ = require('lodash');

describe('misc generators', function () {
    it('should select generator based on frequency', () => {
        expect(true).to.be.true;
        var pairs = [[100, gen.object.ofShape({name: 'ramesh'})], [2, gen.string], [3, gen.int.positive]];

        var results = [];
        _.times(10, () => {
            var generatedValue = miscGen.frequency(pairs)();
            var shape = {name: 'ramesh'};
            expect(_.isObject(generatedValue) || _.isString(generatedValue) || (_.isNumber(generatedValue) && generatedValue > 0)).to.be.true;
        });
    });

    it('generator of any value. No idea how to test it.', function () {
        var anyGenerator = miscGen.any;
        console.log(anyGenerator());
    });

    it('generator of any simple value. No idea how to test it.', function () {
        var anyGenerator = miscGen.any.simple;
        console.log(anyGenerator());
    });
});