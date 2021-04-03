import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

const tsNoDeclaration = {
  compilerOptions: {
    declaration: false,
  },
};

export default [
  {
    input: "src/index.ts",
    output: {
      file: "lib/index.js",
      exports: "named",
      format: "cjs",
    },
    plugins: [typescript({ useTsconfigDeclarationDir: true }), terser()],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/calculy.min.js",
      format: "iife",
      exports: "named",
      name: "Calculy",
    },
    plugins: [
      typescript({
        tsconfigOverride: tsNoDeclaration,
      }),
      terser(),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/calculy.js",
      format: "iife",
      exports: "named",
      name: "Calculy",
    },
    plugins: [
      typescript({
        tsconfigOverride: tsNoDeclaration,
      }),
    ],
  },
];
