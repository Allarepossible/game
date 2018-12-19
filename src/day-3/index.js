const {compose, dropLast, split, map, reduce, values, filter, length} = require('ramda');
const fs = require('fs');
const PARAMS = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const convertToObj = item => {
    let [, id, top, left, width, height] = item.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/).map(Number);

    return {
        id,
        top,
        left,
        width,
        height,
    };
};

const convertToGrid = reduce((grid, {top, left, width, height}) => {
    for (let dy = 0; dy < width; dy++) {
        for (let dx = 0; dx < height; dx++) {
            let id = String(top + dy) + '-' + String(left + dx);

            grid[id] = grid[id] ? grid[id] + 1 : 1;
        }
    }
    return grid;
}, {});

const getCountOfSpotsMoreThenTwo = compose(length, filter(spot => spot >= 2), values);
const prepareParams = compose(map(convertToObj), dropLast(1), split('\n'));

const findCountOfInches = compose(getCountOfSpotsMoreThenTwo, convertToGrid, prepareParams);

const isClaimNotOverlapped = ({top, left, width, height}, grid) => {
    for (let dy = 0; dy < width; dy++) {
        for (let dx = 0; dx < height; dx++) {
            let id = String(top + dy) + '-' + String(left + dx);
            if (grid[id] > 1) {
                return false;
            }
        }
    }
    return true;
};

const findNotOverlapped = params => {
    const PARAMS = prepareParams(params);
    const grid = convertToGrid(PARAMS);
    const notOverlappedClaim = PARAMS.find(item => isClaimNotOverlapped(item, grid));

    return notOverlappedClaim && notOverlappedClaim.id;
};


module.exports = {
    findCountOfInches: findCountOfInches.bind(this, PARAMS),
    findNotOverlapped: findNotOverlapped.bind(this, PARAMS),
    findCountOfInchesForTest: findCountOfInches,
    findNotOverlappedForTest: findNotOverlapped,
};
