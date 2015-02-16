var _ = require('lodash');
var utils = require('../utils');
var generator = require('./index');

var miscGens = {};

miscGens.date = () => Math.floor(Math.random() * 256);
// miscGens.oneOf = ()

generator.extend(miscGens);

module.exports = miscGens;