var cols, rows, player, grid
const w = 70

function setup() {
    createCanvas(700, 700)
    cols = floor(width / w)
    rows = floor(height / w)
    grid = new Grid(cols, rows)
    player = new Player(10, 10, 0)
}

function draw() {
    background(30)
    drawScene()
    drawMinimap()

    player.update()
    grid.update()

    if(grid.current === grid.cells[grid.targetIndex]) {
        alert('voce ganhou')
        noLoop()
    }

    if(keyIsDown(65)) player.particle.rotate(-0.05)
    if(keyIsDown(68)) player.particle.rotate(0.05)
}

function drawScene() {
    const scene = player.particle.getScene(grid)
    let w = width / scene.length

    push()
    translate(0, height / 2)
    for (const i in scene) {
        const { distance: d, material: { levels: material } } = scene[i]
        const sq = d * d
        const sqW = width * width
        // inverse square law for brightness
        const b = map(sq, 0, sqW, 1, 0)
        // weak perspective projection for height (thanks to @HyperMario64)
        const h = map(height / (d * 0.1), 0, 150, 0, 3 * height / 4)
        noStroke()
        if(material) fill(material[0] * b, material[1] * b, material[2] * b)
        else fill(255 * b)
        rectMode(CENTER)
        rect(i * w, 0, w + 1, h)
    }
    pop()
}

function drawMinimap(drawPlayer = false) {
    const scl = 0.25
    push()
    translate(2 * width / 3, 10)
    scale(scl)
    grid.draw()
    if(drawPlayer) player.draw()
    pop()
}

function keyPressed() {
    if(key == 'w') player.move(3)
    else if(key == 's') player.move(-3)
}

function keyReleased() {
    if(key == 'w' || key == 's') player.move(0)
}
