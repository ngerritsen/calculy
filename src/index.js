import evaluate from './evaluate';
import parse from './parse';
import tokenize from './tokenize';

/**
 * @typedef   {Object}          Options
 * @property  {Object.<number>} [options.constants]
 * @property  {boolean}         [options.deg]
 */

const calculy = {
  /**
   * @param {string}   code
   * @param {Options}  [options]
   * @returns {number}
   */
  evaluate(code, options = {}) {
    if (!code.trim()) {
      return 0;
    }

    return evaluate(this.parse(code, options), options);
  },
  /**
   * @param {string}   code
   * @param {Options}  [options]
   * @returns {Object}
   */
  parse(code, options) {
    return parse(tokenize(code), options);
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
