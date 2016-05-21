const constants = require('../../lib/constants');
const Rank = constants.Rank;

class rules {
  static hasPontoon(player) {
    return this.handValue(player.hand) === 21 && player.hand.length === 2;
  }

  static hasFiveCardTrick(player) {
    return this.handValue(player.hand) <= 21 && player.hand.length === 5;
  }

  static isBust(player) {
    return this.handValue(player.hand) > 21;
  }

  static cardValue(card) {
    let cardVal = card.rank;
    if (card.rank === Rank.JACK || card.rank === Rank.QUEEN || card.rank === Rank.KING) {
      cardVal = 10;
    } else if (card.rank === Rank.ACE) {
      cardVal = 1;
    }
    return cardVal;
  }

  static handValue(cardSet) {
    let value = 0;
    for (let card of cardSet) {
      value += this.cardValue(card);
    }
    //let value = this.cards.reduce((acc, card) => acc + Pontoon.cardValue(c));
    cardSet.aces.forEach(a => {
      if (value <= 11) value += 10;
    });
    return value;
  }

  static score(player) {
    return this.handValue(player.hand);
  }
}

module.exports = rules;
