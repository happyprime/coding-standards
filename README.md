# Happy Prime coding standards

PHP_CodeSniffer ruleset, PHPStan config, and shared JS/CSS tooling configs used across
Happy Prime projects.

## What's in here

| Path | What it is |
| --- | --- |
| `HappyPrime/ruleset.xml` | The `HappyPrime` phpcs standard — WPCS + PHPCompatibilityWP + VariableAnalysis |
| `phpstan.neon.dist` | PHPStan level 1 with WordPress, WP-CLI, and test stubs pre-scanned |
| `common-configs/` | Shared editorconfig, prettier, stylelint, postcss, webpack configs |
| `eslint-config/`, `stylelint-config/`, `postcss-config/` | Published npm packages |

## Install

```sh
composer require --dev happyprime/coding-standards:^1.0@alpha
```

The `1.0.0-alpha` line tracks the PHPCompatibility 10 alpha, which has no stable release yet. Composer will refuse the install unless your root `composer.json` opts in to prereleases:

```json
{
    "minimum-stability": "dev",
    "prefer-stable": true
}
```

### Drop the php-compatibility hack

Projects that worked around the missing PHPCompatibility 9.x release with an inline
`package` repository should delete it:

```json
"repositories": [
    {
        "type": "package",
        "package": {
            "name": "phpcompatibility/php-compatibility",
            "version": "9.99.9",
            "source": { "type": "git", "url": "...", "reference": "develop" }
        }
    }
]
```

## Usage

`phpcs.xml.dist`:

```xml
<?xml version="1.0"?>
<ruleset name="Project">
	<rule ref="HappyPrime"/>
	<file>.</file>
</ruleset>
```

`phpstan.neon`:

```neon
includes:
    - vendor/happyprime/coding-standards/phpstan.neon.dist
```

`testVersion` defaults to `7.4-`. Override it in your own ruleset if the project has a
higher floor:

```xml
<config name="testVersion" value="8.1-"/>
```
