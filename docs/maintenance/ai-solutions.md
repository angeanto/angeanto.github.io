# AI solutions page

`_pages/ai.md` serves `https://data-conscious.com/ai/` as part of the normal Jekyll website build and deployment. No subdomain, separate hosting project, DNS change, or custom build script is required. The homepage and navigation contain no inbound link to the page.

The page uses the current `single` layout and existing `.brand-home`, hero, card, grid, button and footer styles. No custom CSS or JavaScript is added. English copy follows the existing site. The source is the founders' Google Doc “AI Cases <> Thanos & Antonis”, reviewed on 2026-10-26. Internal comments, unfinished positioning, voice assistants and unverified client/results claims are omitted. CRM/ERP integrations depend on APIs and permissions.

## Visibility

The page has `robots: "noindex, follow"`, `sitemap: false` and `search: false`. It is publicly accessible to anyone with the URL; these settings do not provide authentication. Both contact actions open the dedicated MailerLite enquiry form. Shared site integrations follow the normal page behavior.

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

## Copy enhancements

The original AI agents and business automation categories are combined into “AI agents & business process automation”, at the owner’s request. The page now has six solutions; the remaining categories retain their order and the surrounding page sections are unchanged. Descriptions explain business context, user interaction, validation and operational ownership. Each solution retains one explicitly hypothetical “Illustrative use case”. The four delivery stages keep their original headings; their descriptions were subsequently shortened for scanning. No demo invitation, founder-role claims, customer stories or performance figures are added without supporting evidence.

## Minimal copy and enquiry form

The latest copy replaces the long descriptions with one benefit, one short capability paragraph with bold keywords, and one “Illustrative use case” per solution. Six solution cards and the four delivery stages remain in the same order. The redundant “Explore our solutions” anchor is removed. No new CSS or JavaScript bundle is introduced.

`_data/ai.yml` holds the public MailerLite click-form slug `zODopy` and its hosted fallback URL. Both gold CTAs use the provider's `ml-onclick-form` class and `ml('show', ..., true)` handler. Preserve that class and handler format: the universal script discovers the form through them. The existing shared MailerLite account loader is reused. The hosted URL remains usable when JavaScript is disabled. Popup loading requires MailerLite network access.

### MailerLite resources

- Form: **DataConscious AI - Business Challenge**, ID `202400430708229913`.
- [Edit form](https://dashboard.mailerlite.com/forms/202400430708229913/overview).
- Group: **DataConscious AI - Business Enquiries**, ID `202400629377729633`. The Accelerator fit-call group is not assigned to this form.
- Required fields: email, name, and multiline `ai_case_description` (“Describe your case”). Company maps to the existing `company` field and is optional.
- Form and success message explain email follow-up for the business enquiry; no Accelerator or 15-minute-call copy remains.
- The form duplicates the existing fit-call design and retains its Poppins, warm panel and gold button styling. No campaign or automation was created or sent.

Form records use MailerLite subscriber fields, so repeat enquiries from the same email can update those fields; this is not a separate ticket-history system. Manage enquiries in the dedicated group. Update form fields/design in MailerLite and update `_data/ai.yml` only if the public form changes. No API keys belong in page source.

### Validation

The standard Jekyll build passed with the existing GitHub Metadata authentication warning. Desktop browser checks verified opening from both CTAs and closing the popup. A 390px mobile preview showed all four fields and the submit action; the page width did not exceed the viewport. Public form DOM confirmed provider-required validation for email/name/description and no required validation on company. No real enquiry or test email was submitted; email delivery and subscriber persistence were not exercised. `git diff --check` and generated route, canonical, robots and sitemap checks passed. Existing ignore rules cover the workflow.

## Scannable service presentation

The AI page keeps the shared header, typography, palette, two-column hero and service grid. Page-specific styles live in `_sass/_ai-solutions.scss` and are scoped to `.ai-solutions-page`. Each of the six services presents a benefit, three capability bullets and its retained illustrative use case. Agents and business automation remain combined. The hero introduces a defined workflow, prototype validation and evaluation.

Both enquiry buttons keep the existing MailerLite popup integration and fallback URL. The local review toolbar and `/ai-preview/` route are not part of the published site. The production path remains `/ai/`, excluded from navigation, search and the sitemap with `noindex, follow`.
