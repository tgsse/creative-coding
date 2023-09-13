function arrayWithCount(count) {
    return [...new Array(count)].map((_, i) => i)
}

function degrees(degrees) {
    // turn degrees into radians
    return degrees / 180 * Math.PI
}

function random(min, max) {
    return Math.random() * (max - min) + min
}

module.exports = {
    arrayWithCount,
    degrees,
    random,
}
