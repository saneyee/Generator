import { TestBed, inject } from '@angular/core/testing';

import { GeneratorService } from './generator.service';
import { Variable } from '../variable';

describe('GenertorService and all of its methods', () => {
  let _generatorService: GeneratorService;

  beforeEach(() => {
    _generatorService = new GeneratorService();
    TestBed.configureTestingModule({
      providers: [GeneratorService]
    });
  });

  it('should be created', inject([GeneratorService], (_generatorService: GeneratorService) => {
    expect(_generatorService).toBeTruthy();
  }));

  it('should return 125 when calling generatePermutations(4 variables)', () => {
    const a = new Variable('a', 0, 1, 5);
    const b = new Variable('b', 0, 1, 5);
    const c = new Variable('c', 0, 1, 5);
    const x = new Variable('x', 0, -100, 100);
    const variables: Variable[] = [a, b, c, x];
    const generatedCombinations: any[] = _generatorService.generatePermutations(variables);
    expect(generatedCombinations.length).toBe(125);
  });

  it('should contain [1,1,1] when calling generatePermutations(4 variables)', () => {
    const a = new Variable('a', 0, 1, 5);
    const b = new Variable('b', 0, 1, 5);
    const c = new Variable('c', 0, 1, 5);
    const x = new Variable('x', 0, -100, 100);
    const variables: Variable[] = [a, b, c, x];

    const generatedCombinations: any[] = _generatorService.generatePermutations(variables);
    expect(generatedCombinations).toContain([1, 1, 1]);
  });

  it('should return 125 when calling generatePermutations(3 variables)', () => {
    const a = new Variable('a', 0, 1, 5);
    const b = new Variable('b', 0, 1, 5);
    const c = new Variable('c', 0, 1, 5);
    const x = new Variable('x', 0, -100, 100);
    const variables: Variable[] = [a, b, c, x];
    const generatedCombinations: any[] = _generatorService.generatePermutations(variables);
    expect(generatedCombinations.length).toBe(125);
  });

  it('should contain [1,1,1] when calling generatePermutations(3 variables)', () => {
    const a = new Variable('a', 0, 1, 5);
    const b = new Variable('b', 0, 1, 5);
    const c = new Variable('c', 0, 1, 5);
    const x = new Variable('x', 0, -100, 100);
    const variables: Variable[] = [a, b, c, x];
    const generatedCombinations: any[] = _generatorService.generatePermutations(variables);
    expect(generatedCombinations).toContain([1, 1, 1]);
  });

  it('should return 25 when calling generatePermutations(2 variables)', () => {
    const a = new Variable('a', 0, 1, 5);
    const b = new Variable('b', 0, 1, 5);
    const x = new Variable('x', 0, -100, 100);
    const variables: Variable[] = [a, b, x];
    const generatedCombinations: any[] = _generatorService.generatePermutations(variables);
    expect(generatedCombinations.length).toBe(25);
  });

  it('should contain [1,1] when calling generatePermutations(2 variables)', () => {
    const a = new Variable('a', 0, 1, 5);
    const b = new Variable('b', 0, 1, 5);
    const x = new Variable('x', 0, -100, 100);
    const variables: Variable[] = [a, b, x];
    const generatedCombinations: any[] = _generatorService.generatePermutations(variables);
    expect(generatedCombinations).toContain([1, 1]);
  });

  it('should return 5 when calling generatePermutations(1 variable)', () => {
    const a = new Variable('a', 0, 1, 5);
    const x = new Variable('x', 0, -100, 100);
    const variables: Variable[] = [a, x];
    const generatedCombinations: any[] = _generatorService.generatePermutations(variables);
    expect(generatedCombinations.length).toBe(5);
  });

  it('should contain [1] when calling generatePermutations(1 variables)', () => {
    const a = new Variable('a', 0, 1, 5);
    const x = new Variable('x', 0, -100, 100);
    const variables: Variable[] = [a, x];
    const generatedCombinations: any[] = _generatorService.generatePermutations(variables);
    expect(generatedCombinations).toContain([1]);
  });

  it('should return "[-a]" when calling simplifyEquation(equation, variableToSolve)', () => {
    const equation = 'x + a = 0';
    const variableToSolve: Variable = new Variable('x',  0, 0, 0);

    const simplifiedEquation: string = _generatorService.simplifyEquation(equation, variableToSolve.name);
    expect(simplifiedEquation.toString()).toBe('[-a]');
  });

  it('should return "[sqrt(-a), -sqrt(-a)]" when calling simplifyEquation(equation, variableToSolve)', () => {
    const equation = 'x^2 + a = 0';
    const variableToSolve: Variable = new Variable('x',  0, 0, 0);

    const simplifiedEquation: string = _generatorService.simplifyEquation(equation, variableToSolve.name);
    expect(simplifiedEquation.toString()).toBe('[sqrt(-a),-sqrt(-a)]');
  });

  it('should return "[(-220328269/832788672)*(27*a+27*abs(a))^(1/3),(220328269/1665577344)*((138907099/80198051)*i+1)*(27*a+27*abs(a))^(1/3),(220328269/1665577344)*((-138907099/80198051)*i+1)*(27*a+27*abs(a))^(1/3)]" when calling simplifyEquation(equation, variableToSolve)', () => {
    const equation = 'x^3 + a = 0';
    const variableToSolve: Variable = new Variable('x',  0, 0, 0);

    const simplifiedEquation: string = _generatorService.simplifyEquation(equation, variableToSolve.name);
    expect(simplifiedEquation.toString()).toBe('[(-220328269/832788672)*(27*a+27*abs(a))^(1/3),(220328269/1665577344)*((138907099/80198051)*i+1)*(27*a+27*abs(a))^(1/3),(220328269/1665577344)*((-138907099/80198051)*i+1)*(27*a+27*abs(a))^(1/3)]');
  });

  it('should return "[(1/2)*(-b+sqrt(-4*a*c+b^2))*a^(-1),(1/2)*(-b-sqrt(-4*a*c+b^2))*a^(-1)]" when calling simplifyEquation(equation, variableToSolve)', () => {
    const equation = 'a*x^2 + b*x + c = 0';
    const variableToSolve: Variable = new Variable('x',  0, 0, 0);

    const simplifiedEquation: string = _generatorService.simplifyEquation(equation, variableToSolve.name);
    expect(simplifiedEquation.toString()).toBe('[(1/2)*(-b+sqrt(-4*a*c+b^2))*a^(-1),(1/2)*(-b-sqrt(-4*a*c+b^2))*a^(-1)]');
  });

  it('should return a random intiger between 1-10 inclusive when calling getRandomIntInclusive(min, max)', () => {
    const radnomInt: number = _generatorService.getRandomIntInclusive(1, 10);
    expect(radnomInt >= 1 || radnomInt <= 10).toBe(true);
  });

  it('should splice a random permutation set 1 time when calling splicePermutationSetRandomly(permutationsList)  decreasing the permutationList count by 1', () => {
    const a = new Variable('a', 0, 1, 5);
    const b = new Variable('b', 0, 1, 5);
    const c = new Variable('c', 0, 1, 5);
    const x = new Variable('x', 0, -100, 100);
    const variables: Variable[] = [a, b, c, x];
    const permutationsList: any[] = _generatorService.generatePermutations(variables);

    _generatorService.splicePermutationSetRandomly(permutationsList);
    expect(permutationsList.length).toBe(124);
  });

  it('should splice a random permutation set 2 times when calling splicePermutationSetRandomly(permutationsList)  decreasing the permutationList count by 2', () => {
    const a = new Variable('a', 0, 1, 5);
    const b = new Variable('b', 0, 1, 5);
    const c = new Variable('c', 0, 1, 5);
    const x = new Variable('x', 0, -100, 100);
    const variables: Variable[] = [a, b, c, x];
    const permutationsList: any[] = _generatorService.generatePermutations(variables);

    _generatorService.splicePermutationSetRandomly(permutationsList);
    _generatorService.splicePermutationSetRandomly(permutationsList);
    expect(permutationsList.length).toBe(123);
  });

  it('should splice a random permutation set 3 times when calling splicePermutationSetRandomly(permutationsList) decreasing the permutationList count by 3', () => {
    const a = new Variable('a', 0, 1, 5);
    const b = new Variable('b', 0, 1, 5);
    const c = new Variable('c', 0, 1, 5);
    const x = new Variable('x', 0, -100, 100);
    const variables: Variable[] = [a, b, c, x];
    const permutationsList: any[] = _generatorService.generatePermutations(variables);

    _generatorService.splicePermutationSetRandomly(permutationsList);
    _generatorService.splicePermutationSetRandomly(permutationsList);
    _generatorService.splicePermutationSetRandomly(permutationsList);
    expect(permutationsList.length).toBe(122);
  });

  it('should create an object of {a: 1, b: 1, c: 1} when calling createVariablesObject()', () => {
    const a = new Variable('a', 0, 1, 5);
    const b = new Variable('b', 0, 1, 5);
    const c = new Variable('c', 0, 1, 5);
    const x = new Variable('x', 0, -100, 100);
    const variables: Variable[] = [a, b, c, x];
    const randomSet = [1, 1, 1];

    let variablesObject = _generatorService.createVariableObject(randomSet, variables);
    let variablesObjectArr = _generatorService.toArray(variablesObject);
    expect(variablesObjectArr[0][0]).toBe('a');
    expect(variablesObjectArr[0][1]).toBe(1);
    expect(variablesObjectArr[1][0]).toBe('b');
    expect(variablesObjectArr[1][1]).toBe(1);
    expect(variablesObjectArr[2][0]).toBe('c');
    expect(variablesObjectArr[2][1]).toBe(1);
  });

  it('should return -5 and 5 upon calling solveForVariable(randomSet, simplifiedEquation, variables)', () => {
    const a = new Variable('a', 0, 1, 5);
    const b = new Variable('b', 0, 1, 5);
    const c = new Variable('c', 0, 1, 5);
    const x = new Variable('x', 0, -100, 100);
    const variables: Variable[] = [a, b, c, x];

    const randomSet = [1, 0, 0];
    
    const simplifiedEquation = _generatorService.simplifyEquation('a*x^2 + b*x + c = 25', 'x');

    const result =  _generatorService.solveForVariable(randomSet, simplifiedEquation, variables);

    expect(result[0]).toBe('5');
    expect(result[1]).toBe('-5');
    expect(result.toString()).toBe('5,-5');
  });

  it('should return 2*i and -2*i upon calling solveForVariable(randomSet, simplifiedEquation, variables)', () => {
  const a = new Variable('a', 0, 1, 5);
    const b = new Variable('b', 0, 1, 5);
    const c = new Variable('c', 0, 1, 5);
    const x = new Variable('x', 0, -100, 100);
    const variables: Variable[] = [a, b, c, x];

    const randomSet = [1, 0, 0];
    
    const simplifiedEquation = _generatorService.simplifyEquation('a*x^2 + b*x + c = -4', 'x');
    
    const result =  _generatorService.solveForVariable(randomSet, simplifiedEquation, variables);
    expect(result.toString()).toBe('2*i,-2*i');
  });
});
