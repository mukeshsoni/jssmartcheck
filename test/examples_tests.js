var jsc = require('../src/jssmartcheck.js');
var gen = jsc.gen;
// var gen = require('../src/generators');
var _ = require('lodash');
// var utils = require('../src/utils');
var expect = require('chai').expect;

describe('examples', function () {
	// describe('integer generators examples', function () {
		
	// });

	// describe('complex ones', function () {
		
	// });

	it('blah', function () {
		console.log(gen.object.ofShape({
			name: gen.string.matches(/Mr\.\s[A-Z]{2,7}(\s[A-Z]{3,8})?/)
		})());

		jsc.forAll(gen.arrayOf(gen.int)).check((a) => {
			return a.sort() === a.sort().sort();
		});
		console.log(gen.int(5));
		console.log(gen.int.positive(3));
		console.log(gen.string(3));
		console.log(gen.string.matches(/abc/)());
	});

	it('string concatenation', function() {
		var test = jsc.forAll(gen.string, gen.string).check((a, b) => {
			return (a.concat("eureka!").length + b.concat("more eureka!").length === a.length+7+b.length+12) ;
		});

		// expect(test).to.pass;
	});

	it('any number other than 5', function() {
		jsc.forAll(gen.suchThat(function(n) {
			return n!=5;
		}, gen.int)).check((n) => {return n!=5});
	});

	// this must fail for the value '1'
	it('Number divided by itself ', function() {
		jsc.forAll(gen.int).check((a) => {
			return (a-1)/(a-1) === 1;
		});
	});
});