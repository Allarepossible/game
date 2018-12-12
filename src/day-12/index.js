const fs = require('fs');
const RULES = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const InitialState = '....#..####.##.####...#....#######..#.#..#..#.#.#####.######..#.#.#.#..##.###.#....####.#.#....#.#####...................................';
const rules = RULES.split('\n').filter(i => i).map(item => {
    const [, from, to] = item.match(/(.+) => (.)/);

    return {from, to};
});

const whatToDo = (pos, state) => {
    let template = state.slice(pos-2, pos+3);

    let rule = rules.find(({from}) => from === template);

    return rule ? rule.to : '.';
};

const findNewPots = state => {
    let pots = [...InitialState];
    let last = pots.lastIndexOf("#");
    let cur;
    let newPots;
    let newState = state;

    for (let generation = 1; generation <= 20; generation++) {
        newPots = {};

        for (let i = 0; i < last + 25; i ++) {
            cur = whatToDo(i, newState);
            newPots[i] = cur;
        }
        newState = Object.values(newPots).join('');
    }

    return newPots;
};

const findSumOfPots = state => {
    let first = state.indexOf("#");
    const potsAfterGenerations = findNewPots(state);
    const num = Object.entries(potsAfterGenerations).reduce((sum, [key, state]) => sum + (state === "#" ? +1 : 0), 0);

    return Object.entries(potsAfterGenerations).reduce((sum, [key, state]) => sum + (state === "#" ? +key : 0), 0) - num * first;
};


module.exports = {
    findSumOfPots: findSumOfPots.bind(this, InitialState),
};
