const map = new Map();
// map.set(4, "IV");
map.set(100, "C");
map.set(50, "L");
map.set(10, "X");
map.set(5, "V");
map.set(1, "I");

function convert(number: number): string {
  for (const key of map.keys()) {
    if (number >= key) {
      return map.get(key) + convert(number - key);
    }
  }
  return "";
}

describe("int to romain converter", () => {
  it("Should convert plain symbols", () => {
    expect(convert(1)).toEqual("I");
    expect(convert(5)).toEqual("V");
    expect(convert(10)).toEqual("X");
    expect(convert(50)).toEqual("L");
    expect(convert(100)).toEqual("C");
  });
  it("Should convert 2 to II", () => {
    expect(convert(2)).toEqual("II");
  });
  it("Should convert 3 to III", () => {
    expect(convert(3)).toEqual("III");
  });
  it("Should convert 6 to VI", () => {
    expect(convert(6)).toEqual("VI");
  });
  it("Should convert 8 to VIII", () => {
    expect(convert(8)).toEqual("VIII");
  });
  it("Should convert 11 to XI", () => {
    expect(convert(11)).toEqual("XI");
  });
  it("Should convert 30 to XXX", () => {
    expect(convert(30)).toEqual("XXX");
  });
  it("Should convert 37 to XXXVII", () => {
    expect(convert(37)).toEqual("XXXVII");
  });
  // TODO
  it.skip("Should convert 4 to IV", () => {
    expect(convert(4)).toEqual("IV");
  });
  it.skip("Should convert 9 to IX", () => {
    expect(convert(9)).toEqual("IX");
  });
});
