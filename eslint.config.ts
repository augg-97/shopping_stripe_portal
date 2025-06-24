import tseslint, { ConfigArray } from 'typescript-eslint';
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import importPlugin from 'eslint-plugin-import';

const configs: ConfigArray = tseslint.config({
  files: ['**/*.ts'],
  ignores: ['node_modules/**/*', '**/*.json', 'dist/**/*'],
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: __dirname,
      projectService: {
        defaultProject: 'tsconfig.eslint.json',
      },
    },
  },
  extends: [
    eslint.configs.recommended,
    // TODO: Uncomment the following configs as needed
    // tseslint.configs.strictTypeChecked,
    // tseslint.configs.stylisticTypeChecked,
    tseslint.configs.recommended,
  ],
  plugins: {
    prettier: eslintPluginPrettierRecommended,
    import: importPlugin,
  },
  rules: {
    'prettier/prettier': ['error'],
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
    '@typescript-eslint/no-extraneous-class': [
      'error',
      {
        allowConstructorOnly: false,
        allowEmpty: true,
        allowStaticOnly: false,
        allowWithDecorator: true,
      },
    ],
    '@typescript-eslint/no-useless-constructor': 'off',
    'import/no-dynamic-require': 'warn',
    'import/no-nodejs-modules': 'warn',
    'import/no-unassigned-import': 'error',
    'import/order': [
      'error',
      {
        named: true,
        pathGroups: [
          {
            pattern:
              '@(@appConfigs|@decorators|@dtos|@exceptions|@guards|@helpers|@interceptors|@middlewares|@modules|@pkgs|@repositories|@services|@constants)/**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
      },
    ],
    'import/newline-after-import': ['error', { count: 1 }],
  },
});

export default configs;
