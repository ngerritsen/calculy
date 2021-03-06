import { MathFunc } from "./types";

export default function validate(func: MathFunc, min = 1, max = min): MathFunc {
  return (...args: number[]) => {
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
