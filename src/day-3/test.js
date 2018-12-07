const assert = require('assert');

const {findCountOfInchesForTest, findNotOverlappedForTest} = require('.');

describe('Day 3: No Matter How You Slice It', () => {
    it('should find count of overlapped inches', () => {
        const params =
            `#1 @ 1,3: 4x4
             #2 @ 3,1: 4x4
             #3 @ 5,5: 2x2`;

        assert.strictEqual(findCountOfInchesForTest(params), 4);
    });

    describe('Part Two', () => {
        it('should find number of claim that doesn\'t overlap', () => {
            const params =
                `#1 @ 1,3: 4x4
                 #2 @ 3,1: 4x4
                 #3 @ 5,5: 2x2`;

            assert.strictEqual(findNotOverlappedForTest(params), '3');
        });
    });
});
