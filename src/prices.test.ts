class Pricer {
  private _quantity: number;
  private _unitPrice: number;
  private _tax: number = 0;

  withQuantity = (quantity: number) => {
    this._quantity = quantity;
    return { withUnitPrice: this.withUnitPrice };
  };

  private withUnitPrice = (unitPrice: number) => {
    this._unitPrice = unitPrice;
    return {
      withTax: this.withTax,
      price: this.price,
    };
  };

  private price = () => {
    return `${(
      this._unitPrice *
      this._quantity *
      (1 + this._tax / 100)
    ).toFixed(2)} €`;
  };

  private withTax = (tax: number) => {
    this._tax = tax;
    return {
      price: this.price,
    };
  };
}

describe("Prices", function () {
  it("should compute price", function () {
    const price = new Pricer().withQuantity(3).withUnitPrice(1.21).price();
    expect(price).toEqual("3.63 €");
  });
  it("should compute price with taxes", function () {
    const price = new Pricer()
      .withQuantity(3)
      .withUnitPrice(1.21)
      .withTax(5)
      .price();
    expect(price).toEqual("3.81 €");
  });
  it("should not be able to call price() directly from new Pric", function () {});
});
