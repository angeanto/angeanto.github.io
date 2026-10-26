# AI solutions page

`_pages/ai.md` serves `https://data-conscious.com/ai/` as part of the normal Jekyll website build and deployment. No subdomain, separate hosting project, DNS change, or custom build script is required. The homepage and navigation contain no inbound link to the page.

The page uses the current `single` layout and existing `.brand-home`, hero, card, grid, button and footer styles. No custom CSS or JavaScript is added. English copy follows the existing site. The source is the founders' Google Doc “AI Cases <> Thanos & Antonis”, reviewed on 2026-10-26. Internal comments, unfinished positioning, voice assistants and unverified client/results claims are omitted. CRM/ERP integrations depend on APIs and permissions.

## Visibility

The page has `robots: "noindex, follow"`, `sitemap: false` and `search: false`. It is publicly accessible to anyone with the URL; these settings do not provide authentication. Contact actions open an email draft to the existing author address. Shared site integrations follow the normal page behavior.

## Build and release

Use the locked Ruby/Bundler dependencies and normal site workflow:

```sh
build_dir=$(mktemp -d /tmp/data-conscious-build.XXXXXX)
bundle exec jekyll build --destination "$build_dir"
bundle exec jekyll doctor
```

Inspect `/ai/index.html`, its canonical URL and robots tag, section anchors, cards and contact links. Check that the homepage/navigation remain unchanged and the AI page is absent from `sitemap.xml`. Build outside the repository to preserve tracked generated files. Existing ignore rules cover this workflow.

The owner reviews and merges the pull request; agents must never merge into main/master. The existing website deployment publishes `/ai/` along with the rest of the site after the reviewed source is released. No Papaki or Cloudflare DNS changes are needed.

## Superseded subdomain work

The original `_ai/` build script/configuration and all subdomain-specific shared-template changes have been removed. The earlier Cloudflare upload draft named `data-conscious-ai` was abandoned before the final deployment action. The Workers & Pages list showed “No projects found” after leaving the draft; no deployed project remained. No custom subdomain or DNS record was configured.

## Verification (2026-10-26)

The standard Jekyll build and doctor passed using locked dependencies. Generated output confirmed `/ai/index.html`, the canonical `https://data-conscious.com/ai/`, `noindex, follow`, sitemap exclusion and no homepage link. `git diff --check` passed. Main-site templates have no remaining changes relative to the base branch. Production publication awaits the owner’s PR review and release.
