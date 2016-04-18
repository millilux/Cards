jest.unmock('../math');

describe('clamp', () => {
  it('clamps 4 to the range 0-1', () => {
    const math = require('../math');
    expect(math.clamp(4, 0, 1)).toBe(1);
  });
});
