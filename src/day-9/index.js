const preparePos = (n, m) => n < 0 ? m + n : n;
const addToSeq = (i, cur, seq) => {
    if (cur === seq.length) {
        seq.splice(1, 0, i);
    } else {
        seq.splice(cur + 1, 0, i);
    }

    return seq;
};

const findWinningScore = (countOfPlayers, countOfMarbels) => {
    let i = 1;
    let sequence = [0];
    let curPos = 0;
    let playersScore = {};

    while (i < countOfMarbels + 1) {
        for (let j = 0; j< countOfPlayers; j++) {
            playersScore[j+1] = playersScore[j+1] || 0;
            if (i % 23 !== 0) {
                sequence = addToSeq(i, curPos, sequence);
                curPos = sequence.indexOf(i)+1;
                i++;
            } else {
                playersScore[j+1] += sequence[preparePos(curPos - 8, sequence.length)] + i;
                curPos = preparePos(curPos - 7, sequence.length);
                sequence.splice(curPos - 1, 1);
                i++;
            }
        }
    }
    const winningScore = Object.values(playersScore).sort((a,b) => a-b)[0];

    console.log(`Winning Elf's score: ${winningScore}.\n`);

    return winningScore;
};


module.exports = {
    findWinningScore: findWinningScore.bind(this, 465, 71498),
};


