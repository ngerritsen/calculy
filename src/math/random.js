export default function random(a, b) {
  const min = b === undefined ? 0 : a;
  const max = b === undefined ? a || 0 : b;

  return Math.random() * (max - min) + min;
}
