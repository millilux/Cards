"use strict";

let pontoon = require('./games/pontoon.js');

let player1 = new pontoon.Player("Mike");
let player2 = new pontoon.Player("Bill");
let game = new pontoon.Game([player1, player2]);
game.toString();
game.play();
