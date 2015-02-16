var _ = require('lodash');
var constants = require('../constants');
var generator = require('./index');

var numberGen = {};

numberGen.int = (size = constants.MAX_INT) => _.random(size * -1, size);

numberGen.int.positive = (size=constants.MAX_INT) => _.random(1, size);

numberGen.int.between = (min, max) => _.random(min+1, max+1);

numberGen.float = (size=constants.MAX_INT) => _.random(size * -1, size, true);

generator.extend(numberGen);
module.exports = numberGen;


