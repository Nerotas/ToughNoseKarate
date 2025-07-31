import { size } from 'lodash';

export const replaceCommaInStringWithSpace = (value: string): string => (size(value) > 0 ? value.replace(/,/g, ', ') : '');

export const replaceCommaInStringWithLine = (value: string): string => (size(value) > 0 ? value.replace(/,/g, ',\n') : '');

export const arrayToString = (values: string[]): string => (size(values) > 0 ? values.join(',\n') : '');
