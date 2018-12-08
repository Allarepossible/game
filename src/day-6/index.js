const fs = require('fs');
const COORDS = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const prepare = coords => coords.toString().split('\n').filter(i => i).map((item) => {
    const [x, y] = item.split(',');

    return {x: +x, y: +y, id: `${x.trim()}x${y.trim()}`};
});

const distance = ({x: x1, y: y1}, {x: x2, y: y2}) => Math.abs(x2 - x1) + Math.abs(y2 - y1);

const findNearestPoint = ({x, y}, points) => {
    let minDistance = 1000;

    return points.reduce((result, point) => {
        const distanceToPoint = distance({x, y}, point);
        if (distanceToPoint < minDistance) {
            minDistance = distanceToPoint;
            return {x, y, id: point.id};
        } else if (distanceToPoint === minDistance) {
            return {x, y, id: undefined};
        } else {
            return result;
        }
    }, {x, y})
};

const findSizeOfLargestArea = coords => {
    const points = prepare(coords);
    let area = [];
    let newPoint = {};
    let infinite = [];
    let {0 : minY ,length : ly, [ly - 1] : maxY} = points.map(({y}) => y).sort((a, b) => a - b);
    let {0 : minX ,length : lx, [lx - 1] : maxX} = points.map(({x}) => x).sort((a, b) => a - b);

    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            newPoint = findNearestPoint({x, y}, points);
            if (x === minX || y === minY || x === maxX || y === maxY) {
                infinite = infinite.indexOf(newPoint.id) !== - 1 ? infinite : [...infinite, newPoint.id];
            }
            area.push(newPoint)
        }
    }
    const withoutInfinite = area.filter(({id}) => infinite.indexOf(id) < 0);
    const sizeAreaOfPoints = withoutInfinite.reduce((res, {id}) => {
        res[id] = res[id] ? res[id] + 1 : 1;
        return res
    }, {});

    const largestSize = Object.values(sizeAreaOfPoints).sort((a,b) => b-a)[0];

    console.log(`Size of the largest area: ${largestSize}.\n`);

    return largestSize;
};


module.exports = {
    findSizeOfLargestArea: findSizeOfLargestArea.bind(this, COORDS),
};
