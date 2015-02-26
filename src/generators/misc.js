var assert = require('assert');
var utils = require('../utils');
var basicGen = require('./basic');
var numberGen = require('./number');
var stringGen = require('./string');
var objectGen = require('./object.js');

var miscGens = {};

miscGens.suchThat = (filterFn, gen, maxIterations=10) => {
    return (size) => {
        var generatedValue = gen(size)
        var iterationCount = 0;
        while(filterFn(generatedValue) !== true && iterationCount < maxIterations) {
            generatedValue = gen(size);
            iterationCount += 1;
            size += 1;
        }


        assert(filterFn(generatedValue), `could not a generate value as per filter function after ${maxIterations}`);

        return generatedValue;
    }
};

/*Picks a random generator from a list of generators*/
miscGens.oneOf = (...gens) => basicGen.elements(gens)();

/*
 * Choose a generator from the pairs provided. The pair consists of the weight that pair needs to be given and the generator
 * pairs: [[2 gen.int], [3 gen.int.between(0, 100)], [1 gen.bool]]
 */
// TODO - need assertions for pairs passed
miscGens.frequency = (pairs) => {
    var gensSpread = pairs.reduce( (acc, pair) => {
        return acc.concat(new Array(pair[0]).fill(pair[1]));
    }, []);

    return basicGen.elements(gensSpread)();
};

miscGens.any = () => {
    var gensWithWeights = [
        [4, numberGen.int],
        [4, numberGen.int.positive],
        [2, numberGen.int.large],
        [4, basicGen.bool],
        [4, stringGen.string],
        [4, stringGen.string.ascii],
        [4, stringGen.string.alphaNum],
        [4, stringGen.string.alpha],
        [1, objectGen.object]
    ];

    return miscGens.frequency(gensWithWeights)();
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
miscGens.any.simple = () => {
    var gensWithWeights = [
        [4, numberGen.int],
        [4, numberGen.int.positive],
        [4, basicGen.bool],
        [4, stringGen.string],
        [4, stringGen.string.ascii],
        [4, stringGen.string.alphaNum],
        [4, stringGen.string.alpha]
    ];

    return miscGens.frequency(gensWithWeights)();
};

// random date generator
miscGens.date = () => new Date(numberGen.uint.large());

module.exports = miscGens;