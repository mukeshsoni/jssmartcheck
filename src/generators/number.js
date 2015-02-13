var _ = require('lodash');
var constants = require('../constants');

var numberGen = {};

numberGen.int = () => {
	return _.random(constants.MAX_INT * -1, constants.MAX_INT);
};
numberGen.int.positive = () => _.random(1, constants.MAX_INT);
numberGen.int.between = (min, max) => _.random(min+1, max+1);

module.exports = numberGen;