# DataConscious website

Personal Jekyll site for Antonis Angelakis, based on Minimal Mistakes.

## Build locally

Use Ruby 3.2.2 (`.ruby-version`) and Bundler 2.4.10 (`Gemfile.lock`). Activate the correct Ruby before running:

```sh
bundle install
build_dir=$(mktemp -d /tmp/angeanto-build.XXXXXX)
bundle exec jekyll build --destination "$build_dir" --trace
```

Use an external temporary destination because some generated `_site/` files are already tracked. Do not edit generated files directly.

## Netlify dependency installation

The lockfile supports macOS ARM and Netlify's Linux x86-64 environment. Keep both platforms when updating dependencies.

The initial PR #71 preview failed during dependency installation because the locked `rubyzip` 2.4 release was no longer available from RubyGems. The lockfile now uses 2.4.1, within the remote theme plugin's existing `< 3.0` requirement. A successful build with locally cached gems does not prove a fresh CI install can succeed; verify clean dependency installation when changing the lockfile.

`netlify.toml` currently builds the site and then runs Algolia indexing. Do not run that indexing command as a local test: it writes to an external index. Site search is disabled in `_config.yml`.

Work on branches and submit changes for pull-request review. Never merge into `main` or `master` automatically.
