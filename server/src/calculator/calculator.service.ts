import { ICalculation } from './calculation.interface';

export class CalculatorService {
  private calculations: ICalculation[];

  constructor() {
    this.calculations = [];
  }

  getLatestCalculations(limit: number): ICalculation[] {
    // Sort by createdAt _descending_
    //  so the lastest can be sliced off the front
    const sorted = this.calculations.sort((c1, c2) => {
      if (c1.createdAt === c2.createdAt) {
        return 0;
      } else {
        return c1.createdAt < c2.createdAt ? 1 : -1;
      }
    });
    return sorted.slice(0, limit);
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

  appendCalculation(calculation: ICalculation): ICalculation[] {
    calculation.createdAt = calculation.createdAt
      ? calculation.createdAt
      : Date.now();
    this.calculations.push(calculation);
    return this.calculations;
  }
}
