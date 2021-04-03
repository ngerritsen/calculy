"use strict";
exports.__esModule = true;
function random(a, b) {
  var min = b === undefined ? 0 : a;
  var max = b === undefined ? a || 0 : b;
  return Math.random() * (max - min) + min;
}
exports["default"] = random;
