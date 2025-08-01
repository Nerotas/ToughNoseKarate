import * as Joi from 'joi';

// Environment configuration validation schema
export const configValidationSchema = Joi.object({
  // Node environment
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  // Server configuration
  PORT: Joi.number().port().default(3001),

  // Database configuration
  DB_HOST: Joi.string().hostname().required().messages({
    'any.required': 'Database host is required',
    'string.hostname': 'Database host must be a valid hostname',
  }),

  DB_PORT: Joi.number().port().default(3306),

  DB_USERNAME: Joi.string().min(1).required().messages({
    'any.required': 'Database username is required',
    'string.min': 'Database username cannot be empty',
  }),

  DB_PASSWORD: Joi.string().allow('').required().messages({
    'any.required':
      'Database password is required (use empty string if no password)',
  }),

  DB_NAME: Joi.string().min(1).required().messages({
    'any.required': 'Database name is required',
    'string.min': 'Database name cannot be empty',
  }),

  // Optional: SSL configuration for production
  DB_SSL: Joi.boolean().default(false),

  // API configuration
  API_PREFIX: Joi.string().default('api'),

  // Google Services (optional)
  GOOGLE_SERVICE_ACCOUNT_EMAIL: Joi.string().email().optional(),

  GOOGLE_SERVICE_ACCOUNT_CLIENT_ID: Joi.string().optional(),

  GOOGLE_SERVICE_ACCOUNT_PROJECT_ID: Joi.string().optional(),

  GOOGLE_SERVICE_KEY_PATH: Joi.string().optional(),

  GOOGLE_SERVICE_ACCOUNT_KEY_ID: Joi.string().optional(),

  // Security
  JWT_SECRET: Joi.string()
    .min(32)
    .when('NODE_ENV', {
      is: 'production',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'string.min': 'JWT secret must be at least 32 characters long',
      'any.required': 'JWT secret is required in production environment',
    }),

  JWT_EXPIRATION: Joi.string().default('1d'),

  // Optional: Rate limiting
  THROTTLE_TTL: Joi.number().default(60),

  THROTTLE_LIMIT: Joi.number().default(10),

  // Optional: CORS origins
  CORS_ORIGINS: Joi.string().default(
    'http://localhost:3000,http://127.0.0.1:3000',
  ),
});

// Environment configuration interface
export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_SSL: boolean;
  API_PREFIX: string;
  GOOGLE_SERVICE_ACCOUNT_EMAIL?: string;
  GOOGLE_SERVICE_ACCOUNT_CLIENT_ID?: string;
  GOOGLE_SERVICE_ACCOUNT_PROJECT_ID?: string;
  GOOGLE_SERVICE_KEY_PATH?: string;
  GOOGLE_SERVICE_ACCOUNT_KEY_ID?: string;
  JWT_SECRET?: string;
  JWT_EXPIRATION: string;
  THROTTLE_TTL: number;
  THROTTLE_LIMIT: number;
  CORS_ORIGINS: string;
}

// Validation function that can be used during bootstrap
export function validateEnvironment(
  config: Record<string, unknown>,
): EnvironmentConfig {
  const { error, value } = configValidationSchema.validate(config, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    const errorMessages = error.details
      .map((detail) => detail.message)
      .join(', ');
    throw new Error(`Environment validation failed: ${errorMessages}`);
  }

  return value;
}

// Helper function to get parsed CORS origins
export function getCorsOrigins(config: EnvironmentConfig): string[] {
  return config.CORS_ORIGINS.split(',').map((origin) => origin.trim());
}

// Helper function to check if running in production
export function isProduction(config: EnvironmentConfig): boolean {
  return config.NODE_ENV === 'production';
}

// Helper function to check if running in development
export function isDevelopment(config: EnvironmentConfig): boolean {
  return config.NODE_ENV === 'development';
}

// Helper function to check if running in test
export function isTest(config: EnvironmentConfig): boolean {
  return config.NODE_ENV === 'test';
}
