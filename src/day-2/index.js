const R = require('ramda');
const fs = require('fs');
const WORDS = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const getWords = R.compose(R.dropLast(1), R.split('\n'));
const getLettersInWord = R.compose(R.values, R.countBy(R.toLower), R.split(''));
const getCommonLetters = R.compose(R.join(''), R.intersection);
const hasSomeSimilarLetters = (word, count) => R.indexOf(count, getLettersInWord(word)) >= 0;

const findChecksum = words => {
    const checkSums = getWords(words).reduce((acc, word) => {
        if(hasSomeSimilarLetters(word, 2)) acc[2] += 1;
        if(hasSomeSimilarLetters(word, 3)) acc[3] += 1;

        return acc;
    }, {2: 0, 3: 0});

    return checkSums[2] * checkSums[3];
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

const findCommonLetters = (words) => {
    const [first, second] = whatWordsTheSame(getWords(words));

    return getCommonLetters(first, second);
};

module.exports = {
    findChecksum: findChecksum.bind(this, WORDS),
    findCommonLetters: findCommonLetters.bind(this, WORDS),
    findChecksumForTest: findChecksum,
    findCommonLettersForTest: findCommonLetters,
};
