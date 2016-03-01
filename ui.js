"use strict";

const charMap = {
    "AceSpades": "\u{1F0A1}",
    "2Spades": "\u{1F0A2}",
    "3Spades": "\u{1F0A3}",
    "4Spades": "\u{1F0A4}",
    "5Spades": "\u{1F0A5}",
    "6Spades": "\u{1F0A6}",
    "7Spades": "\u{1F0A7}",
    "8Spades": "\u{1F0A8}",
    "9Spades": "\u{1F0A9}",
    "10Spades": "\u{1F0AA}",
    "JackSpades": "\u{1F0AB}",
    "QueenSpades": "\u{1F0AD}",
    "KingSpades": "\u{1F0AE}",

    "AceHearts": "\u{1F0B1}",
    "2Hearts": "\u{1F0B2}",
    "3Hearts": "\u{1F0B3}",
    "4Hearts": "\u{1F0B4}",
    "5Hearts": "\u{1F0B5}",
    "6Hearts": "\u{1F0B6}",
    "7Hearts": "\u{1F0B7}",
    "8Hearts": "\u{1F0B8}",
    "9Hearts": "\u{1F0B9}",
    "10Hearts": "\u{1F0BA}",
    "JackHearts": "\u{1F0BB}",
    "QueenHearts": "\u{1F0BD}",
    "KingHearts": "\u{1F0BE}",

    "AceDiamonds": "\u{1F0C1}",
    "2Diamonds": "\u{1F0C2}",
    "3Diamonds": "\u{1F0C3}",
    "4Diamonds": "\u{1F0C4}",
    "5Diamonds": "\u{1F0C5}",
    "6Diamonds": "\u{1F0C6}",
    "7Diamonds": "\u{1F0C7}",
    "8Diamonds": "\u{1F0C8}",
    "9Diamonds": "\u{1F0C9}",
    "10Diamonds": "\u{1F0CA}",
    "JackDiamonds": "\u{1F0CB}",
    "QueenDiamonds": "\u{1F0CD}",
    "KingDiamonds": "\u{1F0CE}",

    "AceClubs": "\u{1F0D1}",
    "2Clubs": "\u{1F0D2}",
    "3Clubs": "\u{1F0D3}",
    "4Clubs": "\u{1F0D4}",
    "5Clubs": "\u{1F0D5}",
    "6Clubs": "\u{1F0D6}",
    "7Clubs": "\u{1F0D7}",
    "8Clubs": "\u{1F0D8}",
    "9Clubs": "\u{1F0D9}",
    "10Clubs": "\u{1F0DA}",
    "JackClubs": "\u{1F0DB}",
    "QueenClubs": "\u{1F0DD}",
    "KingClubs": "\u{1F0DE}",

    "Joker": "\u{1F0DF}"
};

// Cache elements
const countEl = document.getElementById("card-count");
const buttonEl = document.getElementById("draw-card");
const cardsEl = document.getElementById("cards");

// Main
let deck = new Deck({jokers: 4});
deck.shuffle();
countEl.textContent = deck.cards.length;

// Events
buttonEl.addEventListener("click", function(e){
    let card = deck.pop(); 
    let li = document.createElement('li');
    li.innerHTML = charMap[card.rank+card.suit];
    cardsEl.appendChild(li);
    console.log(card);

    countEl.textContent = deck.cards.length;
});
