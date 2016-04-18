"use strict";

let cards = require("./cards.js");
let math = require("./math.js");
const Rank = cards.Rank;

const Move = Object.freeze({ PONTOON: "Pontoon", TWIST: "Twist", STICK: "Stick", BUST: "Bust" });

class Player {
    constructor(name, riskiness){
        this.name = name;
        this.riskiness = 0;         // 0 means complete risk aversion, 1 means always take the risky option
        this.hand = new Hand();
        this.stake = 10;
    }

    play(){
        if (this.hand.isPontoon())
            return Move.PONTOON;

        if (this.score > 21){
            return Move.BUST;
        }

        let risk = 1 - math.clamp(math.map(this.score, 15, 21, 0, 1), 0, 1); // As the score gets closer to 21, less risk should be taken
        if (this.score <= 15 || Math.random() < this.riskiness * risk)
            return Move.TWIST;

        if (this.score >= 15){
            return Move.STICK;
        }
    }

    pay(otherPlayer, amount){
        otherPlayer.stake += amount;
        this.stake -= amount;
    }

    receiveCard(card){
        this.hand.append(card);
    }

    get score(){
        return this.hand.value;
    }

    toString(){
        return this.name + ": " + this.score;
    }
}

class Dealer extends Player {
    constructor(){
        super("Dealer", 0);
        this.deck = new cards.Deck();
        this.shuffle();
    }

    deal(players, numCards){
        for (let player of players){
            for (let i = 0; i < numCards; i++) this.giveCard(player);
        }
    }

    collectCards(players){
        for (let player of players){
            // Add a players cards to the front (bottom) of the deck
            player.hand.cards.splice(0).forEach(c => this.deck.prepend(c));
        }
    }

    shuffle(){
        cards.shuffle(this.deck);
    }

    // TODO: Rename this method: dealCard?
    giveCard(player) {
        player.receiveCard(this.deck.pop());
    }
}

class Hand extends cards.CardSet {
    constructor(){
        super();
        //this.cards = Array.prototype.slice.call(arguments);
    }

    isPontoon(){
        return this.value === 21 && this.cards.length === 2;
    }

    isFiveCardTrick(){
        return this.value <= 21 && this.cards.length === 5;
    }

    isBust(){
        return this.value > 21;
    }

    aces(){
        return this.cards.filter(c => c.rank === Rank.ACE);
    }

    get value(){
        this._calcValue();
        return this._value;
    }

    // The value of a card may depend on the current value of the overall hand
    _calcValue(){
        this._value = 0;
        this.cards.forEach(c => this._value += Pontoon.cardValue(c));
        //this._value = this.cards.reduce((prev, curr) => Pontoon.cardValue(prev) + Pontoon.cardValue(curr));

        this.aces().forEach(a => {
            if (this._value <= 11) this._value += 10;
        }); 
    }

    toString(){
        return this.value + " [" + this.cards.join(", ") + "]";
    }

}

class Pontoon {
    constructor(players){
        this.dealer = new Dealer();
        this.players = [this.dealer].concat(players);
        this.minStake = 1;
        this.maxStake = 100;
    }

    // The value of a card in Pontoon. Assume Aces are low by default, as the player can later decides whether to go high
    static cardValue(card){
        let cardVal = card.rank;
        if (card.rank === Rank.JACK || card.rank === Rank.QUEEN || card.rank === Rank.KING){
            cardVal = 10;
        } else if (card.rank === Rank.ACE){
            cardVal = 1;
        }
        return cardVal;
    }

    play(){
        this.initialBets();
        this.newDeal();
        console.log(this.toString());
        console.log("Pre-game stakes: " + this.players.map(p => p.name + ": " + p.stake).join(", "));

        if (this.dealer.hand.isPontoon()){
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
        console.log("Winners: " + this.winners.map(p => p.name).join(", "));
        console.log("Post-game Stakes: " + this.players.map(p => p.name + ": " + p.stake).join(", "));
    }

    initialBets(){
        for (let player of this.players){
            //player.allocateStake();
        }
    }

    playersTurns(){
        for (let player of this.players){
            this.activePlayer = player;

            let playerMove = null;
            while (playerMove === Move.TWIST || playerMove === null){
                playerMove = player.play();
                console.log(player.name + ": " + playerMove);

                if (playerMove === Move.TWIST && player.hand.count() <= 5){
                    this.dealer.giveCard(player);
                    console.log(player.name + " got a " + player.hand.cards[player.hand.cards.length-1]);
                }

                console.log(player.toString());
            }
        }
    }

    payout(){
        let players = this.players.filter(p => p instanceof Dealer === false);
        if (this.dealer.hand.isBust()){
            // Dealer pays out to other players. Pontoons and FiveCardTricks get double
            players.forEach((player) => {
                if (player.hand.isPontoon() || player.hand.isFiveCardTrick()){
                    this.dealer.pay(player, 2);
                } else {
                    this.dealer.pay(player, 1);
                }
                this.winners.push(player);
            });
        } else if (this.dealer.hand.isFiveCardTrick()){
            // Dealer pays out to players with Pontoon only. Pontoons get double stake, everyone else loses double stake
            players.forEach((player) => {
                if (player.hand.isPontoon()){
                    this.dealer.pay(player, 2);
                    winners.push(player);
                } else {
                    player.pay(this.dealer, 2);
                }
            });
        } else {
            // Dealer pays out to players with a higher score. Pontoons and FiveCardTricks get double stake. Everyone else loses a single stake
            let dealerWins = true; // unless someone has a better hand, the dealer will win.
            players.forEach((player) => {
                if (player.score > this.dealer.score && player.hand.isBust() === false) {
                    if (player.hand.isPontoon() || player.hand.isFiveCardTrick()){
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

    newDeal(){
        this.dealer.collectCards(this.players);
        if (this._pontoonOccurred) dealer.shuffle();
        this.dealer.deal(this.players, 2);

        this._pontoonOccurred = false;
        this.winners = [];
    }

    toString(){
        return this.players.join(" | ");
    }
}

module.exports = { Game : Pontoon, Player: Player };
