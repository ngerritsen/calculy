import { terser } from "rollup-plugin-terser";

export default {
  input: "lib/index.js",
  output: [
    {
      file: "dist/calculy.min.js",
      format: "iife",
      name: "Calculy",
      plugins: [terser()],
    },
  ],
};
