const canvasSketch = require('canvas-sketch')

const settings = {
    dimensions: [512, 512]
}

const sketch = () => {
    return ({context, width, height}) => {
        drawBackground(context)
        context.fillStyle = 'black'



        drawRect(context, width, height)

        context.translate(50, 50)
        context.beginPath()
        context.arc(0, 0, 50, 0, Math.PI * 2)
        context.fillStyle = 'crimson'
        context.fill()
    }
}

canvasSketch(sketch, settings)

function drawRect(context, width, height) {
    context.save()
    const x = width * .5
    const y = height * .5
    const w = width * .3
    const h = height * .3

    context.translate(x, y)
    context.rotate(.3)

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
