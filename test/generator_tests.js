var gen = require('../src/generators');
var expect = require('chai').expect;
var _ = require('lodash');

describe('generators combined', () => {
	it('should allow adding custom generators', () => {
		function customGen() {
			return 2;
		}

		function customGen2() {
			return 1;
		}
		gen.extend({cgen: customGen, dgen: customGen2});
		expect(gen.cgen()).to.equal(2);
		expect(gen.dgen()).to.equal(1);
	});

	it('should contain our generators', () => {
		_.times(10, () => expect(_.isNumber(gen.int())).to.be.true);
	});

	it.only('should select generator based on frequency', () => {
		expect(true).to.be.true;
		var pairs = [[1, 'a'], [2, 'b'], [3, 'c']];

		var results = [];
		_.times(10, () => {
			results.push(gen.frequency(pairs)());
		});

		console.log(results);
	});
});