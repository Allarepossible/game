const fs = require('fs');
const AREA = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const prepareGrid = area => area.split('\n').filter(i => i).reduce((grid, line, j) => {
    grid[j] = grid[j] || [];
    line.split('').forEach((item, i) => {
        grid[j][i] = item;
    });

    return grid;
}, []);

const getSiblings = (x, y, grid) => {
    let siblings = [];

    for (let j = -1; j < 2; j++) {
        for (let i = -1; i < 2; i ++) {
            if (grid[j + y] && grid[j + y][i + x]) {
                siblings.push(grid[j + y][i + x])
            }
        }
    }

    return siblings;
};

const convert = grid => {
    return grid.map((row, j) => {
        return row.map((item, i) => {
            const siblings = getSiblings(i, j, grid);

            if (item === '.') {
                let count = siblings.filter(i => i === '|').length;

                return count > 2 ? '|' : '.';
            } else if (item === '|') {
                let count = siblings.filter(i => i === '#').length;

                return count > 2 ? '#' : '|';
            }

            let lumber = siblings.filter(i => i === '#').length > 1;
            let trees = siblings.indexOf('|') !== -1;

            return lumber && trees ? '#' : '.';
        })
    })
};

const visualize = grid => {
    const maxX = grid.length;
    const maxY = grid[0].length;
    let shot = '';

    for (let j = 0; j < maxX; j++) {
        for (let i = 0; i < maxY; i++) {
            shot += grid[j][i];
        }
        shot += '\n';
    }

    console.log(shot);
};

const getResources = grid => {
    const maxX = grid.length;
    const maxY = grid[0].length;
    let lumbers = 0;
    let wooded = 0;

    for (let j = 0; j < maxX; j++) {
        for (let i = 0; i < maxY; i++) {
            lumbers += grid[j][i] === '#' ? 1 : 0;
            wooded += grid[j][i] === '|' ? 1 : 0;
        }
    }

    return [lumbers, wooded];
};

const resourceValue = area => {
    let changedGrid = prepareGrid(area);

    for (let i = 0; i < 10; i++) {
        changedGrid = convert(changedGrid)
    }
    const [lumbers, wooded] = getResources(changedGrid)
    visualize(changedGrid)

    return lumbers * wooded;
};

module.exports = {
    resourceValue: resourceValue.bind(this, AREA),
};
