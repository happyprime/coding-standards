import config from './index.js';

export default [
	...config,
	{
		rules: {
			// eslint-plugin-import's resolver does not understand `exports`-only
			// (ESM-only) packages such as eslint-plugin-jsdoc 64+.
			'import/no-unresolved': [
				2,
				{ ignore: ['^@wordpress/', '^eslint-plugin-jsdoc$'] },
			],
		},
	},
];
