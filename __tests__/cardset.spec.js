jest.unmock('../lib/cards');

const cards = require('../lib/cards');
const Suit = cards.Suit;
const Rank = cards.Rank;

describe('append', () => {
    it('can append 1 card', () => {
        let cardSet = new cards.CardSet();
        let deck = new cards.Deck();
        cardSet.append(deck.pop());
        expect(cardSet.count()).toBe(1);
    });

    it('can append multiple cards', () => {
        let cardSet = new cards.CardSet();
        let deck = new cards.Deck();
        let i = 5;
        while (i--) cardSet.append(deck.pop());
        expect(cardSet.count()).toBe(5);
    });
});
