var gen = require('../src/generators/number');
var _ = require('lodash');
var expect = require('chai').expect;
var testTimes = 50;

describe('Number generators', () => {
	it('should generate random integers', () => {
		_.times(testTimes, () => {
			var n = gen.int(_.random(0, 100));
			expect(_.isNumber(n) && (Math.floor(n) === n)).to.be.true;
		});
	});

	it('should generate a positive integer', () => {
		_.times(testTimes, () => expect(gen.int.positive(_.random(0,100)) > 0).to.be.true);
	});

	it('should generate an integer between', () => {
		_.times(testTimes, () => {
			var min = _.random(-10000, 9999),
				max = _.random(min, 10000),
				result = gen.int.between(min, max)(_.random(0, 100));
			expect(result).to.be.within(min, max);
		});
	});

	it('should generate a floating number', () => {
		_.times(testTimes, () => expect(_.isNumber(gen.float(_.random(0,100)))).to.be.true);
	});
});