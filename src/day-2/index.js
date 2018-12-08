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

const whatWordsTheSame = (words) => {
    for (let i=0; i<words.length; i++) {
        for (let j=i+1; j<words.length; j++) {
            if(isWordsTheSame(words[i], words[j])) {
                return [words[i], words[j]]
            }
        }
    }
};

const isWordsTheSame = (w1, w2) => {
    let diff = 0;

    for (let i = 0; i < w1.length; i++) {
        diff += w1[i] !== w2[i] ? 1 : 0;
    }

    return diff === 1;
};


const removeExcessLetter = (w1, w2) => {
    let res = '';

    for (let i = 0; i < w1.length; i++) {
        res += w1[i] !== w2[i] ? '' : w1[i];
    }

    return res;
};

const findCommonLetters = (words) => {
    const [first, second] = whatWordsTheSame(prepare(words));
    const commonLetters = removeExcessLetter(first, second);

    console.log(`This letters are common between the two correct box IDs: ${commonLetters}.\n`);

    return commonLetters.trim();
};

module.exports = {
    findChecksum: findChecksum.bind(this, WORDS),
    findCommonLetters: findCommonLetters.bind(this, WORDS),
    findChecksumForTest: findChecksum,
    findCommonLettersForTest: findCommonLetters,
};
