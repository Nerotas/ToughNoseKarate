import { toReadableText, camelCaseToTitleCase, snakeCaseToReadable } from '../textFormatting';

describe('textFormatting utilities', () => {
  describe('toReadableText', () => {
    it('should convert camelCase to readable text', () => {
      expect(toReadableText('firstName')).toBe('First Name');
      expect(toReadableText('lastName')).toBe('Last Name');
      expect(toReadableText('dateOfBirth')).toBe('Date Of Birth');
    });

    it('should convert snake_case to readable text', () => {
      expect(toReadableText('first_name')).toBe('First Name');
      expect(toReadableText('last_name')).toBe('Last Name');
      expect(toReadableText('date_of_birth')).toBe('Date Of Birth');
    });

    it('should convert kebab-case to readable text', () => {
      expect(toReadableText('first-name')).toBe('First Name');
      expect(toReadableText('last-name')).toBe('Last Name');
      expect(toReadableText('date-of-birth')).toBe('Date Of Birth');
    });

    it('should handle mixed cases', () => {
      expect(toReadableText('firstName_with-mixed_cases')).toBe('First Name With Mixed Cases');
      expect(toReadableText('API_responseData-handler')).toBe('API Response Data Handler');
    });

    it('should handle single words', () => {
      expect(toReadableText('name')).toBe('Name');
      expect(toReadableText('email')).toBe('Email');
      expect(toReadableText('password')).toBe('Password');
    });

    it('should handle empty string', () => {
      expect(toReadableText('')).toBe('');
    });

    it('should handle null input', () => {
      expect(toReadableText(null as any)).toBe('');
    });

    it('should handle undefined input', () => {
      expect(toReadableText(undefined as any)).toBe('');
    });

    it('should clean up extra spaces', () => {
      expect(toReadableText('first__name')).toBe('First Name');
      expect(toReadableText('first---name')).toBe('First Name');
      expect(toReadableText('first  name')).toBe('First Name');
    });

    it('should handle numbers', () => {
      expect(toReadableText('field1Name')).toBe('Field1Name');
      expect(toReadableText('user_id_123')).toBe('User Id 123');
    });

    it('should handle consecutive uppercase letters', () => {
      expect(toReadableText('XMLParser')).toBe('XMLParser');
      expect(toReadableText('HTTPSConnection')).toBe('HTTPSConnection');
    });

    it('should handle strings with spaces', () => {
      expect(toReadableText('first name')).toBe('First Name');
      expect(toReadableText('  spaced  text  ')).toBe('Spaced Text');
    });
  });

  describe('camelCaseToTitleCase', () => {
    it('should convert camelCase to Title Case', () => {
      expect(camelCaseToTitleCase('firstName')).toBe('First Name');
      expect(camelCaseToTitleCase('lastName')).toBe('Last Name');
      expect(camelCaseToTitleCase('dateOfBirth')).toBe('Date Of Birth');
    });

    it('should handle single words', () => {
      expect(camelCaseToTitleCase('name')).toBe('Name');
      expect(camelCaseToTitleCase('email')).toBe('Email');
    });

    it('should handle empty string', () => {
      expect(camelCaseToTitleCase('')).toBe('');
    });

    it('should handle null input', () => {
      expect(camelCaseToTitleCase(null as any)).toBe('');
    });

    it('should handle undefined input', () => {
      expect(camelCaseToTitleCase(undefined as any)).toBe('');
    });

    it('should handle strings starting with lowercase', () => {
      expect(camelCaseToTitleCase('myVariableName')).toBe('My Variable Name');
    });

    it('should handle strings starting with uppercase', () => {
      expect(camelCaseToTitleCase('MyVariableName')).toBe('My Variable Name');
    });

    it('should handle consecutive uppercase letters', () => {
      expect(camelCaseToTitleCase('XMLHttpRequest')).toBe('X M L Http Request');
      expect(camelCaseToTitleCase('HTTPSConnection')).toBe('H T T P S Connection');
    });

    it('should handle numbers in camelCase', () => {
      expect(camelCaseToTitleCase('field1Name')).toBe('Field1 Name');
      expect(camelCaseToTitleCase('user123Data')).toBe('User123 Data');
    });

    it('should handle single character words', () => {
      expect(camelCaseToTitleCase('aB')).toBe('A B');
      expect(camelCaseToTitleCase('xY')).toBe('X Y');
    });

    it('should trim whitespace', () => {
      expect(camelCaseToTitleCase(' firstName ')).toBe('first Name');
      expect(camelCaseToTitleCase('  lastName  ')).toBe('last Name');
    });
  });

  describe('snakeCaseToReadable', () => {
    it('should convert snake_case to readable text', () => {
      expect(snakeCaseToReadable('first_name')).toBe('First Name');
      expect(snakeCaseToReadable('last_name')).toBe('Last Name');
      expect(snakeCaseToReadable('date_of_birth')).toBe('Date Of Birth');
    });

    it('should handle single words', () => {
      expect(snakeCaseToReadable('name')).toBe('Name');
      expect(snakeCaseToReadable('email')).toBe('Email');
    });

    it('should handle empty string', () => {
      expect(snakeCaseToReadable('')).toBe('');
    });

    it('should handle null input', () => {
      expect(snakeCaseToReadable(null as any)).toBe('');
    });

    it('should handle undefined input', () => {
      expect(snakeCaseToReadable(undefined as any)).toBe('');
    });

    it('should handle uppercase snake_case', () => {
      expect(snakeCaseToReadable('FIRST_NAME')).toBe('First Name');
      expect(snakeCaseToReadable('LAST_NAME')).toBe('Last Name');
    });

    it('should handle mixed case snake_case', () => {
      expect(snakeCaseToReadable('First_Name')).toBe('First Name');
      expect(snakeCaseToReadable('Last_Name')).toBe('Last Name');
    });

    it('should handle numbers in snake_case', () => {
      expect(snakeCaseToReadable('field_1_name')).toBe('Field 1 Name');
      expect(snakeCaseToReadable('user_123_data')).toBe('User 123 Data');
    });

    it('should handle consecutive underscores', () => {
      expect(snakeCaseToReadable('first__name')).toBe('First  Name');
      expect(snakeCaseToReadable('user___data')).toBe('User   Data');
    });

    it('should handle leading and trailing underscores', () => {
      expect(snakeCaseToReadable('_first_name')).toBe(' First Name');
      expect(snakeCaseToReadable('first_name_')).toBe('First Name ');
      expect(snakeCaseToReadable('_first_name_')).toBe(' First Name ');
    });

    it('should handle string with only underscores', () => {
      expect(snakeCaseToReadable('___')).toBe('   ');
    });

    it('should handle single character words', () => {
      expect(snakeCaseToReadable('a_b')).toBe('A B');
      expect(snakeCaseToReadable('x_y_z')).toBe('X Y Z');
    });

    it('should handle special characters mixed with underscores', () => {
      expect(snakeCaseToReadable('first_name!')).toBe('First Name!');
      expect(snakeCaseToReadable('user@domain_name')).toBe('User@domain Name');
    });
  });
});
