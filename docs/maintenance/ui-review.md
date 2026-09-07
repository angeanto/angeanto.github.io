# UI review and design system

## Shared rules

- White background, charcoal text `#202124`, muted text `#50534f`, warm neutral panels `#faf9f4` and dark gold text links `#725900`. Primary buttons use Labs gold `#e5b600` with charcoal text; hover and keyboard focus use the lighter gold `#ffd145` with charcoal text.
- Sass tokens precede theme imports in `assets/css/main.scss`, so inherited notices, menus and article components use the same palette. Dark text on gold; gold is not used for body text on white.
- The compiled CSS and JavaScript asset URLs include the build timestamp so navigation and visual fixes replace stale browser-cached versions after deployment.
- Poppins, 16px base reading size, generous line height, constrained paragraph measure. Every `.btn` uses the same Labs-gold background, charcoal 0.9rem bold Poppins label, 44px minimum height and 24px pill corners across normal and visited states. Hover and keyboard focus share the same lighter-gold state. Disabled and selected controls remain distinct so their state is understandable.
- Header and footer expose the same destinations in the same order. Active sections use `aria-current` plus a shape/border cue. Masthead is deliberately not cached because it depends on the current route. When all seven header links no longer fit, they move together into the menu toggle instead of leaving an incomplete visible subset.
- Mobile navigation exposes expansion state, closes on Escape and restores focus. Auto-close respects focus inside the menu. Reduced-motion preferences disable animation.
- Tables of contents start collapsed on mobile and expanded on desktop, and use a native disclosure control.
- About, course, legacy pages, article layouts, tables, notices, gallery images, cards and footer share these rules. External iframes and text inside supplied screenshots remain controlled by their providers/source images.
- The Speaking page uses a narrower reading column and limits event photographs to 680px, preserving their native aspect ratio while keeping the session list compact.
- The homepage hero pairs the core positioning with a compact LinkedIn profile card using the About portrait, a short description of Antonis's active writing and a direct follow action.

## Page review

Browser DOM checks at 1280px desktop and 390px mobile cover the homepage, Programs, For Teams, Insights, About, Course, Speaking, Contact, Mentoring, legacy course, the tag index, both article archive pages, and all eight local articles. The September 2026 review covered all 21 sitemap routes after removing Projects and restoring the missing tag index. Representative desktop and mobile screenshots are also inspected.

The computed-style contrast check samples rendered headings, links, paragraphs, labels, summaries and captions against their nearest solid background. It found an archive pagination selection contrast issue, which was corrected. This is a targeted check, not a full WCAG certification: it does not audit text in images, remote iframes, every syntax-highlight token or every possible interactive state.

Validation also includes locked Jekyll build and doctor, JavaScript syntax and bundle regeneration, internal link/image checks, active navigation, keyboard Escape behaviour and the newsletter disclosure. No real booking or subscription is submitted.

## References

- [W3C: designing for accessibility](https://www.w3.org/WAI/tips/designing/)
- [WCAG minimum contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

The legacy npm development dependency tree reports eight audit findings during `npm ci`; no dependency upgrade was mixed into this UI change. Ruby dependencies were not upgraded.
