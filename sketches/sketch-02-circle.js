const canvasSketch = require('canvas-sketch')
const {degrees, random} = require("./util");

const settings = {
    dimensions: [512, 512]
}

const sketch = () => {

    return ({context, width, height}) => {
        const date = new Date(Date.now()).toISOString()
        console.log(date)
        drawBackground(context)
        context.fillStyle = 'black'

        drawLines(context, width, height)
        // drawCircleAndDot(context, width, height)
    }
}

canvasSketch(sketch, settings)


function drawLines(context, width, height) {
    context.save()

    const centerX = width * .5
    const centerY = height * .5

    let x
    let y
    const w = width * .005
    const h = height * .1

    const slices = 80
    const radius = width * 0.3

    for (let i = 0; i < slices; i++) {
        const slice = degrees(360 / slices)
        const angle = slice * i

        const randomHeight = Math.random()

        x = radius * Math.sin(angle)
        y = radius * Math.cos(angle)

        context.save()
        context.translate(centerX, centerY)
        context.translate(x, y)
        context.rotate(-angle)
        context.scale(random(.1, 2), random(.2, .5))

        context.beginPath()
        context.rect(-w / 2, random(0, -h / 2), w, h)
        context.fill()
        context.restore()

        context.save()

        context.translate(centerX, centerY)
        context.rotate(-angle)

        context.lineWidth = random(3, 16)
        context.beginPath()
        context.arc(0, 0, radius * random(.7, 1.3), slice * random(1, -2), slice * random(0, 5))
        context.stroke()

        context.restore()
    }
}

function drawCircleAndDot(context, width, height) {
    drawRect(context, width, height)
    drawCircle(context)
}

function drawCircle(context) {
    context.translate(50, 50)
    context.beginPath()
    context.arc(0, 0, 50, 0, Math.PI * 2)
    context.fillStyle = 'crimson'
    context.fill()
}

function drawRect(context, width, height) {
    context.save()
    const x = width * .5
    const y = height * .5
    const w = width * .3
    const h = height * .3

    context.translate(x, y)
    context.rotate(degrees(45))

    context.beginPath()
    context.rect(-w / 2, -h / 2, w, h)
    context.fill()
    context.restore()
}

function drawBackground(context) {
    context.fillStyle = 'white'
    context.fillRect(
        0,
        0,
        settings.dimensions[0],
        settings.dimensions[1])
}
