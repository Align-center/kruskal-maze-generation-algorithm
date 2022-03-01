'use strict';

const gridSize = {
    m : 100, // horizontal length
    n : 100 // vertical length
},
    matrix = [];

let matrixIds = [],
    vertWalls = [],
    horizWalls = [],
    id = 0;

for (let i = 0; i < gridSize.n; i++) {

    for (let j = 0; j < gridSize.m; j++) {

        let cell = new Cell(j, i, id);

        id++;
        matrix.push(cell);
    }
}

for (let i = 0; i < (gridSize.m - 1) * gridSize.n; i++) {

    vertWalls.push({
        id: i,
        up: true
    });
}

for (let i = 0; i < gridSize.m * (gridSize.n - 1); i++) {

    horizWalls.push({
        id: i,
        up: true
    });
}

function getRandomInt (min, max) { // min et max inclusif

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectRandomWall () {

    let index = getRandomInt(0, 1),
        id,
        output,
        bufferVertWallUp = [],
        bufferHorizWallUp = [];

    vertWalls.forEach(wall => {

        bufferVertWallUp.push(wall.up);
    });
            
    horizWalls.forEach(wall => {

        bufferHorizWallUp.push(wall.up);
    });

    bufferVertWallUp = [...new Set(bufferVertWallUp)];
    bufferHorizWallUp = [...new Set(bufferHorizWallUp)];

    if (!bufferVertWallUp.includes(true) || !bufferHorizWallUp.includes(true)) {

        if (!bufferVertWallUp.includes(true)) {

            index = 1;
        } else {

            index = 0;
        }
    } 

    if (index == 0) {

        id = selectRandomVerticalWall();

        output = {
            axis: 'vertical'
        };
    } else {

        id = selectRandomHorizontalWall();

        output = {
            axis: 'horizontal'
        };
    }

    output.id = id;

    return output;
}

function selectRandomVerticalWall () {

    let id,
        index;

    index = getRandomInt(0, vertWalls.length - 1);
    id = vertWalls[index].id;

    // console.log(vertWalls);
    vertWalls.splice(index, 1);

    return id;
}

function selectRandomHorizontalWall () {

    let id,
        index;

    index = getRandomInt(0, horizWalls.length - 1);
    id = horizWalls[index].id

    // console.log(horizWalls);
    horizWalls.splice(index, 1);

    return id;
}

function selectCellPos () {

    let randWall = selectRandomWall(),
        axis = randWall.axis,
        id = randWall.id,
        bufferX,
        bufferY,
        output = {};

    if (axis == 'vertical') {

        bufferX = id % (gridSize.m - 1),
        bufferY;

        if (id >= (gridSize.m - 1)) {

            bufferY = Math.floor(id / (gridSize.m - 1));
        } else {

            bufferY = 0;
        }

        output = {
            firstCellPos : {x: bufferX, y: bufferY},
            secondCellPos : {x: bufferX + 1, y: bufferY},
            axis: 'vertical'
        }

        // console.log({bufferX, bufferY});
    } else if (axis == 'horizontal') {

        bufferX,
        bufferY = id % (gridSize.n - 1);

        if (id >= (gridSize.n -1)) {

            bufferX = Math.floor(id / (gridSize.n -1));
        } else {

            bufferX = 0;
        }

        output = {
            firstCellPos : {x: bufferX, y: bufferY},
            secondCellPos : {x: bufferX, y: bufferY + 1},
            axis: 'horizontal'
        }
        // console.log(bufferX, bufferY);
    }

    return output;
}

function getCellsObject (cellsPos) {

    let firstCell,
    secondCell,
    output;

    matrix.forEach(cell => {

        if (cell.position.x == cellsPos.firstCellPos.x && cell.position.y == cellsPos.firstCellPos.y) {

            firstCell = cell;
        } else if (cell.position.x == cellsPos.secondCellPos.x && cell.position.y == cellsPos.secondCellPos.y) {

            secondCell = cell;
        }
    });

    output = {
        firstCell: firstCell,
        secondCell: secondCell
    }

    return output;
}

function verifyIds ({firstCell, secondCell}) {

    if (firstCell.id === secondCell.id) {

        return false;
    }

    return true;
}

function main() {

    console.log('buffering');

    let cellsPos,
        cells,
        bufferMatrixIds = [];

    do {
        
        cellsPos = selectCellPos();
        // throw new Error("my error message");
        cells = getCellsObject(cellsPos);
    } while(!verifyIds(cells));

    let toReplaceId = cells.secondCell.id;

    matrix.forEach(cell => {

        if (cell.id === toReplaceId) {

            cell.id = cells.firstCell.id
        }

        bufferMatrixIds.push(cell.id);
    });

    matrixIds = [...new Set(bufferMatrixIds)];

    if (cellsPos.axis == 'horizontal') {

        cells.firstCell.walls.south = false;
    } else {

        cells.firstCell.walls.east = false;
    }

    // cells.secondCell.link.push(cells.firstCell);
    // cells.firstCell.link.push(cells.secondCell);
}

var startTimestamp = new Date(),
    step1;

do {

    main();
} while (matrixIds.length > 1);

step1 = Date.now();

console.log(startTimestamp.getMinutes() + ':' + startTimestamp.getSeconds() + ':' + startTimestamp.getMilliseconds());
console.log('step1', ((step1 - startTimestamp) / 1000) + 's');

// location.reload();

// let complexity = 0;

// matrix.forEach(cell => {

//     if (cell.link.length > 2) {

//         complexity++;
//     }
// });

// console.log(vertWalls);
// console.log(horizWalls);

// console.log(complexity);
// console.log(matrix);