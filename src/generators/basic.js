var _ = require('lodash');
var utils = require('../utils');
var generator = require('./index');
var constants = require('../constants');

var basicGens = {};

basicGens.byte = () => Math.floor(Math.random() * 256);
basicGens.char = () => String.fromCharCode(basicGens.byte());
basicGens.bool = () => !!_.random(0, 1);
basicGens.ascii = () => String.fromCharCode(utils.choose(_.range(32,126)));
basicGens.falsy = () => utils.choose([false, null, undefined, 0, "", NaN]);
basicGens.random = (min=constants.MAX_INT * -1, max=constants.MAX_INT) => _.random(min, max, true);


generator.extend(basicGens);

module.exports = basicGens;