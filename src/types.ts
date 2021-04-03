export type MathFunc = (...args: number[]) => number;
export type Constants = Record<string, number>;
export type MathFuncs = Record<string, MathFunc>;

export type Options = {
  constants?: Constants;
  functions?: MathFuncs;
  deg?: boolean;
};

export enum ExpressionType {
  Add = "+",
  Subtract = "-",
  Multiply = "*",
  Divide = "/",
  Exponential = "^",
  Factorial = "!",
  Modulo = "%",
  Group = "group",
  Absolute = "absolute",
  Negative = "negative",
  Function = "function",
  Number = "number",
  Constant = "constant",
}

export type Expression =
  | PrimaryExpression
  | ModifierExpression
  | ValueExpression
  | FunctionExpression
  | GroupExpression;

export type PrimaryExpression = {
  type:
    | ExpressionType.Add
    | ExpressionType.Subtract
    | ExpressionType.Multiply
    | ExpressionType.Divide
    | ExpressionType.Exponential;
  left: Expression;
  right: Expression;
};

export type ModifierExpression = {
  type:
    | ExpressionType.Negative
    | ExpressionType.Absolute
    | ExpressionType.Modulo
    | ExpressionType.Factorial;
  of: Expression;
};

export type ValueExpression = {
  type: ExpressionType.Number | ExpressionType.Constant;
  value: string;
};

export type FunctionExpression = {
  type: ExpressionType.Function;
  value: string;
  args: Expression[];
};

export type GroupExpression = {
  type: ExpressionType.Group;
  expression: Expression;
};
