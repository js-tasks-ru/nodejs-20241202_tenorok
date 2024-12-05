export default function sum(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Arguments should be numbers");
  }

  return a + b;
}
