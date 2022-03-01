'use strict';

class Cell {

    position;
    link = [];
    id;
    walls = {
        east: true,
        south: true
    };
    
    constructor (x, y, id) {

        this.position = {x: x, y: y};
        this.id = id;
    }
}