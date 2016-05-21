jest.unmock('../lib/math');

const math = require('../lib/math');

describe('clamp', () => {
  it('clamps 4 to 1 in the range 0-1', () => {
    expect(math.clamp(4, 0, 1)).toBe(1);
  });

  it('clamps 4 to 5 in the range 5-10', () => {
    expect(math.clamp(4, 5, 10)).toBe(5);
  });

  it('does nothing to 4 in the range 1-10', () => {
    expect(math.clamp(4, 1, 10)).toBe(4);
  });
});


describe('lerp', () => {
  it('lerps halfway between 0-100', () => {
    expect(math.lerp(0, 100, 0.5)).toBe(50);
  });

  it('lerps 25% between 0-1', () => {
    expect(math.lerp(0, 1, 0.25)).toBe(0.25);
  });

  it('lerps 80% between 20-30', () => {
    expect(math.lerp(20, 30, 0.8)).toBe(28);
  });
});
