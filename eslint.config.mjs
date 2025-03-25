/** @format */

const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const path = require('path');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: ['prettier', '@typescript-eslint', 'react', 'react-hooks'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        'prefer-arrow-callback': ['error'],
        'prefer-template': ['error'],
        'no-var': ['error'],
        'no-unused-vars': ['off'],
        'no-undef': ['error'],
        'no-constant-condition': ['error'],
        'prefer-const': ['error'],
        'no-else-return': ['error'],
        'no-useless-return': ['error'],
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/explicit-function-return-type': ['error'],
        '@typescript-eslint/explicit-module-boundary-types': ['error'],
        '@typescript-eslint/no-inferrable-types': ['off'],
        '@typescript-eslint/typedef': [
            'error',
            {
                variableDeclaration: true,
                parameter: true,
                arrowParameter: true,
                propertyDeclaration: true,
                memberVariableDeclaration: true,
            },
        ],
        '@typescript-eslint/no-explicit-any': ['error'],
        '@typescript-eslint/consistent-type-assertions': [
            'error',
            {
                assertionStyle: 'as',
                objectLiteralTypeAssertions: 'never',
            },
        ],
        '@typescript-eslint/no-use-before-define': [
            'error',
            {
                functions: false,
                classes: true,
                variables: true,
            },
        ],
        'prettier/prettier': [
            'error',
            {
                useTabs: false,
                tabWidth: 4,
                singleQuote: true,
                semi: true,
                arrowParens: 'always',
                trailingComma: 'es5',
                endOfLine: 'auto',
            },
        ],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
    },
    ignorePatterns: ['node_modules/', 'dist/', 'build/', '.next/', '.husky/'],
};
