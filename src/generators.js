var _ = require('lodash');
var constants = require('./constants');

var fun = () => true;
var generators = {};

/*
 * String generators
 */ 
generators.byte = () => Math.floor(Math.random() * 256);
generators.char = () => String.fromCharCode(generators.byte());
generators.string = (size) => {
	var randomString = '';

	for(var i in _.range(_.random(0, size))) {
		randomString += generators.char();
	}
	return randomString;
};

generators.int = () => {
	return _.random(constants.MAX_INT * -1, constants.MAX_INT);
};

module.exports = generators;