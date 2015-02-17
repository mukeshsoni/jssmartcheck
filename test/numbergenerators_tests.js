var gen = require('../src/generators/number');
var _ = require('lodash');
var expect = require('chai').expect;

describe('Number generators', () => {
	it('should generate random integers', () => {
		_.times(10, () => {
			var n = gen.int(_.random(0, 100));
			console.log(n);
			expect(_.isNumber(n) && (Math.floor(n) === n)).to.be.true;
		});
	});

	it('should generate a positive integer', () => {
		_.times(10, () => expect(gen.int.positive(_.random(0,100)) > 0).to.be.true);
	});

	it('should generate an integer between', () => {
		_.times(10, () => {
			var min = _.random(-10000, 9999),
				max = _.random(min, 10000),
				result = gen.int.between(min, max, _.random(0, 100));
			expect(result).to.be.within(min+1, max+1);
		});
	});

	it('should generate a floating number', () => {
		_.times(10, () => expect(_.isNumber(gen.float(_.random(0,100)))).to.be.true);
	});
});