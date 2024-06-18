class Player {
    constructor(x, y, index) {
        this.pos = createVector(x, y)
        this.index = index
        this.size = 10
        this.color = '#f00'
        this.vel = createVector(0, 0)
        this.baseVelocity = 0
        this.particle = new Particle(x, y)
    }

    draw() {
        push()
        fill(this.color)
        noStroke()
        ellipse(this.pos.x, this.pos.y, this.size)
        pop()

        this.particle.draw(grid)
    }

    move(amt) {
        this.baseVelocity = amt
    }

    update() {
        let cell = grid.cells[this.index]
        let cellX = cell.i * w
        let cellY = cell.j * w
        const [top, right, bottom, left] = cell.walls
        this.vel = p5.Vector.fromAngle(this.particle.heading + radians(this.particle.rays.length / 2))
        this.vel.setMag(this.baseVelocity)
        let xVel = this.vel.x
        let yVel = this.vel.y

        if(top && this.pos.y - this.size / 2 + this.vel.y < cellY) yVel = 0
        if(right && this.pos.x + this.size / 2 + this.vel.x > cellX + w) xVel = 0
        if(bottom && this.pos.y + this.size / 2 + this.vel.y > cellY + w) yVel = 0
        if(left && this.pos.x - this.size / 2 + this.vel.x < cellX) xVel = 0

        this.pos.add(xVel, yVel)
        this.particle.update(this.pos.x, this.pos.y)
    }
}
