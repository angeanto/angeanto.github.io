# AI solutions subdomain

The AI services page is a separate static build for `https://ai.data-conscious.com/`.
Edit `_ai/index.md`; it uses the existing `single` layout, theme CSS, homepage hero, cards, buttons,
navigation, and footer. No custom styles or JavaScript are introduced. English copy
follows the existing site's language. The source is the founders' Google Doc
“AI Cases <> Thanos & Antonis”, reviewed on 2026-10-26. Draft positioning fields,
internal comments, voice assistants, client claims, and promised results are not
published. CRM/ERP integration is conditional on APIs and permissions.

## Isolation and visibility

`_ai/` is ignored by Jekyll's ordinary source discovery. The primary homepage,
navigation data, and primary `CNAME` are unchanged by this feature. The separate
build stages only shared presentation directories, configuration, and the AI page;
it does not copy posts, regular pages, maintenance docs, or deployment scripts.
The AI configuration sets the canonical host and disables search and analytics.
The shared head skips the newsletter loader on this build and renders the page
robots directive. The existing single SEO renderer is retained. Existing main-site behavior is retained. Navigation links on the AI site
lead back to the main domain where appropriate.

The AI page has `noindex, follow` and `sitemap: false`. This is an unlisted public
page, not an access-controlled page. Anyone with its URL can open or share it.
There is no inbound link from the homepage, navigation, search, or sitemap of the
primary build. Contact buttons open an email draft to the existing author address;
there is no new form, backend, or automatic message submission.

## Build and preview

Use the locked Ruby/Bundler dependencies, from the repository root:

```sh
ruby _ai/build.rb
```

The command prints a fresh temporary `public` directory ready for static hosting.
An explicit destination is also supported, but must not already exist:

```sh
ruby _ai/build.rb /tmp/data-conscious-ai-public
python3 -m http.server 4100 --directory /tmp/data-conscious-ai-public
```

Open `http://127.0.0.1:4100`. Build output stays outside the repository. The existing
`.gitignore` needs no new rule. The script never runs Algolia indexing. Inspect
desktop/mobile layout, section anchors, navigation and email links before deployment. Also
build the primary site into a separate temporary destination and run Jekyll
doctor. The current main branch has already resolved the former duplicate homepage.
The isolated AI build may report that pagination has no archive template; it has
only one landing page, so pagination is not needed.

## Hosting and DNS activation

DNS cannot map a hostname to a path such as `/ai/`. Host this build as a separate
static site whose root is the generated `public` directory. Do not replace the
main site's `CNAME`, add this subdomain as an alias of the existing deployment,
or upload AI output over the main website.

The current hosting account and DNS provider have not been verified. One supported
option is a **separate Netlify project**, manually deployed with the generated
folder. This avoids accidentally deploying the primary build configured in the root
`netlify.toml`. For future automated deployments, configure a distinct build
pipeline for this output; do not reuse the primary site's build command.

1. Build the reviewed source and upload the generated folder to the separate
   static-hosting project. Check its provider-assigned preview URL.
2. Add `ai.data-conscious.com` as that project's custom production domain.
3. At the authoritative DNS provider for `data-conscious.com`, add:

   | Field | Value |
   | --- | --- |
   | Type | `CNAME` |
   | Name / Host | `ai` (or the full hostname if required by the provider) |
   | Target / Value | The **new AI project's** assigned hostname, e.g. `your-ai-project.netlify.app` |
   | TTL | Provider default / Auto |

   The target is a hostname, without `https://` or any path. Use the actual value
   supplied by the new host; the example above is a placeholder. If `ai` already
   has a record, resolve that conflict deliberately rather than adding conflicting
   A/AAAA/CNAME records. Leave the apex, `www`, email records and nameservers alone.
4. Complete the host's DNS verification and HTTPS certificate provisioning. Check
   `https://ai.data-conscious.com/`, its canonical URL, CSS/images, mobile menu,
   section anchors and contact links. DNS propagation may take up to a day per Netlify's guide.
5. Confirm that `https://data-conscious.com/` is unaffected and has no AI link.

Reference: [Netlify external DNS instructions](https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/).
No deployment, DNS change, hosting-account change, or HTTPS verification is
performed by the repository implementation. To roll back, remove only the `ai`
DNS record and its separate hosting project/domain association.

## Current design correction

This feature is based on `origin/main` at `040613d`, whose public design matches
the owner screenshot. It reuses `.brand-home`, `.brand-hero`, `.hero-promo-card`,
`.brand-grid`, `.brand-card`, `.brand-section`, `.brand-newsletter` and shared button
classes without new CSS. Header and footer still list the existing main-site
destinations, using absolute links from the subdomain. No section is marked as
the current main-site destination on the AI landing page. The older local
scorecard checkout was not used as the design source.

## Verification (2026-10-26)

- The isolated AI production build and the current main-site build passed using
  the locked dependencies. The AI build reports an unused pagination template;
  the main build reports the existing GitHub Metadata authentication warning.
- `bundle exec jekyll doctor` passed with “Everything looks fine” on the current
  checkout. The former duplicate homepage warning belongs to the old checkout.
- Ruby syntax and `git diff --check` passed. Generated HTML checks verified the
  canonical hostname, `noindex`, local asset existence, section targets, absolute
  main-site navigation, a single AI HTML page, and no AI entry in either sitemap.
- The generated AI CSS is byte-for-byte identical to the primary site's CSS.
  Neither documentation nor AI sources appear in the primary output.
- Desktop browser inspection confirmed the current logo/header, Poppins, white
  background, gold buttons and warm cards. The solutions anchor was exercised.
  Narrow-viewport visual inspection was not performed; the page uses the existing
  shared responsive components and their 800px single-column breakpoint.
- No DNS, production hosting, email submission, or certificate checks were made.
