'use strict';

var jsc = require('../src/jssmartcheck.js');
var gen = jsc.gen;
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
		jsc.forAll(gen.string, gen.string).check((a, b) => {
			return (a.concat('eureka!').length + b.concat('more eureka!').length === a.length+7+b.length+12);
		}, { quiet: true });
	});

	it('any number other than 5', function() {
		jsc.forAll(gen.suchThat(function(n) {
			return n !== 5;
		}, gen.int)).check((n) => n !== 5, { quiet: true });
	});

	// this must fail for the value '1'
	it('Number divided by itself ', function() {
		var temp = () => {
			jsc.forAll(gen.int).check((a) => {
				return (a-1)/(a-1) === 1;
			}, { times: 100, quiet: true });
			// sample output - {"result":false,"numTests":17,"fail":[1]}
		};

		expect(temp).to.not.throw();
	});

	it('should not throw on testing sort idempotency', () => {
		var propFn = (x) => {
			return x.sort() === x.sort().sort();
		};

		expect(jsc.forAll(gen.arrayOf(gen.int)).check(propFn, { quiet: true })).to.not.throw;
		// Sample output - { result: true, numTests: 100, seed: 14.77343332953751 }
	});

	it('should throw on incorrect sorting assumption', function () {
		// the first element of a sorted array of integers is less than the last element
		var propFn = (x) => {
			x.sort();
			return x[0] < x[x.length - 1];
		};

		var nonEmptyGen = gen.suchThat((n) => n.length > 0, gen.arrayOf(gen.int));
		expect(() => jsc.forAll(nonEmptyGen).check(propFn, { quiet: true })).to.throw();
		// Sample output - {"result":false,"numTests":0,"fail":[[0]]}
	});

	it('should print generated values on the console', () => {
		var randomIntList = gen.sample(gen.int, 10);
		randomIntList.forEach((randomInt) => {
			expect(randomInt).to.be.a('number');
		});

		console.log(randomIntList);
		// sample output - [ 0, 0, -1, 1, -2, 4, 1, 0, -6, 0 ]

		var randomPositiveIntList = gen.sample(gen.int.positive, 10);
		randomPositiveIntList.forEach((randomInt) => {
			expect(randomInt).to.be.a('number');
		});

		console.log(randomPositiveIntList);
		// sample output - [ 1, 1, 2, 1, 1, 4, 6, 3, 3, 5 ]

		var randomStrings = gen.sample(gen.string, 5);
		console.log(randomStrings);

		var randomAsciiStrings = gen.sample(gen.string.ascii, 10);
		console.log(randomAsciiStrings);

		var matchingStrings = gen.sample(gen.string.matches(/boo{1,3}m/), 5);
		console.log(matchingStrings);

		var alphaNumStrings = gen.sample(gen.string.alphaNum, 10);
		console.log(alphaNumStrings);

		console.log(gen.sample(gen.string.matches(/\d{3,6}/), 5));

		console.log(gen.sample(gen.object.ofShape({
					name: gen.string.matches(/\w{3,5}(\s\w{5,8})?/),
					age: gen.suchThat((age) => age > 4, gen.int.positive),
					sex: gen.elements(['M', 'F', 'Neither'])
				}), 10));
	});
});
