var _ = require('lodash');
var assert = require('assert');
var gen = require('./generators');

var jssmartcheck = {
    gen: gen
};

jssmartcheck.forAll = (...gens) => {
    assert(_.all(gens, gen => typeof gen === 'function'), 'Expect all generators to be function references');

    jssmartcheck.forallGens = gens;
    return jssmartcheck;
};

jssmartcheck.check = (f, times=100) => {
    assert(typeof f === 'function', 'check expects a property function');

    for(let i = 0; i < times; i++) {
        jssmartcheck.forallGens.forEach((gen) => {
            var sampleValue = gen(i)
            assert(f(sampleValue) === true, 'failed for value: ' + sampleValue);
        });
    }
};


module.exports = jssmartcheck;