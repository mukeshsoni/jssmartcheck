var _ = require('lodash');
var jsc = require('../src/jssmartcheck.js');
var expect = require('chai').expect;

var gen = jsc.gen
var shrinkVals = jsc.shrinkVals
var shrinkVal = jsc.shrinkVal

describe('shrinking', () => {
    function add(x, y) { return x + y }
    it.only('should shrink integers', () => {
        const prop1 = x => x < 7
        function prop2(x, y) { return add(x, y) >= y * 2 }
        const index = 0
        const val = 40
        const allArgs = [val]
        console.log(shrinkVal(gen.int, val, prop1, index, allArgs)) 
        console.log(shrinkVals([gen.int], [val], prop1))
        console.log(shrinkVals([gen.int, gen.int], [val, 38], prop2))
    })
})
