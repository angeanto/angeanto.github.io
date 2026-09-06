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

After dependency installation was fixed, the preview built the site successfully but failed in the separate Algolia indexing step with an unreachable-server error. Site search is disabled in `_config.yml`, so `netlify.toml` now runs only `bundle exec jekyll build`. Deployments no longer depend on the unavailable search service or update its index.

If search is restored later, validate the Algolia application and credentials and design indexing separately from pull-request previews. Do not run indexing as a local build test: it writes to an external index.

Work on branches and submit changes for pull-request review. Never merge into `main` or `master` automatically.

## Course content and external Accelerator page

Current university enrollment links in `index.md`, `_pages/dmcb.md`, and `_pages/about.md` use program `prog-482` (fourth cycle). Update all three when enrollment changes. The course page links to the published alumni podcast; the previous third-cycle poster is retained as an asset but no longer displayed there. Historical course pages are separate.

The navigation's Accelerator destination is hosted in MailerLite, independently of this Jekyll repository. See [reviewed replacement fragments and publication steps](docs/maintenance/accelerator/README.md). Merging this repository does not update that landing page.
