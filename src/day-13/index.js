const fs = require('fs');
const AREA = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');
const CARS = ['^', 'v', '<', '>'];

class Car {
    constructor (x, y, type) {
        this.x = x;
        this.y = y;
        this.id = type;
        this.vx = type === '<' ? -1 : type === '>' ? 1 : 0;
        this.vy = type === '^' ? -1 : type === 'v' ? 1 : 0;
        this.t = 0;
        this.turns = ['left', 'direct', 'right'];
    }

    move (next) {
        this.x += this.vx;
        this.y += this.vy;

        if (next === '\\' || next === '/') {
            const direction =
                next === '\\' && this.vx !== 0 ? 'right' :
                    next === '/' && this.vx !== 0 ? 'left' :
                        next === '\\' && this.vy !== 0 ? 'left' :
                            next === '/' && this.vy !== 0 ? 'right' :
                                null;
            this.turn(direction);
        } else if (next === '+') {
            const direction = this.turns[this.t];

            this.t = this.t + 1 === this.turns.length ? 0 : this.t + 1;

            if (direction !== 'direct') {
                this.turn(direction);
            }
        }
    }

    turn (direction) {
        if (this.vx !== 0) {
            this.vy = this.vx * (direction === 'right' ? 1 : -1);
            this.vx = 0;
        } else if (this.vy !== 0) {
            this.vx = this.vy * (direction === 'right' ? -1 : 1);
            this.vy = 0;
        }
    }
}

const prepareGridsAndCars = area => area.split('\n').filter(i => i).reduce(({grids, cars}, line, i) => {
    let car;
    line.split('').forEach((item, j) => {
        if (CARS.indexOf(item) >= 0) {
            car = new Car(j, i, item);
            grids[`${i},${j}`] = item === '<' || item === '>' ? '-' : '|';
            cars.push(car);
        } else {
            grids[`${i},${j}`] = item;
        }
    });

    return {grids, cars};
}, {grids: {}, cars: []});

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

const findFirstCrash = area => {
    let {grids, cars} = prepareGridsAndCars(area);

    while (true) {
        const positions = [];

        for (let i = 0; i < cars.length; i++) {
            const car = cars[i];
            const nextSection = grids[`${car.y + car.vy},${car.x + car.vx}`];

            car.move(nextSection);

            const carPosition = `${car.x},${car.y}`;

            if (positions.includes(carPosition)) {
                return carPosition;
            }

            positions.push(carPosition);
        }
    }
};

const findLastCar = area => {
    let {grids, cars} = prepareGridsAndCars(area);

    while (true) {
        const positions = [];
        let crashedCar;

        for (let i = 0; i < cars.length; i++) {
            const car = cars[i];
            const nextSection = grids[`${car.y + car.vy},${car.x + car.vx}`];

            car.move(nextSection);

            const carPosition = `${car.x},${car.y}`;

            if (positions.includes(carPosition)) {
                cars.splice(cars.indexOf(car), 1);
                crashedCar = cars.find(item => item.x === car.x && item.y === car.y);
                cars.splice(cars.indexOf(crashedCar), 1);
            }

            if (cars.length < 2) {
                return `${cars[0].x},${cars[0].y}`;
            }

            positions.push(carPosition);
        }
    }
};

module.exports = {
    findFirstCrash: findFirstCrash.bind(this, AREA),
    findLastCar: findLastCar.bind(this, AREA),
};
