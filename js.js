var cols, rows, current
const w = 20
const grid = []
const stack = []

function setup() {
    createCanvas(displayWidth * .9, displayHeight * .85)
    cols = floor(width / w)
    rows = floor(height / w)

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let cell = new Cell(i, j)
            grid.push(cell)
        }
    }

    createMaze()
    stack.filter(() => 0)
    current = grid[0]
    frameRate(20)
}

function draw() {
    background(30)
    grid.forEach(cell => {
        cell.draw()
        if(cell == current) {
            let x = cell.i * w
            let y = cell.j * w
            push()
            fill(0, 200, 0)
            noStroke()
            rect(x, y, w, w)
            pop()
        }
    })

    let cell = grid[grid.length - 1]
    let x = cell.i * w
    let y = cell.j * w
    fill(0, 0, 200)
    noStroke()
    rect(x, y, w, w)

    if(keyIsDown(UP_ARROW)) move(UP_ARROW)
    if(keyIsDown(RIGHT_ARROW)) move(RIGHT_ARROW)
    if(keyIsDown(DOWN_ARROW)) move(DOWN_ARROW)
    if(keyIsDown(LEFT_ARROW)) move(LEFT_ARROW)

    if(current === cell) {
        alert('voce ganhou')
        noLoop()
    }
}

function move(arrowCode) {
    let x = current.i
    let y = current.j
    const [top, right, bottom, left] = current.walls

    if(arrowCode === UP_ARROW && !top) y--
    if(arrowCode === RIGHT_ARROW && !right) x++
    if(arrowCode === DOWN_ARROW && !bottom) y++
    if(arrowCode === LEFT_ARROW && !left) x--

    const i = x * rows + y
    current = grid[i]
}
