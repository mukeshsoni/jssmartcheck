var generator = require('./index');

var basicGens = {};

basicGens.byte = () => Math.floor(Math.random() * 256);
basicGens.char = () => String.fromCharCode(basicGens.byte());

generator.extend(basicGens);

module.exports = basicGens;