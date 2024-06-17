var cols, rows, player, grid
const w = 3 * 7
const scl = 6

function setup() {
    createCanvas(700, 700)
    cols = floor(width / w)
    rows = floor(height / w)
    grid = new Grid(cols, rows)
    player = new Player(10, 10, 0)
}

function draw() {
    translate((-player.pos.x + w) * scl, (-player.pos.y + w) * scl)
    scale(scl)
    background(30)
    grid.draw()
    player.draw()

    player.update()
    grid.update()

    if(grid.current === grid.cells[grid.targetIndex]) {
        alert('voce ganhou')
        noLoop()
    }
}

function keyPressed() {
    if(![UP_ARROW, RIGHT_ARROW, DOWN_ARROW, LEFT_ARROW].includes(keyCode)) return

    if(keyCode === UP_ARROW) player.vel.y += -this.player.baseVelocity
    else if(keyCode === RIGHT_ARROW) player.vel.x += this.player.baseVelocity
    else if(keyCode === DOWN_ARROW) player.vel.y += this.player.baseVelocity
    else if(keyCode === LEFT_ARROW) player.vel.x += -this.player.baseVelocity
}

function keyReleased() {
    if(![UP_ARROW, RIGHT_ARROW, DOWN_ARROW, LEFT_ARROW].includes(keyCode)) return

    if(keyCode === UP_ARROW) player.vel.y -= -this.player.baseVelocity
    else if(keyCode === RIGHT_ARROW) player.vel.x -= this.player.baseVelocity
    else if(keyCode === DOWN_ARROW) player.vel.y -= this.player.baseVelocity
    else if(keyCode === LEFT_ARROW) player.vel.x -= -this.player.baseVelocity
}
