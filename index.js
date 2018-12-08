const {resultingFrequency, duplicateFrequency} = require('./src/day-1');
const {findChecksum, findCommonLetters} = require('./src/day-2');
const {findCountOfInches, findNotOverlapped} = require('./src/day-3');
const {findMultiply, findSecondMultiply} = require('./src/day-4');

console.log('day-1 first task:\n');
resultingFrequency();

console.log('day-1 second task:\n');
duplicateFrequency();

console.log('day-2 first task:\n');
findChecksum();

console.log('day-2 second task:\n');
findCommonLetters();
//
console.log('day-3 first task:\n');
findCountOfInches();

console.log('day-3 second task:\n');
findNotOverlapped();

console.log('day-4 first task:\n');
findMultiply();

console.log('day-4 second task:\n');
findSecondMultiply();
