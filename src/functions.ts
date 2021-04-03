import log from "./math/log";
import random from "./math/random";
import validate from "./validate";
import degree from "./degree";
import nthRoot from "./math/nthRoot";
import { MathFuncs } from "./types";

const functions = {
  "√": validate(nthRoot, 1, 2),
  abs: validate(Math.abs),
  acos: validate(Math.acos),
  asin: validate(Math.asin),
  atan: validate(Math.atan),
  cbrt: validate(Math.cbrt),
  ceil: validate(Math.ceil),
  cos: validate(Math.cos),
  floor: validate(Math.floor),
  ln: validate(Math.log),
  log: validate(log, 1, 2),
  nthroot: validate(nthRoot, 1, 2),
  rand: validate(random, 0, 2),
  root: validate(nthRoot, 1, 2),
  round: validate(Math.round),
  sin: validate(Math.sin),
  sqrt: validate(Math.sqrt),
  tan: validate(Math.tan),
};

const degFunctions = {
  ...functions,
  acos: degree(validate(Math.acos)),
  asin: degree(validate(Math.asin)),
  atan: degree(validate(Math.atan)),
  cos: degree(validate(Math.cos)),
  sin: degree(validate(Math.sin)),
  tan: degree(validate(Math.tan)),
};

export default function getFunctions(deg: boolean | undefined): MathFuncs {
  return deg ? degFunctions : functions;
}
