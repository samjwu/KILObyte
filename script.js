var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var divisionsinput = document.getElementById("divisions");
var changedivisions = document.getElementById("change-divisions");
var scorelabel = document.getElementById("score");

var score = 0;
var divisions = 4;
var width = canvas.width / divisions - 6; //allow for margins

var cells = [];
var fontsize;
var gameover = false;


startgame();


//function to change number of squares on game canvas
changedivisions.onclick = function() {
    if (divisionsinput.value >= 2 && divisionsinput.value <= 20) {
        divisions = divisionsinput.value;
        width = canvas.width / divisions - 6; //allow for margins
        clearcanvas();
        startgame();
    }
}

//function to clear canvas
function clearcanvas() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 500, 500);
    // context.clearRect(0, 0, canvas.width, canvas.height);
}

//function to init cells/game
function startgame() {
    createcells();
    drawallcells();
    gencell();
    gencell();
}

//function to place a cell based on row/column
function cell(row, col) {
    this.value = 0;
    //var*width for placement, 5*(var+1) for padding
    this.x = col * width + 5 * (col + 1);
    this.y = row * width + 5 * (row + 1);
}

//function to init array of empty cells
function createcells() {
    for (var i = 0; i < divisions; i++) {
        cells[i] = [];
        for (var j = 0; j < divisions; j++) {
            cells[i][j] = new cell(i, j);
        }
    }
}

//function to draw/color individual cells
function drawcell(cell) {
    context.beginPath();
    context.rect(cell.x, cell.y, width, width); //draw rectangle

    //switch fxn to give each cell their number (of bytes) and color
    switch(cell.value) {
        case 0 : context.fillStyle = "#000000"; break;
        case 2 : context.fillStyle = "#000000"; break;
        case 4 : context.fillStyle = "#000000"; break;
        case 8 : context.fillStyle = "#000000"; break;
        case 16 : context.fillStyle = "#000000"; break;
        case 32 : context.fillStyle = "#000000"; break;
        case 64 : context.fillStyle = "#000000"; break;
        case 128 : context.fillStyle = "#000000"; break;
        case 256 : context.fillStyle = "#000000"; break;
        case 512 : context.fillStyle = "#000000"; break;
        case 1024 : context.fillStyle = "#000000"; break;
    }

    context.fill();
    if (cell.value) {
        fontsize = width / 2;
        context.font = fontsize + "px Arial";
        context.fillStyle = "#20c20c"; //number color
        context.textAlign = "center";
        context.fillText(cell.value, cell.x + width / 2, cell.y + width / 1.6); //number position
    }
}

//function to draw all cells using drawcell function
function drawallcells() {
    for (var i = 0; i < divisions; i++) {
        for (var j = 0; j < divisions; j++) {
            drawcell(cells[i][j]);
        }
    }
}

//function to generate a nonempty cell with a number in it
function gencell() {
    //get number of empty cells
    var numempty = 0;
    for (var i = 0; i < divisions; i++) {
        for (var j = 0; j < divisions; j++) {
            if (!cells[i][j].value) {
                numempty++;
            }
        }
    }

    //end game if no cells are empty
    if (!numempty) {
        endgame();
        return;
    }

    while (true) {
        var row = Math.floor(Math.random() * divisions); //0 to divisions
        var col = Math.floor(Math.random() * divisions); //0 to divisions
        if (!cells[row][col].value) {
            cells[row][col].value = 2 * Math.ceil(Math.random() * 2); //can be 2 or 4
            drawallcells();
            return;
        }
    }
}

//inline function to move cells on arrow key input
document.onkeydown = function (event) {
    if (!gameover) {
        if (event.keyCode == 38 || event.keyCode == 87) { moveU(); }
        else if (event.keyCode == 39 || event.keyCode == 68) { moveR(); }
        else if (event.keyCode == 40 || event.keyCode == 83) { moveD(); }
        else if (event.keyCode == 37 || event.keyCode == 65) { moveL(); }
        scorelabel.innerHTML = "Score : " + score; //update score
    }
}

//function to move cells up
function moveU() {
    for (var j = 0; j < divisions; j++) {
        for (var i = 1; i < divisions; i++) {
            if (cells[i][j].value) {
                var row = i;
                while (row > 0) {
                    if (!cells[row-1][j].value) {
                        cells[row-1][j].value = cells[row][j].value;
                        cells[row][j].value = 0;
                        row--;
                    }
                    else if (cells[row-1][j].value == cells[row][j].value) {
                        cells[row-1][j].value *= 2;
                        score += cells[row-1][j].value;
                        cells[row][j].value = 0;
                        //win game!
                        if (cells[row-1][j].value == 1024) {
                            endgame();
                        }
                        break;
                    }
                    else { 
                        break;
                    }
                }
            }
        }
    }
    gencell();
}

//function to move cells right
function moveR() {
    for (var i = 0; i < divisions; i++) {
        for (var j = divisions - 2; j >= 0; j--) {
            if (cells[i][j].value) {
                var col = j;
                while (col + 1 < divisions) {
                    if (!cells[i][col+1].value) {
                        cells[i][col+1].value = cells[i][col].value;
                        cells[i][col].value = 0;
                        col++;
                    }
                    else if (cells[i][col+1].value == cells[i][col].value) {
                        cells[i][col+1].value *= 2;
                        score += cells[i][col+1].value;
                        cells[i][col].value = 0;
                        //win game!
                        if (cells[i][col+1].value == 1024) {
                            endgame();
                        }
                        break;
                    }
                    else { 
                        break;
                    }
                }
            }
        }
    }
    gencell();
}

//function to move cells down
function moveD() {
    for (var j = 0; j < divisions; j++) {
        for (var i = divisions - 2; i >= 0; i--) {
            if (cells[i][j].value) {
                var row = i;
                while (row + 1 < divisions) {
                    if (!cells[row+1][j].value) {
                        cells[row+1][j].value = cells[row][j].value;
                        cells[row][j].value = 0;
                        row++;
                    }
                    else if (cells[row+1][j].value == cells[row][j].value) {
                        cells[row+1][j].value *= 2;
                        score += cells[row+1][j].value;
                        cells[row][j].value = 0;
                        //win game!
                        if (cells[row+1][j].value == 1024) {
                            endgame();
                        }
                        break;
                    }
                    else { 
                        break;
                    }
                }
            }
        }
    }
    gencell();
}

//function to move cells left
function moveL() {
    //i for rows
    for (var i = 0; i < divisions; i++) {
        //j for cols (move columns for horiz mvt)
        for (var j = 1; j < divisions; j++) {
            if (cells[i][j].value) {
                var col = j;
                while (col > 0) {
                    //move totally left
                    if (!cells[i][col-1].value) {
                        cells[i][col-1].value = cells[i][col].value;
                        cells[i][col].value = 0;
                        col--;
                    }
                    //combine
                    else if (cells[i][col-1].value == cells[i][col].value) {
                        cells[i][col-1].value *= 2;
                        score += cells[i][col-1].value;
                        cells[i][col].value = 0;
                        //win game!
                        if (cells[i][col-1].value == 1024) {
                            endgame();
                        }
                        break;
                    }
                    //cannot move
                    else { 
                        break;
                    }
                }
            }
        }
    }
    gencell();
}

//function to make game screen dark when game is over
function endgame() {
    canvas.style.opacity = "0.5";
    gameover = true;
    // clearcanvas();
    context.fillStyle = "#20c20c";
    context.fillText("GAME OVER", canvas.width/2, canvas.height/2);
}