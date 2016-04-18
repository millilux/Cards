"use strict";
let math = require("./math.js");

// Enums
const Suit = Object.freeze({ HEARTS: "Hearts", DIAMONDS: "Diamonds", CLUBS: "Clubs", SPADES: "Spades"});
const Rank = Object.freeze({ JOKER: "Joker", ACE: "Ace", 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, JACK: "Jack", QUEEN: "Queen", KING: "King" });

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

class Deck { 
    constructor(config){
        this.cards = [];
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
            this.cards.push(Object.freeze(new Card(Rank.JOKER, '')));
            numJokers--;
        }
    }

    shuffle() {
        for (let i = 0; i < this.cards.length; i++){
            let rndIndex = math.randomInt(0, this.cards.length-1);
            let tmp = this.cards[i];
            this.cards[i] = this.cards[rndIndex];
            this.cards[rndIndex] = tmp;
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
}

module.exports = { Deck : Deck, Card : Card, Suit : Suit, Rank : Rank };
