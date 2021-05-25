class Piece {
    constructor(x, y, weight, player) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.grabbed = false;
        this.placed = false;
        this.weight = weight;

        if (player == 1)
            this.color = color(0, 0, 255);
        else
            this.color = color(255, 0, 0);
        if (Math.abs(weight) == 1) 
            this.radius = 20;
        if (Math.abs(weight) == 2) 
            this.radius = 30;
        if (Math.abs(weight) == 3) 
            this.radius = 40;
    }

    showPiece() {
        noFill();
        stroke(this.color);
        strokeWeight(5);
        
        ellipse(this.x, this.y, this.radius * 2);
    }

    clicked() {
        var d = dist(this.x, this.y, mouseX, mouseY);
        if (d < this.radius)
            return true;
        return false;
    }

    move() {
        this.x = mouseX;
        this.y = mouseY;
    }

    insideGrid() {
        if (mouseX > w / 3 && mouseX < (w / 3) * 2)
            if (mouseY > h / 5 && mouseY < (h / 5) * 4)
                return true;
        return false;
    }

    placePiece() {
        if (this.x > w / 9 * 3 && this.x < w / 9 * 4)
            this.checkY(0, 350);
        if (this.x > w / 9 * 4 && this.x < w / 9 * 5)
            this.checkY(1, 450);
        if (this.x > w / 9 * 5 && this.x < w / 9 * 6)
            this.checkY(2, 550);
        if (isGameOver())
            gameOver = true;
    }

    checkY(column, x) {
        if (this.y > h / 5 * 1 && this.y < h / 5 * 2)
            if (Math.abs(grid[0][column]) < Math.abs(this.weight))
                this.makeMove(0, column, x, 150);

        if (this.y > h / 5 * 2 && this.y < h / 5 * 3)
            if (Math.abs(grid[1][column]) < Math.abs(this.weight))
                this.makeMove(1, column, x, 250);
                
        if (this.y > h / 5 * 3 && this.y < h / 5 * 4)
            if (Math.abs(grid[2][column]) < Math.abs(this.weight))
                this.makeMove(2, column, x, 350);
    }

    makeMove(row, column, x, y) {
        grid[row][column] = this.weight;
        this.x = x;
        this.y = y;
        this.placed = true;
    }

    set setGrabbed(grabbed) {
        this.grabbed = grabbed;
    }
}