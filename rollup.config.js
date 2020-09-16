import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'default',
    },
    {
      file: 'dist/calculy.min.js',
      format: 'iife',
      name: 'Calculy',
      plugins: [terser()],
    },
  ],
};
