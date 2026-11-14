import { describe, expect, it } from "vitest";
import { cartCount, cartTotal } from "./cart-math";

describe("cart", () => {
  it("total multiplies each price by its quantity", () => {
    expect(cartTotal([{ unit_price: 1290, quantity: 2 }, { unit_price: 449, quantity: 1 }])).toBe(3029);
  });
  it("empty cart totals 0 DH", () => {
    expect(cartTotal([])).toBe(0);
  });
  it("count adds up quantities, not lines", () => {
    expect(cartCount([{ quantity: 2 }, { quantity: 3 }])).toBe(5);
  });
});
