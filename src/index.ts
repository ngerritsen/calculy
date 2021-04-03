import evaluate from "./evaluate";
import parse from "./parse";
import tokenize from "./tokenize";
import { Expression, Options, Calculy } from "./types";

export {
  Calculy,
  Options,
  Constants,
  ExpressionType,
  Expression,
  ModifierExpression,
  PrimaryExpression,
  ValueExpression,
  FunctionExpression,
  GroupExpression,
} from "./types";

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
