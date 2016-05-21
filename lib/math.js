module.exports = {

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  lerp(a, b, t) {
    return (1 - t) * a + t * b;
  },

  map(value, inputMin, inputMax, outputMin, outputMax) {
    return ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
  },

  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  },

};
