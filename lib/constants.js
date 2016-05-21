const Suit = Object.freeze({ HEARTS: 'Hearts', DIAMONDS: 'Diamonds', CLUBS: 'Clubs', SPADES: 'Spades' });
const Rank = Object.freeze({ JOKER: 'Joker', ACE: 'Ace', 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, JACK: 'Jack', QUEEN: 'Queen', KING: 'King' });

module.exports = { Suit, Rank };
