import { CalculatorService } from './calculator.service';

test('"1 + 1" should return 2', () => {
  const calculatorService = new CalculatorService();
  expect(calculatorService.solve('1 + 1')).toBe(2);
});

test('"4 * 5" should return 20', () => {
  const calculatorService = new CalculatorService();
  expect(calculatorService.solve('4 * 5')).toBe(20);
});

test('"1" should return 1', () => {
  const calculatorService = new CalculatorService();
  expect(calculatorService.solve('1')).toBe(1);
});

test('"asdf" should return null', () => {
  const calculatorService = new CalculatorService();
  expect(calculatorService.solve('asdf')).toBeNull();
});

test('"" should return null', () => {
  const calculatorService = new CalculatorService();
  expect(calculatorService.solve('')).toBeNull();
});

test('should calculate createdAt on append', () => {
  const origCalculation = { value: '1 + 2' };
  const calculatorService = new CalculatorService();
  calculatorService.addCalculation(origCalculation);
  const calculations = calculatorService.getLatestCalculations(1);
  expect(calculations[0].createdAt).not.toBeFalsy();
});

test('should return 10 calculations', () => {
  const calculatorService = new CalculatorService();
  for (let i = 0; i < 20; i++) {
    const origCalculation = { value: '1 + 2' };
    calculatorService.addCalculation(origCalculation);
  }
  expect(calculatorService.getLatestCalculations(10).length).toBe(10);
});

test('should return all calculations if less than 10', () => {
  const calculatorService = new CalculatorService();
  for (let i = 0; i < 5; i++) {
    const origCalculation = { value: '1 + 2' };
    calculatorService.addCalculation(origCalculation);
  }
  expect(calculatorService.getLatestCalculations(10).length).toBe(5);
});

test('calculation string should be destringed, \'"2+2"\' is still 4', () => {
  const calculatorService = new CalculatorService();
  expect(calculatorService.solve('"2 + 2"')).toBe(4);
});
