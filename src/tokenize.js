export default function tokenize(code) {
  const regExp = /\s*([a-zA-Z]+|[0-9]+\.?(?:[0-9]+)?(?:(?:e(?:\+|-)(?:[0-9]+)))?|\S)\s*/g;
  const tokens = [];

  let match;

  do {
    match = regExp.exec(code);

    if (match !== null) {
      tokens.push(match[1]);
    }
  } while (match !== null);

  return tokens;
}
