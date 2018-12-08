const fs = require('fs');
const FREQUENCIES = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const prepare = (frequencies) => frequencies.toString().split('\n');

const resultingFrequency = (frequencies) => {
    const resultingFrequency = prepare(frequencies).reduce((res, item) => res + Number(item), 0);

    console.log(`Resulting frequency is: ${resultingFrequency}.\n`);

    return resultingFrequency;
};

const duplicateFrequency = (frequencies) => {
    const result = prepare(frequencies).filter(i => i);
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

    console.log(`First frequency this device reaches duplicate: ${firstDuplicateFrequency}.\n`);

    return firstDuplicateFrequency;
};

module.exports = {
    resultingFrequency: resultingFrequency.bind(this, FREQUENCIES),
    duplicateFrequency: duplicateFrequency.bind(this, FREQUENCIES),
    resultingFrequencyForTest: resultingFrequency,
    duplicateFrequencyForTest: duplicateFrequency,
};
