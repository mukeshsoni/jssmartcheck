var _ = require('lodash');
var utils = require('../utils');
var generator = require('./index');

var basicGens = {};

basicGens.byte = () => Math.floor(Math.random() * 256);
basicGens.char = () => String.fromCharCode(basicGens.byte());
basicGens.bool = () => !!_.random(0, 1);
basicGens.ascii = () => String.fromCharCode(utils.choose(_.range(32,126)));

generator.extend(basicGens);

module.exports = basicGens;