const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^services/(.*)$': '<rootDir>/src/services/$1',
    '^testingUtils/(.*)$': '<rootDir>/src/testingUtils/$1',
    '^constants/(.*)$': '<rootDir>/src/constants/$1',
    '^wrappers/(.*)$': '<rootDir>/src/wrappers/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/app/layout.tsx',
    '!src/app/global.css',
    '!src/**/page.tsx',
    '!coverage/**',
    '!.next/**',
  ],
  coverageThreshold: {
    global: {
      functions: 15,
      lines: 30,
      statements: 30,
    },
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/models/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  transformIgnorePatterns: ['/node_modules/(?!(.*\\.mjs$|@mui|@emotion))'],

  coveragePathIgnorePatterns: [
    'src/types',
    'src/constants',
    'src/services/testingUtils',
    'src/models',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
