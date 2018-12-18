const fs = require('fs');
const AREA = fs.readFileSync(`${__dirname}/data1.txt`, 'utf8');

const prepareGrids = area => area.split('\n').filter(i => i).reduce((grids, line, i) => {
    line.split('').forEach((item, j) => {
        grids.push([`${i},${j}`, item]);
    });

    return grids;
}, []);

const getSiblings = (point, grids) => {
    const [x, y] = point.split(',').map(Number);
    let siblings = [];

    for (let j = -1; j < 2; j++) {
        for (let i = -1; i < 2; i ++) {
            if (grids[`${y + j},${x + i}`]) {
                siblings.push(grids[`${y + j},${x + i}`])
            }
        }
    }

    return siblings;
};

const convert = (item, grids) => {
    const [point, type] = item;
    const siblings = getSiblings(point, grids)



    return siblings;
};

const visualize = array => {
    const [maxX, maxY] = array[array.length - 1][0].split(',');
    let shot = '';

    for (let j = 0; j <= maxX; j++) {
        for (let i = 0; i <= maxY; i++) {
            shot += array[(Number(maxX) + 1) * j + i][1];
        }
        shot += '\n';
    }

    console.log(shot);
};

const resourceValue = area => {
    let grids = prepareGrids(area);

    //Object.entries(grids).map(item => convert(item, grids));

    console.log(grids)
    visualize(grids)
    return 'result';
};

module.exports = {
    resourceValue: resourceValue.bind(this, AREA),
};
