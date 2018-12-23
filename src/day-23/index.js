const fs = require('fs');
const INPUT = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const prepareInput = input => input.split('\n').filter(i => i).map(item => {
    let [, x, y, z, r] = item.match(/pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(\d+)/).map(Number);

    return {x,y,z,r}
});

function findResult(input) {
    const nanobots = prepareInput(input);
    const {x, y, z, r} = nanobots.reduce((sum, item) => {
        if (item.r > sum.r) {
            sum = item;
        }
        return sum;
    }, {r: 0});

    const isInRange = nanobots.filter(item => {
        return Math.abs(item.x - x) +  Math.abs(item.y - y) + Math.abs(item.z - z) <= r;
    });

    return isInRange.length;
}

module.exports = {
    result: findResult.bind(this, INPUT),
};
