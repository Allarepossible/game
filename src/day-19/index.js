const fs = require('fs');
const INPUT = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

function findResult(input) {

}

module.exports = {
    result: findResult.bind(this, INPUT),
};
