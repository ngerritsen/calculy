import evaluate from "./evaluate";
import parse from "./parse";
import tokenize from "./tokenize";
import { Expression, Options } from "./types";

interface Calculy {
  evaluate: (code: string, options?: Options) => number;
  parse: (code: string, options?: Options) => Expression;
  tokenize: (code: string) => string[];
}

const calculy: Calculy = {
  evaluate(code: string, options: Options = {}) {
    if (!code.trim()) {
      return 0;
    }

    return evaluate(this.parse(code, options), options);
  },
  parse(code: string, options: Options = {}): Expression {
    return parse(tokenize(code), options);
  },
  tokenize(code: string): string[] {
    return tokenize(code);
  },
};

export default calculy;
