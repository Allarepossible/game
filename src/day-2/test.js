const assert = require('assert');

const {findChecksumForTest, findCommonLettersForTest} = require('.');

describe('Day 2: Inventory Management System', () => {
    it('should find checksum from `abcdef`, `bababc`, `abbcde`, `abcccd`, `aabcdd`, `abcdee`, `ababab`', () => {
        const words =
            `abcdef
             bababc
             abbcde
             abcccd
             aabcdd
             abcdee
             ababab
             `;

        assert.strictEqual(findChecksumForTest(words), 12);
    });

    it('should find checksum from `abcdef`, `bababc`, `abbcde`', () => {
        const words =
            `abcdef
             bababc
             abbcde
             `;

        assert.strictEqual(findChecksumForTest(words), 2);
    });

    it('should find checksum from `abcdef`, `bababc`, `abbcde`, `abcccd`', () => {
        const words =
            `abcdef
             bababc
             abbcde
             abcccd
             `;

        assert.strictEqual(findChecksumForTest(words), 4);
    });

    it('should find checksum from `abcdef`, `bababc`, `abbcde`, `abcccd`, `aabcdd`', () => {
        const words =
            `abcdef
             bababc
             abbcde
             abcccd
             aabcdd
             `;

        assert.strictEqual(findChecksumForTest(words), 6);
    });

    describe('Part Two', () => {
        it('should find common letters `abcde`, `fghij`, `klmno`, `pqrst`, `fguij`', () => {
            const words =
                `abcde
                 fghij
                 klmno
                 pqrst
                 fguij
                 `;

            assert.strictEqual(findCommonLettersForTest(words), 'fgij');
        });
    });
});
