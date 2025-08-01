import Joi from 'joi';

// Frontend environment configuration validation schema
export const frontendConfigSchema = Joi.object({
  // Next.js public environment variables
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

  NEXT_PUBLIC_APP_NAME: Joi.string().default('Tough Nose Karate').messages({
    'string.base': 'App name must be a string',
  }),

  // Optional: Analytics and tracking
  NEXT_PUBLIC_GA_TRACKING_ID: Joi.string()
    .pattern(/^G-[A-Z0-9]+$/)
    .optional()
    .messages({
      'string.pattern.base': 'Google Analytics tracking ID must be in format G-XXXXXXXXXX',
    }),

  // Optional: Feature flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: Joi.boolean().default(false),

  NEXT_PUBLIC_ENABLE_DEBUG: Joi.boolean().default(false),

  // Client-side encryption (if needed)
  NEXT_PUBLIC_CRYPTO_KEY: Joi.string().min(16).optional().messages({
    'string.min': 'Crypto key must be at least 16 characters long',
  }),

  // API versioning
  NEXT_PUBLIC_API_VERSION: Joi.string()
    .pattern(/^v\d+$/)
    .default('v1')
    .messages({
      'string.pattern.base': 'API version must be in format v1, v2, etc.',
    }),
});

// Environment configuration interface
export interface FrontendConfig {
  NEXT_PUBLIC_API_PATH: string;
  NEXT_PUBLIC_APP_ENV: 'development' | 'staging' | 'production';
  NEXT_PUBLIC_APP_NAME: string;
  NEXT_PUBLIC_GA_TRACKING_ID?: string;
  NEXT_PUBLIC_ENABLE_ANALYTICS: boolean;
  NEXT_PUBLIC_ENABLE_DEBUG: boolean;
  NEXT_PUBLIC_CRYPTO_KEY?: string;
  NEXT_PUBLIC_API_VERSION: string;
}

// Validate and get frontend configuration
export function validateFrontendConfig(): FrontendConfig {
  const config = {
    NEXT_PUBLIC_API_PATH: process.env.NEXT_PUBLIC_API_PATH,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV || 'development',
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Tough Nose Karate',
    NEXT_PUBLIC_GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
    NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    NEXT_PUBLIC_ENABLE_DEBUG: process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true',
    NEXT_PUBLIC_CRYPTO_KEY: process.env.NEXT_PUBLIC_CRYPTO_KEY,
    NEXT_PUBLIC_API_VERSION: process.env.NEXT_PUBLIC_API_VERSION || 'v1',
  };

  const { error, value } = frontendConfigSchema.validate(config, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message).join(', ');
    throw new Error(`Frontend environment validation failed: ${errorMessages}`);
  }

  return value;
}

// Configuration instance
let configInstance: FrontendConfig | null = null;

// Get validated configuration (singleton pattern)
export function getConfig(): FrontendConfig {
  if (!configInstance) {
    configInstance = validateFrontendConfig();
  }
  return configInstance;
}

// Helper functions
export function isProduction(): boolean {
  return getConfig().NEXT_PUBLIC_APP_ENV === 'production';
}

export function isDevelopment(): boolean {
  return getConfig().NEXT_PUBLIC_APP_ENV === 'development';
}

export function isStaging(): boolean {
  return getConfig().NEXT_PUBLIC_APP_ENV === 'staging';
}

export function getApiUrl(endpoint: string = ''): string {
  const config = getConfig();
  const baseUrl = config.NEXT_PUBLIC_API_PATH;
  const version = config.NEXT_PUBLIC_API_VERSION;

  // Remove leading slash from endpoint if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

  if (cleanEndpoint) {
    return `${baseUrl}/${version}/${cleanEndpoint}`;
  }

  return `${baseUrl}/${version}`;
}

export function shouldEnableAnalytics(): boolean {
  const config = getConfig();
  return config.NEXT_PUBLIC_ENABLE_ANALYTICS && isProduction();
}

export function shouldEnableDebug(): boolean {
  const config = getConfig();
  return config.NEXT_PUBLIC_ENABLE_DEBUG || isDevelopment();
}

// Runtime configuration validation for client-side
export function validateRuntimeConfig(): void {
  try {
    getConfig();
    if (shouldEnableDebug()) {
      console.log('✅ Frontend configuration validated successfully');
    }
  } catch (error) {
    console.error('❌ Frontend configuration validation failed:', error);

    // In development, show a more helpful error
    if (isDevelopment()) {
      alert(`Configuration Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    throw error;
  }
}
