// gets all generators together into a single module
var _ = require('lodash');
var utils = require('../utils');
var generators = {};

/*creates a Generator which returns a random element from a list (array in our case)*/
var elements = (items) => {
    return () => items[_.random(0, items.length-1)];
}

/*Picks a random generator from a list of generators*/
var oneOf = (...gens) => elements(gens)();

generators = {
    elements: elements,
    oneOf: oneOf
};

generators.extend = function(obj) {
	_.extend(generators, obj);
}

module.exports = generators;