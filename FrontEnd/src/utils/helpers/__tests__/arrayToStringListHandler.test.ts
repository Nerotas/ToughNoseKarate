import {
  arrayToStringListHandler,
  arrayToStringCommaHandler,
  stringToArrayHandler,
  capitalizeFirstOfEachItem,
} from '../arrayToStringListHandler';

describe('arrayToStringListHandler utilities', () => {
  describe('arrayToStringListHandler', () => {
    it('should join array elements with spaces', () => {
      const input = ['apple', 'banana', 'cherry'];
      const result = arrayToStringListHandler(input);

      expect(result).toBe('apple banana cherry');
    });

    it('should handle single element array', () => {
      const input = ['apple'];
      const result = arrayToStringListHandler(input);

      expect(result).toBe('apple');
    });

    it('should handle empty array', () => {
      const input: string[] = [];
      const result = arrayToStringListHandler(input);

      expect(result).toBe('');
    });

    it('should handle array with empty strings', () => {
      const input = ['apple', '', 'cherry'];
      const result = arrayToStringListHandler(input);

      expect(result).toBe('apple  cherry');
    });

    it('should handle array with whitespace strings', () => {
      const input = ['apple', '  ', 'cherry'];
      const result = arrayToStringListHandler(input);

      expect(result).toBe('apple    cherry');
    });
  });

  describe('arrayToStringCommaHandler', () => {
    it('should join array elements with commas and spaces', () => {
      const input = ['apple', 'banana', 'cherry'];
      const result = arrayToStringCommaHandler(input);

      expect(result).toBe('apple, banana, cherry');
    });

    it('should handle single element array', () => {
      const input = ['apple'];
      const result = arrayToStringCommaHandler(input);

      expect(result).toBe('apple');
    });

    it('should return empty string for empty array', () => {
      const input: string[] = [];
      const result = arrayToStringCommaHandler(input);

      expect(result).toBe('');
    });

    it('should handle array with empty strings', () => {
      const input = ['apple', '', 'cherry'];
      const result = arrayToStringCommaHandler(input);

      expect(result).toBe('apple, , cherry');
    });

    it('should handle array with whitespace strings', () => {
      const input = ['apple', '  ', 'cherry'];
      const result = arrayToStringCommaHandler(input);

      expect(result).toBe('apple,   , cherry');
    });
  });

  describe('stringToArrayHandler', () => {
    it('should split comma-separated string into array', () => {
      const input = 'apple,banana,cherry';
      const result = stringToArrayHandler(input);

      expect(result).toEqual(['apple', 'banana', 'cherry']);
    });

    it('should handle string with spaces after commas', () => {
      const input = 'apple, banana, cherry';
      const result = stringToArrayHandler(input);

      expect(result).toEqual(['apple', 'banana', 'cherry']);
    });

    it('should handle string with spaces before commas', () => {
      const input = 'apple ,banana ,cherry';
      const result = stringToArrayHandler(input);

      expect(result).toEqual(['apple', 'banana', 'cherry']);
    });

    it('should handle string with mixed spaces', () => {
      const input = 'apple , banana, cherry ';
      const result = stringToArrayHandler(input);

      expect(result).toEqual(['apple', 'banana', 'cherry']);
    });

    it('should return empty array for empty string', () => {
      const input = '';
      const result = stringToArrayHandler(input);

      expect(result).toEqual([]);
    });

    it('should return empty array for whitespace only string', () => {
      const input = '   ';
      const result = stringToArrayHandler(input);

      expect(result).toEqual([]);
    });

    it('should handle single item without commas', () => {
      const input = 'apple';
      const result = stringToArrayHandler(input);

      expect(result).toEqual(['apple']);
    });

    it('should handle undefined input', () => {
      const result = stringToArrayHandler(undefined);

      expect(result).toEqual([]);
    });

    it('should handle string with trailing commas', () => {
      const input = 'apple,banana,cherry,';
      const result = stringToArrayHandler(input);

      expect(result).toEqual(['apple', 'banana', 'cherry', '']);
    });

    it('should handle string with leading commas', () => {
      const input = ',apple,banana,cherry';
      const result = stringToArrayHandler(input);

      expect(result).toEqual(['', 'apple', 'banana', 'cherry']);
    });
  });

  describe('capitalizeFirstOfEachItem', () => {
    it('should capitalize first letter of each comma-separated item', () => {
      const input = 'apple, banana, cherry';
      const result = capitalizeFirstOfEachItem(input);

      expect(result).toBe('Apple, Banana, Cherry');
    });

    it('should handle single item', () => {
      const input = 'apple';
      const result = capitalizeFirstOfEachItem(input);

      expect(result).toBe('Apple');
    });

    it('should return empty string for null input', () => {
      const result = capitalizeFirstOfEachItem(null);

      expect(result).toBe('');
    });

    it('should return empty string for undefined input', () => {
      const result = capitalizeFirstOfEachItem(undefined);

      expect(result).toBe('');
    });

    it('should return empty string for empty string input', () => {
      const input = '';
      const result = capitalizeFirstOfEachItem(input);

      expect(result).toBe('');
    });

    it('should handle items with extra whitespace', () => {
      const input = '  apple  ,  banana  ,  cherry  ';
      const result = capitalizeFirstOfEachItem(input);

      expect(result).toBe('Apple, Banana, Cherry');
    });

    it('should filter out empty items', () => {
      const input = 'apple,,banana,,cherry';
      const result = capitalizeFirstOfEachItem(input);

      expect(result).toBe('Apple, Banana, Cherry');
    });

    it('should handle items that are already capitalized', () => {
      const input = 'Apple, Banana, Cherry';
      const result = capitalizeFirstOfEachItem(input);

      expect(result).toBe('Apple, Banana, Cherry');
    });

    it('should handle mixed case items', () => {
      const input = 'aPPle, bAnAna, cHErry';
      const result = capitalizeFirstOfEachItem(input);

      expect(result).toBe('APPle, BAnAna, CHErry');
    });

    it('should handle single character items', () => {
      const input = 'a, b, c';
      const result = capitalizeFirstOfEachItem(input);

      expect(result).toBe('A, B, C');
    });

    it('should handle numbers and special characters', () => {
      const input = '1apple, #banana, $cherry';
      const result = capitalizeFirstOfEachItem(input);

      expect(result).toBe('1apple, #banana, $cherry');
    });
  });
});
