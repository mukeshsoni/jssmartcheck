var gen = require('../src/generators/number');
var _ = require('lodash');
var expect = require('chai').expect;

describe('integer generators', () => {
	it('should generate random integers', () => {
		_.times(10, () => {
			var n = gen.int();
			expect(_.isNumber(n) && (Math.floor(n) === n)).to.be.true;
		});
	});

	it('should generate a positive integer', () => {
		_.times(10, () => expect(gen.int.positive() > 0).to.be.true);
	});

	it('should generate a positive integer', () => {
		_.times(10, () => {
			var min = _.random(-10000, 9999),
				max = _.random(min, 10000),
				result = gen.int.between(min, max);
			expect(result).to.be.within(min+1, max+1);
		});
	});
});