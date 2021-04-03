import getConstants from "./constants";
import getFunctions from "./functions";
import factorial from "./math/factorial";
import { Expression, ExpressionType, Options } from "./types";

export default function evaluate(
  expression: Expression,
  options: Options
): number {
  switch (expression.type) {
    case ExpressionType.Constant:
      return getConstants(options.constants)[expression.value.toLowerCase()];
    case ExpressionType.Number:
      return parseFloat(expression.value);
    case ExpressionType.Function:
      return getFunctions(options.deg)[expression.value](
        ...expression.args.map((arg) => evaluate(arg, options))
      );
    case ExpressionType.Negative:
      return evaluate(expression.of, options) * -1;
    case ExpressionType.Absolute:
      return Math.abs(evaluate(expression.of, options));
    case ExpressionType.Group:
      return evaluate(expression.expression, options);
    case ExpressionType.Exponential:
      return Math.pow(
        evaluate(expression.left, options),
        evaluate(expression.right, options)
      );
    case ExpressionType.Multiply:
      return (
        evaluate(expression.left, options) * evaluate(expression.right, options)
      );
    case ExpressionType.Divide:
      return (
        evaluate(expression.left, options) / evaluate(expression.right, options)
      );
    case ExpressionType.Add:
      return (
        evaluate(expression.left, options) + evaluate(expression.right, options)
      );
    case ExpressionType.Subtract:
      return (
        evaluate(expression.left, options) - evaluate(expression.right, options)
      );
    case ExpressionType.Factorial:
      return factorial(evaluate(expression.of, options));
    case ExpressionType.Modulo:
      return evaluate(expression.of, options) / 100;
    default:
      throw new Error(`Unknown expression ${(expression as Expression).type}`);
  }
}
