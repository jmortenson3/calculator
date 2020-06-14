import { ICalculation } from './calculation.interface';

export class CalculatorService {
  private calculations: ICalculation[];

  constructor() {
    this.calculations = [];
  }

  getLatestCalculations(limit: number): ICalculation[] {
    // could use Array.pop(), but just in case
    this.calculations = this.calculations.slice(0, limit);
    return this.calculations;
  }

  solve(calculationAsStrign: string): number {
    try {
      if (calculationAsStrign) {
        const cleansedCalculation = calculationAsStrign
          .replace(/\"/g, '')
          .replace(/\'/g, '');
        console.log(cleansedCalculation);
        // This will try to solve the calculation
        //  throws an error if invalid format
        const solution = new Function('return ' + cleansedCalculation)();
        return solution;
      }
      return null;
    } catch (err) {
      return null;
    }
  }

  addCalculation(calculation: ICalculation): void {
    calculation.createdAt = calculation.createdAt
      ? calculation.createdAt
      : Date.now();
    this.calculations.unshift(calculation);
  }
}
