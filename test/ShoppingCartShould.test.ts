import { ShoppingCart } from "../src/Field/ShoppingCart";

describe("shopping cart", () => {
  let cart: ShoppingCart;
  beforeEach(() => (cart = new ShoppingCart()));

  it("calculates the initial price", () => {
    expect(cart.calculateTotalPrice()).toBe(0);
  });
  it("calculates the final price", () => {
    cart.add(10);
    cart.add(20, 7);

    expect(cart.calculateTotalPrice()).toBe(37);
  });

  it("knows the number of items", () => {
    cart.add(10);
    cart.add(10);

    expect(cart.numberOfProducts()).toBe(2);
  });

  it("initial number of items", () => {
    expect(cart.numberOfProducts()).toBe(0);
  });

  it("may offer discounts when there is at least one expensive product", () => {
    cart.add(10);
    cart.add(120);
    cart.add(100);

    expect(cart.hasDiscount()).toBeTruthy();
  });

  it("does not offer discount for cheap products", () => {
    cart.add(10);
    cart.add(12);
    cart.add(100);
    expect(cart.hasDiscount()).toBeFalsy();
  });
});
