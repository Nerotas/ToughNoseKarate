export const arrayToStringListHandler = (incomingArray: string[]): string =>
  incomingArray.join(' ').replace(/,\s*$/g, '');

export const arrayToStringCommaHandler = (incomingArray: string[]): string =>
  incomingArray.length > 0 ? incomingArray.join(', ') : '';

export const stringToArrayHandler = (incomingString = ''): string[] =>
  incomingString.trim() === '' ? [] : incomingString.replace(/ /g, '').split(',');

export const capitalizeFirstOfEachItem = (str: string | null | undefined): string => {
  if (!str) return '';
  return str
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(', ');
};
