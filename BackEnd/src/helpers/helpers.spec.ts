import {
  arrayToStringListHandler,
  arrayToStringCommaHandler,
  stringToArrayHandler,
  capitalizeFirstOfEachItem,
  arrayToStringListHandlerNewLine,
} from './arrayToStringListHandler';
import { Op } from 'sequelize';
import operatorConverter from './operatorConverters';
import { expect, describe, it } from '@jest/globals';

describe('arrayToStringListHandler', () => {
  it('joins array with spaces', () => {
    expect(arrayToStringListHandler(['a', 'b', 'c'])).toBe('a b c');
  });
  it('removes trailing commas', () => {
    expect(arrayToStringListHandler(['a,', 'b,', 'c,'])).toBe('a, b, c');
  });
});

describe('arrayToStringCommaHandler', () => {
  it('joins array with commas and spaces', () => {
    expect(arrayToStringCommaHandler(['a', 'b', 'c'])).toBe('a, b, c');
  });
  it('returns empty string for empty array', () => {
    expect(arrayToStringCommaHandler([])).toBe('');
  });
});

describe('stringToArrayHandler', () => {
  it('splits comma-separated string into array', () => {
    expect(stringToArrayHandler('a,b,c')).toEqual(['a', 'b', 'c']);
  });
  it('removes spaces before splitting', () => {
    expect(stringToArrayHandler('a, b, c')).toEqual(['a', 'b', 'c']);
  });
  it('returns [""] for empty string', () => {
    expect(stringToArrayHandler('')).toEqual(['']);
  });
});

describe('capitalizeFirstOfEachItem', () => {
  it('capitalizes each item and joins with comma and newline', () => {
    expect(capitalizeFirstOfEachItem('foo,bar_baz')).toBe('Foo,\n Bar baz');
  });
  it('returns empty string for null', () => {
    expect(capitalizeFirstOfEachItem(null as any)).toBe('');
  });
  it('returns empty string for empty string', () => {
    expect(capitalizeFirstOfEachItem('')).toBe('');
  });
});

describe('operatorConverter', () => {
  it('returns Op.eq for "equals"', () => {
    expect(operatorConverter('equals')).toBe(Op.eq);
  });
  it('returns Op.ne for "notEquals"', () => {
    expect(operatorConverter('notEquals')).toBe(Op.ne);
  });
  it('returns Op.substring for "contains"', () => {
    expect(operatorConverter('contains')).toBe(Op.substring);
  });
  it('returns Op.notLike for "notContains"', () => {
    expect(operatorConverter('notContains')).toBe(Op.notLike);
  });
  it('returns Op.like for "startsWith"', () => {
    expect(operatorConverter('startsWith')).toBe(Op.like);
  });
  it('returns Op.is for "isEmpty"', () => {
    expect(operatorConverter('isEmpty')).toBe(Op.is);
  });
  it('returns Op.not for "isNotEmpty"', () => {
    expect(operatorConverter('isNotEmpty')).toBe(Op.not);
  });
  it('returns Op.in for "isAnyOf"', () => {
    expect(operatorConverter('isAnyOf')).toBe(Op.in);
  });
  it('returns Op.gt for "greaterThan"', () => {
    expect(operatorConverter('greaterThan')).toBe(Op.gt);
  });
  it('returns Op.gte for "greaterThanOrEqual"', () => {
    expect(operatorConverter('greaterThanOrEqual')).toBe(Op.gte);
  });
  it('returns Op.lt for "lessThan"', () => {
    expect(operatorConverter('lessThan')).toBe(Op.lt);
  });
  it('returns Op.lte for "lessThanOrEqual"', () => {
    expect(operatorConverter('lessThanOrEqual')).toBe(Op.lte);
  });
  it('returns Op.and for "and"', () => {
    expect(operatorConverter('and')).toBe(Op.and);
  });
  it('returns Op.or for "or"', () => {
    expect(operatorConverter('or')).toBe(Op.or);
  });
  it('returns Op.eq for "is"', () => {
    expect(operatorConverter('is')).toBe(Op.eq);
  });
  it('returns Op.eq for unknown operator', () => {
    expect(operatorConverter('unknown')).toBe(Op.eq);
  });
});

describe('arrayToStringListHandlerNewLine', () => {
  it('joins array with spaces and replaces trailing comma with newline', () => {
    expect(arrayToStringListHandlerNewLine(['a,', 'b,', 'c,'])).toBe(
      'a, b, c\n',
    );
  });
  it('joins array with spaces if no trailing comma', () => {
    expect(arrayToStringListHandlerNewLine(['a', 'b', 'c'])).toBe('a b c');
  });
  it('returns empty string for empty array', () => {
    expect(arrayToStringListHandlerNewLine([])).toBe('');
  });
});
