const cards = require('../cards.js');
const Dealer = require('../dealer.js');
const AI = require('./pontoonAI.js');
const rules = require('./rules.js');
const Move = require('./moves.js');
const Rank = cards.Rank;

class Pontoon {
  constructor(players) {
    this.dealer = new Dealer();
    this.dealer.setAI(new AI());
    this.players = [this.dealer].concat(players);
    this.minStake = 1;
    this.maxStake = 100;
  }

  initialBets() {
    // for (let player of this.players) {
    //   player.allocateStake();
    // }
  }

  play() {
    this.initialBets();
    console.log('Pre-game stakes: ' + this.players.map(p => p.name + ': ' + p.stake).join(', '));
    this.newDeal();
    console.log(this.toString());

    if (rules.hasPontoon(this.dealer)) {
      // Special case where dealer starts outright with Pontoon. Dealer collects double from all players.
      this.players.forEach((player) => player.pay(this.dealer, 2));
      this.winners.push(this.dealer);
    } else {
      // Play commences as normal
      this.playersTurns();
      // TODO: does dealer need to go last? Seems to amount to the same thing minus flashy ritual
      this.payout();
    }

    console.log(this.toString());
    console.log('Winners: ' + this.winners.map(p => p.name).join(', '));
    console.log('Post-game Stakes: ' + this.players.map(p => p.name + ': ' + p.stake).join(', '));
  }

  playersTurns() {
    for (let player of this.players) {
      this.activePlayer = player;

      let playerMove = null;
      while (playerMove === Move.TWIST || playerMove === null) {
        playerMove = player.play();
        console.log(`${player}'s move: ${playerMove}`);

        if (playerMove === Move.TWIST && player.hand.count() <= 5) {
          this.dealer.dealCard(player);
          const dealtCard = player.hand.cards[player.hand.count() - 1];
          console.log(`${player} got a ${dealtCard}`);
        }

        const score = rules.score(player);
        console.log(`${player}: ${score}`);
      }
    }
  }

  payout() {
    const players = this.players.filter(p => p instanceof Dealer === false);
    if (rules.isBust(this.dealer)) {
      // Dealer pays out to other players. Pontoons and FiveCardTricks get double
      players.forEach((player) => {
        if (rules.hasPontoon(player) || rules.hasFiveCardTrick(player)) {
          this.dealer.pay(player, 2);
        } else {
          this.dealer.pay(player, 1);
        }
        this.winners.push(player);
      });
    } else if (rules.hasFiveCardTrick(this.dealer)) {
      // Dealer pays out to players with Pontoon only. Pontoons get double stake, everyone else loses double stake
      players.forEach((player) => {
        if (rules.hasPontoon(player)) {
          this.dealer.pay(player, 2);
          this.winners.push(player);
        } else {
          player.pay(this.dealer, 2);
        }
      });
    } else {
      // Dealer pays out to players with a higher score. Pontoons and FiveCardTricks get double stake. Everyone else loses a single stake
      let dealerWins = true; // unless someone has a better hand, the dealer will win.
      players.forEach((player) => {
        if (rules.score(player) > rules.score(this.dealer) && rules.isBust(player) === false) {
          if (rules.hasPontoon(player) || rules.hasFiveCardTrick(player)) {
            this.dealer.pay(player, 2);
          } else {
            this.dealer.pay(player, 1);
          }
          this.winners.push(player);
          dealerWins = false;
        } else {
          player.pay(this.dealer, 1);
        }
      });
      if (dealerWins) this.winners.push(this.dealer);
    }
  }

  newDeal() {
    this.dealer.collectCards(this.players);
    if (this._pontoonOccurred) this.dealer.shuffle();
    this.dealer.deal(this.players, 2);

    this._pontoonOccurred = false;
    this.winners = [];
  }

  toString() {
    return this.players.map(p => p.name + ': ' + rules.score(p)).join(' | ');
  }
}

module.exports = { Game: Pontoon, Move, AI, rules };
