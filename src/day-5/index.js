const fs = require('fs');
const POLYMER = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const reactUnits = polymer => {
    let remain = '';

    for (let i = 0; i < polymer.length - 1; i++) {
        if (polymer[i].toLowerCase() === polymer[i+1].toLowerCase()) {
            if (polymer[i] === polymer[i+1]) {
                remain += i === polymer.length - 2 ? polymer[i] + polymer[i+1]: polymer[i];
            } else {
                i++;
            }
        } else {
            remain += i === polymer.length - 2 ? polymer[i] + polymer[i+1]: polymer[i];
        }
    }

    return remain;
};

const findRemainingUnits = polymer => {
    let len = polymer.length;
    let pre = len + 1;
    let remain = polymer;

    while (pre > len) {
        remain = reactUnits(remain);
        pre = len;
        len = remain.length;
    }

    const countOfUnits = len;

    console.log(`ID of the guard multiplied by the minute: ${countOfUnits}.\n`);

    return countOfUnits;
};


module.exports = {
    findRemainingUnits: findRemainingUnits.bind(this, POLYMER),
};
