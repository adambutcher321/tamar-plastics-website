import eslint from '@eslint/js';
import tsPlugin from 'typescript-eslint';

export default [
  {
    ignores: ['.next/**', 'node_modules/**', 'build/**', '.git/**', '.out/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
    languageOptions: {
      parser: tsPlugin.parser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'no-var': 'error',
      'eqeqeq': 'warn',
    },
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
    },
    rules: {
      'no-var': 'error',
      'eqeqeq': 'warn',
    },
  },
];
