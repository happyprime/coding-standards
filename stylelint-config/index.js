'use strict';

module.exports = {
	extends: 'stylelint-config-recommended',
	rules: {
		'font-weight-notation': [
			'numeric',
			{
				ignore: [ 'relative' ],
			},
		],
		indentation: 'tab',
		'selector-class-pattern': [
			'^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
			{
				message:
					'Selector should use lowercase and separate words with hyphens (selector-class-pattern)',
			},
		],
		'selector-id-pattern': [
			'^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
			{
				message:
					'Selector should use lowercase and separate words with hyphens (selector-id-pattern)',
			},
		],
	},
};
