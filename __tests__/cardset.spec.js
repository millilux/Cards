jest.unmock('../lib/cardset');
jest.unmock('../lib/card');

const CardSet = require('../lib/cardset');

describe('append', () => {
  it('can append 1 card', () => {
    const cardSet = new CardSet();
    cardSet.append({});
    expect(cardSet.count()).toBe(1);
  });

  it('can append multiple cards', () => {
    const cardSet = new CardSet();
    cardSet.append({}, {});
    expect(cardSet.count()).toBe(2);
  });
});


describe('iterator', () => {
  it('iterates over 5 cards', () => {
    const cardSet = new CardSet();
    cardSet.append(1, 2, 3, 4, 5);
    let i = 0;
    for (const card of cardSet) {
      i += 1;
    }
    expect(i).toBe(5);
  });
});
