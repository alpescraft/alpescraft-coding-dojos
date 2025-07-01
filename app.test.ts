class Article {
  price(price: number) {
    return new ArticleWithPrice(price);
  }

  quantity(quantity: number) {
    return new ArticleWithQuantity(quantity);
  }
}

class ArticleWithPrice {
  #price: number;

  constructor(price: number) {
    this.#price = price;
  }

  quantity(quantity: number) {
    return new ArticleWithPriceAndQuantity(this.#price, quantity);
  }
}

class ArticleWithQuantity {
  #quantity = 0;

  constructor(quantity: number) {
    this.#quantity = quantity;
  }

  price(price: number) {
    return new ArticleWithPriceAndQuantity(price, this.#quantity);
  }
}

class ArticleWithPriceAndQuantity {
  #price: number;
  #quantity: number;

  constructor(price: number, quantity: number) {
    this.#price = price;
    this.#quantity = quantity;
  }

  computedPrice() {
    return new ArticleWithPriceAndQuantityAndTax(
      this.#price,
      this.#quantity,
      0,
    ).computedPrice();
  }

  tax(tax: number) {
    return new ArticleWithPriceAndQuantityAndTax(
      this.#price,
      this.#quantity,
      tax,
    );
  }
}

class ArticleWithPriceAndQuantityAndTax {
  #price: number;
  #quantity: number;
  #tax = 0;

  constructor(price: number, quantity: number, tax: number) {
    this.#price = price;
    this.#quantity = quantity;
    this.#tax = tax;
  }

  computedPrice() {
    const totalPrice = this.#price * this.#quantity * (1 + this.#tax / 100);
    return `${totalPrice.toFixed(2)} €`;
  }
}

describe("kata", () => {
  it("should calculate simple price", () => {
    const article = new Article();
    const price = article.price(1.21).quantity(3).computedPrice();
    expect(price).toBe("3.63 €");
  });

  it("should calculate other simple price", () => {
    const article = new Article();
    const price = article.quantity(5).price(3.42).computedPrice();
    expect(price).toBe("17.10 €");
  });

  it("should calculate price with tax", () => {
    const article = new Article();
    const price = article.quantity(3).price(1.21).tax(5).computedPrice();
    expect(price).toBe("3.81 €");
  });
});
