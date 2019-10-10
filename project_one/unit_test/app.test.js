const functions = require('../js/index');

test('It test getIpClass', () => {
    expect(functions.getIpClass('1010')).toBe('B');
});