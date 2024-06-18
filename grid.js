class Grid {
    constructor(cols, rows) {
        this.cells = []
        this.current = 0
        this.targetIndex = 0
        // draws current cell
        this.debug = false

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let cell = new Cell(i, j)
                this.cells.push(cell)
            }
        }

        createMaze(this)
        this.current = this.cells[0]
        this.targetIndex = this.cells.length - 1
    }

    draw() {
        this.cells.forEach(cell => {
            cell.draw()
            if(!this.debug) return

            if(cell == this.current) {
                let x = cell.i * w
                let y = cell.j * w
                push()
                noFill()
                strokeWeight(4)
                stroke(0, 200, 0)
                rect(x, y, w, w)
                pop()
            }
        })

        let cell = this.cells[this.targetIndex]
        let x = cell.i * w
        let y = cell.j * w
        fill(0, 0, 200)
        noStroke()
        rect(x, y, w, w)
    }

    // updates current grid according to player position
    update() {
        const xGrid = this.current.i * w
        const yGrid = this.current.j * w
        let x = this.current.i
        let y = this.current.j

        // top
        if(player.pos.y < yGrid) y--
        // right
        else if(player.pos.x > xGrid + w) x++
        // bottom
        else if(player.pos.y > yGrid + w) y++
        // left
        else if(player.pos.x < xGrid) x--
        // no change
        else return

        const index = x * rows + y
        this.current = this.cells[index]
        player.index = index
    }

    // uses Deep First Search to get cells along the paths the player can take
    getPath(prev, cell, depth = 10) {
        if(depth == 0) return []
        if(!cell) cell = this.current

        const [ top, right, bottom, left ] = cell.walls
        let i = cell.i
        let j = cell.j
        const stack = []
        const positions = []

        if(!top) positions.push([i, j - 1])
        if(!right) positions.push([i + 1, j])
        if(!bottom) positions.push([i, j + 1])
        if(!left) positions.push([i - 1, j])

        stack.push(cell)
        for (const [ x, y ] of positions) {
            // console.log(cell.i, cell.j, prev?.i, prev?.j)
            if(prev?.i === x && prev?.j === y) continue
            // const newIndex = y * rows + x
            const newIndex = x * rows + y
            const newCell = this.cells[newIndex]

            if(!newCell) continue
            stack.push(...this.getPath(cell, newCell, depth - 1))
        }

        return stack
    }
}
