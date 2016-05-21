const constants = require('./constants');
const Card = require('./card');
const CardSet = require('./cardset');
const Rank = constants.Rank;
const Suit = constants.Suit;

class Deck extends CardSet {
  constructor(config) {
    super();
    // Build standard 52 cards
    for (let suit in Suit) {
      for (let rank in Rank) {
        if (Rank[rank] === Rank.JOKER) continue;
        this.cards.push(Object.freeze(new Card(Rank[rank], Suit[suit])));
      }
    }
    // Add in desired number of jokers
    let numJokers = 0;
    if (config) numJokers = config.jokers;
    while (numJokers > 0) {
      this.cards.push(Object.freeze(new Card(Rank.JOKER, null)));
      numJokers--;
    }
  }
}

module.exports = Deck;
