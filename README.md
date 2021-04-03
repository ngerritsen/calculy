# Calculy

Lightweight, zero dependency calculator engine.

_Only ≈2kB min + gzipped! ✨_

## Installation

```
npm install calculy
```

## Usage

```js
import calculy from "calculy";

calculy.evaluate("1+2(3!)^2"); // 73
calculy.evaluate("ans*2", { constants: { ans: 3 } }); // 6
calculy.evaluate("ans^x", { constants: { ans: 3, x: 2 } }); // 9
calculy.evaluate("cos(90)"); // -0.44807361612
calculy.evaluate("cos(90)", { deg: true }); // 0
```

You can also directly include `./dist/calculy.min.js` from the npm package. This will make calculy available as the global variable `Calculy`.

## Syntax

Calculy supports most basic algebra that you would need for regular calculations.

### Addition & Substraction

`2+2` = 4

`2-2` = 0

### Multiplication & Division

`2*2` = 4

`1/2` = 0.5

### Exponents

`2^2` = 4

### Grouping

`2^(2+1)` = 8

`4*5-2^2-3` = 1

### Constants

`e` ≈ 2.718281828459045

`π` or `pi` ≈ 3.141592653589793

`φ` or `phi` ≈ 1.618033988749895

`τ ` or `tau` ≈ 6.283185307179586

### Custom constants

`ans*2` = 3 (if the provided constant `ans` is 3)
`x^2` = 16 (if the provided constant `x` is 4)

### Shorthand multiplication

`2pi` ≈ 6.283185307179586

`(4-2)(3-4)` = -2

`3(4-2)^2` = 12

### Percentages

`50%` = 0.5

`-200%` = -2

### Big number notation

`2.5e+6 ` = 2500000

`2.5e-3 ` = 0.0025

### Absolute

`|-3|` = 3

`|(2*2-6)|` = 2

### Factorials

`5!` = 5

`0.5!` ≈ 0.8862269254527586

### Roots

`√(9)` or `√(9, 2)` or `sqrt(9)` = 3

`√(27, 3)` or `cbrt(27)` = 3

`√(81, 4)` = 3

### Logarithms

`log(100)` or `log(100, 10)` = 2

`log(8, 2)` = 3

`ln(e)` or `log(e, e)` = 3

### Trigonometry

`sin(pi/2)` = 1

`cos(2pi)` = 1

`tan(pi/4)` ≈ 1

`asin(0.5)` ≈ 0.5235987755982989

`acos(0.5)` ≈ 1.0471975511965979

`atan(0.5)` ≈ 0.4636476090008061

### Other functions

`rand()` = random number between 0 and 1

`rand(2)` = random number between 0 and 2

`rand(2, 5)` = random number between 2 and 5

`round(2.6)` = 3

`floor(2.6)` = 2

`ceil(2.2)` = 3

`ceil(2.2)` = 3

## API

## `calculy.evaluate(code: string, [options: Object]) => Number`

Will execute the math and give the answer. Can throw a `SyntaxError`.

### Options

- `constants`: Custom constants (`Object.<number>`), will override default constants with same name. (default: `{}`)
- `deg`: Whether to use degrees instead instead of radians for trigonometry functions. (default: `false`)

## `calculy.parse(code: string, [options: Object]) => Object`

Will return the raw AST, useful for custom evaluation. Can throw a `SyntaxError`.

## `calculy.tokenize(code: string) => string[]`

Will return a list of the tokens that calculy parses. Can come in handy for input validation/formatting.
