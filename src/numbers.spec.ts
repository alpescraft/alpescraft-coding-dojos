function convert(input: number) {
  const units = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const multipleOfTen = [
    undefined,
    undefined,
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  // TODO to refactor
  if (input === 100) {
    return "one hundred";
  }
  if (input === 101) {
    return "one hundred and one";
  }
  if (input === 102) {
    return "one hundred and two";
  }
  if (input >= units.length) {
    const tenPart = multipleOfTen[Math.floor(input / 10)];
    const unitPart = input % 10;
    if (unitPart !== 0) {
      return tenPart + "-" + units[unitPart];
    }
    return tenPart;
  }
  return units[input];
}

describe("numbers", function () {
  it.each([
    { input: 0, expected: "zero" },
    { input: 1, expected: "one" },
    { input: 2, expected: "two" },
    { input: 3, expected: "three" },
    { input: 4, expected: "four" },
    { input: 5, expected: "five" },
    { input: 6, expected: "six" },
    { input: 7, expected: "seven" },
    { input: 8, expected: "eight" },
    { input: 9, expected: "nine" },
    { input: 10, expected: "ten" },
    { input: 11, expected: "eleven" },
    { input: 12, expected: "twelve" },
  ])("should convert $input to $expected", function ({ input, expected }) {
    expect(convert(input)).toEqual(expected);
  });

  it.each([
    { input: 13, expected: "thirteen" },
    { input: 14, expected: "fourteen" },
    { input: 15, expected: "fifteen" },
    { input: 16, expected: "sixteen" },
    { input: 17, expected: "seventeen" },
    { input: 18, expected: "eighteen" },
    { input: 19, expected: "nineteen" },
  ])(
    "should convert teens : $input to $expected",
    function ({ input, expected }) {
      expect(convert(input)).toEqual(expected);
    }
  );

  it.each([
    { input: 20, expected: "twenty" },
    { input: 30, expected: "thirty" },
  ])(
    "should convert multiple of ten : $input to $expected",
    function ({ input, expected }) {
      expect(convert(input)).toEqual(expected);
    }
  );

  it.each([
    { input: 21, expected: "twenty-one" },
    { input: 22, expected: "twenty-two" },
    { input: 23, expected: "twenty-three" },
    { input: 29, expected: "twenty-nine" },
  ])(
    "should convert twenties : $input to $expected",
    function ({ input, expected }) {
      expect(convert(input)).toEqual(expected);
    }
  );

  it.each([
    { input: 31, expected: "thirty-one" },
    { input: 42, expected: "forty-two" },
    { input: 53, expected: "fifty-three" },
    { input: 64, expected: "sixty-four" },
    { input: 75, expected: "seventy-five" },
    { input: 86, expected: "eighty-six" },
    { input: 99, expected: "ninety-nine" },
  ])(
    "should convert various number below 100 : $input to $expected",
    function ({ input, expected }) {
      expect(convert(input)).toEqual(expected);
    }
  );
  it.each([
    { input: 100, expected: "one hundred" },
    { input: 101, expected: "one hundred and one" },
    { input: 102, expected: "one hundred and two" },
  ])(
    "should convert over 100 : $input to $expected",
    function ({ input, expected }) {
      expect(convert(input)).toEqual(expected);
    }
  );
});
