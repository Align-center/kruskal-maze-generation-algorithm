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
        id: i
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
        output = {
            axis: null,
            id : null
        };
        
    //#region Ce bout de code sert à s'assurer que le tableau sélectionné contient bien au moins un mur. En l'enlevant, je n'ai pas vu d'erreur mais c'est une possibilité.

    // bufferVertWallUp = [],
    // bufferHorizWallUp = [];

    // vertWalls.forEach(wall => {

    //     bufferVertWallUp.push(wall.up);
    // });
            
    // horizWalls.forEach(wall => {

    //     bufferHorizWallUp.push(wall.up);
    // });

    // bufferVertWallUp = [...new Set(bufferVertWallUp)];
    // bufferHorizWallUp = [...new Set(bufferHorizWallUp)];

    // if (!bufferVertWallUp.includes(true)) {

    //     index = 0;
    // } else if (!bufferHorizWallUp.includes(true)) {

    //     index = 1;
    // }
    //#endregion    

    if (index == 0) {

        id = selectRandomVerticalWall();

        output.axis = 'vertical';
    } else {

        id = selectRandomHorizontalWall();

        output.axis = 'horizontal';
    }

    output.id = id;

    return output;
}

function selectRandomVerticalWall () {

    let id,
        index;

    index = getRandomInt(0, vertWalls.length - 1);
    id = vertWalls[index].id;

    vertWalls.splice(index, 1);

    return id;
}

function selectRandomHorizontalWall () {

    let id,
        index;

    index = getRandomInt(0, horizWalls.length - 1);
    id = horizWalls[index].id

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
            secondCellPos : {x: bufferX + 1, y: bufferY},
            axis: 'vertical'
        }
    } else if (axis == 'horizontal') {

        bufferX,
        bufferY = id % (gridSize.n - 1);

        if (id >= (gridSize.n -1)) {

            bufferX = Math.floor(id / (gridSize.n -1));
        } else {

            bufferX = 0;
        }

        output = {
            secondCellPos : {x: bufferX, y: bufferY + 1},
            axis: 'horizontal'
        }
    }

    output.firstCellPos = {x: bufferX, y: bufferY};

    return output;
}

function getCellsObject ({firstCellPos, secondCellPos}) {

    let firstCell = matrix.find(obj => {
        return obj.position.x === firstCellPos.x && obj.position.y === firstCellPos.y;
    }),
        secondCell = matrix.find(obj => {
        return obj.position.x === secondCellPos.x && obj.position.y === secondCellPos.y;
    }),
        output;

    return output= {
        firstCell: firstCell,
        secondCell: secondCell
    };
}

function verifyIds ({firstCell, secondCell}) {

    if (firstCell.id === secondCell.id) {

        return false;
    }

    return true;
}

function main() {

    let cellsPos,
        cells,
        bufferMatrixIds = [];

    do {
        
        cellsPos = selectCellPos();

        cells = getCellsObject(cellsPos);
    } while(!verifyIds(cells));

    let toReplaceId = cells.secondCell.id;

    matrix.forEach(cell => {

        if (cell.id === toReplaceId) {

            cell.id = cells.firstCell.id
        }

        bufferMatrixIds.push(cell.id);
    });

    // console.log(bufferMatrixIds);

    matrixIds = [...new Set(bufferMatrixIds)];

    // console.log(matrixIds);

    if (cellsPos.axis == 'horizontal') {

        cells.firstCell.walls.south = false;
    } else {

        cells.firstCell.walls.east = false;
    }
}

function createStartAndEnd () {

    let randStart = getRandomInt(0, matrix.length),
        randEnd = getRandomInt(0, matrix.length);

    matrix[randStart].isStart = true;
    matrix[randEnd].isEnd = true;
}

do {

    main();
} while (matrixIds.length > 1);

createStartAndEnd();

console.log(matrix);