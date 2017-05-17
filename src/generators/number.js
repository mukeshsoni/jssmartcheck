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

// first value is always zero
// second is 1
// third is -1
// need a way to restrict the total shrunken values
// like if the input val is too large, need to tweak the algorithm so that the later values 
// increase super quick to reach that large value
numberGen.int.shrink = function *(val) {
    if(val === 0) {
        return 
    }

    yield 0

    if(Math.abs(val) === 1) {
        return
    }

    yield 1
    yield -1

    let nextVal = 2
    var limit = Math.abs(val);
    var i = 1
    while(Math.abs(val) > Math.abs(nextVal)) {
        yield nextVal
        if(nextVal > 0) {
            nextVal = -nextVal 
        } else {
            // multiply by 2 or 3 (chosen randomly)
            // if we just keep multiplying by 2, it will only generate even numbers
            nextVal = -nextVal*numberGen.int.between(2, 3)() + numberGen.int.choose(1,2)()
        }
    } 
}

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
