class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y)
        this.rays = []
        this.heading = 0
        // mostra as cells carregadas pro ray casting
        this.debug = false
        this.renderDistance = 10
        const maxAngle = 45

        for (let a = 0; a < maxAngle; a++) {
            this.rays.push(new Ray(this.pos, radians(a)))
        }
    }

    rotate(angle) {
        this.heading += angle
        for (let i in this.rays) {
            this.rays[i].setAngle(radians(i) + this.heading)
        }
    }

    getScene(grid) {
        const walls = grid.getPath(null, null, this.renderDistance).flatMap(cell => {
            let c = cell.color
            if(cell === grid.cells[grid.targetIndex]) c = color(0, 0, 255)
            return cell.getWallPositions().map(([p1, p2]) => new Wall(p1.x, p1.y, p2.x, p2.y, c))
        }
        )

        return this.cast(walls, false)
    }

    draw(grid) {
        const walls = grid.getPath(null, null, this.renderDistance).flatMap(cell => {
            if(this.debug) {
                let x = cell.i * w
                let y = cell.j * w
                push()
                fill(0, 0, 255, 100)
                noStroke()
                rect(x, y, w, w)
                pop()
            }

            return cell.getWallPositions().map(([p1, p2]) => new Wall(p1.x, p1.y, p2.x, p2.y))
        })

        return this.cast(walls)
    }

    update(x, y) {
        this.pos.set(x, y)
    }

    cast(walls, cast = true) {
        const scene = []
        for (const ray of this.rays) {
            let closest = null
            let closestDist = Infinity
            let closestCast = null
            for (const wall of walls) {
                let cast = ray.cast(wall)
                if(!cast) continue
                let d = p5.Vector.dist(cast, this.pos)
                if(d >= closestDist) continue

                closest = wall
                closestCast = cast
                closestDist = d
            }

            if(closest) {
                const a = ray.dir.heading() - this.rays[floor(this.rays.length / 2)].dir.heading()
                scene.push({ distance: closestDist * cos(a), material: closest.material })
            } else {
                scene.push({ distance: Infinity, material: color(255) })
            }

            if(!closest || !cast) continue

            push()
            stroke(255)
            line(this.pos.x, this.pos.y, closestCast.x, closestCast.y)
            pop()
        }

        return scene
    }
}