function getDiscountRate(price: number) {
  switch (true) {
    case price >= 5000:
      return 5;
    case price >= 1000:
      return 3;
    default:
      return 0;
  }
}

function applyDiscount(price: number) {
  const discountRate = getDiscountRate(price);
  return price * (1 - discountRate / 100);
}

function computePrice(
  quantity: number,
  unitPrice: number,
  tax: number,
): string {
  const price = applyDiscount(quantity * unitPrice * (1 + tax / 100));
  return `${price.toFixed(2)} €`;
}

describe("calcul des prix", () => {
  it("should handle (3 items) tax free", () => {
    // * HT : 3 articles à 1,21 € + 0 % ⇒ “3.63 €”
    const price = computePrice(3, 1.21, 0);
    expect(price).toEqual("3.63 €");
  });
  it("should handle (6 items) tax free", () => {
    const price = computePrice(6, 1.21, 0);
    expect(price).toEqual("7.26 €");
  });
  it("should handle a 5% tax with rounding down to 2 digits", () => {
    // TTC 5% : 3 articles à 1,21 € + 5 % ⇒ “3.81 €”
    const price = computePrice(3, 1.21, 5);
    expect(price).toEqual("3.81 €");
  });
  it("should handle a 20% tax with rounding up", () => {
    // TTC 20%: 3 articles à 1,21 € +20 % ⇒ “4.36 €”
    const price = computePrice(3, 1.21, 20);
    expect(price).toEqual("4.36 €");
  });
  it("should handle a 3% discount when total >= 1000", () => {
    // 1000 € → Remise 3% : 5 x 345,00 € + taxe 10% → “1840.58 €”
    const price = computePrice(5, 345, 10);
    expect(price).toEqual("1840.58 €");
  });
  it("should handle a 5% discount when total >= 5000", () => {
    // 5000 € → Remise 5% : 5 x 1299,00 € + taxe 10% → “6787.28 €”
    const price = computePrice(5, 1299, 10);
    expect(price).toEqual("6787.28 €");
  });
});
