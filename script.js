var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var scorelabel = document.getElementById("score");
var divisionsinput = document.getElementById("divisions");
var changedivisions = document.getElementById("change-divisions");

var score = 0;
var divisions = 4;
var width = canvas.width / divisions - 6;

var cells = [];
var fontsize;
var gameover = false;


startgame();

//function to init cells/game
function startgame() {
    createcells();
    drawallcells();
    newcell();
}

//function to place a cell based on row/column
function cell(row, col) {
    this.value = 0;
    //var*width for placement, 5*(var+1) for padding
    this.x = col * width + 5 * (col + 1);
    this.y = row * width + 5 * (row + 1);
}

//function to init array of cells
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
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText(cell.value, cell.x + width / 2, cell.y + width / 2);
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

function newcell() {
    while (true) {
        var row = Math.floor(Math.random() * divisions);
        var col = Math.floor(Math.random() * divisions);
        if (!cell([row][col].value)) {
            cells[row][col].value = 2 * Math.ceil(Math.random() * 2);
            drawallcells();
            return;
        }
    }
}