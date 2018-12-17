const fs = require('fs');
const AREA = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const prepareArea = area => area.split("\n").filter(i => i).map(clay => {
    console.log(clay)
    let [, x, y, z] = clay.match(/x=(\d+), y=(\d+)..(\d+)/);

    return {[`${x},${y}`]: '#'};
});

const visualize = grids => {
    const [maxX, maxY] = Object.entries(grids).reduce((sum, [point, ]) => {
        let [x, y] = point.split(',').map(Number);
        sum[0] = x > sum[0] ? x : sum[0];
        sum[1] = y > sum[1] ? y : sum[1];
        return sum;
    }, [0, 0]);
    let shot = '';

    for (let j = 0; j <= maxX; j++) {
        for (let i = 0; i <= maxY; i ++) {
            shot += grids[`${j},${i}`] ? grids[`${j},${i}`] : ' ';
        }
        shot += '\n';
    }

    console.log(shot);
};

const findWaterTiles = area => {
    let grids = prepareArea(area);

    return 'result';
};

module.exports = {
    findWaterTiles: findWaterTiles.bind(this, AREA),
};
