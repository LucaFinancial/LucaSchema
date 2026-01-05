import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['dist/**', 'coverage/**', '**/*.json']
  },
  {
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2023,
      sourceType: 'module'
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      'prettier/prettier': ['error']
    }
  }
];
