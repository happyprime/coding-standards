'use strict';

module.exports = {
	extends: 'stylelint-config-recommended',
	rules: {
		// Stylelint seems to have trouble properly tracking specificity
		// between nested blocks of CSS and this generally results in
		// false positives.
		'no-descending-specificity': null,

		// These rules don't account for WordPress's mix of `-` and `_` in
		// class and ID names.
		'selector-class-pattern': null,
		'selector-id-pattern': null,
	},
};
