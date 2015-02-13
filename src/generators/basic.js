var basicGens = {};

basicGens.byte = () => Math.floor(Math.random() * 256);
basicGens.char = () => String.fromCharCode(basicGens.byte());

module.exports = basicGens;