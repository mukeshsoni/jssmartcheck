// gets all generators together into a single module
var _ = require('lodash');
var assert = require('assert');
var utils = require('../utils');
var stringGen = require('./string.js');
var numberGen = require('./number.js');
var arrayGen = require('./array.js');
var basicGen = require('./basic.js');
var functionGen = require('./function.js');
var objectGen = require('./object.js');
var miscGen = require('./misc.js');

/*
 * Choose a generator from the pairs provided. The pair consists of the weight that pair needs to be given and the generator
 * pairs: [[2 gen.int] [3 gen.int.between(0, 100)] [1 gen.bool]]
 */
// TODO - need assertions for pairs passed
var frequency = (pairs) => {
    var gensSpread = pairs.reduce( (acc, pair) => {
        return acc.concat(_.fill(new Array(pair[0]), pair[1]));
    }, []);

    return elements(gensSpread);
};

var suchThat = (filterFn, gen, maxIterations=10) => {
    return (size) => {
        var generatedValue = gen(size)
        var iterationCount = 0;
        while(filterFn(generatedValue) !== true && iterationCount < maxIterations) {
            generatedValue = gen(size);
            iterationCount += 1;
            size += 1;
        }


        assert(filterFn(generatedValue), `could not a generate value as per filter function after ${maxIterations}`);

        return generatedValue;
    }
};

/*Picks a random generator from a list of generators*/
var oneOf = (...gens) => elements(gens)();

var sample = (gen, times=100) => {
    var results = [];
    for(var i = 0; i < times; i++) {
        results.push(gen(i));
    }

    return results;
};

var generators = {
    frequency: frequency,
    oneOf: oneOf,
    suchThat: suchThat,
    sample: sample
};

generators.extend = function(...obj) {
    if(typeof obj.join !== 'function') {
        obj = [obj];
    }
    utils.extend.apply(utils, [generators].concat(obj));
}

generators.extend(stringGen, numberGen, arrayGen, basicGen, functionGen, objectGen, miscGen);
module.exports = generators;
