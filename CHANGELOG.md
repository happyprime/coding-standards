# Changelog

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/).

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

[1.0.0-alpha1]: https://github.com/happyprime/coding-standards/releases/tag/1.0.0-alpha1
