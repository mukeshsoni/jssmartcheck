'use strict';

var assert = require('assert');
var gen = require('./generators');
var {
    getSize
} = require('./get_random_vals')

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

// depending on the implementation of the shrink function for the particular generator
// shrinkVal can easily go into an infinite loop
// need to stop it after some iterations
function shrinkVal(gen, val, prop, index, allArgs, checked=[], tries=0) {
    const MAX_TRIES = 100
    if(gen.shrink && typeof gen.shrink === 'function') {
        const shrinkList = gen.shrink(Math.abs(val))
        let nextVal = shrinkList.next()
        while(nextVal.done === false && tries < MAX_TRIES) {
            tries++
            const v = shrinkVal(gen, nextVal.value, prop, index, allArgs)
            const newAllArgs = [...allArgs.slice(0, index), v, ...allArgs.slice(index + 1)]
            if(prop.apply(null, newAllArgs) === false) {
                return v
            } else {
                checked.push(nextVal.value)
                nextVal = shrinkList.next()
                while(!nextVal.done && checked.indexOf(nextVal.value) >= 0) {
                    nextVal = shrinkList.next()
                }
            }
        }

        return val
    } else {
        return val
    }
}

function shrinkVals(gens, vals, prop) {
    var shrunkenValues = vals
    return vals.map((val, i) => {
        shrunkenValues[i] = shrinkVal(gens[i], val, prop, i, shrunkenValues)
        return shrunkenValues[i]
    })
}

jssmartcheck.shrinkVals = shrinkVals
jssmartcheck.shrinkVal = shrinkVal

jssmartcheck.check = (f, { quiet=false, times=100 } = {}, seed=Math.random()*1000) => {
    jssmartcheck.seed = seed;
    assert(typeof f === 'function', 'check expects a property function');

    for(let i = 0; i < times; i++) {
        var sampleValues = jssmartcheck.forallGens.map((ranGen) => {
            const randomVal = ranGen(getSize(i))
            return randomVal
        });

        if(f.apply(undefined, sampleValues) === false) {
            assert(false, getErrorMessage(i, shrinkVals(jssmartcheck.forallGens, sampleValues, f)))
        }
    }

    if(quiet === false) {
        console.log({ result: true, numTests: times, seed: seed });
    }
};

module.exports = jssmartcheck;
