import constants from './constants';
import functions from './functions';
import factorial from './math/factorial';

export default function evaluate(expression, ans = 0) {
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
