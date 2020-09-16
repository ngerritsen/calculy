import constants from './constants';
import functions from './functions';

export default function parse(tokens) {
  let position = 0;

  const result = parseExpression();

  if (position !== tokens.length) {
    throw new SyntaxError(`Unexpected token "${peek()}".`);
  }

  return result;

  function parseExpression() {
    let expression = parseMultiplicationExpression();
    let token = peek();

    while (['+', '-'].includes(token)) {
      consume();

      const rightExpression = parseMultiplicationExpression();

      expression = {
        type: token,
        left: expression,
        right: rightExpression,
      };

      token = peek();
    }

    return expression;
  }

  function parseMultiplicationExpression() {
    let expression = parseExponentialExpression();
    let token = peek();

    while (
      ['*', '/', '('].includes(token) ||
      isConstant(token) ||
      isFunction(token)
    ) {
      if (['*', '/'].includes(token)) {
        consume();
      }

      const rightExpression = parseExponentialExpression();

      expression = {
        type: token === '/' ? '/' : '*',
        left: expression,
        right: rightExpression,
      };

      token = peek();
    }

    return expression;
  }

  function parseExponentialExpression() {
    let expression = parseNegativeExpression();
    let token = peek();

    while (token === '^') {
      consume();

      const rightExpression = parseNegativeExpression();

      expression = {
        type: token,
        left: expression,
        right: rightExpression,
      };

      token = peek();
    }

    return expression;
  }

  function parseNegativeExpression() {
    if (peek() === '-') {
      consume();

      return {
        type: 'negative',
        of: parseModifierExpression(),
      };
    }

    return parseModifierExpression();
  }

  function parseModifierExpression() {
    let expression = parsePrimaryExpression();
    let token = peek();

    while (['!', '%'].includes(token)) {
      consume();

      expression = {
        type: token,
        of: expression,
      };

      token = peek();
    }

    return expression;
  }

  function parsePrimaryExpression() {
    const token = peek();

    if (isNumber(token)) {
      consume();

      return {
        type: 'number',
        value: token,
      };
    } else if (isConstant(token)) {
      consume();

      return {
        type: 'constant',
        value: token,
      };
    } else if (isFunction(token)) {
      consume();

      if (peek() !== '(') {
        throw new SyntaxError(`Unexpected token ${peek()}, expected "(".`);
      }

      consume();

      if (peek() === ')') {
        consume();

        return {
          type: 'function',
          value: token,
          args: [],
        };
      }

      const arg = parseExpression();
      const args = [arg];

      while (peek() === ',') {
        consume();
        args.push(parseExpression());
      }

      const expression = {
        type: 'function',
        value: token,
        args,
      };

      if (peek() !== ')') {
        throw new SyntaxError(`Unexpected token ${peek()}, expected ")".`);
      }

      consume();

      return expression;
    } else if (token === '(') {
      consume();

      const expression = parseExpression();

      if (peek() !== ')') {
        throw new SyntaxError(
          `Unexpected token "${token}", expected a closing parenthesis.`
        );
      }

      consume();

      return {
        type: 'group',
        expression,
      };
    } else if (token === '|') {
      consume();

      const expression = parseExpression();

      if (peek() !== '|') {
        throw new SyntaxError(
          `Unexpected token "${token}", expected a closing parenthesis.`
        );
      }

      consume();

      return {
        type: 'absolute',
        of: expression,
      };
    } else if (token === 'ans') {
      consume();

      return {
        type: 'ans',
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

  function peek() {
    return tokens[position];
  }
}

function isNumber(token) {
  return token && !isNaN(parseFloat(token));
}

function isConstant(token) {
  return token && Boolean(constants[token.toLowerCase()]);
}

function isFunction(token) {
  return token && Boolean(functions[token.toLowerCase()]);
}
