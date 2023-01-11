class Cake {
  constructor(private readonly base: "🍪" | "🧁") {}

  private toppings = [];

  name() {
    if (this.toppings.length > 0) {
      return this.base + " with " + this.toppings.join(" and ");
    }
    return this.base;
  }

  withChocolate() {
    this.toppings.push("🍫");
    return this;
  }

  withNuts() {
    this.toppings.push("🥜");
    return this;
  }
}

function makeCupcake() {
  return new Cake("🧁");
}

function makeCookie() {
  return new Cake("🍪");
}

describe("Cakes", function () {
  describe("Cupcakes", function () {
    it("I am a Cupcake", () => {
      const cupcake = makeCupcake();
      expect(cupcake.name()).toEqual("🧁");
    });

    it("I am a Cupcake with nuts and chocolates", () => {
      const cupcakeWithNutsAndChocolate = makeCupcake()
        .withNuts()
        .withChocolate();
      expect(cupcakeWithNutsAndChocolate.name()).toEqual("🧁 with 🥜 and 🍫");
    });
  });

  describe("Cookies", function () {
    it("I am a cookie", () => {
      const cookie = makeCookie();
      expect(cookie.name()).toEqual("🍪");
    });

    it("I am a cookie with chocolate", () => {
      const cookieWithChocolate = makeCookie().withChocolate();
      expect(cookieWithChocolate.name()).toEqual("🍪 with 🍫");
    });
    it("I am a cookie with nuts", () => {
      const cookieWithNuts = makeCookie().withNuts();
      expect(cookieWithNuts.name()).toEqual("🍪 with 🥜");
    });
    it("I am a cookie with nuts and chocolates", () => {
      const cookieWithNutsAndChocolate = makeCookie()
        .withNuts()
        .withChocolate();
      expect(cookieWithNutsAndChocolate.name()).toEqual("🍪 with 🥜 and 🍫");
    });
    it("I am a cookie with chocolates and nuts", () => {
      const cookieWithNutsAndChocolate = makeCookie()
        .withChocolate()
        .withNuts();
      expect(cookieWithNutsAndChocolate.name()).toEqual("🍪 with 🍫 and 🥜");
    });
  });
});
