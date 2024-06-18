let offset = 0
class Cell {
    constructor(i, j) {
        this.i = i
        this.j = j
        // top, right, bottom, left
        this.walls = [1, 1, 1, 1]
        this.visited = false
        push()
        colorMode(HSB)
        this.color = color(offset, 90, 100)
        offset = (offset + 20) % 255
        pop()
    }

    draw() {
        let x = this.i * w
        let y = this.j * w
        const [top, right, bottom, left] = this.walls
        push()
        noFill()
        stroke(this.color)
        strokeWeight(20)
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

    getWallPositions() {
        let x = this.i * w
        let y = this.j * w
        const [top, right, bottom, left] = this.walls
        const positions = []

        // top: (x,y) - (x+w, y)
        if(top) positions.push([createVector(x,y), createVector(x + w, y)])
        // right: (x+w,y) - (x+w, y+w)
        if(right) positions.push([createVector(x+w,y), createVector(x + w, y+w)])
        // bottom: (x,y+w) - (x+w, y+w)
        if(bottom) positions.push([createVector(x,y + w), createVector(x + w, y + w)])
        // left: (x,y) - (x, y+w)
        if(left) positions.push([createVector(x,y), createVector(x, y + w)])

        return positions
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
