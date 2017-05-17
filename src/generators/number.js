'use strict';

// require('babel/polyfill');
var basic = require('./basic');
var utils = require('../utils');

var numberGen = {};

/*Generate an integer upto size. Non negative*/
numberGen.intUpto = (size=100) => Math.floor(Math.random()*size);

/*Generate an integer bounded by [-size, size]*/
numberGen.int = (size=100) =>
    basic.elements([-1, 1])() * numberGen.intUpto(size);

numberGen.int.shrink = function *(val) {
    var limit = Math.abs(val);
    var shrinkedVal = limit - 1;

    while(Math.abs(shrinkedVal) !== 0) {
        yield shrinkedVal;

        if(shrinkedVal >= 0) {
            shrinkedVal = -shrinkedVal;
        } else {
            shrinkedVal = -(shrinkedVal + 1);
        }
    }

    return shrinkedVal
};

/*Generate a positive Integer*/
numberGen.int.positive = (size=100) => numberGen.intUpto(size) + 1;

/*Choose an integer in the range [min, max], both inclusive in search*/
numberGen.int.choose = numberGen.int.between = (min, max) => {
	return basic.elements(utils.range(min, max+1));
};

/*Generate a float bounded by [-size, size]*/
numberGen.float = (size=100) => basic.random()*size;

/*Generate a large integer*/
numberGen.int.large = () => Math.floor(Math.random() * Number.MAX_VALUE);

/*Generate an unsigned integer*/
// TODO - no idea why it has to be upto size*size
numberGen.uint = (size=100) => numberGen.intUpto(size * size);

/*Generate a large unsigned integer*/
numberGen.uint.large = () => Math.floor(Math.random() * Number.MAX_VALUE);


module.exports = numberGen;
