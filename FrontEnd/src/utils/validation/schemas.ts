import Joi from 'joi';
import * as Yup from 'yup';
// =============================================
// STUDENT VALIDATION SCHEMAS
// =============================================

export const studentCreateSchema = Joi.object({
  firstName: Joi.string().min(1).max(50).required().trim().messages({
    'any.required': 'First name is required',
    'string.base': 'First name is required',
    'string.min': 'First name cannot be empty',
    'string.max': 'First name cannot exceed 50 characters',
  }),

  lastName: Joi.string().min(1).max(50).required().trim().messages({
    'any.required': 'Last name is required',
    'string.base': 'Last name is required',
    'string.min': 'Last name cannot be empty',
    'string.max': 'Last name cannot exceed 50 characters',
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .trim()
    .lowercase()
    .messages({
      'any.required': 'Email is required',
      'string.email': 'Please enter a valid email address',
    }),

  // Accept common phone formats (digits, spaces, dashes, parentheses, plus)
  phone: Joi.string()
    .pattern(/^[0-9\-\s\(\)\+]+$/)
    .required()
    .messages({
      'any.required': 'Phone number is required',
      'string.pattern.base': 'Please enter a valid phone number',
    }),

  // Birthdate is optional on the frontend; if present it must not be in the future
  birthdate: Joi.date().iso().max('now').optional().messages({
    'date.max': 'Birth date cannot be in the future',
    'date.iso': 'Please enter a valid date',
  }),

  beltRank: Joi.string()
    .valid('White', 'Yellow', 'Orange', 'Green', 'Blue', 'Brown', 'Black')
    .required()
    .messages({
      'any.required': 'Belt rank is required',
      'any.only': 'Please select a valid belt rank',
    }),

  joinDate: Joi.date().iso().max('now').optional().messages({
    'date.max': 'Join date cannot be in the future',
    'date.iso': 'Please enter a valid date',
  }),

  activeIndicator: Joi.number().valid(0, 1).default(1).messages({
    'any.only': 'Active indicator must be 0 or 1',
  }),
}).unknown(true);

export const studentUpdateSchema = studentCreateSchema
  .keys({
    id: Joi.number().integer().positive().required().messages({
      'any.required': 'Student ID is required',
      'number.positive': 'Student ID must be a positive number',
    }),
  })
  .fork(
    ['firstName', 'lastName', 'email', 'phone', 'birthdate', 'beltRank', 'joinDate'],
    (schema) => schema.optional()
  );

// =============================================
// TECHNIQUE DEFINITION SCHEMAS
// =============================================

export const techniqueDefinitionSchema = Joi.object({
  name: Joi.string().min(1).max(100).required().trim().messages({
    'any.required': 'Technique name is required',
    'string.min': 'Technique name cannot be empty',
    'string.max': 'Technique name cannot exceed 100 characters',
  }),

  description: Joi.string().max(500).allow('').trim().messages({
    'string.max': 'Description cannot exceed 500 characters',
  }),

  difficulty_level: Joi.string()
    .valid('Beginner', 'Intermediate', 'Advanced', 'Expert')
    .required()
    .messages({
      'any.required': 'Difficulty level is required',
      'any.only': 'Please select a valid difficulty level',
    }),

  belt_requirement: Joi.string()
    .valid('White', 'Yellow', 'Orange', 'Green', 'Blue', 'Brown', 'Black')
    .required()
    .messages({
      'any.required': 'Belt requirement is required',
      'any.only': 'Please select a valid belt requirement',
    }),
});

export const kickDefinitionSchema = techniqueDefinitionSchema.keys({
  kick_type: Joi.string()
    .valid('Front', 'Side', 'Roundhouse', 'Back', 'Hook', 'Axe', 'Crescent')
    .required()
    .messages({
      'any.required': 'Kick type is required',
      'any.only': 'Please select a valid kick type',
    }),
});

export const punchDefinitionSchema = techniqueDefinitionSchema.keys({
  punch_type: Joi.string()
    .valid('Jab', 'Cross', 'Hook', 'Uppercut', 'Backfist', 'Hammer Fist')
    .required()
    .messages({
      'any.required': 'Punch type is required',
      'any.only': 'Please select a valid punch type',
    }),
});

export const stanceDefinitionSchema = techniqueDefinitionSchema.keys({
  stance_type: Joi.string()
    .valid('Fighting', 'Forward', 'Horse', 'Back', 'Cat', 'Crane')
    .required()
    .messages({
      'any.required': 'Stance type is required',
      'any.only': 'Please select a valid stance type',
    }),
});

export const oneStepUpdateValidationSchema = Yup.object({
  name: Yup.string().trim().min(2, 'Too short').max(100, 'Too long').required('Required'),
  description: Yup.string().trim().max(2000, 'Too long').optional(),
  beltRank: Yup.string().trim().required('Required'),
  beltColor: Yup.string().trim().required('Required'),
  followUpBeltRank: Yup.string().trim().optional(),
  followUpBeltColor: Yup.string().trim().optional(),
  secondFollowUpBeltRank: Yup.string().trim().optional(),
  secondFollowUpBeltColor: Yup.string().trim().optional(),
  defense: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  keyPoints: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  commonMistakes: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  firstFollowUp: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  secondFollowUp: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  comment: Yup.string().trim().max(1000, 'Too long').optional(),
});

export const oneStepCreationValidationSchema = Yup.object({
  name: Yup.string().trim().min(2, 'Too short').max(100, 'Too long').required('Required'),
  description: Yup.string().trim().max(2000, 'Too long').optional(),
  beltRank: Yup.string().trim().required('Required'),
  beltColor: Yup.string().trim().required('Required'),
  followUpBeltRank: Yup.string().trim().optional(),
  followUpBeltColor: Yup.string().trim().optional(),
  secondFollowUpBeltRank: Yup.string().trim().optional(),
  secondFollowUpBeltColor: Yup.string().trim().optional(),
  defense: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  keyPoints: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  commonMistakes: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  firstFollowUp: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  secondFollowUp: Yup.array(Yup.string().trim().max(500, 'Too long')).default([]),
  comment: Yup.string().trim().max(1000, 'Too long').optional(),
});

// =============================================
// FORM VALIDATION SCHEMAS
// =============================================

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .trim()
    .lowercase()
    .messages({
      'any.required': 'Email is required',
      'string.email': 'Please enter a valid email address',
    }),

  password: Joi.string().min(6).required().messages({
    'any.required': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
  }),
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    'any.required': 'Current password is required',
  }),

  newPassword: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required()
    .messages({
      'any.required': 'New password is required',
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),

  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
    'any.required': 'Please confirm your password',
    'any.only': 'Passwords do not match',
  }),
});

// =============================================
// SEARCH AND FILTER SCHEMAS
// =============================================

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    'number.min': 'Page must be at least 1',
    'number.integer': 'Page must be a whole number',
  }),

  limit: Joi.number().integer().min(1).max(100).default(20).messages({
    'number.min': 'Limit must be at least 1',
    'number.max': 'Limit cannot exceed 100',
    'number.integer': 'Limit must be a whole number',
  }),

  sortBy: Joi.string()
    .valid('name', 'createdAt', 'updatedAt', 'belt_rank', 'join_date')
    .default('updatedAt')
    .messages({
      'any.only': 'Invalid sort field',
    }),

  sortOrder: Joi.string().valid('asc', 'desc').default('desc').messages({
    'any.only': 'Sort order must be "asc" or "desc"',
  }),
});

export const studentFilterSchema = paginationSchema.keys({
  belt_rank: Joi.string()
    .valid('White', 'Yellow', 'Orange', 'Green', 'Blue', 'Brown', 'Black')
    .optional(),

  active_indicator: Joi.number().valid(0, 1).optional(),

  search: Joi.string().max(100).trim().optional().messages({
    'string.max': 'Search term cannot exceed 100 characters',
  }),
});

// =============================================
// API ENVIRONMENT VALIDATION
// =============================================

export const apiConfigSchema = Joi.object({
  NEXT_PUBLIC_API_PATH: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required()
    .messages({
      'any.required': 'API path is required',
      'string.uri': 'API path must be a valid URL',
    }),

  NEXT_PUBLIC_APP_ENV: Joi.string()
    .valid('development', 'staging', 'production')
    .default('development')
    .messages({
      'any.only': 'App environment must be development, staging, or production',
    }),
});

// =============================================
// UTILITY FUNCTIONS
// =============================================

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: string[];
}

export function validateData<T>(schema: Joi.ObjectSchema<T>, data: unknown): ValidationResult<T> {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return {
      success: false,
      errors: error.details.map((detail) => detail.message),
    };
  }

  return {
    success: true,
    data: value,
  };
}

export function getFieldErrors(schema: Joi.ObjectSchema, data: unknown): Record<string, string> {
  const { error } = schema.validate(data, { abortEarly: false });

  if (!error) return {};

  const fieldErrors: Record<string, string> = {};
  error.details.forEach((detail) => {
    const field = detail.path.join('.');
    if (!fieldErrors[field]) {
      fieldErrors[field] = detail.message;
    }
  });

  return fieldErrors;
}
