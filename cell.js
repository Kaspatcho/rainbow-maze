class Cell {
    constructor(i, j) {
        this.i = i
        this.j = j
        // top, right, bottom, left
        this.walls = [1, 1, 1, 1]
        this.visited = false
    }

    draw() {
        let x = this.i * w
        let y = this.j * w
        const [top, right, bottom, left] = this.walls
        push()
        // if(this.visited) {
        //     fill(30)
        //     noStroke()
        //     rect(x, y, w, w)
        // }
        noFill()
        stroke(255)
        strokeWeight(2)
        // top
        if(top) line(x, y, x + w, y)
        // right
        if(right) line(x + w, y, x + w, y + w)
        // bottom
        if(bottom) line(x, y + w, x + w, y + w)
        // left
        if(left) line(x, y, x, y + w)
        pop()
    }

    unvisitedNeighbours(grid) {
        const neighbours = []
        for(let iOff = -1; iOff <= 1; iOff++) {
            for(let jOff = -1; jOff <= 1; jOff++) {
                // removendo diagonais e a propria celula que nao pode ser contada como vizinha
                if(Math.abs(iOff) == Math.abs(jOff)) continue
                // checando bordas
                if(this.j + jOff < 0 || this.j + jOff >= rows || this.i + iOff < 0 || this.i + iOff >= cols) continue

                // i = y * width + x
                const i = (this.i + iOff) * rows + (this.j + jOff)
                const neighbour = grid[i]
                if(neighbour.visited) continue
                neighbours.push(neighbour)
            }
        }

        return neighbours
    }

    removeWallToNeighbour(neighbour) {
        // top
        if(neighbour.j < this.j) {
            this.walls[0] = 0
            neighbour.walls[2] = 0
        }
        // right
        if(neighbour.i > this.i) {
            this.walls[1] = 0
            neighbour.walls[3] = 0
        }
        // bottom
        if(neighbour.j > this.j) {
            this.walls[2] = 0
            neighbour.walls[0] = 0
        }
        // left
        if(neighbour.i < this.i) {
            this.walls[3] = 0
            neighbour.walls[1] = 0
        }
    }
}

function createMaze(grid) {
    const stack = []
    let current = grid.cells[0]
    current.visited = true
    let unvisited = grid.cells.length - 1

    while(unvisited > 0) {
        let neighbours = current.unvisitedNeighbours(grid.cells)
        if(neighbours.length) {
            const neighbour = random(neighbours)
            stack.push(current)
            current.removeWallToNeighbour(neighbour)
            neighbour.visited = true
            current = neighbour
            unvisited--
        } else if(stack.length) {
            const cell = stack.pop()
            current = cell
        }
    }
}