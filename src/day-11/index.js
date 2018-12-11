const prepareGrid = serialNumber => {
    let grid = {};
    let max = 300;
    let power;
    let rankId;
    let total;
    let hundredDigit;

    for (let y = 1; y <= max; y++) {
        grid[y] = grid[y] || {};
        for (let x = 1; x <= max; x++) {
            rankId = x + 10;
            power = rankId * y;
            total = (power + serialNumber) * rankId;
            hundredDigit = (total % 1000 - total % 100) / 100;
            grid[y][x] = hundredDigit - 5;
        }
    }

    return grid;
};

const findSum = (grid, Y, X, size) => {
    let sum = 0;

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            sum += grid[Y + y][X + x];
        }
    }

    return sum;
};

const findMaxValue = (currentMaxValue, prevMax, sums, size) => {
    let currentCoordinate;

    for (const [key, value] of Object.entries(sums)) {
        if (value === currentMaxValue) {
            currentCoordinate = key;
        }
    }

    return currentMaxValue > prevMax ? `${currentCoordinate},${size}` : false;
};

const findCoordinates = serialNumber => {
    const grid = prepareGrid(serialNumber);
    let sums = {};
    let result = '';
    let maxValue;
    let prev = -100;

    for (let i = 1; i < 301; i++) {
        for (let y = 1; y < 301 - i; y++) {
            for (let x = 1; x < 301 - i; x++) {
                sums[`${x},${y}`] = findSum(grid, y, x, i);
            }
        }
        maxValue = Math.max(...Object.values(sums));
        if (findMaxValue(maxValue, prev, sums, i)) {
            result = findMaxValue(maxValue, prev, sums, i);
            prev = maxValue;
        }
    }

    console.log(`X,Y,size identifier of the square with the largest total power: \n\n${result}.\n`);

    return result;
};


module.exports = {
    findCoordinates: findCoordinates.bind(this, 3214),
};


