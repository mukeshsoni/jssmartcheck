const { range } = require('./utils')

function getSize(i) {
    return i * (2 ^ i)
}

function getRandomVals(ranGen, n) {
    return range(0, n).map((i) => ranGen(getSize(i)))
}

module.exports = {
    getRandomVals,
    getSize
}
