const math = require('../math.js');
const pontoon = require('./pontoon.js');
const rules = require('./rules.js');
const Move = require('./moves.js');

class PontoonAI {
  decideNextMove(player) {
    const score = rules.score(player);
    if (rules.hasPontoon(player)) {
      return Move.PONTOON;
    }

    if (score > 21) {
      return Move.BUST;
    }

    const risk = 1 - math.clamp(math.map(score, 15, 21, 0, 1), 0, 1); // As the score gets closer to 21, less risk should be taken
    if (score <= 15 || Math.random() < player.riskiness * risk) {
      return Move.TWIST;
    }

    if (score >= 15) {
      return Move.STICK;
    }

    return Move.STICK;
  }
}

module.exports = PontoonAI;
