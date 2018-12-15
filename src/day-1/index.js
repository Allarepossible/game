const {compose, dropLast, split, sum} = require('ramda');
const fs = require('fs');
const FREQUENCIES = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const getFrequencies = compose(dropLast(1), split('\n'));
const sumFrequencies = compose(sum, getFrequencies);

const duplicateFrequency = frequencies => {
    const result = getFrequencies(frequencies);
    let firstDuplicateFrequency;
    let n = 0;
    let obj = {0: 1};

    for (let i=0; ; i++) {
        if (i >= result.length) {
            i -= result.length;
        }

        n += Number(result[i]);

        if (obj[n]) {
            firstDuplicateFrequency = n;
            break;
        } else {
            obj[n] = n;
        }
    }

    return firstDuplicateFrequency;
};

module.exports = {
    sumFrequencies: sumFrequencies.bind(this, FREQUENCIES),
    duplicateFrequency: duplicateFrequency.bind(this, FREQUENCIES),
    sumFrequenciesForTest: sumFrequencies,
    duplicateFrequencyForTest: duplicateFrequency,
};
