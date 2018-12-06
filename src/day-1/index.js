const fs = require('fs');
const CONTENT = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');
const FREQUENCY = CONTENT.toString().split('\n');

const resultingFrequency = () => {
    const resultingFrequency = FREQUENCY.reduce((res, item) => res + Number(item), 0);

    console.log(`Resulting frequency is: ${resultingFrequency}.\n`);
};

const twiceFrequency = () => {
    let hasTwice = false;
    let twiceFrequencies = [];

    const findRecursively = (preFrequencies, cur) => {
        let nextFrequencies = FREQUENCY.reduce((acc, item) => {
            acc[cur] = acc[cur] ? acc[cur] + 1 : 1;

            if (acc[cur] === 2) {
                hasTwice = true;
                twiceFrequencies.push(cur);
            }

            cur += Number(item);

            return acc;
        }, preFrequencies);

        if (hasTwice) {
            return twiceFrequencies[0]
        }

        return findRecursively(nextFrequencies, cur)
    };

    const result = findRecursively({}, 0);

    console.log(`First frequency this device reaches twice: ${result}.\n`);
};

module.exports = {
    resultingFrequency,
    twiceFrequency,
};
