const canvasSketch = require('canvas-sketch');
const {random} = require("./util");

const settings = {
    dimensions: [1080, 1080],
    animate: true,
};

const defaultRadius = 8

const sketch = ({width, height}) => {
    const agents = new Array(40).fill(undefined).map(_ => {
        const x = random(defaultRadius / 2, width - defaultRadius / 2)
        const y = random(defaultRadius / 2, height - defaultRadius / 2)
        return new Agent(x, y)
    })

    return ({context, width, height}) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

        agents.forEach(a => {
            a.update()
            a.draw(context)
            a.bounce(width, height)
        })

    };
};

canvasSketch(sketch, settings);

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Agent {
    constructor(x, y) {
        this.pos = new Point(x, y)
        this.movingTo = new Point(random(-1, 1), random(-1, 1))
        this.radius = random(4, 12)
    }

    update() {
        this.pos.x += this.movingTo.x
        this.pos.y += this.movingTo.y
    }

    bounce(width, height) {
        if (this.pos.x <= this.radius || this.pos.x >= width - this.radius) this.movingTo.x *= -1
        if (this.pos.y <= this.radius || this.pos.y >= height - this.radius) this.movingTo.y *= -1
    }

    draw(context) {
        context.save()
        context.translate(this.pos.x, this.pos.y)

        context.lineWidth = 4

        context.beginPath()
        context.arc(0, 0, this.radius, 0, Math.PI * 2)
        context.fill()
        context.stroke()

        context.restore()
    }
}
