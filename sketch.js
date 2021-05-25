var w = 900;
var h = 500;

var debugMode = false;
var gameOver = false;

var winner = null;

var grid = [];
var piecesP1 = [];
var piecesP2 = [];
var pieces = [piecesP1, piecesP2];

function setup() {
    createCanvas(w, h);
    setGame();
}

function draw() {
	background(0, 100);
    showGrid();

    for (var i = 0; i < 2; i++)
        for (var j = 0; j < 6; j++)
            pieces[i][j].showPiece();
    
    if (debugMode)
        gridDebugger();
        
    if (gameOver) 
        showText();
}

function showText() {
    textAlign(CENTER);
    textSize(80);
    noStroke();

    if (winner == "Player 1") {
        fill(0, 0, 255);
        text("Player 1 wins!", w / 2, h / 5 - 20);
        return;
    }
    if (winner == "Player 2") {
        fill(255, 0, 0);
        text("Player 2 wins!", w / 2, h / 5 - 20);
        return;
    }

    if (winner == "Draw") {
        fill(255, 0, 255);
        text("Draw!", w / 2, h / 5 - 20);
    }
}

function isGameOver() {
    checkDraw();
    checkWinner();
    if (winner !== null)
        gameOver = true;
}

function checkDraw() {
    var draw = true;
    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++)
            if (grid[i][j] == 0)
                draw = false;
    if (draw)
        winner = "Draw";
}

function winning3(a, b, c) {
    if (a > 0 && b > 0 && c > 0)
        return true;

    if (a < 0 && b < 0 && c < 0) 
        return true;
    
    return false;
}

function checkWinner() {

    for (var i = 0; i < 3; i++)
        if (winning3(grid[0][i], grid[1][i], grid[2][i]))
            setWinner(grid[0][i]);

    for (var i = 0; i < 3; i++)
        if (winning3(grid[i][0], grid[i][1], grid[i][2]))
            setWinner(grid[i][0]);

    if (winning3(grid[0][0], grid[1][1], grid[2][2]) || 
        winning3(grid[0][2], grid[1][1], grid[2][0]))
        setWinner(grid[1][1]);
}

function setWinner(position) {
    if (position > 0)
        winner = "Player 1";
    else
        winner = "Player 2";
}

function showGrid(debug) {
    textAlign(LEFT);
    stroke(255);
    strokeWeight(5);

    // Vertical Lines
    line(w / 2 - w / 18, h / 5, w / 2 - w / 18, (h / 5) * 4);
    line(w / 2 + w / 18, h / 5, w / 2 + w / 18, (h / 5) * 4);

    // Horizontal Lines
    line(w / 3, (h / 5) * 2, (w / 3) * 2, (h / 5) * 2);
    line(w / 3, (h / 5) * 3, (w / 3) * 2, (h / 5) * 3);
}

function setGame() {

    gameOver = false;
    winner = null;

    for (var i = 0; i < 3; i++)
        grid[i] = [0, 0, 0];

    piecesP1[0] = new Piece(w / 6, (h / 8) * 1, 3, 1);
    piecesP1[1] = new Piece(w / 6, (h / 8) * 2 + 40, 3, 1);
    piecesP1[2] = new Piece(w / 6, (h / 8) * 4 + 10, 2, 1);
    piecesP1[3] = new Piece(w / 6, (h / 8) * 5 + 25, 2, 1);
    piecesP1[4] = new Piece(w / 6, (h / 8) * 6 + 30, 1, 1);
    piecesP1[5] = new Piece(w / 6, (h / 8) * 7 + 20, 1, 1);

    piecesP2[0] = new Piece(w / 6 * 5, (h / 8) * 1, -3, 2);
    piecesP2[1] = new Piece(w / 6 * 5, (h / 8) * 2 + 40, -3, 2);
    piecesP2[2] = new Piece(w / 6 * 5, (h / 8) * 4 + 10, -2, 2);
    piecesP2[3] = new Piece(w / 6 * 5, (h / 8) * 5 + 25, -2, 2);
    piecesP2[4] = new Piece(w / 6 * 5, (h / 8) * 6 + 30, -1, 2);
    piecesP2[5] = new Piece(w / 6 * 5, (h / 8) * 7 + 20, -1, 2);
}

function gridDebugger() {
    fill(0, 255, 0);
    textSize(32);
    noStroke();

    text(grid[0][0] + " | " + grid[0][1] + " | " + grid[0][2], 50, 50);
    text("----------", 50, 75);
    text(grid[1][0] + " | " + grid[1][1] + " | " + grid[1][2], 50, 100);
    text("----------", 50, 125);
    text(grid[2][0] + " | " + grid[2][1] + " | " + grid[2][2], 50, 150);
}

function mousePressed() {
    for (var i = 0; i < 2; i++) 
        for (var j = 0; j < 6; j++) 
            if (pieces[i][j].clicked()) 
                if (pieces[i][j].placed == false) 
                    pieces[i][j].grabbed = true;
}

function mouseReleased() {
    for (var i = 0; i < 2; i++)
        for (var j = 0; j < 6; j++) {
            pieces[i][j].grabbed = false;
            if (pieces[i][j].clicked()) 
                if (pieces[i][j].insideGrid()) 
                    if (!pieces[i][j].placed) 
                        pieces[i][j].placePiece();
        }
}

function mouseDragged() {
    for (var i = 0; i < 2; i++) 
        for (var j = 0; j < 6; j++) 
            if (pieces[i][j].grabbed) 
                pieces[i][j].move();
}

function keyPressed() {
    if (keyCode === LEFT_ARROW)
        debugMode = !debugMode;
    else
        setGame();
}
