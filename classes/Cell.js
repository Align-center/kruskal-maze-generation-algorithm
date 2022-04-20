'use strict';

class Cell {

    position;
    id;
    walls = {
        east: true,
        south: true
    };
    isStart = false;
    isEnd = false;
    
    constructor (x, y, id) {

        this.position = {x: x, y: y};
        this.id = id;
    }
}