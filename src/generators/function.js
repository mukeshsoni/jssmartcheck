var _ = require('lodash');
var generator = require('./index');
var utils = require('../utils');
var fnGens = {};

fnGens.fn = (...args) => {
    var returnGenerator = utils.last(args);
    return _.memoize((size) => {
        if(utils.isFunction(returnGenerator)) 
            return returnGenerator(size);
        return returnGenerator;
    });
};

fnGens.fun = fnGens.function = fnGens.fn;
module.exports = fnGens;