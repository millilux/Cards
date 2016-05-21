jest.unmock('../lib/deck');
jest.unmock('../lib/card');
jest.unmock('../lib/cardset');
jest.unmock('../lib/constants');

const Deck = require('../lib/deck');
const constants = require('../lib/constants');
const Rank = constants.Rank;
const Suit = constants.Suit;


describe('Deck', () => {
  const deck = new Deck();

  it('has 52 cards by default', () => {
    expect(deck.count()).toBe(52);
  });

  it('has 4 aces by default', () => {
    expect(deck.count(c => c.rank === Rank.ACE)).toBe(4);
  });
});

describe('Deck with jokers', () => {
  const deck = new Deck({ jokers: 2 });

  it('has 54 cards', () => {
    expect(deck.count()).toBe(54);
  });

  it('has 2 jokers', () => {
    expect(deck.count(c => c.rank === Rank.JOKER)).toBe(2);
  });
});

