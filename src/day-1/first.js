const fs = require('fs');
const fileContent = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const resultingFrequency = () => {
    const frequencyChanges = fileContent.toString().split('\n');
    const resultingFrequency = frequencyChanges.reduce((res, item) => res + Number(item), 0);

    console.log(`Resulting frequency is: ${resultingFrequency}.`);
};

module.exports = {
    resultingFrequency
};
