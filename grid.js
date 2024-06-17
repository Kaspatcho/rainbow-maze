class Grid {
    constructor(cols, rows) {
        this.cells = []
        this.current = 0
        this.targetIndex = 0
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
        // this.targetIndex = floor(random(this.cells.length / 2, this.cells.length))
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

        const index = x * rows + y
        this.current = this.cells[index]
        player.index = index
    }
}
