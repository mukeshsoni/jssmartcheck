var _ = require('lodash');
var generator = require('./index');
var fnGens = {};

fnGens.fn = (...args) => {
    var returnGenerator = _.last(args);
    return _.memoize((size) => {
        if(_.isFunction(returnGenerator)) 
            return returnGenerator(size);
        return returnGenerator;
    });
};

fnGens.fun = fnGens.function = fnGens.fn;

module.exports = fnGens;