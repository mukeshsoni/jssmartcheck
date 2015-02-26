var gen = require('../src/generators');
var numberGen = require('../src/generators/number');
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


	it('should filter generated values using our filter function', () => {
	    function isEven(num) {
	        return num%2 === 0;
	    }

	    var myEvenIntGenerator = gen.suchThat(isEven, numberGen.int);
	    var size = 20;
	    _.times(10, () => {
	        var generatedValue = myEvenIntGenerator(size);
	        expect(isEven(generatedValue)).to.be.true;
	    });

	    function isPositive(num) {
	        return num > 1;
	    }
	    var myPositiveIntGenerator = gen.suchThat(isPositive, numberGen.int);
	    var size = 20;
	    _.times(10, () => {
	        var generatedValue = myPositiveIntGenerator(size);
	        expect(isPositive(generatedValue)).to.be.true;
	    });
	});
	
	it('should throw if suchThat can\'t produce a proper value', function () {
	    var myPositiveIntGenerator = gen.suchThat(_.isString, numberGen.int); // crazy idea to think integer is a string! HEHEHEHE
	    var size = 20;
	    _.times(10, () => {
	        expect(() => myPositiveIntGenerator(size)).to.throw(Error);
	    });
	});

	it('should select generator based on frequency', () => {
		expect(true).to.be.true;
	 	var pairs = [[100, gen.object.ofShape({name: 'ramesh'})], [2, gen.string], [3, gen.int.positive]];

	 	var results = [];
	 	_.times(10, () => {
	    	var generatedValue = gen.frequency(pairs)();
    		var shape = {name: 'ramesh'};
    		expect(_.isObject(generatedValue) || _.isString(generatedValue) || (_.isNumber(generatedValue) && generatedValue > 0)).to.be.true;
	 	});
	});
});