const fs = require('fs');
const PARAMS = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const prepare = (params) => params.toString().split('\n');

const convertToObj = item => {
    const [id, params] = item.split('@');
    const [pos, size] = params.split(':');
    const [top, left] = pos.split(',');
    const [width, height] = size.split('x');

    return {
        id,
        top: Number(top),
        left: Number(left),
        width: Number(width),
        height: Number(height),
    };
};

const convertToGrid = params => params.reduce((grid, {top, left, width, height}) => {
    for (let dy = 0; dy < width; dy++) {
        for (let dx = 0; dx < height; dx++) {
            let id = String(top + dy) + '-' + String(left + dx);

            grid[id] = grid[id] ? grid[id] + 1 : 1;

            return grid;
        }
    }
}, {});


const findCountOfInches = (params) => {
    const objectParams = prepare(params).filter(i => i).map(convertToObj);
    const grid = convertToGrid(objectParams);
    const values = Object.values(grid);

    const countOfInches = values.filter(spot => spot >= 2).length;

    console.log(`Inches of fabric are within two or more claims: ${countOfInches}.\n`);

    return countOfInches;
};


module.exports = {
    findCountOfInches: findCountOfInches.bind(this, PARAMS),
};
