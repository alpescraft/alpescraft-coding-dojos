type Topping = "🍫";

type Toppings = Topping;
// Ecrit puis commenté pour aider à converger nos visions
// | `${Topping} and ${Topping}`
// | `${Topping}, ${Topping} and ${Topping}`;

type Base = "🍪" | "🧁";

type CakeWithoutToppings = { name: Base };
type CakeWithToppings = { name: `${Base} with ${Toppings}` };

type Cake = CakeWithoutToppings | CakeWithToppings;

function Cookie(): Cake {
  return {
    name: "🍪",
  };
}

function Cupcake(): Cake {
  return {
    name: "🧁",
  };
}

// Type guard qui aide bien 😉
function isCakeWithToppings(cake: Cake): cake is CakeWithToppings {
  return cake.name.includes("with");
}

function Chocolate(cake: Cake): Cake {
  if (isCakeWithToppings(cake)) {
    return cake;
  }
  return {
    name: `${cake.name} with 🍫`,
  };
}

describe("cake names", () => {
  describe("no toppings", () => {
    it("🍪", () => {
      const cake = Cookie();
      expect(cake.name).toBe("🍪");
    });
    it("🧁", () => {
      const cake = Cupcake();
      expect(cake.name).toBe("🧁");
    });
  });
  describe("with 🍫", () => {
    it("🍪", () => {
      const cake = Chocolate(Cookie());
      expect(cake.name).toBe("🍪 with 🍫");
    });
    it("🧁", () => {
      const cake = Chocolate(Cupcake());
      expect(cake.name).toBe("🧁 with 🍫");
    });
  });
});
