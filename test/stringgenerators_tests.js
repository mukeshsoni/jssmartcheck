var gen = require('../src/generators/string');
var _ = require('lodash');
var expect = require('chai').expect;

describe('string generators', () => {
	it('should generate byte between 0 and 255', () => {
		_.times(300, () => expect(gen.byte()).to.be.within(0, 255));
	});

	it('should not generate random string greater than size', () => {
		_.times(10, () => {
			var size = Math.round(Math.random()*1000);
			expect(gen.string(size)).to.have.length.of.at.most(size);
		});
	});

	// this test can actually fail some times (once in a million or so)
	it('should generate some strings of length less than size in 100 iterations', () => {
		var size = Math.round(Math.random()*1000);
		var generatedStrings = _.map(_.range(100), () => {
			return gen.string(size);
		});

		// atleast one generated string has size less than size
		expect(_.some(generatedStrings, (string) => (string.length < size))).to.be.true;
	});

	it('should only accept regex string or regex as input', () => {
		expect(() => gen.string.matches(123)).to.throw(Error);
		expect(() => gen.string.matches("abc")).to.not.throw();
		expect(() => gen.string.matches("ab.c?d*")).to.not.throw();
		expect(() => gen.string.matches(/ab./)).to.not.throw(Error);
		expect(() => gen.string.matches(/ab./ig)).to.not.throw(Error);
	});

	it('should throw if the regex is valid', function() {
		// expect(() => gen.string.matches(/a^/)).to.throw(Error);
		// console.log(gen.string.matches(/ab/)());
	});

	it('should work for simple pattern. No repetition, nothing fancy', () => {
		var regexes = [/ab/, /abcd/, /random/, /morerandomtext/];
		regexes.forEach((regex) => {
			expect(gen.string.matches(regex)()).to.have.match(regex);
		});
	});

	it('should work for \d, \w, \W, \D range generators', () => {
		var regexes = [/ab\d/, /ab\d\w/, /ab\D\w/, /ab\d\W/, /ab\D\W/];
		regexes.forEach((regex) => {
			expect(gen.string.matches(regex)()).to.have.match(regex);
		});
	});

	it('should generate random strings for range expressions', () => {
		var regexes = [/ab[0-5]/, /[0-5]cd/, /ab[a-e][2-9]/];
		regexes.forEach((regex) => {
			expect(gen.string.matches(regex)()).to.have.match(regex);
		});
	});

	it('should generate random string for repetition patterns', () => {
		var regexes = [/ab*/, /ab[0-5]*/];
		regexes.forEach((regex) => {
			expect(gen.string.matches(regex)()).to.have.match(regex);
		});
	});
});