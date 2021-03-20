const GOLDEN_RATION = (1 + Math.sqrt(5)) / 2;
const TAU = Math.PI * 2;

const constants = {
  τ: TAU,
  φ: GOLDEN_RATION,
  e: Math.E,
  phi: GOLDEN_RATION,
  pi: Math.PI,
  tau: TAU,
  π: Math.PI,
};

export default function getConstants(custom) {
  return {
    ...constants,
    ...custom,
  };
}
