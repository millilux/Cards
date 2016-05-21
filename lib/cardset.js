const constants = require('./constants');

class CardSet {
  constructor(cards) {
    if (cards) {
      this.cards = cards;
    } else {
      this.cards = [];
    }
  }

  pop() {
    return this.cards.pop();
  }

  shift() {
    return this.cards.shift();
  }

  append(...cards) {
    this.cards.push(...cards);
  }

  prepend(...cards) {
    this.cards.unshift(...cards);
  }

  toString() {
    return this.cards.join(', ');
  }

  count(predicate) {
    if (!predicate) return this.cards.length;
    return this.cards.filter(predicate).length;
  }

  contains(predicate) {
    return this.cards.some(predicate);
  }

  get aces() {
    return this.cards.filter(c => c.rank === constants.Rank.ACE);
  }

  get length() {
    return this.cards.length;
  }

  *[Symbol.iterator]() {
    for (let card of this.cards) {
      yield card;
    }
  }
}

module.exports = CardSet;
