import { MathFunc } from "./types";

export default function degree(func: MathFunc): MathFunc {
  return (...args) => func(...args.map(toRad));
}

function toRad(deg: number): number {
  return (deg / 180) * Math.PI;
}
