"use strict";

var utils = require("../utils");
var basicGen = require("./basic");
var numberGen = require("./number");
var stringGen = require("./string");

var miscGens = {};

/*
 * Returns any one of the following generators with given weights
 * number.int -> 
 * number.int.positive ->
 * bool ->
 * string ->
 * string.ascii ->
 * string.alphaNum ->
 */
var any = function () {
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