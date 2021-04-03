import getConstants from "./constants";
import getFunctions from "./functions";
import {
  Expression,
  ExpressionType,
  FunctionExpression,
  Options,
} from "./types";

export default function parse(tokens: string[], options: Options) {
  const constants = getConstants(options.constants);
  const functions = getFunctions(options.deg);

  let position = 0;

  const result = parseExpression();

  if (position !== tokens.length) {
    throw new SyntaxError(`Unexpected token "${peek()}".`);
  }

  return result;

  function parseExpression(): Expression {
    let expression = parseMultiplicationExpression();
    let token = peek();

    while (["+", "-"].includes(token)) {
      consume();

      const rightExpression = parseMultiplicationExpression();

      expression = {
        type: token as ExpressionType.Add | ExpressionType.Subtract,
        left: expression,
        right: rightExpression,
      };

      token = peek();
    }

    return expression;
  }

  function parseMultiplicationExpression(): Expression {
    let expression = parseExponentialExpression();
    let token = peek();

    while (
      ["*", "/", "("].includes(token) ||
      isConstant(token) ||
      isFunction(token)
    ) {
      if (["*", "/"].includes(token)) {
        consume();
      }

      const rightExpression = parseExponentialExpression();

      expression = {
        type: token === "/" ? ExpressionType.Divide : ExpressionType.Multiply,
        left: expression,
        right: rightExpression,
      };

      token = peek();
    }

    return expression;
  }

  function parseExponentialExpression(): Expression {
    let expression = parseNegativeExpression();
    let token = peek();

    while (token === "^") {
      consume();

      const rightExpression = parseNegativeExpression();

      expression = {
        type: ExpressionType.Exponential,
        left: expression,
        right: rightExpression,
      };

      token = peek();
    }

    return expression;
  }

  function parseNegativeExpression(): Expression {
    if (peek() === "-") {
      consume();

      return {
        type: ExpressionType.Negative,
        of: parseModifierExpression(),
      };
    }

    return parseModifierExpression();
  }

  function parseModifierExpression(): Expression {
    let expression = parsePrimaryExpression();
    let token = peek();

    while (["!", "%"].includes(token)) {
      consume();

      expression = {
        type: token as ExpressionType.Modulo | ExpressionType.Factorial,
        of: expression,
      };

      token = peek();
    }

    return expression;
  }

  function parsePrimaryExpression(): Expression {
    const token = peek();

    if (isNumber(token)) {
      consume();

      return {
        type: ExpressionType.Number,
        value: token,
      };
    } else if (isConstant(token)) {
      consume();

      return {
        type: ExpressionType.Constant,
        value: token,
      };
    } else if (isFunction(token)) {
      consume();

      if (peek() !== "(") {
        throw new SyntaxError(`Unexpected token ${peek()}, expected "(".`);
      }

      consume();

      if (peek() === ")") {
        consume();

        return {
          type: ExpressionType.Function,
          value: token,
          args: [],
        };
      }

      const arg = parseExpression();
      const args = [arg];

      while (peek() === ",") {
        consume();
        args.push(parseExpression());
      }

      const expression: FunctionExpression = {
        type: ExpressionType.Function,
        value: token,
        args,
      };

      if (peek() !== ")") {
        throw new SyntaxError(`Unexpected token ${peek()}, expected ")".`);
      }

      consume();

      return expression;
    } else if (token === "(") {
      consume();

      const expression = parseExpression();

      if (peek() !== ")") {
        throw new SyntaxError(
          `Unexpected token "${token}", expected a closing parenthesis.`
        );
      }

      consume();

      return {
        type: ExpressionType.Group,
        expression,
      };
    } else if (token === "|") {
      consume();

      const expression = parseExpression();

      if (peek() !== "|") {
        throw new SyntaxError(
          `Unexpected token "${token}", expected a closing parenthesis.`
        );
      }

      consume();

      return {
        type: ExpressionType.Absolute,
        of: expression,
      };
    } else {
      throw new SyntaxError(
        `Unexpected token "${token}", expected a number, parenthesis, function or constant.`
      );
    }
  }

  function consume() {
    position++;
  }

  function peek(): string {
    return tokens[position];
  }

  function isNumber(token: string): boolean {
    return Boolean(token && !isNaN(parseFloat(token)));
  }

  function isConstant(token: string): boolean {
    return Boolean(token && constants[token.toLowerCase()]);
  }

  function isFunction(token: string): boolean {
    return Boolean(token && functions[token.toLowerCase()]);
  }
}
