import { Variable } from './variable';
import { variable } from '@angular/compiler/src/output/output_ast';
import * as _ from 'lodash';

declare var nerdamer: any;

export function findRange({ min, max, decPoint }: Variable): number {
  return (max - min) * 10 ** decPoint + 1;
}


/* Takes array of numbers and Variable array and converts to a varialble object*/
export function createKnownValuesObject(randomSet: number[], variables: Variable[]): object {
  const variableNamesArray = _.map(variables.slice(0, -1), 'name');
  return _.zipObject(variableNamesArray, randomSet);
}

// tslint:disable-next-line:max-line-length
/* Solves the equation/expression using the nerdamer math  library by taking array of numbers, the simplified algebric equation and the variable array */
export function solveForVariable(randomSet: number[], simplifiedEquation: string, variables: Variable[]): any[] {
  const answerArray: any[] = [];

  const variableValuesObject = createKnownValuesObject(randomSet, variables);

  const answer: string = nerdamer(simplifiedEquation, variableValuesObject);
  // console.log('answer: ' + answer.toString());
  console.log(answer);

  const decimalAnswer: string = nerdamer(answer).text('decimal');

  const decimalAnswerArray: string[] = decimalAnswer.split(/[\[,\]]/);

  for (let i = 0; i < decimalAnswerArray.length; i++) {
    if (decimalAnswerArray[i] !== '') {
      console.log(decimalAnswerArray[i]);
      answerArray.push(decimalAnswerArray[i]);
    }
  }
  return answerArray;
}

/* This method simplifies an algebric equation and returns an expression */
export function simplifyEquation(equation: string, variableToSolve: string): string {
  return nerdamer.solve(equation, variableToSolve).toString();
}

export function getRangeValues({ min, max, decPoint }) {
  const rangeValues = [];
  const increment = Math.pow(10, -decPoint);
  let num = min;
  while (num <= max) {
    rangeValues.push(num);
    num += increment;
  }
  return rangeValues;
}
/* This method takes an object as an argument and converts into an array. */
export function toArray(obj: object) {
  const objArr = Object.keys(obj).map(function (key) {
    return [String(key), obj[key]];
  });
  return objArr;
}

export function generatePermutations(parametersArray: Variable[]): number[] {
  const answerArray = parametersArray.slice(0, -1).reduce((possibleValues, parameter) => {
    const result = [];
    const rangeValues = getRangeValues(parameter);
    possibleValues.forEach(possibleValue => {
      rangeValues.forEach(value => {
        result.push([...possibleValue, value]);
      });
    });
    return result;
  }, [[]]);
  return answerArray;
}
