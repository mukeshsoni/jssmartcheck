var _ = require('lodash');
var generator = require('./index');

var arrayGens = {};
arrayGens.arrayOf = (gen) => {
    // yeah, unreadble, but fun :)
    return size => _.range(_.random(0, size)).map(i => gen(i));
}

generator.extend(arrayGens);
module.exports = arrayGens;
