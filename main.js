require('babel-polyfill');
const pontoon = require('./lib/pontoon/pontoon.js');
const Player = require('./lib/player.js');

const player1 = new Player('Mike');
const player2 = new Player('Bill');
player1.setAI(new pontoon.AI());
player2.setAI(new pontoon.AI());
const game = new pontoon.Game([player1, player2]);
game.play();
