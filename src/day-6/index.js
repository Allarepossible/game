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

const findLimits = points => {
    let {0 : minY ,length : ly, [ly - 1] : maxY} = points.map(({y}) => y).sort((a, b) => a - b);
    let {0 : minX ,length : lx, [lx - 1] : maxX} = points.map(({x}) => x).sort((a, b) => a - b);

    return {minY, maxY, minX, maxX};
};

const findSizeOfLargestArea = coords => {
    const points = prepare(coords);
    const {minY, maxY, minX, maxX} = findLimits(points);
    let area = [];
    let newPoint = {};
    let infinite = [];

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

const calculateTotalDistance = ({x, y}, points) => points.reduce((total, point) => {
    total += distance({x, y}, point);

    return total;
}, 0);


const findSizeOfRegion = (coords, max) => {
    const points = prepare(coords);
    const {minY, maxY, minX, maxX} = findLimits(points);
    let totalDistance;
    let totalDistances = [];

    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            totalDistance = calculateTotalDistance({x, y}, points);
            totalDistances.push(totalDistance)
        }
    }

    const largestRegion = totalDistances.filter(i => i < max).length;

    console.log(`Size of the largest area: ${largestRegion}.\n`);

    return largestRegion;
};


module.exports = {
    findSizeOfLargestArea: findSizeOfLargestArea.bind(this, COORDS),
    findSizeOfRegion: findSizeOfRegion.bind(this, COORDS, 10000),
    findSizeOfLargestAreaForTest: findSizeOfLargestArea,
    findSizeOfRegionForTest: findSizeOfRegion,
};
