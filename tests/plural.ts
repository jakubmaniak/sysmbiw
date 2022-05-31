import assert from 'assert';

import plural from '../helpers/plural';


describe('helpers/plural.ts', () => {
    it('should return singular nominativ when the value is 1', () => {
        assert.equal(plural(1, 'szklanka', 'szklanki', 'szklanek'), 'szklanka');
        assert.equal(plural(1, 'dziecko', 'dzieci'), 'dziecko');
    });

    it('should return plural nominativ when the value ends with 2, 3 or 4, and the penultimate digit is not 1', () => {
        assert.equal(plural(2, 'szklanka', 'szklanki', 'szklanek'), 'szklanki');
        assert.equal(plural(3, 'szklanka', 'szklanki', 'szklanek'), 'szklanki');
        assert.equal(plural(4, 'szklanka', 'szklanki', 'szklanek'), 'szklanki');
        assert.equal(plural(204, 'szklanka', 'szklanki', 'szklanek'), 'szklanki');
        assert.equal(plural(12, 'szklanka', 'szklanki', 'szklanek'), 'szklanek');
        assert.equal(plural(313, 'szklanka', 'szklanki', 'szklanek'), 'szklanek');
        assert.equal(plural(1014, 'szklanka', 'szklanki', 'szklanek'), 'szklanek');
    });

    it('should return plural genitiv when the value is 0', () => {
        assert.equal(plural(0, 'szklanka', 'szklanki', 'szklanek'), 'szklanek');
        assert.equal(plural(-0, 'szklanka', 'szklanki', 'szklanek'), 'szklanek');
    });

    it('should return singular nominativ when the value is -1', () => {
        assert.equal(plural(-1, 'szklanka', 'szklanki', 'szklanek'), 'szklanka');
    });
});