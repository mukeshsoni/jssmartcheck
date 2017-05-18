'use strict';

var gen = require('../src/generators');
var miscGen = require('../src/generators/misc');
var numberGen = require('../src/generators/number');
var expect = require('chai').expect;
var _ = require('lodash');

describe('misc generators', function () {
    it('should filter generated values using our filter function', () => {
        function isEven(num) {
            return num%2 === 0;
        }

        var myEvenIntGenerator = gen.suchThat(isEven, numberGen.int);
        var size = 20;
        _.times(10, () => {
            var generatedValue = myEvenIntGenerator(size);
            expect(isEven(generatedValue)).to.be.true();
        });

        function isPositive(num) {
            return num > 1;
        }
        var myPositiveIntGenerator = gen.suchThat(isPositive, numberGen.int);
        size = 20;
        _.times(10, () => {
            var generatedValue = myPositiveIntGenerator(size);
            expect(isPositive(generatedValue)).to.be.true();
        });
    });

    it('should throw if suchThat can\'t produce a proper value', function () {
        var myPositiveIntGenerator = gen.suchThat(_.isString, numberGen.int); // crazy idea to think integer is a string! HEHEHEHE
        var size = 20;
        _.times(10, () => {
            expect(() => myPositiveIntGenerator(size)).to.throw();
        });
    });

    it('should select generator based on frequency', () => {
        expect(true).to.be.true();
        var pairs = [[100, gen.object.ofShape({name: 'ramesh'})], [2, gen.string], [3, gen.int.positive]];

        _.times(10, () => {
            var generatedValue = miscGen.frequency(pairs)();
            expect(_.isObject(generatedValue) || _.isString(generatedValue) || (_.isNumber(generatedValue) && generatedValue > 0)).to.be.true();
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
