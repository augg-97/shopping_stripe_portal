import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { ESLint, Linter } from 'eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const files = ['**/*.ts'];
const ignores = ['node_modules/**/*', '**/*.json', 'dist/**/*'];

const configs: Linter.Config[] = [
  {
    files,
    ignores,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        tsconfigRootDir: __dirname,
        projectService: {
          defaultProject: 'tsconfig.eslint.json',
        },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin as Record<string, ESLint.Plugin>,
    },
  },
  {
    ...eslintPluginPrettierRecommended,
    files,
    ignores,
  },
  {
    files,
    ignores,
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
        },
        {
          usePrettierrc: false,
          fileInfoOptions: {
            withNodeModules: true,
          },
        },
      ],
      ...tsPlugin.configs.recommended.rules,
      'sort-imports': [
        'warn',
        {
          memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
          ignoreDeclarationSort: true,
          ignoreMemberSort: true,
          allowSeparatedGroups: true,
        },
      ],
      'no-console': ['warn'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/default-param-last': ['error'],
      '@typescript-eslint/no-array-delete': ['error'],
    },
  },
];

export default configs;
