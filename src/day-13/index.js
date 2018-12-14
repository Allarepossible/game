const fs = require('fs');
const AREA = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');
const CARS = ['^', 'v', '<', '>'];

const makeGrids = area => area.split('\n').filter(i => i).reduce((grids, line, i) => {
    line.split('').forEach((item, j) => {
        grids[`${i},${j}`] = item
    });

    return grids;
}, {});

const findNextPoint = (point, value) => {
    let [x, y] = point.split(',').map(Number);

    switch (value) {
        case '^': x -= 1; break;
        case 'v': x += 1; break;
        case '>': y += 1; break;
        case '<':  y -= 1; break;
    }

    return `${x},${y}`;
};

const findPrevPoint = (point, value) => {
    let [x, y] = point.split(',').map(Number);

    switch (value) {
        case '^': x += 1; break;
        case 'v': x -= 1; break;
        case '>': y -= 1; break;
        case '<':  y += 1; break;
    }

    return `${x},${y}`;
};

const findPrevValue = (grids, point, value) => {
    let prevPoint = findPrevPoint( point, value);
    let prev;

    switch (value) {
        case '^': prev = grids[prevPoint] === ' ' ? '\\' : '|'; break;
        case 'v': prev = grids[prevPoint] === ' ' ? '/' : '|'; break;
        case '>': prev = grids[prevPoint] === ' ' ? '/' : '-'; break;
        case '<': prev = grids[prevPoint] === ' ' ? '\\' : '-'; break;
    }

    return prev;
};

const move = (grids, cars) => {
    for (let i = 0; i < cars.length; i ++) {
        let {point, next, value} = cars[i];
        grids[point] = findPrevValue(grids, point, value);
        grids[next] = value;
    }

    return grids;
};

const visualize = grids => {
    const [maxX, maxY] = Object.entries(grids).reduce((sum, [point, ]) => {
        let [x, y] = point.split(',').map(Number);
        sum[0] = x > sum[0] ? x : sum[0];
        sum[1] = y > sum[1] ? y : sum[1];
        return sum;
    }, [0, 0]);
    let shot = '';

    console.log(maxX, maxY)
    for (let j = 0; j <= maxX; j++) {
        for (let i = 0; i <= maxY; i ++) {
            shot += grids[`${j},${i}`] ? grids[`${j},${i}`] : ' ';
        }
        shot += '\n';
    }

    console.log(shot);
};

const findFirstCrash = area => {
    let grids = makeGrids(area);
    const cars = Object.entries(grids)
        .filter(([point, value]) => CARS.indexOf(value) >= 0)
        .map(([point, value], i) => ({value, next: findNextPoint(point, value), point}));

    visualize(grids);
    grids = move(grids, cars);
    visualize(grids);

    return '--';
};


module.exports = {
    findFirstCrash: findFirstCrash.bind(this, AREA),
};
