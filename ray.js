class Ray {
    constructor(pos, a) {
        this.pos = pos
        this.dir = p5.Vector.fromAngle(a)
    }

    draw() {
        push()
        stroke(255, 100)
        strokeWeight(4)
        point(this.pos.x, this.pos.y)
        strokeWeight(1)
        line(this.pos.x, this.pos.y, this.pos.x + this.dir.x * 5, this.pos.y + this.dir.y * 5)
        pop()
    }

    setAngle(angle) {
        this.dir = p5.Vector.fromAngle(angle)
    }

    lookAt(x, y) {
        let pt = createVector(x, y)
        this.dir = p5.Vector.sub(pt, this.pos)
        this.dir.normalize()
    }

    cast(wall) {
        const x1 = this.pos.x
        const y1 = this.pos.y
        const x2 = this.pos.x + this.dir.x
        const y2 = this.pos.y + this.dir.y

        const x3 = wall.a.x
        const y3 = wall.a.y
        const x4 = wall.b.x
        const y4 = wall.b.y

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
        
        // linhas paralelas
        if (den == 0) return

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den
        const u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / den

        // 0.0 ≤ t ≤ 1.0 and 0.0 ≤ u ≤ 1.0
        if(t < 0 || u < 0 || u > 1) return
        
        const x = x3 + u * (x4 - x3)
        const y = y3 + u * (y4 - y3)

        return createVector(x, y)
    }
}
