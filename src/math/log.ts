export default function log(num: number, base = 10): number {
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
