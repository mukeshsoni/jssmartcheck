// gets all generators together into a single module
var _ = require('lodash');
var utils = require('../utils');
var generators = {};

/*creates a Generator which returns a random element from a list (array in our case)*/
var elements = (items) => {
    return () => items[utils.random(0, items.length-1)];
}

/*
 * Choose a generator from the pairs provided. The pair consists of the weight that pair needs to be given and the generator
 * pairs: [[2 gen.int] [3 gen.int.between(0, 100)] [1 gen.bool]]
 */
// TODO - need assertions for pairs passed
var frequency = (pairs) => {
    var gensSpread = _.reduce(pairs, (acc, pair) => {
        return acc.concat(_.fill(new Array(pair[0]), pair[1]));
    }, []);

    return elements(gensSpread);
};

var suchThat = (filterFn, gen) => {
    return (size) => {
        var generatedValue = gen(size)
        while(filterFn(generatedValue) !== true) {
            generatedValue = gen(size);
        }
        return generatedValue;
    }
};

/*Picks a random generator from a list of generators*/
var oneOf = (...gens) => elements(gens)();

generators = {
    elements: elements,
    frequency: frequency,
    oneOf: oneOf,
    suchThat: suchThat
};

generators.extend = function(obj) {
	_.extend(generators, obj);
}

module.exports = generators;