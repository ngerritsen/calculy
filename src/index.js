import evaluate from './evaluate';
import parse from './parse';
import tokenize from './tokenize';

const defaultOptions = { ans: 0, deg: false };

const calculy = {
  /**
   * @param {string} code
   * @param {Object} [options]
   * @param {number} [options.ans=0]
   * @param {bool}   [options.deg=false]
   * @returns {number}
   */
  evaluate(code, options) {
    if (!code.trim()) {
      return 0;
    }

    return evaluate(parse(tokenize(code)), {
      ...defaultOptions,
      ...options,
    });
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
