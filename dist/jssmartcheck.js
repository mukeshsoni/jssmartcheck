"use strict";

require("babel/polyfill");
var assert = require("assert");
var gen = require("./generators");

var jssmartcheck = { gen: gen };

jssmartcheck.forAll = function () {
    for (var _len = arguments.length, gens = Array(_len), _key = 0; _key < _len; _key++) {
        gens[_key] = arguments[_key];
    }

    assert(gens.every(function (gen) {
        return typeof gen === "function";
    }), "Expect all generators to be function references");

    jssmartcheck.forallGens = gens;
    return jssmartcheck;
};

var getErrorMessage = function (numTests, fail) {
    return JSON.stringify({
        result: false,
        numTests: numTests,
        fail: fail
    });
};

jssmartcheck.check = function (f) {
    var times = arguments[1] === undefined ? 100 : arguments[1];
    var seed = arguments[2] === undefined ? Math.random() * 1000 : arguments[2];

    jssmartcheck.seed = seed;
    assert(typeof f === "function", "check expects a property function");

    for (var i = 0; i < times; i++) {
        var sampleValues;

        (function (i) {
            sampleValues = jssmartcheck.forallGens.map(function (gen, index) {
                return gen(i);
            });

            assert(f.apply(undefined, sampleValues) === true, getErrorMessage(i, sampleValues));
        })(i);
    }

    console.log({ result: true, numTests: times, seed: seed });
};

module.exports = jssmartcheck;