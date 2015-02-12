var _ = require('lodash');
var constants = require('./constants');

var fun = () => true;
var generators = {};

generators.int = () => {
	return _.random(constants.MAX_INT * -1, constants.MAX_INT);
};

module.exports = generators;