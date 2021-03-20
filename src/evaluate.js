import getConstants from './constants';
import getFunctions from './functions';
import factorial from './math/factorial';

export default function evaluate(expression, options) {
  switch (expression.type) {
    case 'constant':
      return getConstants(options.constants)[expression.value.toLowerCase()];
    case 'number':
      return parseFloat(expression.value);
    case 'function':
      return getFunctions(options.deg)[expression.value](
        ...expression.args.map(evaluate)
      );
    case 'negative':
      return evaluate(expression.of, options) * -1;
    case 'absolute':
      return Math.abs(evaluate(expression.of, options));
    case 'group':
      return evaluate(expression.expression, options);
    case '^':
      return Math.pow(
        evaluate(expression.left, options),
        evaluate(expression.right, options)
      );
    case '*':
      return (
        evaluate(expression.left, options) * evaluate(expression.right, options)
      );
    case '/':
      return (
        evaluate(expression.left, options) / evaluate(expression.right, options)
      );
    case '+':
      return (
        evaluate(expression.left, options) + evaluate(expression.right, options)
      );
    case '-':
      return (
        evaluate(expression.left, options) - evaluate(expression.right, options)
      );
    case '!':
      return factorial(evaluate(expression.of, options));
    case '%':
      return evaluate(expression.of, options) / 100;
    default:
      throw new Error(`Unknown expression ${expression.type}`);
  }
}
