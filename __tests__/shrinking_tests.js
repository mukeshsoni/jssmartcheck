var _ = require('lodash');
var jsc = require('../src/jssmartcheck.js');
var expect = require('chai').expect;

var gen = jsc.gen
var shrinkVals = jsc.shrinkVals
var shrinkVal = jsc.shrinkVal

describe('shrinking', () => {
    it.only('should shrink integers', () => {
        const prop = x => x + 1 < 22
        const index = 0
        const val = 40
        const allArgs = [val]
        console.log(shrinkVal(gen.int, val, prop, index, allArgs)) 
    })
})
