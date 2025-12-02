function conway(input: string) {
  let currentValue = input.at(0)!;
  let result = "";
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === currentValue) {
      count++;
      continue;
    }
    result += count + currentValue;
    currentValue = input.at(i)!;
    count = 1;
  }
  result += count + currentValue;
  return result;
}

describe("Conway", () => {
  it("test 1", () => {
    expect(conway("1")).toEqual("11");
  });
  it("test 11", () => {
    expect(conway("11")).toEqual("21");
  });
  it("test 21", () => {
    expect(conway("21")).toEqual("1211");
  });
  it("test 1211", () => {
    expect(conway("1211")).toEqual("111221");
  });

  // Cas d'erreur:
  // test tequilla
});
