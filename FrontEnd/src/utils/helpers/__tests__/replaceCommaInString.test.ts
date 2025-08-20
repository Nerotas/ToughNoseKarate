import {
  replaceCommaInStringWithSpace,
  replaceCommaInStringWithLine,
  arrayToString,
} from '../replaceCommaInString';

// Mock lodash size function
jest.mock('lodash', () => ({
  size: jest.fn((value) => {
    if (Array.isArray(value)) return value.length;
    if (typeof value === 'string') return value.length;
    if (typeof value === 'object' && value !== null) return Object.keys(value).length;
    return 0;
  }),
}));

describe('replaceCommaInString utilities', () => {
  describe('replaceCommaInStringWithSpace', () => {
    it('should replace commas with commas followed by spaces', () => {
      const input = 'apple,banana,cherry';
      const result = replaceCommaInStringWithSpace(input);

      expect(result).toBe('apple, banana, cherry');
    });

    it('should handle string with spaces already after commas', () => {
      const input = 'apple, banana, cherry';
      const result = replaceCommaInStringWithSpace(input);

      expect(result).toBe('apple,  banana,  cherry');
    });

    it('should handle single item without commas', () => {
      const input = 'apple';
      const result = replaceCommaInStringWithSpace(input);

      expect(result).toBe('apple');
    });

    it('should return empty string for empty input', () => {
      const input = '';
      const result = replaceCommaInStringWithSpace(input);

      expect(result).toBe('');
    });

    it('should handle string with only commas', () => {
      const input = ',,,';
      const result = replaceCommaInStringWithSpace(input);

      expect(result).toBe(', , , ');
    });

    it('should handle string with trailing commas', () => {
      const input = 'apple,banana,';
      const result = replaceCommaInStringWithSpace(input);

      expect(result).toBe('apple, banana, ');
    });

    it('should handle string with leading commas', () => {
      const input = ',apple,banana';
      const result = replaceCommaInStringWithSpace(input);

      expect(result).toBe(', apple, banana');
    });

    it('should handle consecutive commas', () => {
      const input = 'apple,,banana,,,cherry';
      const result = replaceCommaInStringWithSpace(input);

      expect(result).toBe('apple, , banana, , , cherry');
    });
  });

  describe('replaceCommaInStringWithLine', () => {
    it('should replace commas with commas followed by newlines', () => {
      const input = 'apple,banana,cherry';
      const result = replaceCommaInStringWithLine(input);

      expect(result).toBe('apple,\nbanana,\ncherry');
    });

    it('should handle single item without commas', () => {
      const input = 'apple';
      const result = replaceCommaInStringWithLine(input);

      expect(result).toBe('apple');
    });

    it('should return empty string for empty input', () => {
      const input = '';
      const result = replaceCommaInStringWithLine(input);

      expect(result).toBe('');
    });

    it('should handle string with only commas', () => {
      const input = ',,,';
      const result = replaceCommaInStringWithLine(input);

      expect(result).toBe(',\n,\n,\n');
    });

    it('should handle string with trailing commas', () => {
      const input = 'apple,banana,';
      const result = replaceCommaInStringWithLine(input);

      expect(result).toBe('apple,\nbanana,\n');
    });

    it('should handle string with leading commas', () => {
      const input = ',apple,banana';
      const result = replaceCommaInStringWithLine(input);

      expect(result).toBe(',\napple,\nbanana');
    });

    it('should handle consecutive commas', () => {
      const input = 'apple,,banana';
      const result = replaceCommaInStringWithLine(input);

      expect(result).toBe('apple,\n,\nbanana');
    });

    it('should handle string with existing newlines', () => {
      const input = 'apple,\nbanana,cherry';
      const result = replaceCommaInStringWithLine(input);

      expect(result).toBe('apple,\n\nbanana,\ncherry');
    });
  });

  describe('arrayToString', () => {
    it('should join array elements with commas and newlines', () => {
      const input = ['apple', 'banana', 'cherry'];
      const result = arrayToString(input);

      expect(result).toBe('apple,\nbanana,\ncherry');
    });

    it('should handle single element array', () => {
      const input = ['apple'];
      const result = arrayToString(input);

      expect(result).toBe('apple');
    });

    it('should return empty string for empty array', () => {
      const input: string[] = [];
      const result = arrayToString(input);

      expect(result).toBe('');
    });

    it('should handle array with empty strings', () => {
      const input = ['apple', '', 'cherry'];
      const result = arrayToString(input);

      expect(result).toBe('apple,\n,\ncherry');
    });

    it('should handle array with whitespace strings', () => {
      const input = ['apple', '  ', 'cherry'];
      const result = arrayToString(input);

      expect(result).toBe('apple,\n  ,\ncherry');
    });

    it('should handle array with special characters', () => {
      const input = ['apple!', '@banana', '#cherry$'];
      const result = arrayToString(input);

      expect(result).toBe('apple!,\n@banana,\n#cherry$');
    });

    it('should handle array with numbers as strings', () => {
      const input = ['1', '2', '3'];
      const result = arrayToString(input);

      expect(result).toBe('1,\n2,\n3');
    });

    it('should handle array with long strings', () => {
      const input = [
        'This is a very long string',
        'Another long string here',
        'And one more for good measure',
      ];
      const result = arrayToString(input);

      expect(result).toBe(
        'This is a very long string,\nAnother long string here,\nAnd one more for good measure'
      );
    });

    it('should handle array with strings containing commas', () => {
      const input = ['apple, red', 'banana, yellow', 'cherry, red'];
      const result = arrayToString(input);

      expect(result).toBe('apple, red,\nbanana, yellow,\ncherry, red');
    });

    it('should handle array with strings containing newlines', () => {
      const input = ['apple\nred', 'banana\nyellow'];
      const result = arrayToString(input);

      expect(result).toBe('apple\nred,\nbanana\nyellow');
    });
  });
});
