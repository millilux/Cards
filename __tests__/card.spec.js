jest.unmock('../lib/card');

const Card = require('../lib/card');
const constants = require('../lib/constants');
const Rank = constants.Rank;
const Suit = constants.Suit;

describe('Card', () => {
  it('has rank and suit', () => {
    const card = new Card(Rank.ACE, Suit.SPADES);
    expect(card.rank).toBe(Rank.ACE);
    expect(card.suit).toBe(Suit.SPADES);
    expect(card.toString()).toBe('Ace of Spades');
  });
});

