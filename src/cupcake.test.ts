class Cupcake {
  name() {
    return "🧁";
  }
}

class Cookie {
  private hasChocolate: boolean = false;
  private hasNuts: boolean = false;
  name() {
    if (this.hasChocolate) {
      return "🍪 with 🍫";
    }
    if (this.hasNuts) {
      return "🍪 with 🥜";
    }
    return "🍪";
  }

  withChocolate() {
    this.hasChocolate = true;
    return this;
  }

  withNuts() {
    this.hasNuts = true;
    return this;
  }
}
describe("Cakes", function () {
  describe("Cupcakes", function () {
    it("I am a Cupcake", () => {
      const cupcake: Cupcake = new Cupcake();
      expect(cupcake.name()).toEqual("🧁");
    });
  });

  describe("Cookies", function () {
    it("I am a cookie", () => {
      const cookie: Cookie = new Cookie();
      expect(cookie.name()).toEqual("🍪");
    });

    it("I am a cookie with chocolate", () => {
      const cookieWithChocolate: Cookie = new Cookie().withChocolate();
      expect(cookieWithChocolate.name()).toEqual("🍪 with 🍫");
    });
    it("I am a cookie with nuts", () => {
      const cookieWithNuts: Cookie = new Cookie().withNuts();
      expect(cookieWithNuts.name()).toEqual("🍪 with 🥜");
    });
    xit("I am a cookie with chocolates and nuts");
  });
});
