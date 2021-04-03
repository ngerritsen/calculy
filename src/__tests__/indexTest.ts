import { calculate } from "..";

test("Empty calculations", () => {
  expect(calculate("")).toBe(0);
  expect(calculate(" ")).toBe(0);
  expect(calculate(" 0 ")).toBe(0);
});

test("Basic math.", () => {
  expect(calculate("1 + 2")).toBe(3);
  expect(calculate("1 + 2 * 3")).toBe(7);
  expect(calculate("2^2")).toBe(4);
  expect(calculate("2*3^3")).toBe(54);
  expect(calculate("2*3^3")).toBe(54);
  expect(calculate("1 * 1.2 / 2")).toBe(0.6);
});

test("Grouping.", () => {
  expect(calculate("(1 + 2) * 3")).toBe(9);
});

test("Functions.", () => {
  expect(calculate("log(100)*2")).toBe(4);
  expect(calculate("ln(3)")).toBe(Math.log(3));
  expect(calculate("sin(3)")).toBe(Math.sin(3));
  expect(calculate("√(3)")).toBe(Math.sqrt(3));
  expect(calculate("tan(3)")).toBe(Math.tan(3));
  expect(calculate("cos(3)")).toBe(Math.cos(3));
  expect(calculate("cos(3)+3")).toBe(Math.cos(3) + 3);
});

test("Degree mode", () => {
  expect(calculate("cos(180)")).toBe(Math.cos(180));
  expect(calculate("cos(180)", { deg: true })).toBe(-1);
});

test("Logarithms.", () => {
  expect(calculate("log(1000)")).toBe(3);
  expect(calculate("log(8, 2)")).toBe(3);
  expect(calculate("log(64, 4)")).toBe(3);
});

test("Nth root.", () => {
  expect(calculate("nthroot(9)")).toBe(3);
  expect(calculate("nthroot(9, 2)")).toBe(3);
  expect(calculate("nthroot(64, 3)")).toBe(4);
  expect(calculate("nthroot(256, 4)")).toBe(4);
});

test("Negative numbers.", () => {
  expect(calculate("-2-2")).toBe(-4);
  expect(calculate("-2--2")).toBe(0);
  expect(calculate("-2+-2")).toBe(-4);
  expect(calculate("-e")).toBe(Math.E * -1);
  expect(calculate("-(2+2)")).toBe(-4);
  expect(calculate("-sin(3)")).toBe(Math.sin(3) * -1);
});

test("Factorial numbers.", () => {
  expect(calculate("0!")).toBe(1);
  expect(calculate("0.5!")).toBe(0.8862269254527586);
  expect(calculate("1!")).toBe(1);
  expect(calculate("2!")).toBe(2);
  expect(calculate("2+2!^2")).toBe(6);
  expect(calculate("2+(2+1)!^2")).toBe(38);
  expect(calculate("2.5!")).toBe(3.3233509704478426);
  expect(calculate("3!")).toBe(6);
  expect(calculate("102!")).toBe(9.61446671503399e161);
  expect(calculate("-2!")).toBe(-2);
});

test("Percentages.", () => {
  expect(calculate("0%")).toBe(0);
  expect(calculate("5%")).toBe(0.05);
  expect(calculate("105%")).toBe(1.05);
  expect(calculate("200%!")).toBe(2);
});

test("Combining modifiers", () => {
  expect(calculate("2!%")).toBe(0.02);
  expect(calculate("2!!")).toBe(2);
  expect(calculate("100%!!")).toBe(1);
});

test("Constants.", () => {
  expect(calculate("2 * pi")).toBe(2 * Math.PI);
  expect(calculate("π")).toBe(Math.PI);
  expect(calculate("2 * E")).toBe(2 * Math.E);
});

test("Implicit multiplications", () => {
  expect(calculate("(3+1)π")).toBe(4 * Math.PI);
  expect(calculate("2π")).toBe(2 * Math.PI);
  expect(calculate("2π%^e")).toBe(2 * Math.pow(Math.PI / 100, Math.E));
  expect(calculate("2%π")).toBe(0.02 * Math.PI);
  expect(calculate("-2%π")).toBe(-0.02 * Math.PI);
  expect(calculate("-2%π")).toBe(-0.02 * Math.PI);
  expect(calculate("(2*2)π")).toBe(4 * Math.PI);
  expect(calculate("2cos(pi)")).toBe(-2);
  expect(calculate("(2*2)(2*2)")).toBe(16);
  expect(calculate("-(2*2)(2*2)")).toBe(-16);
});

test("Absolute", () => {
  expect(calculate("|-2|")).toBe(2);
  expect(calculate("√(|-9|)")).toBe(3);
  expect(calculate("|-2*8-3|")).toBe(19);
});

test("Scientific big number notation.", () => {
  expect(calculate("5.2e+5")).toBe(520000);
  expect(calculate("5.2e-3")).toBe(0.0052);
  expect(calculate("5.2e-2-e")).toBe(0.052 - Math.E);
});

test("Custom constants.", () => {
  const constants = { ans: 2, x: 3, pi: 3.2 };

  expect(calculate("ans", { constants })).toBe(2);
  expect(calculate("x^ans", { constants })).toBe(9);
  expect(calculate("pi", { constants })).toBe(3.2);
});
