const assert = require('assert');

const {findCorrectOrdersForTest, findCommonTimeForTest} = require('.');

describe('Day 7: The Sum of Its Parts', () => {
    it('The size of the largest area', () => {
        const commands = `Step C must be finished before step A can begin.
                        Step C must be finished before step F can begin.
                        Step A must be finished before step B can begin.
                        Step A must be finished before step D can begin.
                        Step B must be finished before step E can begin.
                        Step D must be finished before step E can begin.
                        Step F must be finished before step E can begin.`;

        assert.strictEqual(findCorrectOrdersForTest(commands), 'CABDFE');
    });

    describe('Part Two', () => {
        it('Size of the region containing all locations', () => {
            const commands = `Step C must be finished before step A can begin.
                            Step C must be finished before step F can begin.
                            Step A must be finished before step B can begin.
                            Step A must be finished before step D can begin.
                            Step B must be finished before step E can begin.
                            Step D must be finished before step E can begin.
                            Step F must be finished before step E can begin.`;

            assert.strictEqual(findCommonTimeForTest(commands, 2, 0), 15);
        });
    });
});
