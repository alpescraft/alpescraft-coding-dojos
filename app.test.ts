abstract class Cake {
  private isWithChocolat = false;
  private isWithNuts = false;

  protected constructor(private readonly base: string) {}

  get name() {
    let name = this.base;
    if (this.isWithChocolat && this.isWithNuts) {
      name += " with 🍫 and 🥜";
    } else if (this.isWithChocolat) {
      name += " with 🍫";
    } else if (this.isWithNuts) {
      name += " with 🥜";
    }
    return name;
  }

  addChocolate() {
    this.isWithChocolat = true;
    return this;
  }

  addNuts() {
    this.isWithNuts = true;
    return this;
  }
}

class Cookie extends Cake {
  constructor() {
    super("🍪");
  }
}

class CupCake extends Cake {
  constructor() {
    super("🧁");
  }
}

describe("cakes", () => {
  it("simpleCookie", () => {
    const cake = new Cookie();
    expect(cake.name).toEqual("🍪");
  });
  it("simpleCupCake", () => {
    const cake = new CupCake();
    expect(cake.name).toEqual("🧁");
  });
  it("cupcakeWithChocolate", () => {
    const cake = new CupCake().addChocolate();
    expect(cake.name).toEqual("🧁 with 🍫");
  });
  it("cookieWithChocolate", () => {
    const cake = new Cookie().addChocolate();
    expect(cake.name).toEqual("🍪 with 🍫");
  });
  it("cookieWithChocolateAndNuts", () => {
    const cake = new Cookie().addChocolate().addNuts();
    expect(cake.name).toEqual("🍪 with 🍫 and 🥜");
  });
  it("cookieWithNuts", () => {
    const cake = new Cookie().addNuts();
    expect(cake.name).toEqual("🍪 with 🥜");
  });
});
