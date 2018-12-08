const fs = require('fs');
const COMMANDS = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');
const MAX = 5;

const prepare = commands => commands.split('\n').filter(i => i).sort();

const unic = entities => {
    let last = '';

    return entities.reduce((ac, l) => {
        if (l !== last) {
            ac.push(l);
            last = l;
        }
        return ac;
    }, []);
};

const whatDifference = (all, part) => all.reduce((res, l) => {
    if (part.indexOf(l) < 0) {
        return [...res, l]
    }
    return res;
}, []);

const filterSteps = (steps, filters) => steps.reduce((filtered, {first, then}) => {
    if (filters.indexOf(first) < 0 && filters.indexOf(then) < 0) {
        return [...filtered, {first, then}]
    }
    return filtered;
}, []);

const findFilters = steps => {
    const thens = unic(steps.map(({then}) => then).sort());
    const allLetters = getUsedLetters(steps);
    const letter = whatDifference(allLetters, thens)[0];

    return {letters: [...letter], filtered: filterSteps(steps, letter)};
};

const getUsedLetters = steps => [...new Set([
    ...steps.map(({first}) => first),
    ...steps.map(({then}) => then)
])];

const findCorrectOrders = commands => {
    const sortedOrders = prepare(commands);
    const steps = sortedOrders.map(order => {
        let [, first, then] = order.match(/Step ([A-Z]) must be finished before step ([A-Z]) can begin./);

        return {first, then};
    });
    const firsts = unic(steps.map(({first}) => first));
    const allLetters = getUsedLetters(steps);
    const last = whatDifference(allLetters, firsts)[0];
    let filteredResult = {};
    let {filtered, letters} = findFilters(steps);

    while (filtered.length > 0) {
        filteredResult = findFilters(filtered);
        filtered = filteredResult.filtered;
        letters = [...letters, ...filteredResult.letters];
    }

    const order = [...letters, last].join('');
    console.log(`Order of instructions: ${order}.\n`);

    return order;
};

const sortLetters = (a, b) => a.letter - b.letter;

const findCommonTime = (input, MAX, minimumStepDuration = 60) => {
    const steps = input.split('\n').filter(i => i)
        .map(order => {
            let [, left, right] = order.match(/Step ([A-Z]) must be finished before step ([A-Z]) can begin./);

            return {first: left.charCodeAt(0), then: right.charCodeAt(0)};
        });
    const letters = getUsedLetters(steps).map(letter => ({letter, rightHand: []}));

    steps.forEach(({first, then}) => {
        letters.find(({letter}) => letter === then).rightHand.push(first);
    });


    let result = [];
    const helpers = Array.from({length: MAX}).map(() => ({
        times: 0,
        letter: null,
    }));

    let time = 0;

    while (letters.length) {
        const candidates = letters
            .filter(({rightHand, letter}) => !rightHand.length && helpers.every((x) => x.letter !== letter))
            .sort(sortLetters);

        time++;

        helpers.sort(sortLetters)
            .forEach((worker) => {
                if (worker.times > 0) {
                    worker.times--;
                }

                if (worker.times === 0 && worker.letter !== null) {
                    result.push(worker.letter);
                    letters
                        .filter(({rightHand}) => rightHand.includes(worker.letter))
                        .forEach(letter => letter.rightHand = letter.rightHand.filter((x) => x !== worker.letter));

                    letters.splice(letters.findIndex(({letter}) => letter === worker.letter), 1);

                    worker.letter = null;
                }
            });

        for (let i = 0; i < candidates.length; i++) {
            for (let t = 0; t < helpers.length; t++) {
                if (helpers[t].letter === null) {
                    helpers[t].letter = candidates[i].letter;
                    helpers[t].times = candidates[i].letter - 65 + minimumStepDuration;

                    break;
                }
            }
        }
    }

    console.log(`Doing all of the steps takes: ${time}.\n`);

    return time
};

module.exports = {
    findCorrectOrders: findCorrectOrders.bind(this, COMMANDS),
    findCommonTime: findCommonTime.bind(this, COMMANDS, MAX),
    findCorrectOrdersForTest: findCorrectOrders,
    findCommonTimeForTest: findCommonTime,
};


