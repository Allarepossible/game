const assert = require('assert');

const {findSizeOfLargestAreaForTest, findSizeOfRegionForTest} = require('.');

describe('Day 6: Chronal Coordinates', () => {
    it('The size of the largest area', () => {
        const coords = `1, 1
                        1, 6
                        8, 3
                        3, 4
                        5, 5
                        8, 9`;

        assert.strictEqual(findSizeOfLargestAreaForTest(coords), 17);
    });

    describe('Part Two', () => {
        it('Size of the region containing all locations', () => {
            const coords = `1, 1
                            1, 6
                            8, 3
                            3, 4
                            5, 5
                            8, 9`;

            assert.strictEqual(findSizeOfRegionForTest(coords, 32), 16);
        });
    });
});
