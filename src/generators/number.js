var _ = require('lodash');
var generator = require('./index');
var basic = require('./basic');

var numberGen = {};

numberGen.int = (size) => Math.floor(basic.random()*size);

numberGen.int.positive = (size) => Math.abs(Math.floor(basic.random()*size));

numberGen.int.between = (min, max) => Math.floor(basic.random(min, max));

numberGen.float = (size) => basic.random()*size;

generator.extend(numberGen);
module.exports = numberGen;


