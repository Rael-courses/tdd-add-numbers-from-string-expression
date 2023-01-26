export interface ICalculator {
  add(input: string): number;
}

export default class Calculator implements ICalculator {
  private static readonly MAX_LIMIT = 1000;
  private static readonly DEFAULT_SEPARATORS = ["\n", ","];
  private readonly customSeparatorsRegExp = /^\/\/([^0-9]+)\n/g;

  public add(input: string): number {
    if (!input) return 0;

    const customSeparators = this.customSeparatorsRegExp.exec(input)?.[1];
    const separatorsRegExp = this.buildSeparatorsRegExp(customSeparators);

    const numbersExpression = customSeparators
      ? input.replace(`//${customSeparators}\n`, "")
      : input;

    this.validNumbersExpression(numbersExpression, separatorsRegExp);

    const numbers = numbersExpression
      .split(new RegExp(`${separatorsRegExp}`))
      .map((strNumber) => Number(strNumber));

    return this.getSum(numbers);
  }

  private buildSeparatorsRegExp(separators?: string): string {
    let separator = "";
    if (!separators) {
      return Calculator.DEFAULT_SEPARATORS.join("|");
    }
    return separators
      .split("")
      .reduce((accumulator, char) => {
        if (separator.includes(char)) {
          separator += char;
          accumulator[accumulator.length - 1] = this.escapeRegExp(separator);
          return accumulator;
        }
        separator = char;
        accumulator.push(this.escapeRegExp(separator));
        return accumulator;
      }, [] as string[])
      .join("|");
  }

  private escapeRegExp(input: string) {
    return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  private validNumbersExpression(
    numbersExpression: string,
    regExpSeparators: string
  ) {
    const validInputRegExp = new RegExp(`^(\-?[0-9]+(${regExpSeparators})?)+$`);
    const isInputInvalid = !validInputRegExp.test(numbersExpression);
    if (isInputInvalid) {
      throw new Error("Malformed input");
    }
  }

  private getSum(numbers: number[]) {
    const negativeNumbers: number[] = [];

    const sum = numbers.reduce((accumulator, number) => {
      if (number < 0) {
        negativeNumbers.push(number);
        return accumulator;
      }
      if (number > Calculator.MAX_LIMIT) return accumulator;
      return accumulator + number;
    }, 0);

    if (negativeNumbers.length) {
      throw new Error(
        `Negative numbers are not allowed, but the input contains: ${negativeNumbers.join(
          ","
        )}`
      );
    }

    return sum;
  }
}
