"use strict";

module.exports = {

    randomInt : function (min, max){
        return Math.floor(Math.random()*(max-min+1)+min);
    },

    lerp : function (a, b, t) {
        return (1-t)*a + t*b;
    },

    map : function(value, inputMin, inputMax, outputMin, outputMax){
        return ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
    },

    clamp : function(value, min, max){
        return Math.min(Math.max(value, min), max);
    }

};
