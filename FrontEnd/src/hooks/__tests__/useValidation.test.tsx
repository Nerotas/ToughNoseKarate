import { renderHook, act } from '@testing-library/react';
import { useValidation } from '../useValidation';
import { studentCreateSchema } from '../../utils/validation/schemas';

describe('useValidation', () => {
  const testData = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    birthdate: '2000-01-01',
    belt_rank: 'White',
    join_date: '2024-01-01',
    active_indicator: 1,
  };

  const invalidData = {
    first_name: '',
    last_name: '',
    email: 'invalid-email',
    phone: '',
    birthdate: '2050-01-01', // Future date
    belt_rank: 'Invalid',
    join_date: '',
  };

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useValidation(studentCreateSchema));

    expect(result.current.errors).toEqual({});
    expect(result.current.isValid).toBe(true);
    expect(result.current.isValidating).toBe(false);
    expect(result.current.hasBeenValidated).toBe(false);
  });

  it('should validate valid data successfully', () => {
    const { result } = renderHook(() => useValidation(studentCreateSchema));

    act(() => {
      const validationResult = result.current.validate(testData);
      expect(validationResult.success).toBe(true);
      expect(validationResult.data).toEqual(expect.objectContaining(testData));
    });

    expect(result.current.isValid).toBe(true);
    expect(result.current.hasBeenValidated).toBe(true);
    expect(result.current.errors).toEqual({});
  });

  it('should return errors for invalid data', () => {
    const { result } = renderHook(() => useValidation(studentCreateSchema));

    act(() => {
      const validationResult = result.current.validate(invalidData);
      expect(validationResult.success).toBe(false);
    });

    expect(result.current.isValid).toBe(false);
    expect(result.current.hasBeenValidated).toBe(true);
    expect(Object.keys(result.current.errors)).toHaveLength(6); // Should have errors for multiple fields
    expect(result.current.errors.first_name).toContain('cannot be empty');
    expect(result.current.errors.email).toContain('valid email');
  });

  it('should validate individual fields', () => {
    const { result } = renderHook(() => useValidation(studentCreateSchema));

    act(() => {
      const error = result.current.validateField('email', 'invalid-email');
      expect(error).toContain('valid email');
    });

    expect(result.current.errors.email).toContain('valid email');
  });

  it('should clear errors', () => {
    const { result } = renderHook(() => useValidation(studentCreateSchema));

    // First add some errors
    act(() => {
      result.current.validate(invalidData);
    });

    expect(result.current.isValid).toBe(false);
    expect(Object.keys(result.current.errors)).toHaveLength(6);

    // Then clear them
    act(() => {
      result.current.clearErrors();
    });

    expect(result.current.errors).toEqual({});
    expect(result.current.isValid).toBe(true);
    expect(result.current.hasBeenValidated).toBe(false);
  });

  it('should clear individual field errors', () => {
    const { result } = renderHook(() => useValidation(studentCreateSchema));

    // Add errors
    act(() => {
      result.current.validate(invalidData);
    });

    const initialErrorCount = Object.keys(result.current.errors).length;
    expect(initialErrorCount).toBeGreaterThan(0);

    // Clear one field
    act(() => {
      result.current.clearFieldError('email');
    });

    expect(result.current.errors.email).toBeUndefined();
    expect(Object.keys(result.current.errors)).toHaveLength(initialErrorCount - 1);
  });

  it('should set field errors', () => {
    const { result } = renderHook(() => useValidation(studentCreateSchema));

    act(() => {
      result.current.setFieldError('email', 'Custom error message');
    });

    expect(result.current.errors.email).toBe('Custom error message');
    expect(result.current.isValid).toBe(false);
  });

  it('should handle blur events when validateOnBlur is true', () => {
    const { result } = renderHook(() =>
      useValidation(studentCreateSchema, { validateOnBlur: true })
    );

    act(() => {
      result.current.handleBlur('email', 'invalid-email');
    });

    expect(result.current.errors.email).toContain('valid email');
  });

  it('should handle change events when validateOnChange is true', () => {
    const { result } = renderHook(() =>
      useValidation(studentCreateSchema, { validateOnChange: true })
    );

    act(() => {
      result.current.handleChange('email', 'invalid-email');
    });

    expect(result.current.errors.email).toContain('valid email');
  });

  it('should clear errors on change when validateOnChange is false', () => {
    const { result } = renderHook(() =>
      useValidation(studentCreateSchema, { validateOnChange: false })
    );

    // First add an error
    act(() => {
      result.current.setFieldError('email', 'Some error');
    });

    expect(result.current.errors.email).toBe('Some error');

    // Then trigger change (should clear the error)
    act(() => {
      result.current.handleChange('email', 'new-value');
    });

    expect(result.current.errors.email).toBeUndefined();
  });

  it('should handle submit with validation', () => {
    const { result } = renderHook(() =>
      useValidation(studentCreateSchema, { validateOnSubmit: true })
    );

    // Test valid submit
    act(() => {
      const submitResult = result.current.handleSubmit(testData);
      expect(submitResult.success).toBe(true);
    });

    // Test invalid submit
    act(() => {
      const submitResult = result.current.handleSubmit(invalidData);
      expect(submitResult.success).toBe(false);
    });
  });

  it('should skip validation on submit when validateOnSubmit is false', () => {
    const { result } = renderHook(() =>
      useValidation(studentCreateSchema, { validateOnSubmit: false })
    );

    act(() => {
      const submitResult = result.current.handleSubmit(invalidData);
      expect(submitResult.success).toBe(true); // Should pass even with invalid data
    });
  });
});
