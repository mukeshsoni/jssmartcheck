var _ = require('lodash');
var generator = require('./index');
var basic = require('./basic');

var numberGen = {};

numberGen.int = (size) => Math.floor(basic.random()*size);

numberGen.int.positive = (size) => Math.abs(Math.floor(basic.random()*size));

numberGen.choose = numberGen.int.between = (min, max) => generator.elements(_.range(min, max))();

numberGen.float = (size) => basic.random()*size;

numberGen.uint = (size) => true;
numberGen.uint.large = () => Math.floor(Math.random() * Number.MAX_VALUE);

generator.extend(numberGen);
module.exports = numberGen;


