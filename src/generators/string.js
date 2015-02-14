var basicGen = require('./basic.js');
var arrayGen = require('./array.js');
var generator = require('./index');

var stringGens = {};

stringGens.byte = () => Math.floor(Math.random() * 256);
stringGens.char = () => String.fromCharCode(basicGen.byte());
stringGens.string = (size) => {
    return arrayGen.arrayOf(basicGen.char)(size).join('');
};

generator.extend(stringGens);
module.exports = stringGens;