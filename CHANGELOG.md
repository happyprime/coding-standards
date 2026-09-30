# Changelog

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Changed

- `php-stubs/wordpress-stubs` and `php-stubs/wordpress-tests-stubs` now require `^7.0`.
  Both have tagged 7.x releases, so the `7.0 as 6.9.4` inline alias is gone. Inline
  aliases only apply in a root `composer.json`, so the alias never reached consumers
  anyway, and the exact `7.0` pin kept them off 7.1.
- Require `szepeviktor/phpstan-wordpress` `^2.0.4`, the first release whose
  `php-stubs/wordpress-stubs` constraint (`>=6.6.2`) allows 7.x.
- Removed the `suggest` entry for `dealerdirect/phpcodesniffer-composer-installer`,
  which is already required.

### npm packages

All three packages now require Node 22 or later (Node 20 reached end-of-life in
April 2026).

- `@happyprime/eslint-config`: `eslint-plugin-jsdoc` `^65`, `eslint-plugin-react-hooks`
  `^7.1`, `globals` `^17`. The `peerDependencies` had drifted behind the tested
  `devDependencies` (e.g. `eslint-plugin-react-hooks` `^5` vs `^7`) and now match them.
  `engines.node` is `^22.22.2 || >=24.15.0`, the range `eslint-plugin-jsdoc` 64+
  requires. Removed the `build`, `start` and `lint:package` scripts, which called tools
  that were never installed. ESLint stays on 9: `eslint-plugin-import`,
  `eslint-plugin-jsx-a11y` and `eslint-plugin-react` do not yet support ESLint 10.
- `@happyprime/stylelint-config`: requires `stylelint` `^17`. Synced with
  `stylelint-config-recommended` 18.0.0, which adds `media-type-no-deprecated`,
  `nesting-selector-no-missing-scoping-root`, `no-invalid-position-declaration` and
  `property-no-deprecated` (with `clip` ignored for WordPress's `.screen-reader-text`).
- `@happyprime/postcss-config`: `postcss-cli` `^12`, `postcss-import` `^17`,
  `postcss-preset-env` `^11`. `stylelint` is now a declared peer dependency, since
  `index.js` loads it.
- `common-configs/`: replaced `.eslintrc.js`, which ESLint 9 no longer reads, with a
  flat `eslint.config.mjs`.

## [1.0.0-alpha3] - 2026-08-19

### Changed

- `php-stubs/wp-cli-stubs` now requires `dev-master`. Its latest tag (2.12.0) caps
  `php-stubs/wordpress-stubs` at `^6.0`, which conflicts with the 7.0 stubs.

## [1.0.0-alpha2] - 2026-08-19

### Changed

- Updated `php-stubs/wordpress-stubs` and `php-stubs/wordpress-tests-stubs` to `7.0 as 6.9.4`. The stubs are now at 7.0 and can, but latest tagged version of those repositories is still 6.9.4.
- Updated `sirbrillig/phpcs-variable-analysis` to `^3`.

## [1.0.0-alpha1] - 2026-08-13

First tagged release. Prior consumers tracked `dev-trunk`.

### Changed

- Move the PHPCompatibility stack onto its 10.0 alpha line:
  `phpcompatibility/php-compatibility` `^10.0@dev`,
  `phpcompatibility/phpcompatibility-wp` `^3.0@dev`, and a now-explicit
  `phpcompatibility/phpcompatibility-paragonie` `^2.0@dev`. These have real dist zips,
  which retires the inline `package` repository pinning a `develop` commit as
  `9.99.9` — the git-source install that could silently go missing and take the whole
  lint run down with `Referenced sniff "PHPCompatibility.<...>" does not exist`.
- Replace every `*` version constraint with a caret range. A `*` let a downstream
  `composer update` pull a new major into the ruleset without warning.
- Require `squizlabs/php_codesniffer` explicitly at `^3.13.3` instead of inheriting it
  transitively. `^3.13.3` is the floor PHPCompatibility 10 sets; the 3.x ceiling is
  what WPCS 3.4 supports.
- Upgrade the PHPStan stack to 2.x: `phpstan/phpstan` `^2.1`,
  `phpstan/phpstan-phpunit` `^2.0`, `szepeviktor/phpstan-wordpress` `^2.0`,
  `phpstan/extension-installer` `^1.4`.
- `phpstan.neon.dist`: `excludePaths` entries are now fnmatch patterns
  (`.../vendor/*`, `.../node_modules/*`). PHPStan 2 validates `excludePaths` and aborts
  on a path that does not exist, which broke projects with no `node_modules`.
- Bump `wp-coding-standards/wpcs` to `^3.4` and
  `sirbrillig/phpcs-variable-analysis` to `^2.12`.

### Added

- Require `php-stubs/wordpress-stubs` (`^6.8`) directly. `phpstan.neon.dist` has always
  scanned it by path but relied on `szepeviktor/phpstan-wordpress` to pull it in.
- `README.md` with install instructions, the `minimum-stability` requirement for the
  alpha, and the PHPCompatibility 9 -> 10 sniff rename table.
- This changelog.

### Notes for consumers

- Requires `"minimum-stability": "dev"` and `"prefer-stable": true` in your root
  `composer.json`. A transitive `@dev` constraint is not a stability flag. See the
  README.
- `php` stays at `>=7.4` and `testVersion` stays at `7.4-`. Nothing in the alpha line
  forces a bump — PHPCompatibility 10 requires PHP `>=5.4` and PHPStan 2 requires
  `^7.4 || ^8.0`.
- PHPCompatibility 10 adds ~65 sniffs for PHP 8.1-8.5 and renames or removes six.
  Project rulesets that `<exclude>` individual PHPCompatibility sniffs need updating;
  an `<exclude>` for a sniff that no longer exists is ignored, so the rule silently
  comes back on.

[Unreleased]: https://github.com/happyprime/coding-standards/compare/1.0.0-alpha3...HEAD
[1.0.0-alpha3]: https://github.com/happyprime/coding-standards/releases/tag/1.0.0-alpha3
[1.0.0-alpha2]: https://github.com/happyprime/coding-standards/releases/tag/1.0.0-alpha2
[1.0.0-alpha1]: https://github.com/happyprime/coding-standards/releases/tag/1.0.0-alpha1
