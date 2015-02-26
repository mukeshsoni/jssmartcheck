"use strict";

var utils = require("../utils");
var generator = require("./index.js");
var basicGen = require("./basic");
var numberGen = require("./number");
var stringGen = require("./string");

var miscGens = {};

miscGens.any = function () {
    var gensWithWeights = [[4, numberGen.int], [4, numberGen.int.positive], [4, basicGen.bool], [4, stringGen.string], [4, stringGen.string.ascii], [4, stringGen.string.alphaNum]];

    return generator.frequency(gensWithWeights);
};

/*
 * Returns any one of the following generators with given weights
 * number.int -> 
 * number.int.positive ->
 * bool ->
 * string ->
 * string.ascii ->
 * string.alphaNum ->
 */
miscGens.any.simple = function () {
    var gensWithWeights = [[4, numberGen.int], [4, numberGen.int.positive], [4, basicGen.bool], [4, stringGen.string], [4, stringGen.string.ascii], [4, stringGen.string.alphaNum]];

    return generator.frequency(gensWithWeights);
};

// TODO
var date = function () {
    return new Date(numberGen.uint.large());
};

miscGens = {
    any: any,
    date: date
};

module.exports = miscGens;