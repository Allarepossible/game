const fs = require('fs');
const FREQUENCIES = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const prepare = (frequencies) => frequencies.toString().split('\n');

const resultingFrequency = (frequencies) => {
    const resultingFrequency = prepare(frequencies).reduce((res, item) => res + Number(item), 0);

    console.log(`Resulting frequency is: ${resultingFrequency}.\n`);

    return resultingFrequency;
};

const duplicateFrequency = (frequencies) => {
    let hasDuplicate = false;
    let duplicateFrequencies = [];

    const findRecursively = (preFrequencies, cur) => {
        let nextFrequencies = prepare(frequencies).reduce((acc, item) => {
            acc[cur] = acc[cur] ? acc[cur] + 1 : 1;

            if (acc[cur] === 2) {
                hasDuplicate = true;
                duplicateFrequencies.push(cur);
            }

            cur += Number(item);

            return acc;
        }, preFrequencies);

        if (hasDuplicate) {
            return duplicateFrequencies[0]
        }

        return findRecursively(nextFrequencies, cur)
    };

    const firstDuplicateFrequency = findRecursively({}, 0);

    console.log(`First frequency this device reaches duplicate: ${firstDuplicateFrequency}.\n`);

    return firstDuplicateFrequency;
};

module.exports = {
    resultingFrequency: resultingFrequency.bind(this, FREQUENCIES),
    duplicateFrequency: duplicateFrequency.bind(this, FREQUENCIES),
    resultingFrequencyForTest: resultingFrequency,
    duplicateFrequencyForTest: duplicateFrequency,
};
