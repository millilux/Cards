const constants = require('./constants');

class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  isJoker() {
    return this.rank === constants.Rank.JOKER;
  }

  toString() {
    return this.isJoker()
      ? this.rank
      : `${this.rank} of ${this.suit}`;
  }
}

module.exports = Card;
