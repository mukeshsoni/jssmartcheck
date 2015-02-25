"use strict";

// gets all generators together into a single module
var assert = require("assert");
var utils = require("../utils");
var stringGen = require("./string.js");
var numberGen = require("./number.js");
var arrayGen = require("./array.js");
var basicGen = require("./basic.js");
var functionGen = require("./function.js");
var objectGen = require("./object.js");
var miscGen = require("./misc.js");

/*
 * Choose a generator from the pairs provided. The pair consists of the weight that pair needs to be given and the generator
 * pairs: [[2 gen.int] [3 gen.int.between(0, 100)] [1 gen.bool]]
 */
// TODO - need assertions for pairs passed
var frequency = function (pairs) {
    var gensSpread = pairs.reduce(function (acc, pair) {
        return acc.concat(new Array(pair[0]).fill(pair[1]));
    }, []);

    return elements(gensSpread);
};

var suchThat = function (filterFn, gen) {
    var maxIterations = arguments[2] === undefined ? 10 : arguments[2];
    return function (size) {
        var generatedValue = gen(size);
        var iterationCount = 0;
        while (filterFn(generatedValue) !== true && iterationCount < maxIterations) {
            generatedValue = gen(size);
            iterationCount += 1;
            size += 1;
        }


        assert(filterFn(generatedValue), "could not a generate value as per filter function after " + maxIterations);

        return generatedValue;
    };
};

/*Picks a random generator from a list of generators*/
var oneOf = function () {
    for (var _len = arguments.length, gens = Array(_len), _key = 0; _key < _len; _key++) {
        gens[_key] = arguments[_key];
    }

    return elements(gens)();
};

var sample = function (gen) {
    var times = arguments[1] === undefined ? 100 : arguments[1];
    var results = [];
    for (var i = 0; i < times; i++) {
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

generators.extend = function () {
    for (var _len = arguments.length, obj = Array(_len), _key = 0; _key < _len; _key++) {
        obj[_key] = arguments[_key];
    }

    if (typeof obj.join !== "function") {
        obj = [obj];
    }
    utils.extend.apply(utils, [generators].concat(obj));
};

generators.extend(stringGen, numberGen, arrayGen, basicGen, functionGen, objectGen, miscGen);
module.exports = generators;