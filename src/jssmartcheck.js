var assert = require('assert');
var gen = require('./generators');

var jssmartcheck = {
    gen: gen
};

jssmartcheck.forAll = (...gens) => {
    assert(gens.every( gen => typeof gen === 'function'), 'Expect all generators to be function references');

    jssmartcheck.forallGens = gens;
    return jssmartcheck;
};

jssmartcheck.check = (f, times=100, seed=Math.random()*1000) => {
    jssmartcheck.seed = seed;
    assert(typeof f === 'function', 'check expects a property function');

    for(let i = 0; i < times; i++) {
        var sampleValues = jssmartcheck.forallGens.map((gen, index) => {
            return gen(i);
        });

        assert(f.apply(undefined, sampleValues) === true, {msg: 'failed for value: ' + sampleValues});
    }
};


module.exports = jssmartcheck;