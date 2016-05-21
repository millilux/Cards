const CardSet = require('./CardSet');

class Player {
  constructor(name) {
    this.name = name;
    this.hand = new CardSet();
    this.stake = 10;
  }

  setAI(ai) {
    this.ai = ai;
  }

  play() {
    if (this.ai) {
      return this.ai.decideNextMove(this);
    }
  }

  pay(otherPlayer, amount) {
    otherPlayer.stake += amount;
    this.stake -= amount;
  }

  receiveCard(card) {
    this.hand.append(card);
  }

  toString() {
    return `${this.name}`;
  }
}

module.exports = Player;
