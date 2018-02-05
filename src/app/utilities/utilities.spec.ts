/* tslint:disable:max-line-length */
import { TestBed, inject } from '@angular/core/testing';

import { GeneratorService } from './../services/generator.service';

import {
  createKnownValuesObject,
  solveForUnknownVariable,
  simplifyEquation,
  toArray,
  generatePermutations,
  meetsUnknownVariableSpecification,
  // containsImaginary,
  calculateDecimalPlaces,
  pullRandomValue,
  genRandomPermutation,
  getRangeValues,
  isVariableInArray,
  getRandomValue
} from './utilities';
import * as _ from 'lodash';
import { Variable } from '../variable';
import { randomBytes } from 'crypto';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';

describe('Utilities methods', () => {
  const varObjA = new Variable('a', 0, _.random(0, 5, false), _.random(15, 20, false));
  const varObjB = new Variable('b', 0, _.random(0, 5, false), _.random(15, 20, false));
  const varObjC = new Variable('c', 0, _.random(0, 5, false), _.random(15, 20, false));
  const varObjX = new Variable('x', 0, _.random(0, 5, false), _.random(15, 20, false));
  const variables: Variable[] = [varObjA, varObjB, varObjC, varObjX];
  const randomSet: number [] = genRandomPermutation(variables);
  const knownVarsObj: { [name: string]: string } = createKnownValuesObject(randomSet, variables);
  const equation = 'a*b+c=x';

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  describe('createKnownValuesObject for a random set', () => {
    it('should take a random set generated by genRandomPermutations and return a variable object.', () => {
      expect(knownVarsObj).toEqual({[varObjA.name]: String(randomSet[0]), [varObjB.name]: String(randomSet[1]), [varObjC.name]: String(randomSet[2])});
    });

    describe('solveForUnknownVariable ', () => {
      it('should take a set of numbers, plug them into the simplified equation and return a number for the variable thats being solved for)', () => {
        const simplifiedEquation = simplifyEquation(equation, 'x');
        const solvedForUnknownVariable = solveForUnknownVariable(randomSet, simplifiedEquation, variables);

        expect(solvedForUnknownVariable).toEqual(randomSet[0] * randomSet[1] + randomSet[2]);
    });

    describe('simplifyEquation', () => {
      it('should return the equation in terms of variable being solved for', () => {
        const simplifiedEquation = simplifyEquation(equation, 'b');
        expect(simplifiedEquation).toEqual('[-(-x+c)*a^(-1)]');
      });
    });

    describe('calculateDecimalPlaces', () => {
      it('checks the value returned by calculateDecimalPlaces when a string is given as parameter', () => {
        const stringAsParameter: string = '4.49854';
        const calculatedDecimal: number = calculateDecimalPlaces(stringAsParameter);
        expect(calculatedDecimal).toBe(5);
      });
      it('checks the value returned by calculateDecimalPlaces when a string is given as parameter', () => {
        const numberAsParameter: number = 4.49854;
        const calculatedDecimal: number = calculateDecimalPlaces(numberAsParameter);
        expect(calculatedDecimal).toBe(5);
      });
    });

    describe('getRangeValues for input with 0 decimals', () => {
      it('should check getRangeValues when Variable contains 0 decimals', () => {
        const newVariable: Variable = new Variable( 'n', 0, 1, 5);
        expect(getRangeValues(newVariable)).toEqual([1, 2, 3, 4, 5]);
      });
      it('should check getRangeValues when Variables contains > 0 decimals', () =>  {
        const newVariable: Variable = new Variable('q', 1, 1, 2);
        expect(getRangeValues(newVariable)).toEqual([1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0]);
      });
    });

    describe('generatePermutations', () => {
      describe('Cases where parameters contain no decimals', () => {
        const firstVariable: Variable = new Variable('p', 0, 1, 2);
        const secondVariable: Variable = new Variable('z', 0, 3, 5);
        const thirdVariable: Variable = new Variable('d', 0, 1, 2);
        const variablesTestSet: Variable [] = [firstVariable, secondVariable, thirdVariable];
        const generatedSet: [number []] = generatePermutations(variablesTestSet);

        it('should generate permutations for cases where variables contain no decimals', () => {
          expect(generatedSet).toEqual([[1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5]]);
        });

        it('should check that generatePermutations returns [[]]', () => {
          expect(generatedSet).toEqual(jasmine.any(Array));
          expect(generatedSet[0]).toEqual(jasmine.any(Array));
        });
      });

      describe('cases where parameters contain decimals', () => {
        it('should test for cases where variables contain > 0 decimals', () => {

        });
      });

      describe('isVariableInArray method', () => {

        describe('isVariableInArray for arrays of integer values', () => {
          it('should check isVariableInArray when variable is not in array', () => {
            const checkVariableIsInArray = isVariableInArray([3, 4, 5], [[3, 5, 6], [2, 3, 4]]);
            expect(checkVariableIsInArray).toEqual(false);
          });
          it('should check isVariableInArray when variable is in array', () => {
            const checkVariableIsInArray = isVariableInArray([3, 4, 5], [[3, 4, 5], [2, 3, 4]]);
            expect(checkVariableIsInArray).toBe(true);
          });
        });

        describe('isVariableInArray for arrays of decimal values', () => {
          it('isVariableInArray for cases when variable is not in the array', () => {
            const checkVariableIsInArray = isVariableInArray([3.4, 4.2, 5.9], [[3.4, 5.8, 6.8], [2.4, 3.6, 4.9]]);
            expect(checkVariableIsInArray).toEqual(false);
          });
          it('should check isVariableInArray for cases when variable is in the array', () => {
            const checkVariableIsInArray = isVariableInArray([3.4, 4.2, 5.9], [[3.4, 5.8, 6.8], [3.4, 4.2, 5.9]]);
            expect(checkVariableIsInArray).toBe(true);
          });
        });
      });


      describe('getRandomValue', () => {
        it('should verify that getRandomValue lies between min and max', () => {
          const firstVariable: Variable = new Variable('p', 0, 1, 4);
          const randomValue = getRandomValue(firstVariable);
          expect(randomValue).toBeGreaterThan(firstVariable.min);
          expect(randomValue).not.toBeGreaterThan(firstVariable.max);
        });
      })



    });
  });















//   describe('The containsImaginary utility method', () => {
//     it('should return false if input contains an "i" for imaginary', () => {
//       const expression: string = 'x + y = z';
//       expect(containsImaginary(expression)).toBe(false);
//     });
  
//     it('should return true if expression contains "i"', () => {
//       const imaginaryExpression: string = '3i + 4x = z';
//       expect(containsImaginary(imaginaryExpression)).toBe(true);
//     });
//   });
 });
