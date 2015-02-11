var _ = require('lodash');

var fun = () => true;
var generators = {a: 'b', c: fun};
module.exports = generators;