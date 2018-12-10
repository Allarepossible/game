const fs = require('fs');
const POINTS = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const prepare = points => points.toString().split('\n').filter(i => i).map(item => {
    let [, x, y, vx, vy] = item.match(/position=<(.?\d+), (.?\d+)> velocity=<(.?\d+), (.?\d+)>/).map(Number);

    return {x, y, vx, vy};
});

const visualize = points => {
    let grid = {};
    let output = "";
    let xs = points.map(({x}) => x);
    let ys = points.map(({y}) => y);

    points.forEach(point => {
        grid[point.y] = grid[point.y] || {};
        grid[point.y][point.x] = true;
    });

    let minX = Math.min(...xs);
    let maxX = Math.max(...xs);
    let minY = Math.min(...ys);
    let maxY = Math.max(...ys);

    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            output += grid[y] && grid[y][x] ? "#" : ".";
        }
        if (y < maxY) output += "\n";
    }

    return output;
};

const findMessageAndTime = point => {
    const points = prepare(point);
    let time = 0;

    let prev = Infinity;
    while (true) {
        points.forEach(point => {
            point.x += point.vx;
            point.y += point.vy;
        });

        let xs = points.map(({x}) => x);
        let ys = points.map(({y}) => y);
        let spread = Math.max(...xs) - Math.min(...xs) + Math.max(...ys) - Math.min(...ys);

        if (spread > prev) break;
        time++;
        prev = spread;
    }

    points.forEach(point => {
        point.x -= point.vx;
        point.y -= point.vy;
    });

    const message = visualize(points);

    console.log(`Message will eventually appear in the sky: \n\n${message}.\n`);
    console.log(`Time when message appear in the sky: ${time}.\n`);

    return message;
};


module.exports = {
    findMessageAndTime: findMessageAndTime.bind(this, POINTS),
};


