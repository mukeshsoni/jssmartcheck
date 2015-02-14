var gen = require('../src/generators');
var expect = require('chai').expect;

describe('generators combined', function() {
	it('should allow adding custom generators', function() {
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

	
});