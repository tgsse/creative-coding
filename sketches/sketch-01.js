const canvasSketch = require('canvas-sketch');
const {arrayWithCount} = require('./util')

const canvasWidth = 400
const canvasHeight = 400

const settings = {
    dimensions: [canvasWidth, canvasHeight],
};

function Rect(x, y, w, h, isOn = false) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.isOn = isOn
    return this
}

const sketch = ({canvas, render}) => {
    const boxCountX = 5
    const boxCountY = 5

    const gap = 20 / boxCountX

    const boxW = (canvasWidth - ((boxCountX + 1) * gap)) / boxCountX
    const boxH = (canvasHeight - ((boxCountY + 1) * gap)) / boxCountY

    const grid = buildGrid(boxCountX, boxCountY, gap, boxW, boxH)

    setTimeout(() => {
        grid[0][0].isOn = !grid[0][0].isOn
        render()
    }, 1000)

    canvas.addEventListener('click', event => {
        console.log({offsetX: event.offsetX, offsetY: event.offsetY, event})
        const {row, column} = findBoxIndex(event.offsetX, event.offsetY, grid)
        const box = grid[row][column]
        box.isOn = !box.isOn
        render()
    })

    const lastBoxIndices = {row: -1, column: -1}
    canvas.addEventListener('mousemove', event => {
        console.log({offsetX: event.offsetX, offsetY: event.offsetY, event})
        const {row, column} = findBoxIndex(event.offsetX, event.offsetY, grid)
        if (row !== lastBoxIndices.row || column !== lastBoxIndices.column) {
            lastBoxIndices.row = row
            lastBoxIndices.column = column
            const box = grid[row][column]
            box.isOn = !box.isOn
        }
        render()
    })

    return ({context, width, height}) => {
        renderBackground(context, width, height)

        renderGrid(context, grid, gap)
    };
};

canvasSketch(sketch, settings);

function findBoxIndex(x, y, grid) {
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            const box = grid[r][c]
            if (x >= box.x
                && y >= box.y
                && x <= box.x + box.w
                && y <= box.y + box.h) {
                return {
                    row: r,
                    column: c,
                }
            }
        }
    }
    // const boxClicked = grid
    //     .flat()
    //     .find(box =>
    //         x >= box.x
    //         && y >= box.y
    //         && x <= box.x + box.w
    //         && y <= box.y + box.h
    //     )
    // boxClicked.isOn = !boxClicked.isOn
}

function buildGrid(boxCountX, boxCountY, gap, boxW, boxH) {
    return arrayWithCount(boxCountX).map(bx => {
        return arrayWithCount(boxCountY).map(by => {
            return new Rect(
                gap + (boxW + gap) * bx,
                gap + (boxH + gap) * by,
                boxW,
                boxH,
                Math.random() > 0.5,
            )
        })
    })
}

function renderGrid(context, grid, gap) {
    const offsetX = gap
    const offsetY = gap

    grid.forEach(row => {
        row.forEach(({x, y, w, h, isOn}) => {
            context.beginPath()
            context.rect(x, y, w, h)
            context.fillStyle = 'black'
            context.fill()

            if (isOn) {
                context.beginPath()
                context.rect(x + offsetX, y + offsetY, w - (2 * offsetX), h - (2 * offsetY))

                context.fillStyle = 'white'
                context.fill()
            }
        })
    })
}

function renderBackground(context, width, height) {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
}
