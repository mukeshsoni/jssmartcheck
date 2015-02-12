var gen = require('../src/generators');
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
});

describe('integer generators', () => {
	it('should generate random integers', () => {
		_.times(10, () => expect(_.isNumber(gen.int())).to.be.true);
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