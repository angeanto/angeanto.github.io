# Checkout legal pages

## URLs and publication

- Privacy Policy: `https://data-conscious.com/privacy-policy/`
- Terms of Service: `https://data-conscious.com/terms-of-service/`

Use these URLs in Stripe after the PR is merged and the site is deployed. No Stripe settings are changed by this PR.

Both documents are publicly accessible by direct URL, but have no links from the website's main navigation, footer or product pages. They link to one another for checkout readers. `search: false`, `sitemap: false` and the rendered `noindex, follow` robots meta tag keep them out of the site's search data and sitemap and request exclusion from search-engine results. These controls are not access restrictions.

## Sources and editing

The owner supplied `privacy-policy.md` and `terms-of-service.md` from the data-platform repository's `docs/legal/` directory. Their published copies are `_pages/privacy-policy.md` and `_pages/terms-of-service.md`; the originals are not modified.

Privacy Policy text and its 22 August 2026 date are preserved. At the owner's explicit request, Terms sections 6 and 9 were aligned with the current offer: remove seat-availability/first-cohort wording and specify eight weekly live sessions of approximately 1.5 hours, approximately two months, with participant date voting. The Terms date is updated to 9 September 2026. All other terms are preserved.

The supplied Privacy Policy includes descriptions of the former MailerLite landing page, including its cookie assumptions. This publication task preserves that wording; it does not establish whether those descriptions cover every integration on the main website or certify legal compliance.

The `legal` layout inherits the existing `single` layout. A compact expandable contents list helps navigation without collapsing any legal clauses. Poppins, font sizes, link colors and the site header/footer are shared; `.legal-page` styles constrain the reading width and handle long text on mobile.

When updating documents, preserve the URLs used by checkout, review the effective date, and retain the visibility controls. Keep content changes explicit in the PR description.
