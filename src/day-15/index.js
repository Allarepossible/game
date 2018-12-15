const fs = require('fs');
const AREA = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

class UNIT {
    constructor (x, y, type) {
        this.x = x;
        this.y = y;
        this.hill = 200;
        this.type = type;
        this.attack = 3;
    }

    move () {

    }

    attack () {

    }
}

const grids = AREA.split('\n').filter(i => i).reduce((grids, line, i) => {
    line.split('').forEach((item, j) => {
        grids[`${i},${j}`] = item
    });

    return grids;
}, {});


const findFinalScore = grids => {
    let result;

    return result;
};

module.exports = {
    findFinalScore: findFinalScore.bind(this, grids),
};
