class Wall {
    constructor(x1, y1, x2, y2, material) {
        this.a = createVector(x1, y1)
        this.b = createVector(x2, y2)
        this.material = material ?? color(255, 0, 0)
    }

    draw() {
        push()
        stroke(255)
        line(this.a.x, this.a.y, this.b.x, this.b.y)
        pop()
    }
}
