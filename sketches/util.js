function arrayWithCount(count) {
    return [...new Array(count)].map((_, i) => i)
}

module.exports = {
    arrayWithCount,
}
