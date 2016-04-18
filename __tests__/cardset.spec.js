jest.unmock('../lib/cards');

const cards = require('../lib/cards');
const Suit = cards.Suit;
const Rank = cards.Rank;


describe('append', () => {
    it('has 1 card when appended', () => {
        var cardSet = new cards.CardSet();
        cardSet.append(new cards.Card(Suit.ACE, Rank.SPADES));
        expect(cardSet.count()).toBe(1);
    });
});
