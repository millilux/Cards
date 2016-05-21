const cards = require('./cards');
const Player = require('./player');

class Dealer extends Player {
  constructor() {
    super('Dealer', 0);
    this.deck = new cards.Deck();
    this.shuffle();
  }

  deal(players, numCards) {
    for (const player of players) {
      for (let i = 0; i < numCards; i++) this.dealCard(player);
    }
  }

  collectCards(players) {
    for (const player of players) {
      // Add the player's cards to the front (bottom) of the deck
      this.deck.prepend(...player.hand);
    }
  }

  shuffle() {
    cards.shuffle(this.deck);
  }

  dealCard(player) {
    player.receiveCard(this.deck.pop());
  }
}

module.exports = Dealer;
