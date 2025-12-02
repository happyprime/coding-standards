import importPlugin from 'eslint-plugin-import';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
	jsdocPlugin.configs['flat/recommended'],
	{
		plugins: {
			import: importPlugin,
		},
		rules: {
			...importPlugin.configs.recommended.rules,
			'import/no-unresolved': [2, { ignore: ['^@wordpress/'] }],
		},
	},
	{
		plugins: {
			'jsx-a11y': jsxA11yPlugin,
		},
		rules: jsxA11yPlugin.configs.recommended.rules,
	},
	{
		plugins: {
			react: reactPlugin,
		},
		rules: {
			...reactPlugin.configs.recommended.rules,
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
		},
		settings: {
			react: {
				version: '18',
			},
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
	},
	{
		plugins: {
			'react-hooks': reactHooksPlugin,
		},
		rules: reactHooksPlugin.configs.recommended.rules,
	},
	prettierRecommended,

	// Configuration for JS/MJS files.
	{
		files: ['**/*.{js,mjs}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.es2024,
			},
		},
		rules: {
			'no-console': ['warn', { allow: ['error'] }],
			'no-lonely-if': 'error',
			'jsdoc/no-undefined-types': 'off',
			'jsdoc/tag-lines': [
				'error',
				'any',
				{
					startLines: 1,
				},
			],
		},
	},

	// Configuration for CJS files.
	{
		files: ['**/*.cjs'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'commonjs',
			globals: {
				...globals.node,
				...globals.es2024,
			},
		},
		rules: {
			'no-console': ['warn', { allow: ['error'] }],
			'no-lonely-if': 'error',
			'jsdoc/no-undefined-types': 'off',
			'jsdoc/tag-lines': [
				'error',
				'any',
				{
					startLines: 1,
				},
			],
		},
	},

	// Ignore patterns.
	{
		ignores: [
			'build/*.*',
			'build/**/*.*',
			'**/build/*.*',
			'**/build/**/*.*',
			'vendor/**/*.*',
		],
	},
];
