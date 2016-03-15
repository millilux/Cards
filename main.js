"use strict";

let PONTOON = require('./pontoon.js');

let player1 = new PONTOON.Player("Mike");
let player2 = new PONTOON.Player("Bill");
let pontoon = new PONTOON.Game([player1, player2]);
pontoon.toString();
pontoon.play();
