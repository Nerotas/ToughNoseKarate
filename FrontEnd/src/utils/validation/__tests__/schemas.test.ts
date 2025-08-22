import Joi from 'joi';
import { studentCreateSchema, studentUpdateSchema, techniqueDefinitionSchema } from '../schemas';
import { Student } from 'models/Students/Students';
import { mockStudents } from 'testingUtils/MockData/mockStudents';

describe('Validation Schemas', () => {
  describe('studentCreateSchema', () => {
    const validStudentData: Student = mockStudents[0];

    it('should validate valid student data', () => {
      const { error } = studentCreateSchema.validate(validStudentData);
      expect(error).toBeUndefined();
    });

    it('should require firstName', () => {
      const invalidData = { ...validStudentData, firstName: null };

      const { error } = studentCreateSchema.validate(invalidData);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toBe('First name is required');
    });

    it('should require lastName', () => {
      const invalidData = { ...validStudentData, lastName: null };

      const { error } = studentCreateSchema.validate(invalidData);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toBe('Last name is required');
    });

    it('should validate email format', () => {
      const invalidData = { ...validStudentData, email: 'invalid-email' };

      const { error } = studentCreateSchema.validate(invalidData);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toBe('Please enter a valid email address');
    });

    it('should validate phone format', () => {
      const invalidData = { ...validStudentData, phone: 'invalid-phone' };

      const { error } = studentCreateSchema.validate(invalidData);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toBe('Please enter a valid phone number');
    });

    it('should validate belt rank', () => {
      const invalidData = { ...validStudentData, belt_rank: 'Purple' };

      const { error } = studentCreateSchema.validate(invalidData);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toBe('Please select a valid belt rank');
    });

    it('should not allow future birthdate', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const invalidData = {
        ...validStudentData,
        birthdate: futureDate.toISOString().split('T')[0],
      };

      const { error } = studentCreateSchema.validate(invalidData);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toBe('Birth date cannot be in the future');
    });

    it('should trim string values', () => {
      const dataWithSpaces = {
        ...validStudentData,
        firstName: '  John  ',
        lastName: '  Doe  ',
        email: '  john.doe@example.com  ',
      };

      const { error, value } = studentCreateSchema.validate(dataWithSpaces);
      expect(error).toBeUndefined();
      expect(value.firstName).toBe('John');
      expect(value.lastName).toBe('Doe');
      expect(value.email).toBe('john.doe@example.com');
    });
  });

  describe('studentUpdateSchema', () => {
    it('should require id for updates', () => {
      const updateData = {
        firstName: 'John',
        lastName: 'Doe',
      };

      const { error } = studentUpdateSchema.validate(updateData);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toBe('Student ID is required');
    });

    it('should validate with only id and some fields', () => {
      const updateData = {
        id: 1,
        firstName: 'John',
      };

      const { error } = studentUpdateSchema.validate(updateData);
      expect(error).toBeUndefined();
    });

    it('should require positive id', () => {
      const updateData = {
        id: -1,
        firstName: 'John',
      };

      const { error } = studentUpdateSchema.validate(updateData);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toBe('Student ID must be a positive number');
    });
  });

  describe('techniqueDefinitionSchema', () => {
    const validTechniqueData = {
      name: 'Front Kick',
      description: 'A basic front kick technique',
      difficulty_level: 'Beginner',
      belt_requirement: 'White',
    };

    it('should validate valid technique data', () => {
      const { error } = techniqueDefinitionSchema.validate(validTechniqueData);
      expect(error).toBeUndefined();
    });

    it('should require technique name', () => {
      const invalidData = { ...validTechniqueData };
      delete invalidData.name;

      const { error } = techniqueDefinitionSchema.validate(invalidData);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toBe('Technique name is required');
    });

    it('should validate difficulty level', () => {
      const invalidData = { ...validTechniqueData, difficulty_level: 'Invalid' };

      const { error } = techniqueDefinitionSchema.validate(invalidData);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toBe('Please select a valid difficulty level');
    });

    it('should allow empty description', () => {
      const dataWithEmptyDescription = { ...validTechniqueData, description: '' };

      const { error } = techniqueDefinitionSchema.validate(dataWithEmptyDescription);
      expect(error).toBeUndefined();
    });

    it('should trim string values', () => {
      const dataWithSpaces = {
        ...validTechniqueData,
        name: '  Front Kick  ',
        description: '  A basic front kick technique  ',
      };

      const { error, value } = techniqueDefinitionSchema.validate(dataWithSpaces);
      expect(error).toBeUndefined();
      expect(value.name).toBe('Front Kick');
      expect(value.description).toBe('A basic front kick technique');
    });
  });
});
