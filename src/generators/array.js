var _ = require('lodash');

var arrayGens = {};
arrayGens.arrayOf = (gen) => {
    // yeah, unreadble, but fun :)
    return size => _.range(_.random(0, size)).map(i => gen(i));
}

module.exports = arrayGens;