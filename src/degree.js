export default function degree(func) {
  return (...args) => func(...args.map(toRad));
}

function toRad(deg) {
  return (deg / 180) * Math.PI;
}
