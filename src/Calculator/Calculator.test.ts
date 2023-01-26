import Calculator, { ICalculator } from "./Calculator";

describe("Calculator", () => {
  describe("add", () => {
    it("should return 0 when empty string is provided", () => {
      // arrange
      const input = "";
      const calculator: ICalculator = new Calculator();

      // act
      const result = calculator.add(input);

      // assert
      expect(result).toEqual(0);
    });

    it("should return the number in the provided string", () => {
      // arrange
      const input = "1";
      const calculator: ICalculator = new Calculator();

      // act
      const result = calculator.add(input);

      // assert
      expect(result).toEqual(1);
    });

    it("should return the sum of any numbers in the provided string when the separator is `,`", () => {
      // arrange
      const input = "1,2,5";
      const calculator: ICalculator = new Calculator();

      // act
      const result = calculator.add(input);

      // assert
      expect(result).toEqual(8);
    });

    it("should return the sum of any numbers in the provided string when the separator is `\\n`", () => {
      // arrange
      const input = "1\n2,5";
      const calculator: ICalculator = new Calculator();

      // act
      const result = calculator.add(input);

      // assert
      expect(result).toEqual(8);
    });

    it("should throw when chaining multiple separators", () => {
      // arrange
      const input = "1,\n2";
      const calculator: ICalculator = new Calculator();

      // act
      const action = () => calculator.add(input);

      // assert
      expect(action).toThrow();
    });

    it("should consider a custom separator to split numbers", () => {
      // arrange
      const input = "//;\n1;2";
      const calculator: ICalculator = new Calculator();

      // act
      const result = calculator.add(input);

      // assert
      expect(result).toEqual(3);
    });

    it("should ignore numbers greater than 1000", () => {
      // arrange
      const input = "1001,1000";
      const calculator: ICalculator = new Calculator();

      // act
      const result = calculator.add(input);

      // assert
      expect(result).toEqual(1000);
    });

    it("should throw for negatives numbers having the negatives in the error message", () => {
      // arrange
      const input = "-12,5,-3";
      const calculator: ICalculator = new Calculator();

      // act
      const action = () => calculator.add(input);

      // assert
      expect(action).toThrow(
        "Negative numbers are not allowed, but the input contains: -12,-3"
      );
    });

    it("should consider separator of any number of characters", () => {
      // arrange
      const input = "//:::\n1:::2:::5";
      const calculator: ICalculator = new Calculator();

      // act
      const result = calculator.add(input);

      // assert
      expect(result).toEqual(8);
    });

    it("should consider multiple separators of any number of characters", () => {
      // arrange
      const input = "//:::**\n1:::2**5";
      const calculator: ICalculator = new Calculator();

      // act
      const result = calculator.add(input);

      // assert
      expect(result).toEqual(8);
    });
  });
});
