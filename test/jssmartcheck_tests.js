var _ = require('lodash');
var jsc = require('../src/jssmartcheck.js');
var expect = require('chai').expect;

describe('the main module', function() {
	it('should EXIST', function() {
		expect(jsc.gen.string).to.be.function;
		expect(jsc.gen.string(1)).to.have.length.below(2);
	});

    it('should throw when passed a non function generator', function() {
        expect(() => jsc.forAll({})).to.throw(Error);
        expect(() => jsc.forAll(1)).to.throw(Error);
        expect(() => jsc.forAll("not a generator")).to.throw(Error);
        expect(() => jsc.forAll(jsc.gen.int)).to.not.throw();
    });

    it('should run check for generators', function() {
        var gen = jsc.gen;

        // a function which should hold true always
        var propFunc1 = (a) => {
            return _.isNumber(a);
        };

        // a function which fails for some integer a
        var propFunc2 = (a) => {
            return a > 10;
        };
        expect(() => jsc.forAll(gen.int).check(propFunc1)).to.not.throw();
        expect(() => jsc.forAll(gen.int).check(propFunc2)).to.throw(Error);
    });

    it('should show proper error message for failing cases', function() {
        var gen = jsc.gen;
        // expect(true).to.be.false;
        // a function which fails for some integer a
        var propFunc2 = (a) => {
            return a.length < 10;
        };
        jsc.forAll(gen.arrayOf(gen.int)).check(propFunc2);
    });
});