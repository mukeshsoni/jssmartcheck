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

function shrinkVal(gen, val, prop, index, allArgs) {
    if(gen.shrink && typeof gen.shrink === 'function') {
        const shrinkList = gen.shrink(val)
        // if there is a shrink list
        const nextVal = shrinkList.next()
        if(nextVal.done === false) {
            return shrinkVal(nextVal.value, val, prop, index, allArgs)
        } else {
            if(f.apply(null, [...allArgs.slice(0, index), shrunken.value, ...allArgs.slice(index + 1)]) === true) {
                const nextVal2 = shrinkList.next()
                if(nextVal2.done === false) {
                    return val
                } else {
                    return shrinkVal(gen, nextVal2.value, prop, index, allArgs)
                }
            } else {
                return val
            }
        }
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

jssmartcheck.check = (f, times=100, seed=Math.random()*1000) => {
    jssmartcheck.seed = seed;
    assert(typeof f === 'function', 'check expects a property function');

    for(let i = 0; i < times; i++) {
        var sampleValues = jssmartcheck.forallGens.map((ranGen) => {
            return ranGen(getSize(i));
        });

        if(f.apply(undefined, sampleValues) === true) {
            console.log({ result: true, numTests: times, seed: seed });
        } else {
            throw new Error(getErrorMessage(i, shrinkVals(forallGens, sampleValues, f)))
        }
    }

    console.log({ result: true, numTests: times, seed: seed });
};

module.exports = jssmartcheck;
