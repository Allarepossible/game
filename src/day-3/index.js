const {compose, split, map, reduce, values, filter, length} = require('ramda');
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

const convertToGrid = reduce((grid, {top, left, width, height, id}) => {
    for (let dy = 0; dy < width; dy++) {
        for (let dx = 0; dx < height; dx++) {
            let name = String(top + dy) + '-' + String(left + dx);
            if (!grid[name]) {
                grid[name] = {count: 1, id};
            } else {
                grid[name].count ++;
            }
        }
    }
    return grid;
}, {});

const getCountOfSpotsMoreThenTwo = compose(length, filter(({count}) => count >= 2), values);
const prepareParams = compose(map(convertToObj), filter(i => i), split('\n'));

const findCountOfInches = compose(getCountOfSpotsMoreThenTwo, convertToGrid, prepareParams);

const isClaimNotOverlapped = ({top, left, width, height}, grid) => {
    for (let dy = 0; dy < width; dy++) {
        for (let dx = 0; dx < height; dx++) {
            let id = String(top + dy) + '-' + String(left + dx);
            if (grid[id].count > 1) {
                return false;
            }
        }
    }
    return true;
};

const findNotOverlapped = p => {
    const params = prepareParams(p);
    const grid = convertToGrid(params);
    const notOverlappedClaim = params.find(item => isClaimNotOverlapped(item, grid));

    return notOverlappedClaim.id;
};


module.exports = {
    findCountOfInches: findCountOfInches.bind(this, PARAMS),
    findNotOverlapped: findNotOverlapped.bind(this, PARAMS),
    findCountOfInchesForTest: findCountOfInches,
    findNotOverlappedForTest: findNotOverlapped,
};
