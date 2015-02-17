var _ = require('lodash');
var utils = require('../utils');
var basicGen = require('./basic');
var numberGen = require('./number');
var stringGen = require('./string');
var generator = require('./index');

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
var any = () => {
    var gensWithWeights = [
        [4, numberGen.int],
        [4, numberGen.int.positive],
        [4, basicGen.bool],
        [4, stringGen.string],
        [4, stringGen.string.ascii],
        [4, stringGen.string.alphaNum]
    ];

    return generator.frequency(gensWithWeights)
}

// TODO
var date = () => new Date(numberGen.uint.large());

miscGens = {
    any: any,
    date: date
};

generator.extend(miscGens);

module.exports = miscGens;