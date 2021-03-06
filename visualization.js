'use strict';

document.addEventListener('DOMContentLoaded', function loaded() {
    
    let canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d'),
        dimensions = 15;

    canvas.width = gridSize.m * dimensions;
    canvas.height = gridSize.n * dimensions;

    ctx.lineWidth = 1;
    ctx.rect(0, 0, gridSize.m * dimensions, gridSize.n * dimensions);
    ctx.stroke();
    ctx.beginPath();

    matrix.forEach(cell => {

        if (cell.isStart) {

            ctx.fillStyle= 'hsl(127, 60%, 50%)';
            ctx.fillRect(cell.position.x * dimensions, cell.position.y * dimensions, dimensions, dimensions);
        }

        if (cell.isEnd) {
            
            ctx.fillStyle= 'hsl(5, 60%, 50%)';
            ctx.fillRect(cell.position.x * dimensions, cell.position.y * dimensions, dimensions, dimensions);
        }

        if (cell.walls.east) {
            
            ctx.moveTo(cell.position.x * dimensions + dimensions, cell.position.y * dimensions);
            ctx.lineTo(cell.position.x * dimensions + dimensions, cell.position.y * dimensions + dimensions);
        }

        if (cell.walls.south) {

            ctx.moveTo(cell.position.x * dimensions, cell.position.y * dimensions + dimensions);
            ctx.lineTo(cell.position.x * dimensions + dimensions, cell.position.y * dimensions + dimensions);
        }
    });

    ctx.stroke();
}); 