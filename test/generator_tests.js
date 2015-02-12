var gen = require('../src/generators');
var _ = require('lodash');
var expect = require('chai').expect;

describe('generators', () => {
	it('should generate random integers', () => {

		for(var i in _.range(10)) {
			console.log(gen.int());
			expect(_.isNumber(gen.int())).to.be.true;
		}
	});
});