const GOLDEN_RATION = (1 + Math.sqrt(5)) / 2;
const TAU = Math.PI * 2;

var constants = {
  τ: TAU,
  φ: GOLDEN_RATION,
  e: Math.E,
  phi: GOLDEN_RATION,
  pi: Math.PI,
  tau: TAU,
  π: Math.PI,
};

function log(num, base = 10) {
  switch (base) {
    case 2:
      return Math.log2(num);
    case 10:
      return Math.log10(num);
    case Math.E:
      return Math.log(num);
    default:
      return Math.log10(num) / Math.log10(base);
  }
}

function random(a, b) {
  const min = b === undefined ? 0 : a;
  const max = b === undefined ? a || 0 : b;

  return Math.random() * (max - min) + min;
}

function nthRoot(num, n = 2) {
  if (n === 2) {
    return Math.sqrt(num);
  }

  if (n === 3) {
    return Math.cbrt(num);
  }

  if (num < 0 && n % 2 != 1) {
    return NaN;
  }

  return (num < 0 ? -1 : 1) * Math.pow(Math.abs(num), 1 / n);
}

var functions = {
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

const G = 7;
const P = [
  0.99999999999980993,
  676.5203681218851,
  -1259.1392167224028,
  771.32342877765313,
  -176.61502916214059,
  12.507343278686905,
  -0.13857109526572012,
  9.9843695780195716e-6,
  1.5056327351493116e-7,
];

const G_LN = 607 / 128;
const P_LN = [
  0.99999999999999709182,
  57.156235665862923517,
  -59.597960355475491248,
  14.136097974741747174,
  -0.49191381609762019978,
  0.33994649984811888699e-4,
  0.46523628927048575665e-4,
  -0.98374475304879564677e-4,
  0.15808870322491248884e-3,
  -0.21026444172410488319e-3,
  0.2174396181152126432e-3,
  -0.16431810653676389022e-3,
  0.84418223983852743293e-4,
  -0.2619083840158140867e-4,
  0.36899182659531622704e-5,
];

function factorial(num) {
  const absNum = Math.abs(num);

  if (Number.isInteger(absNum) && absNum < 100) {
    return factorialRecursive(absNum);
  }

  return gamma(absNum + 1);
}

/**
 * Classic recursive factorial
 */
function factorialRecursive(num) {
  if (num === 0) {
    return 1;
  }

  return factorialRecursive(num - 1) * num;
}

/**
 * Lanczos approximation
 */
function gamma(num) {
  if (num < 0.5) {
    return Math.PI / (Math.sin(Math.PI * num) * gamma(1 - num));
  } else if (num > 100) return Math.exp(lngamma(num));
  else {
    num -= 1;
    let x = P[0];
    for (let i = 1; i < G + 2; i++) {
      x += P[i] / (num + i);
    }
    const t = num + G + 0.5;

    return Math.sqrt(2 * Math.PI) * Math.pow(t, num + 0.5) * Math.exp(-t) * x;
  }
}

/**
 * Spouge approximation (For large numbers)
 */
function lngamma(num) {
  if (num < 0) return Number('0/0');
  let x = P_LN[0];
  for (let i = P_LN.length - 1; i > 0; --i) x += P_LN[i] / (num + i);
  const t = num + G_LN + 0.5;
  return (
    0.5 * Math.log(2 * Math.PI) +
    (num + 0.5) * Math.log(t) -
    t +
    Math.log(x) -
    Math.log(num)
  );
}

function evaluate(expression, ans = 0) {
  switch (expression.type) {
    case 'constant':
      return constants[expression.value.toLowerCase()];
    case 'number':
      return parseFloat(expression.value);
    case 'function':
      return functions[expression.value](...expression.args.map(evaluate));
    case 'negative':
      return evaluate(expression.of, ans) * -1;
    case 'absolute':
      return Math.abs(evaluate(expression.of, ans));
    case 'group':
      return evaluate(expression.expression, ans);
    case 'ans':
      return ans;
    case '^':
      return Math.pow(
        evaluate(expression.left, ans),
        evaluate(expression.right, ans)
      );
    case '*':
      return evaluate(expression.left, ans) * evaluate(expression.right, ans);
    case '/':
      return evaluate(expression.left, ans) / evaluate(expression.right, ans);
    case '+':
      return evaluate(expression.left, ans) + evaluate(expression.right, ans);
    case '-':
      return evaluate(expression.left, ans) - evaluate(expression.right, ans);
    case '!':
      return factorial(evaluate(expression.of, ans));
    case '%':
      return evaluate(expression.of, ans) / 100;
    default:
      throw new Error(`Unknown expression ${expression.type}`);
  }
}

function parse(tokens) {
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

function tokenize(code) {
  const regExp = /\s*([a-zA-Z]+|[0-9]+\.?(?:[0-9]+)?(?:(?:e(?:\+|-)(?:[0-9]+)))?|\S)\s*/g;
  const tokens = [];

  let match;

  do {
    match = regExp.exec(code);

    if (match !== null) {
      tokens.push(match[1]);
    }
  } while (match !== null);

  return tokens;
}

const calculy = {
  /**
   * @param {string} code
   * @param {number} [ans=0]
   * @returns {number}
   */
  evaluate(code, ans = 0) {
    if (!code.trim()) {
      return 0;
    }

    return evaluate(parse(tokenize(code)), ans);
  },
  /**
   * @param {string} code
   * @returns {Object}
   */
  parse(code) {
    return parse(tokenize(code));
  },
  /**
   * @param {string} code
   * @returns {string[]}
   */
  tokenize(code) {
    return tokenize(code);
  },
};

export default calculy;
