module.exports = {
	extends: [
		'plugin:import/recommended',
		'plugin:jsdoc/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:prettier/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
	],
	env: {
		browser: true,
	},
	ignorePatterns: ['build/**/*.js', 'vendor/**/*.js'],
	parserOptions: {
		ecmaVersion: "latest",
	},
	env: {
		"es2024": true,
	},
	rules: {
		'no-console': ['warn', { allow: ['error'] }],
		'import/no-unresolved': [2, { ignore: ['^@wordpress/'] }],
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
		'jsdoc/no-undefined-types': 'off',
		'jsdoc/tag-lines': [
			'error',
			'any',
			{
				startLines: 1,
			},
		],
	},
	settings: {
		react: {
			version: '18',
		},
	}
};
