var jsc = require('../src/jssmartcheck.js');
var expect = require('chai').expect;

describe('the main module', function() {
	it('should EXIST', function() {
		expect(jsc.gen.string).to.be.function;
		expect(jsc.gen.string(1)).to.have.length.below(2);
	});
});