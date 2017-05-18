const { range } = require('./utils')

function getSize(i) {
    if(i < 4) {
        return i
    } else {
        return i * 2 
    }
}

function getRandomVals(ranGen, n) {
    return range(0, n).map((i) => ranGen(getSize(i)))
}

module.exports = {
    getRandomVals,
    getSize
}
