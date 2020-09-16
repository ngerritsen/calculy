const G = 7;
const P = [
  0.99999999999980993,
  676.5203681218851,
  -1259.1392167224028,
  771.32342877765313,
  -176.61502916214059,
  12.507343278686905,
  -0.13857109526572012,
  9.9843695780195716e-6,
  1.5056327351493116e-7,
];

const G_LN = 607 / 128;
const P_LN = [
  0.99999999999999709182,
  57.156235665862923517,
  -59.597960355475491248,
  14.136097974741747174,
  -0.49191381609762019978,
  0.33994649984811888699e-4,
  0.46523628927048575665e-4,
  -0.98374475304879564677e-4,
  0.15808870322491248884e-3,
  -0.21026444172410488319e-3,
  0.2174396181152126432e-3,
  -0.16431810653676389022e-3,
  0.84418223983852743293e-4,
  -0.2619083840158140867e-4,
  0.36899182659531622704e-5,
];

export default function factorial(num) {
  const absNum = Math.abs(num);

  if (Number.isInteger(absNum) && absNum < 100) {
    return factorialRecursive(absNum);
  }

  return gamma(absNum + 1);
}

/**
 * Classic recursive factorial
 */
function factorialRecursive(num) {
  if (num === 0) {
    return 1;
  }

  return factorialRecursive(num - 1) * num;
}

/**
 * Lanczos approximation
 */
function gamma(num) {
  if (num < 0.5) {
    return Math.PI / (Math.sin(Math.PI * num) * gamma(1 - num));
  } else if (num > 100) return Math.exp(lngamma(num));
  else {
    num -= 1;
    let x = P[0];
    for (let i = 1; i < G + 2; i++) {
      x += P[i] / (num + i);
    }
    const t = num + G + 0.5;

    return Math.sqrt(2 * Math.PI) * Math.pow(t, num + 0.5) * Math.exp(-t) * x;
  }
}

/**
 * Spouge approximation (For large numbers)
 */
function lngamma(num) {
  if (num < 0) return Number('0/0');
  let x = P_LN[0];
  for (let i = P_LN.length - 1; i > 0; --i) x += P_LN[i] / (num + i);
  const t = num + G_LN + 0.5;
  return (
    0.5 * Math.log(2 * Math.PI) +
    (num + 0.5) * Math.log(t) -
    t +
    Math.log(x) -
    Math.log(num)
  );
}
