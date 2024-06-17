class Player {
    constructor(x, y, index) {
        this.pos = createVector(x, y)
        this.index = index
        this.size = 10
        this.color = '#f00'
        this.vel = createVector(0, 0)
        this.baseVelocity = 2.5
    }

    draw() {
        push()
        fill(this.color)
        noStroke()
        ellipse(this.pos.x, this.pos.y, this.size)
        pop()
    }

    update() {
        let cell = grid.cells[this.index]
        let cellX = cell.i * w
        let cellY = cell.j * w
        const [top, right, bottom, left] = cell.walls
        let xVel = this.vel.x
        let yVel = this.vel.y

        if(top && this.pos.y - this.size / 2 + this.vel.y < cellY) yVel = 0
        if(right && this.pos.x + this.size / 2 + this.vel.x > cellX + w) xVel = 0
        if(bottom && this.pos.y + this.size / 2 + this.vel.y > cellY + w) yVel = 0
        if(left && this.pos.x - this.size / 2 + this.vel.x < cellX) xVel = 0

        this.pos.add(xVel, yVel)
    }
}
