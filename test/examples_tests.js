var jsc = require('../src/jssmartcheck.js');
var gen = jsc.gen;
// var gen = require('../src/generators');
var _ = require('lodash');
// var utils = require('../src/utils');
var expect = require('chai').expect;

describe('basic ones', function () {

	it('blah', function () {
		console.log(gen.object.ofShape({
			name: gen.string.matches(/Mr\.\s[A-Z]{2,7}(\s[A-Z]{3,8})?/)
		})());

		jsc.forAll(gen.arrayOf(gen.int)).check((a) => {
			return a.sort() === a.sort().sort();
		});
		console.log(gen.int(5));
		console.log(gen.int.positive(3));
		console.log(gen.string(3));
		console.log(gen.string.matches(/abc/)());
	});
});