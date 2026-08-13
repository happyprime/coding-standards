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

The `1.0.0-alpha1` line tracks the PHPCompatibility 10 alpha, which has no stable
release yet. Composer will refuse the install unless your root `composer.json` opts in
to prereleases:

```json
{
    "minimum-stability": "dev",
    "prefer-stable": true
}
```

Both keys are required. `prefer-stable` keeps every other dependency on its newest
stable release, so this does not turn your whole tree into a dev build.

### If you skip that, you get this

A `@dev` constraint inside a dependency is not a stability flag for your root project.
Composer only honors stability flags declared in the root `composer.json`, so
requiring `happyprime/coding-standards` alone fails with:

```
happyprime/coding-standards 1.0.0-alpha1 requires
phpcompatibility/phpcompatibility-wp ^3.0@dev -> found
phpcompatibility/phpcompatibility-wp[3.0.0-alpha1, 3.0.0-alpha2] but it does not
match your minimum-stability.
```

Adding `minimum-stability: dev` + `prefer-stable: true` resolves it.

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

That entry has no `dist`, so Composer installs it by `git clone`. It is the only phpcs
standard installed that way, which makes it the only one that can go missing without
a download failure — and when it does, every rule fails with
`ERROR: Referenced sniff "PHPCompatibility.<...>" does not exist` and the lint run
dies. The 10.0 alphas ship real dist zips, so the hack is no longer needed.

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

## Upgrading to 1.0.0-alpha1

### PHPCompatibility 10 renamed sniffs

The `HappyPrime` ruleset references `PHPCompatibilityWP` wholesale and needs no
changes. Project rulesets that `<exclude>` individual sniffs do — an `<exclude>` naming
a sniff that no longer exists is silently ignored, so the rule comes back on.

| PHPCompatibility 9.x | PHPCompatibility 10 |
| --- | --- |
| `PHPCompatibility.Classes.ForbiddenAbstractPrivateMethods` | `PHPCompatibility.FunctionDeclarations.AbstractPrivateMethods` |
| `PHPCompatibility.Miscellaneous.ValidIntegers` | `PHPCompatibility.Numbers.ValidIntegers` |
| `PHPCompatibility.Miscellaneous.ValidIntegers` (hex numeric string check only) | `PHPCompatibility.Numbers.RemovedHexadecimalNumericStrings` |
| `PHPCompatibility.Keywords.ForbiddenNamesAsDeclared` | Removed — folded into `PHPCompatibility.Keywords.ForbiddenNames` |
| `PHPCompatibility.Keywords.ForbiddenNamesAsInvokedFunctions` | Removed, no replacement |
| `PHPCompatibility.Upgrade.LowPHPCS` | Removed, no replacement |

Error codes that changed within surviving sniffs:

| 9.x code | 10 code |
| --- | --- |
| `PHPCompatibility.TypeCasts.RemovedTypeCasts.t_unset_castDeprecatedRemoved` | `...RemovedTypeCasts.unsetDeprecatedRemoved` |
| `PHPCompatibility.TypeCasts.RemovedTypeCasts.t_double_castDeprecatedRemoved` | `...RemovedTypeCasts.realDeprecatedRemoved` |
| `PHPCompatibility.FunctionDeclarations.NewParamTypeDeclarations.InvalidTypeHintFound` | Split; "long" types now report `InvalidLongTypeFound` |
| `PHPCompatibility.Classes.NewTypedProperties.InvalidType` | Split; "long" types now report `InvalidLongType` |

PHPCompatibility 10 also adds ~65 new sniffs covering PHP 8.1–8.5, so expect new
violations on code that passed under 9.3.5.

### PHPStan 2

`phpstan/phpstan` moved from `^1.10` to `^2.1`. PHPStan 2 validates `excludePaths` and
errors out on a path that does not exist, which broke the shipped config on projects
without a `node_modules` directory. The entries are now `.../vendor/*` and
`.../node_modules/*` — fnmatch patterns, which PHPStan does not require to exist.

Level 1 finds more in PHPStan 2 than in 1.x. Add a baseline if the jump is noisy:

```sh
vendor/bin/phpstan analyse --generate-baseline
```
