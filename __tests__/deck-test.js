jest.unmock('../cards');

const cards = require('../cards');
const Suit = cards.Suit;
const Rank = cards.Rank;

describe('Deck', () => {
    var deck = new cards.Deck();

    it('has 52 cards by default', () => {
        expect(deck.count()).toBe(52);
    });

    it('has 4 aces by default', () => {
        expect(deck.count(c => c.rank === Rank.ACE)).toBe(4);
    });
});

describe('Deck with jokers', () => {
    var deck = new cards.Deck({jokers: 2});

    it('has 54 cards', () => {
        expect(deck.count()).toBe(54);
    });

    it('has 2 jokers', () => {
        expect(deck.count(c => c.rank === Rank.JOKER)).toBe(2);
    });
});

