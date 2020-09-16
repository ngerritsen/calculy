import log from './math/log';
import random from './math/random';
import nthRoot from './math/nthRoot';

export default {
  '√': validateArgs(nthRoot, 1, 2),
  abs: validateArgs(Math.abs),
  acos: validateArgs(Math.acos),
  asin: validateArgs(Math.asin),
  atan: validateArgs(Math.atan),
  cbrt: validateArgs(Math.cbrt),
  ceil: validateArgs(Math.ceil),
  cos: validateArgs(Math.cos),
  floor: validateArgs(Math.floor),
  ln: validateArgs(Math.log),
  log: validateArgs(log, 1, 2),
  nthroot: validateArgs(nthRoot, 1, 2),
  rand: validateArgs(random, 0, 2),
  root: validateArgs(nthRoot, 1, 2),
  round: validateArgs(Math.round),
  sin: validateArgs(Math.sin),
  sqrt: validateArgs(Math.sqrt),
  tan: validateArgs(Math.tan),
};

function validateArgs(func, min = 1, max = min) {
  return (...args) => {
    if (args.length < min) {
      throw new Error(
        `A minimum of ${min} arguments required for ${func.name}, ${args.length} provided.`
      );
    }

    if (args.length > max) {
      throw new Error(
        `A maximum of ${max} arguments allowed for ${func.name}, ${args.length} provided.`
      );
    }

    return func(...args);
  };
}
