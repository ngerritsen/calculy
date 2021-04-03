import evaluate from "./evaluate";
import parse from "./parse";
import tokenize from "./tokenize";
import { Options } from "./types";

export default function calculate(code: string, options: Options = {}) {
  if (!code.trim()) {
    return 0;
  }

  return evaluate(parse(tokenize(code), options), options);
}
