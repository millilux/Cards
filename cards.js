"use strict";
let math = require("./math.js");

// Enums
const Suit = Object.freeze({ HEARTS: "Hearts", DIAMONDS: "Diamonds", CLUBS: "Clubs", SPADES: "Spades"});
const Rank = Object.freeze({ JOKER: "Joker", ACE: "Ace", 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, JACK: "Jack", QUEEN: "Queen", KING: "King" });

var shuffle = function(cardSet) {
    for (let i = 0; i < cardSet.cards.length; i++){
        let rndIndex = math.randomInt(0, cardSet.cards.length-1);
        let tmp = cardSet.cards[i];
        cardSet.cards[i] = cardSet.cards[rndIndex];
        cardSet.cards[rndIndex] = tmp;
    }
};

// Classes
class Card {
    constructor(rank, suit){
        this.rank = rank;
        this.suit = suit;
    }

    isJoker() {
        return this.rank === Rank.JOKER;
    }

    toString() {
        return this.isJoker() 
            ? this.rank 
            : this.rank + " of " + this.suit;
    }
}

class CardSet {

    constructor(cards){
        if (cards){
            this.cards = cards;
        } else {
            this.cards = [];
        }
    }

    pop() {
        let card = this.cards.pop();
        if (card === undefined){
            throw new Error("Deck is empty");
        }
        return card;
    }

    shift(){
        let card = this.cards.shift();
        if (card === undefined){
            throw new Error("Deck is empty");
        }
        return card;        
    }

    append(card){
        this.cards.push(card);
    }

    prepend(card){
        this.cards.unshift(card);
    }

    toString() {
        return this.cards.join(", ");
    }

    count(predicate){
        if (!predicate) return this.cards.length;
        return this.cards.filter(predicate).length;
    }

    contains(predicate){
        return this.cards.some(predicate);
    }
}

class Deck extends CardSet { 

    constructor(config){
        super();
        // Build standard 52 cards
        for (let suit in Suit){
            for (let rank in Rank){
                if (Rank[rank] === Rank.JOKER) continue;
                this.cards.push(Object.freeze(new Card(Rank[rank], Suit[suit])));
            }
        }
        // Add in desired number of jokers
        let numJokers = 0;
        if (config) numJokers = config.jokers;
        while (numJokers > 0){
            this.cards.push(Object.freeze(new Card(Rank.JOKER, null)));
            numJokers--;
        }
    }
}

module.exports = { Deck : Deck, CardSet : CardSet, Card : Card, Suit : Suit, Rank : Rank, shuffle : shuffle};
