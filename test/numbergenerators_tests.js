var gen = require('../src/generators/number');
var _ = require('lodash');
var expect = require('chai').expect;
var utils = require('../src/utils');
var testTimes = 50;

describe('Number generators', () => {
	it('should generate random integers', () => {
		_.times(testTimes, () => {
			var n = gen.int(utils.random(0, 100));
			expect(_.isNumber(n) && (Math.floor(n) === n)).to.be.true;
		});
	});

	it('should generate a positive integer', () => {
		_.times(testTimes, () => expect(gen.int.positive(utils.random(0,100)) > 0).to.be.true);
	});

	it('should generate an integer between', () => {
		_.times(testTimes, () => {
			var min = utils.random(-10000, 9999),
				max = utils.random(min, 10000),
				result = gen.int.between(min, max)(utils.random(0, 100));
			expect(result).to.be.within(min, max);
		});
	});

	it('should generate a floating number', () => {
		_.times(testTimes, () => expect(_.isNumber(gen.float(utils.random(0,100)))).to.be.true);
	});
});