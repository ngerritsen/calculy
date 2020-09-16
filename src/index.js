import evaluate from './evaluate';
import parse from './parse';
import tokenize from './tokenize';

const calculy = {
  /**
   * @param {string} code
   * @param {number} [ans=0]
   * @returns {number}
   */
  evaluate(code, ans = 0) {
    if (!code.trim()) {
      return 0;
    }

    return evaluate(parse(tokenize(code)), ans);
  },
  /**
   * @param {string} code
   * @returns {Object}
   */
  parse(code) {
    return parse(tokenize(code));
  },
  /**
   * @param {string} code
   * @returns {string[]}
   */
  tokenize(code) {
    return tokenize(code);
  },
};

export default calculy;
