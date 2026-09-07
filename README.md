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

Current university enrollment links in `_pages/dmcb.md` and `_pages/about.md` use program `prog-482` (fourth cycle). The homepage and Programs page lead visitors to `/dmcb/`; update the two direct enrollment links together when enrollment changes. The course page links to the published alumni podcast; the previous third-cycle poster is retained as an asset but no longer displayed there. Historical course pages are separate.

The Accelerator destination linked from the Programs page is hosted in MailerLite, independently of this Jekyll repository. See [reviewed replacement fragments and publication steps](docs/maintenance/accelerator/README.md). Merging this repository does not update that landing page.

## For Data Teams

`_pages/for-data-teams.md` serves `/for-data-teams/` and is linked from `_data/navigation.yml`. It contains the owner-provided training and advisory copy. Both discussion calls to action use the existing Calendly destination, `https://calendly.com/antonisangelakis`. Page styling is scoped to `.data-teams-page` in `assets/css/main.scss`. Update the page and navigation together if its URL changes.

## Social preview

The site description and canonical URL are defined in `_config.yml`. The default Open Graph image is `assets/images/social/data-conscious-preview.png`, a 1200×630 card using the centered DataConscious mark. The homepage repeats the image and its dimensions under `header.og_image` so compatible clients request a large image card. The shared layout relies on `_includes/seo.html` as its single metadata source; do not add a second `{% seo %}` tag. Rebuild the site and inspect the generated Open Graph and Twitter metadata after changing the description or preview image.

## DataConscious navigation and visual identity

Header and footer navigation use the same order: Home, Programs, For Teams, Insights, Speaking, About and DataConscious Labs. Programs (`_pages/programs.md`) groups individual and team offers. The Labs screenshots are part of the working-architecture section on For Data Teams; there is no separate Projects page. Existing course, About and Insights permalinks are unchanged.

`index.md` is the sole homepage. The inherited paginated article listing moved to `articles/index.html`; the archive is linked from Insights. Pagination uses `/articles/page:num/`, and the existing `/page2/` address redirects to its new location.

`_pages/tag-archive.md` serves `/tags/`, which is the destination used by article tag links. Keep it in place when changing the Insights structure so taxonomy links remain browsable.

The shared identity uses the existing MailerLite Labs logo URL, Poppins (Google Fonts), white backgrounds, charcoal text and Labs gold (#e5b600) for primary actions. The website uses dark button text for contrast. These external logo/font resources require network access. Homepage styling is under `.brand-home` in `assets/css/main.scss`; the old homepage inline CSS was removed.

The newsletter retains MailerLite form `veywtM`, in an expandable block lower on the homepage. No subscriber destination was changed. The workshop photograph already existed in the repository. Five unique screenshots supplied by the owner live in `assets/images/lab/`; the duplicate dbt attachment is stored once. Captions distinguish demonstration DAGs and a failed contract check from successful production output. Screenshots have not been retouched. The About profile uses the owner-supplied `assets/images/me/antonis-profile-2026.jpeg`; no stock or generated imagery was introduced.

The main site is reviewed through this PR. Existing Labs logo, font and palette were used as the visual reference; this redesign does not change MailerLite content or publish new main-site URLs there before they exist. Future MailerLite edits are applied directly in its editor per the owner's instruction.

## UI consistency and accessibility

See [UI review and design system](docs/maintenance/ui-review.md) for palette, typography, rounded components, navigation states, page coverage and verification limits. Change the Sass tokens before theme imports when adjusting the shared palette. Navigation JavaScript changes require regenerating `assets/js/main.min.js` using `npm run build:js`.

## Recommendations

`_data/testimonials.yml` contains the three recommendations transcribed from owner-supplied LinkedIn screenshots. `_includes/testimonials.html` renders exact excerpts on the homepage and full text on About, with author, relationship context and recommendation date. Do not imply company endorsement or Accelerator participation: these comments concern past course, mentoring and colleague experiences. Each excerpt links to its full on-site recommendation. Profile URLs and portraits were not invented or extracted.
