'use strict';

// require('babel/polyfill');
var assert = require('assert');
var gen = require('./generators');

var jssmartcheck = { gen };

jssmartcheck.forAll = (...gens) => {
    assert(gens.every( ranGen => typeof ranGen === 'function'), 'Expect all generators to be function references');

    jssmartcheck.forallGens = gens;
    return jssmartcheck;
};

var getErrorMessage = (numTests, fail) => {
    return JSON.stringify({
        result: false,
        numTests,
        fail
    });
};

jssmartcheck.check = (f, times=100, seed=Math.random()*1000) => {
    jssmartcheck.seed = seed;
    assert(typeof f === 'function', 'check expects a property function');

    for(let i = 0; i < times; i++) {
        var sampleValues = jssmartcheck.forallGens.map((ranGen) => {
            return ranGen(i);
        });

        assert(f.apply(undefined, sampleValues) === true, getErrorMessage(i, sampleValues));
    }

    console.log({ result: true, numTests: times, seed: seed });
};

module.exports = jssmartcheck;