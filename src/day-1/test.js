const assert = require('assert');

const {resultingFrequencyForTest, duplicateFrequencyForTest} = require('.');

describe('Day 1: Chronal Calibration', () => {
    it('should calculate frequency from +1, -2, +3, +1', () => {
        const frequencies =
            `+1
             -2
             +3
             +1`;

        assert.strictEqual(resultingFrequencyForTest(frequencies), 3);
    });

    it('should calculate frequency from +1, +1, +1', () => {
        const frequencies =
            `+1
             +1
             +1`;

        assert.strictEqual(resultingFrequencyForTest(frequencies), 3);
    });

    it('should calculate frequency from +1, +1, -2', () => {
        const frequencies =
            `+1
             +1
             -2`;

        assert.strictEqual(resultingFrequencyForTest(frequencies), 0);
    });

    it('should calculate frequency from -1, -2, -3', () => {
        const frequencies =
            `-1
             -2
             -3`;

        assert.strictEqual(resultingFrequencyForTest(frequencies), -6);
    });

    describe('Part Two', () => {
        it('should calculate first duplicate frequency from +1, -2, +3, +1', () => {
            const frequencies =
                `+1
                 -2
                 +3
                 +1`;

            assert.strictEqual(duplicateFrequencyForTest(frequencies), 2);
        });

        it('should calculate first duplicate frequency from +1, -1', () => {
            const frequencies =
                `+1
                 -1`;

            assert.strictEqual(duplicateFrequencyForTest(frequencies), 0);
        });

        it('should calculate first duplicate frequency from +3, +3, +4, -2, -4', () => {
            const frequencies =
                `+3
                 +3
                 +4
                 -2
                 -4`;

            assert.strictEqual(duplicateFrequencyForTest(frequencies), 10);
        });

        it('should calculate first duplicate frequency from -6, +3, +8, +5, -6', () => {
            const frequencies =
                `-6
                 +3
                 +8
                 +5
                 -6`;

            assert.strictEqual(duplicateFrequencyForTest(frequencies), 5);
        });

        it('should calculate first duplicate frequency from +7, +7, -2, -7, -4', () => {
            const frequencies =
                `+7
                 +7
                 -2
                 -7
                 -4`;

            assert.strictEqual(duplicateFrequencyForTest(frequencies), 14);
        });
    });
});
