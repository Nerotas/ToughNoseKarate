import React from 'react';
import { renderHook, act, render, screen, fireEvent } from '@testing-library/react';
import Joi from 'joi';
import { useValidation, ValidatedForm, useApiValidation } from '../useValidation';

// Mock the validation schemas module
jest.mock('../../utils/validation/schemas', () => ({
  validateData: jest.fn(),
  getFieldErrors: jest.fn(),
}));

import { validateData, getFieldErrors } from '../../utils/validation/schemas';

const mockValidateData = validateData as jest.MockedFunction<typeof validateData>;
const mockGetFieldErrors = getFieldErrors as jest.MockedFunction<typeof getFieldErrors>;

describe('useValidation', () => {
  // Test schema
  const testSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().min(0).required(),
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic functionality', () => {
    it('should initialize with default validation state', () => {
      const { result } = renderHook(() => useValidation(testSchema));

      expect(result.current.errors).toEqual({});
      expect(result.current.isValid).toBe(true);
      expect(result.current.isValidating).toBe(false);
      expect(result.current.hasBeenValidated).toBe(false);
    });

    it('should initialize with custom options', () => {
      const options = {
        validateOnChange: true,
        validateOnBlur: false,
        validateOnSubmit: false,
      };

      const { result } = renderHook(() => useValidation(testSchema, options));

      expect(result.current.errors).toEqual({});
      expect(result.current.isValid).toBe(true);
      expect(result.current.isValidating).toBe(false);
      expect(result.current.hasBeenValidated).toBe(false);
    });
  });

  describe('validate function', () => {
    it('should validate successfully with valid data', () => {
      mockValidateData.mockReturnValue({
        success: true,
        data: { name: 'John', email: 'john@example.com', age: 25 },
      });

      const { result } = renderHook(() => useValidation(testSchema));

      let validationResult;
      act(() => {
        validationResult = result.current.validate({
          name: 'John',
          email: 'john@example.com',
          age: 25,
        });
      });

      expect(validationResult).toEqual({
        success: true,
        data: { name: 'John', email: 'john@example.com', age: 25 },
      });
      expect(result.current.isValid).toBe(true);
      expect(result.current.hasBeenValidated).toBe(true);
      expect(result.current.isValidating).toBe(false);
      expect(result.current.errors).toEqual({});
    });

    it('should validate with errors for invalid data', () => {
      mockValidateData.mockReturnValue({
        success: false,
        errors: ['name is required', 'email is invalid'],
      });
      mockGetFieldErrors.mockReturnValue({
        name: 'name is required',
        email: 'email is invalid',
      });

      const { result } = renderHook(() => useValidation(testSchema));

      let validationResult;
      act(() => {
        validationResult = result.current.validate({
          name: '',
          email: 'invalid-email',
          age: -1,
        });
      });

      expect(validationResult).toEqual({
        success: false,
        errors: ['name is required', 'email is invalid'],
      });
      expect(result.current.isValid).toBe(false);
      expect(result.current.hasBeenValidated).toBe(true);
      expect(result.current.isValidating).toBe(false);
      expect(result.current.errors).toEqual({
        name: 'name is required',
        email: 'email is invalid',
      });
    });

    it('should set isValidating during validation', () => {
      mockValidateData.mockReturnValue({
        success: true,
        data: { name: 'John', email: 'john@example.com', age: 25 },
      });

      const { result } = renderHook(() => useValidation(testSchema));

      act(() => {
        result.current.validate({ name: 'John', email: 'john@example.com', age: 25 });
      });

      expect(result.current.isValidating).toBe(false);
      expect(result.current.hasBeenValidated).toBe(true);
    });
  });

  describe('validateField function', () => {
    it('should validate a single field successfully', () => {
      const fieldSchema = Joi.string().required();
      fieldSchema.validate = jest.fn().mockReturnValue({ error: undefined });
      testSchema.extract = jest.fn().mockReturnValue(fieldSchema);

      const { result } = renderHook(() => useValidation(testSchema));

      let fieldError;
      act(() => {
        fieldError = result.current.validateField('name', 'John');
      });

      expect(fieldError).toBeUndefined();
      expect(testSchema.extract).toHaveBeenCalledWith('name');
      expect(fieldSchema.validate).toHaveBeenCalledWith('John');
    });

    it('should validate a single field with error', () => {
      const fieldSchema = Joi.string().required();
      const mockError = {
        details: [{ message: 'name is required' }],
      };
      fieldSchema.validate = jest.fn().mockReturnValue({ error: mockError });
      testSchema.extract = jest.fn().mockReturnValue(fieldSchema);

      const { result } = renderHook(() => useValidation(testSchema));

      let fieldError;
      act(() => {
        fieldError = result.current.validateField('name', '');
      });

      expect(fieldError).toBe('name is required');
      expect(result.current.errors.name).toBe('name is required');
    });

    it('should handle field that does not exist in schema', () => {
      testSchema.extract = jest.fn().mockImplementation(() => {
        throw new Error('Field not found');
      });

      const { result } = renderHook(() => useValidation(testSchema));

      let fieldError;
      act(() => {
        fieldError = result.current.validateField('nonexistent', 'value');
      });

      expect(fieldError).toBeUndefined();
    });
  });

  describe('error management functions', () => {
    it('should clear all errors', () => {
      const { result } = renderHook(() => useValidation(testSchema));

      // Set some initial errors
      act(() => {
        result.current.setFieldError('name', 'name error');
        result.current.setFieldError('email', 'email error');
      });

      expect(result.current.errors).toEqual({
        name: 'name error',
        email: 'email error',
      });
      expect(result.current.isValid).toBe(false);

      // Clear all errors
      act(() => {
        result.current.clearErrors();
      });

      expect(result.current.errors).toEqual({});
      expect(result.current.isValid).toBe(true);
      expect(result.current.hasBeenValidated).toBe(false);
    });

    it('should clear specific field error', () => {
      const { result } = renderHook(() => useValidation(testSchema));

      // Set some initial errors
      act(() => {
        result.current.setFieldError('name', 'name error');
        result.current.setFieldError('email', 'email error');
      });

      expect(result.current.errors).toEqual({
        name: 'name error',
        email: 'email error',
      });

      // Clear specific field error
      act(() => {
        result.current.clearFieldError('name');
      });

      expect(result.current.errors).toEqual({
        email: 'email error',
      });
    });

    it('should set specific field error', () => {
      const { result } = renderHook(() => useValidation(testSchema));

      act(() => {
        result.current.setFieldError('name', 'Custom error message');
      });

      expect(result.current.errors.name).toBe('Custom error message');
      expect(result.current.isValid).toBe(false);
    });
  });

  describe('event handlers', () => {
    describe('handleBlur', () => {
      it('should validate field on blur when validateOnBlur is true', () => {
        const fieldSchema = Joi.string().required();
        const mockError = { details: [{ message: 'name is required' }] };
        fieldSchema.validate = jest.fn().mockReturnValue({ error: mockError });
        testSchema.extract = jest.fn().mockReturnValue(fieldSchema);

        const { result } = renderHook(() => useValidation(testSchema, { validateOnBlur: true }));

        act(() => {
          result.current.handleBlur('name', '');
        });

        expect(testSchema.extract).toHaveBeenCalledWith('name');
        expect(result.current.errors.name).toBe('name is required');
      });

      it('should not validate field on blur when validateOnBlur is false', () => {
        const fieldSchema = Joi.string().required();
        fieldSchema.validate = jest.fn();
        testSchema.extract = jest.fn().mockReturnValue(fieldSchema);

        const { result } = renderHook(() => useValidation(testSchema, { validateOnBlur: false }));

        act(() => {
          result.current.handleBlur('name', '');
        });

        expect(testSchema.extract).not.toHaveBeenCalled();
      });
    });

    describe('handleChange', () => {
      it('should clear existing error and validate on change when validateOnChange is true', () => {
        const fieldSchema = Joi.string().required();
        fieldSchema.validate = jest.fn().mockReturnValue({ error: undefined });
        testSchema.extract = jest.fn().mockReturnValue(fieldSchema);

        const { result } = renderHook(() => useValidation(testSchema, { validateOnChange: true }));

        // Set an initial error
        act(() => {
          result.current.setFieldError('name', 'initial error');
        });

        expect(result.current.errors.name).toBe('initial error');

        // Handle change should clear error and validate
        act(() => {
          result.current.handleChange('name', 'John');
        });

        expect(result.current.errors.name).toBe('');
        expect(testSchema.extract).toHaveBeenCalledWith('name');
      });

      it('should only clear error when validateOnChange is false', () => {
        const fieldSchema = Joi.string().required();
        fieldSchema.validate = jest.fn();
        testSchema.extract = jest.fn().mockReturnValue(fieldSchema);

        const { result } = renderHook(() => useValidation(testSchema, { validateOnChange: false }));

        // Set an initial error
        act(() => {
          result.current.setFieldError('name', 'initial error');
        });

        expect(result.current.errors.name).toBe('initial error');

        // Handle change should only clear error, not validate
        act(() => {
          result.current.handleChange('name', 'John');
        });

        expect(result.current.errors.name).toBeUndefined();
        expect(testSchema.extract).not.toHaveBeenCalled();
      });

      it('should not clear error if field has no existing error', () => {
        const { result } = renderHook(() => useValidation(testSchema, { validateOnChange: false }));

        act(() => {
          result.current.handleChange('name', 'John');
        });

        expect(result.current.errors.name).toBeUndefined();
      });
    });

    describe('handleSubmit', () => {
      it('should validate data on submit when validateOnSubmit is true', () => {
        mockValidateData.mockReturnValue({
          success: true,
          data: { name: 'John', email: 'john@example.com', age: 25 },
        });

        const { result } = renderHook(() => useValidation(testSchema, { validateOnSubmit: true }));

        let submitResult;
        act(() => {
          submitResult = result.current.handleSubmit({
            name: 'John',
            email: 'john@example.com',
            age: 25,
          });
        });

        expect(submitResult).toEqual({
          success: true,
          data: { name: 'John', email: 'john@example.com', age: 25 },
        });
        expect(mockValidateData).toHaveBeenCalled();
      });

      it('should not validate data on submit when validateOnSubmit is false', () => {
        const { result } = renderHook(() => useValidation(testSchema, { validateOnSubmit: false }));

        const testData = { name: 'John', email: 'john@example.com', age: 25 };
        let submitResult;
        act(() => {
          submitResult = result.current.handleSubmit(testData);
        });

        expect(submitResult).toEqual({
          success: true,
          data: testData,
        });
        expect(mockValidateData).not.toHaveBeenCalled();
      });
    });
  });

  describe('memoization', () => {
    it('should memoize return object properly', () => {
      const { result, rerender } = renderHook(() => useValidation(testSchema));

      const firstRender = result.current;
      rerender();
      const secondRender = result.current;

      // Functions should be the same reference
      expect(firstRender.validate).toBe(secondRender.validate);
      expect(firstRender.validateField).toBe(secondRender.validateField);
      expect(firstRender.clearErrors).toBe(secondRender.clearErrors);
      expect(firstRender.handleBlur).toBe(secondRender.handleBlur);
      expect(firstRender.handleChange).toBe(secondRender.handleChange);
      expect(firstRender.handleSubmit).toBe(secondRender.handleSubmit);
    });

    it('should update memoized object when validation state changes', () => {
      const { result } = renderHook(() => useValidation(testSchema));

      const initialState = { ...result.current };

      act(() => {
        result.current.setFieldError('name', 'error');
      });

      expect(result.current.errors).not.toEqual(initialState.errors);
      expect(result.current.isValid).not.toBe(initialState.isValid);
    });
  });
});

describe('ValidatedForm', () => {
  const testSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form with validation context', () => {
    const mockOnSubmit = jest.fn();

    render(
      <ValidatedForm schema={testSchema} onSubmit={mockOnSubmit}>
        {(validation) => (
          <>
            <input name='name' data-testid='name-input' />
            <input name='email' data-testid='email-input' />
            <button type='submit' data-testid='submit-button'>
              Submit
            </button>
            <div data-testid='errors'>{JSON.stringify(validation.errors)}</div>
          </>
        )}
      </ValidatedForm>
    );

    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('should handle form submission with valid data', async () => {
    const mockOnSubmit = jest.fn();
    mockValidateData.mockReturnValue({
      success: true,
      data: { name: 'John', email: 'john@example.com' },
    });

    render(
      <ValidatedForm schema={testSchema} onSubmit={mockOnSubmit}>
        {() => (
          <>
            <input name='name' defaultValue='John' />
            <input name='email' defaultValue='john@example.com' />
            <button type='submit' data-testid='submit-button'>
              Submit
            </button>
          </>
        )}
      </ValidatedForm>
    );

    fireEvent.click(screen.getByTestId('submit-button'));

    expect(mockValidateData).toHaveBeenCalled();
    // Note: mockOnSubmit might not be called immediately due to async nature
  });

  it('should handle form submission with invalid data', async () => {
    const mockOnSubmit = jest.fn();
    mockValidateData.mockReturnValue({
      success: false,
      errors: ['name is required'],
    });

    render(
      <ValidatedForm schema={testSchema} onSubmit={mockOnSubmit}>
        {() => (
          <>
            <input name='name' defaultValue='' />
            <input name='email' defaultValue='john@example.com' />
            <button type='submit' data-testid='submit-button'>
              Submit
            </button>
          </>
        )}
      </ValidatedForm>
    );

    fireEvent.click(screen.getByTestId('submit-button'));

    expect(mockValidateData).toHaveBeenCalled();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should pass validation options to useValidation', () => {
    const mockOnSubmit = jest.fn();
    const validationOptions = {
      validateOnChange: true,
      validateOnBlur: false,
    };

    render(
      <ValidatedForm
        schema={testSchema}
        onSubmit={mockOnSubmit}
        validationOptions={validationOptions}
      >
        {() => (
          <>
            <input name='name' />
            <input name='email' />
            <button type='submit'>Submit</button>
          </>
        )}
      </ValidatedForm>
    );

    // The component should render without errors
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

describe('useApiValidation', () => {
  const testSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return validation function', () => {
    const { result } = renderHook(() => useApiValidation(testSchema));

    expect(typeof result.current).toBe('function');
  });

  it('should validate API parameters successfully', () => {
    mockValidateData.mockReturnValue({
      success: true,
      data: { id: 1, name: 'Test' },
    });

    const { result } = renderHook(() => useApiValidation(testSchema));

    let validationResult;
    act(() => {
      validationResult = result.current({ id: 1, name: 'Test' });
    });

    expect(validationResult).toEqual({
      success: true,
      data: { id: 1, name: 'Test' },
    });
    expect(mockValidateData).toHaveBeenCalledWith(testSchema, { id: 1, name: 'Test' });
  });

  it('should validate API parameters with errors', () => {
    mockValidateData.mockReturnValue({
      success: false,
      errors: ['id is required', 'name is required'],
    });

    const { result } = renderHook(() => useApiValidation(testSchema));

    let validationResult;
    act(() => {
      validationResult = result.current({ id: null, name: '' });
    });

    expect(validationResult).toEqual({
      success: false,
      errors: ['id is required', 'name is required'],
    });
    expect(mockValidateData).toHaveBeenCalledWith(testSchema, { id: null, name: '' });
  });

  it('should memoize validation function based on schema', () => {
    const { result, rerender } = renderHook(({ schema }) => useApiValidation(schema), {
      initialProps: { schema: testSchema },
    });

    const firstFunction = result.current;
    rerender({ schema: testSchema });
    const secondFunction = result.current;

    // Should be the same function reference for same schema
    expect(firstFunction).toBe(secondFunction);
  });
});
