import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import globals from 'globals';

const TS_FILES = ['**/*.{ts,tsx,mts,cts}'];
const SVELTE_FILES = ['**/*.svelte'];

export default [
    {
        ignores: ['node_modules/**', 'temp/**', 'main.js'],
    },
    {
        ...js.configs.recommended,
        files: ['**/*.{js,cjs,mjs,ts,tsx,mts,cts}'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
    ...tseslint.configs.recommended.map((config) =>
        config.files ? config : { ...config, files: TS_FILES },
    ),
    ...svelte.configs['flat/recommended'].map((config) =>
        config.files ? config : { ...config, files: SVELTE_FILES },
    ),
    {
        files: SVELTE_FILES,
        languageOptions: {
            parser: svelteParser,
            parserOptions: {
                parser: tseslint.parser,
                extraFileExtensions: ['.svelte'],
                sourceType: 'module',
            },
        },
    },
    {
        files: ['**/*.{js,cjs,mjs,ts,tsx,mts,cts,svelte}'],
        plugins: {
            svelte,
            '@typescript-eslint': tseslint.plugin,
        },
        rules: {
            'svelte/valid-compile': ['error', { ignoreWarnings: true }],
            'svelte/no-at-html-tags': 'off',
            'svelte/require-each-key': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            'no-prototype-builtins': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            'no-console': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
        },
    },
];
