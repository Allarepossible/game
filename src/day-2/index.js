const fs = require('fs');
const WORDS = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const prepare = (words) => words.toString().split('\n');

const hasSomeSimilarLetters = (word, count) => {
    const wordObj = word.split('').reduce((acc, letter) => {
        acc[letter] = acc[letter] ? acc[letter] + 1 : 1;

        return acc;
    }, {});

    for (let letter in wordObj) {
        if(wordObj[letter] === count) {
            return true;
        }
    }

    return false
};

const findChecksum = (words) => {
    const checkSumObj = prepare(words).reduce((acc, word) => {
        if(hasSomeSimilarLetters(word, 2)) acc[2] += 1;
        if(hasSomeSimilarLetters(word, 3)) acc[3] += 1;

        return acc;
    }, {2: 0, 3: 0});
    const checkSum = checkSumObj[2] * checkSumObj[3];

    console.log(`Checksum for this list of box IDs: ${checkSum}.\n`);

    return checkSum;
};

module.exports = {
    findChecksum: findChecksum.bind(this, WORDS),
};
