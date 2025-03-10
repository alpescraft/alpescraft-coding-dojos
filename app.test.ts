function isAllUpperCase(name: string | null) {
  return name?.toUpperCase() === name;
}

const greet = (name: string | null | string[]) => {
  if (Array.isArray(name)) {
    if (name.length > 2) {
      const res = new Intl.ListFormat("fr", {
        type: "conjunction",
      }).format(name);
      return "Bonjour " + res + ".";
    }
    return `Bonjour ${name[0]} et ${name[1]}.`;
  }
  if (isAllUpperCase(name)) {
    return `BONJOUR ${name}!`;
  }
  return `Bonjour ${name ?? "mon ami"}.`;
};

describe("Greeting Kata", () => {
  it("should say hello to a folk", () => {
    const name = "Bob";
    expect(greet(name)).toEqual("Bonjour Bob.");
  });
  it("should say hello to my friend if I have none", () => {
    const name = null;
    expect(greet(name)).toEqual("Bonjour mon ami.");
  });
  it("should follow the input casing", () => {
    expect(greet("JERRY")).toEqual("BONJOUR JERRY!");
    expect(greet("LEE")).toEqual("BONJOUR LEE!");
  });
  it("should handle two names", () => {
    const names = ["Jill", "Jane"];
    expect(greet(names)).toEqual("Bonjour Jill et Jane.");
  });
  it("should handle multiple names", () => {
    const names = ["Amy", "Brian", "Charlotte"];
    expect(greet(names)).toEqual("Bonjour Amy, Brian et Charlotte.");
  });
});
