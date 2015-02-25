"use strict";

var generator = require("./index");
var utils = require("../utils");
var fnGens = {};

fnGens.fn = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    var returnGenerator = utils.last(args);
    return utils.memoize(function (size) {
        if (utils.isFunction(returnGenerator)) return returnGenerator(size);
        return returnGenerator;
    });
};

fnGens.fun = fnGens["function"] = fnGens.fn;
module.exports = fnGens;