const fs = require('fs');
const COMMANDS = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const prepare = commands => commands.toString().split('\n').filter(i => i).sort();

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

const getUsedLetters = steps => {
    const firsts = unic(steps.map(({first}) => first));
    const thens = unic(steps.map(({then}) => then).sort());

    return unic([...firsts, ...thens].sort());
};

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


module.exports = {
    findCorrectOrders: findCorrectOrders.bind(this, COMMANDS),
};


