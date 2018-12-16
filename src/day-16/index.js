const fs = require('fs');
const SAMPLES = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const prepareSamples = samples => samples.split("\n\n").map(sample => {
    let [, b0, b1, b2, b3, a, b, c, a0, a1, a2, a3] = sample
        .match(/^Before: \[(\d+), (\d+), (\d+), (\d+)\]\n\d+ (\d+) (\d+) (\d+)\nAfter:  \[(\d+), (\d+), (\d+), (\d+)\]\n?/)
        .map(Number);

    return {before: [b0, b1, b2, b3], args: [a, b, c], after: [a0, a1, a2, a3]};
});

const findCountOfSamples = SAMPLES => {
    const samples = prepareSamples(SAMPLES);

    let categories = [
        // addition
        (reg, a, b, c) => reg[c] = reg[a] + reg[b],
        (reg, a, b, c) => reg[c] = reg[a] + b,

        // multiplication
        (reg, a, b, c) => reg[c] = reg[a] * reg[b],
        (reg, a, b, c) => reg[c] = reg[a] * b,

        // bitwise AND
        (reg, a, b, c) => reg[c] = reg[a] & reg[b],
        (reg, a, b, c) => reg[c] = reg[a] & b,

        // bitwise OR
        (reg, a, b, c) => reg[c] = reg[a] | reg[b],
        (reg, a, b, c) => reg[c] = reg[a] | b,

        // assignment
        (reg, a, b, c) => reg[c] = reg[a],
        (reg, a, b, c) => reg[c] = a,

        // greater-than testing
        (reg, a, b, c) => reg[c] = a > reg[b] ? 1 : 0,
        (reg, a, b, c) => reg[c] = reg[a] > b ? 1 : 0,
        (reg, a, b, c) => reg[c] = reg[a] > reg[b] ? 1 : 0,

        //equally testing
        (reg, a, b, c) => reg[c] = a === reg[b] ? 1 : 0,
        (reg, a, b, c) => reg[c] = reg[a] === b ? 1 : 0,
        (reg, a, b, c) => reg[c] = reg[a] === reg[b] ? 1 : 0,
    ];

    return samples.filter(({args, before, after}) => {
        let matched = categories.filter(category => {
            let reg = [...before];

            category(reg, ...args);

            return after.every((expected, i) => expected === reg[i]);
        });

        return matched.length >= 3;
    }).length;
};

module.exports = {
    findCountOfSamples: findCountOfSamples.bind(this, SAMPLES),
};
