import { capitalize, size } from 'lodash';

export const arrayToStringListHandler = (incomingArray: string[]): string =>
  incomingArray.join(' ').replace(/,\s*$/g, '');

export const arrayToStringCommaHandler = (incomingArray: string[]): string =>
  size(incomingArray) > 0 ? incomingArray.join(', ') : '';

export const stringToArrayHandler = (incomingString: string = ''): string[] =>
  incomingString.replace(/ /g, '').split(',');

export const capitalizeFirstOfEachItem = (value: string = ''): string => {
  if (value === null) {
    return '';
  }
  const newArray = stringToArrayHandler(value);
  const capitalizedArray = newArray.reduce(
    (acc: string[], stringValue: string) => {
      acc.push(capitalize(stringValue));
      return acc;
    },
    [],
  );
  const capitalizedString = arrayToStringCommaHandler(capitalizedArray);

  return size(capitalizedString) > 0
    ? capitalizedString.replace(/,/g, ',\n').replace(/_/g, ' ')
    : '';
};

export const arrayToStringListHandlerNewLine = (
  incomingArray: string[],
): string => incomingArray.join(' ').replace(/,\s*$/g, '\n');
