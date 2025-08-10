module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // React Rules
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'react/prop-types': 'off', // Using TypeScript for prop validation
    'react/jsx-uses-react': 'off', // Not needed in React 17+
    'react/jsx-uses-vars': 'error',
    'react/jsx-key': 'warn',
    'react/no-unescaped-entities': 'warn',

    // React Hooks Rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // TypeScript Rules
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    // General JavaScript Rules
    'no-console': 'off', // Allow console in development
    'no-debugger': 'warn',
    'prefer-const': 'warn',
    'no-var': 'error',
    eqeqeq: 'warn',
    'no-unused-vars': 'off', // Using TypeScript version instead

    // Accessibility Rules (basic)
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    'react/jsx-max-props-per-line': [1, { maximum: 1, when: 'multiline' }],
    // Prettier integration
    'prettier/prettier': 'warn',

    // Custom Rules
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@/*'],
            message: 'Path alias imports are not allowed. Use relative imports instead.',
          },
        ],
      },
    ],
  },
  ignorePatterns: ['node_modules/', '.next/', 'out/', 'public/', 'coverage/'],
};
