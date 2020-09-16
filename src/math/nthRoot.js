export default function nthRoot(num, n = 2) {
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
