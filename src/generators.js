var _ = require('lodash');
var constants = require('./constants');

var fun = () => true;
var generators = {};

/*
 * array generators
 */
generators.arrayOf = (gen) => {
    // yeah, unreadble, but fun :)
    return size => _.range(_.random(0, size)).map(i => gen(i));
}

/*
 * String generators
 */ 
generators.byte = () => Math.floor(Math.random() * 256);
generators.char = () => String.fromCharCode(generators.byte());
generators.string = (size) => {
    return generators.arrayOf(generators.char)(size).join('');
};

/*
 *	Numbers live here
 */
generators.int = () => {
	return _.random(constants.MAX_INT * -1, constants.MAX_INT);
};
generators.int.positive = () => _.random(1, constants.MAX_INT);
generators.int.between = (min, max) => _.random(min+1, max+1);

module.exports = generators;