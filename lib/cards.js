const math = require('./math');
const constants = require('./constants');
const Card = require('./card');
const CardSet = require('./cardset');
const Deck = require('./deck');

class CardGameError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
  }
}

function shuffle(cardSet) {
  let m = cardSet.length;
  let tmp, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    tmp = cardSet.cards[m];
    cardSet.cards[m] = cardSet.cards[i];
    cardSet.cards[i] = tmp;
  }
}

module.exports = { Card, CardSet, Deck, CardGameError, shuffle, Suit: constants.Suit, Rank: constants.Rank };
