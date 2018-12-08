const assert = require('assert');

const {findRemainingUnitsForTest, findShortesPolymerForTest} = require('.');

describe('Day 5: Alchemical Reduction', () => {
    it('Count of units remain after fully reacting the polymer', () => {
        const polymer = 'dabAcCaCBAcCcaDA';

        assert.strictEqual(findRemainingUnitsForTest(polymer), 10);
    });

    describe('Part Two', () => {
        it('Length of the shortest polymer produced by removing units', () => {
            const polymer = 'dabAcCaCBAcCcaDA';

            assert.strictEqual(findShortesPolymerForTest(polymer), 4);
        });
    });
});
