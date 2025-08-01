import React, { useState, useCallback, useMemo } from 'react';
import Joi from 'joi';
import { validateData, getFieldErrors, ValidationResult } from '../utils/validation/schemas';

interface UseValidationOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnSubmit?: boolean;
}

interface ValidationState {
  errors: Record<string, string>;
  isValid: boolean;
  isValidating: boolean;
  hasBeenValidated: boolean;
}

interface UseValidationReturn<T> {
  // Validation state
  errors: Record<string, string>;
  isValid: boolean;
  isValidating: boolean;
  hasBeenValidated: boolean;
  
  // Methods
  validate: (data: unknown) => ValidationResult<T>;
  validateField: (fieldName: string, value: unknown) => string | undefined;
  clearErrors: () => void;
  clearFieldError: (fieldName: string) => void;
  setFieldError: (fieldName: string, error: string) => void;
  
  // Event handlers for forms
  handleBlur: (fieldName: string, value: unknown) => void;
  handleChange: (fieldName: string, value: unknown) => void;
  handleSubmit: (data: unknown) => ValidationResult<T>;
}

export function useValidation<T>(
  schema: Joi.ObjectSchema<T>,
  options: UseValidationOptions = {}
): UseValidationReturn<T> {
  const {
    validateOnChange = false,
    validateOnBlur = true,
    validateOnSubmit = true,
  } = options;

  const [validationState, setValidationState] = useState<ValidationState>({
    errors: {},
    isValid: true,
    isValidating: false,
    hasBeenValidated: false,
  });

  // Validate entire form data
  const validate = useCallback((data: unknown): ValidationResult<T> => {
    setValidationState(prev => ({ ...prev, isValidating: true }));
    
    const result = validateData(schema, data);
    const errors = result.success ? {} : getFieldErrors(schema, data);
    
    setValidationState({
      errors,
      isValid: result.success,
      isValidating: false,
      hasBeenValidated: true,
    });

    return result;
  }, [schema]);

  // Validate a single field
  const validateField = useCallback((fieldName: string, value: unknown): string | undefined => {
    try {
      // Create a schema for just this field
      const fieldSchema = schema.extract(fieldName);
      const { error } = fieldSchema.validate(value);
      
      const errorMessage = error ? error.details[0]?.message : undefined;
      
      setValidationState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          [fieldName]: errorMessage || '',
        },
      }));

      return errorMessage;
    } catch (e) {
      // If field doesn't exist in schema, return undefined
      return undefined;
    }
  }, [schema]);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setValidationState(prev => ({
      ...prev,
      errors: {},
      isValid: true,
      hasBeenValidated: false,
    }));
  }, []);

  // Clear specific field error
  const clearFieldError = useCallback((fieldName: string) => {
    setValidationState(prev => {
      const newErrors = { ...prev.errors };
      delete newErrors[fieldName];
      
      return {
        ...prev,
        errors: newErrors,
      };
    });
  }, []);

  // Set specific field error
  const setFieldError = useCallback((fieldName: string, error: string) => {
    setValidationState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [fieldName]: error,
      },
      isValid: false,
    }));
  }, []);

  // Handle field blur events
  const handleBlur = useCallback((fieldName: string, value: unknown) => {
    if (validateOnBlur) {
      validateField(fieldName, value);
    }
  }, [validateField, validateOnBlur]);

  // Handle field change events
  const handleChange = useCallback((fieldName: string, value: unknown) => {
    // Clear existing error for this field when user starts typing
    if (validationState.errors[fieldName]) {
      clearFieldError(fieldName);
    }
    
    if (validateOnChange) {
      validateField(fieldName, value);
    }
  }, [validateField, validateOnChange, validationState.errors, clearFieldError]);

  // Handle form submission
  const handleSubmit = useCallback((data: unknown): ValidationResult<T> => {
    if (validateOnSubmit) {
      return validate(data);
    }
    
    return { success: true, data: data as T };
  }, [validate, validateOnSubmit]);

  // Memoized return object
  return useMemo(() => ({
    errors: validationState.errors,
    isValid: validationState.isValid,
    isValidating: validationState.isValidating,
    hasBeenValidated: validationState.hasBeenValidated,
    validate,
    validateField,
    clearErrors,
    clearFieldError,
    setFieldError,
    handleBlur,
    handleChange,
    handleSubmit,
  }), [
    validationState,
    validate,
    validateField,
    clearErrors,
    clearFieldError,
    setFieldError,
    handleBlur,
    handleChange,
    handleSubmit,
  ]);
}

// Higher-order component for form validation
export interface ValidatedFormProps<T> {
  schema: Joi.ObjectSchema<T>;
  onSubmit: (data: T) => void | Promise<void>;
  children: (validation: UseValidationReturn<T>) => React.ReactNode;
  validationOptions?: UseValidationOptions;
}

export function ValidatedForm<T>({
  schema,
  onSubmit,
  children,
  validationOptions,
}: ValidatedFormProps<T>) {
  const validation = useValidation(schema, validationOptions);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const result = validation.handleSubmit(data);
    
    if (result.success && result.data) {
      await onSubmit(result.data);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {children(validation)}
    </form>
  );
}

// Custom hook for API parameter validation
export function useApiValidation<T>(schema: Joi.ObjectSchema<T>) {
  return useCallback((params: unknown): ValidationResult<T> => {
    return validateData(schema, params);
  }, [schema]);
}
