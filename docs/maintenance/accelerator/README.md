# Senior Data Analyst Accelerator

## Main website source

`_pages/senior-data-analyst-accelerator.md` serves `/senior-data-analyst-accelerator/`. It consolidates the owner-supplied content from the former [MailerLite landing page](https://labs.data-conscious.com/daaccelerator) into the main site's Jekyll layout. The product page includes all eight sessions, prerequisites, lab access, outcomes, AI, governance, career support, lifetime Moodle materials, pricing, future-lab benefits, educational collaborations and the original 11 FAQs, plus the new scheduling FAQ.

The page uses `.brand-page` and scoped `.accelerator-page` styling in `assets/css/main.scss`. The owner-supplied `assets/images/lab/accelerator-architecture.png` is copied unchanged; the existing customer-lineage screenshot provides an additional practical example. No generated image replaces the architecture.

Native expandable sections keep session descriptions and supporting material available without extending the initial overview. The architecture stays visible, and the interest form uses a centered single-column layout. Markdown-enabled HTML wrappers close at column zero to prevent closing tags from rendering as text and trapping subsequent sections inside the pricing grid.

## Enrollment and schedule

`_data/accelerator.yml` centralizes the product URL, Stripe Payment Link, next enrollment cohort, VAT-inclusive/exclusive price and MailerLite form identifier. Enrollment is explicitly labeled **November 2026 cohort** immediately above both pairs of product-page actions. The homepage also reads the same cohort and payment URL.

There are eight weekly live sessions, each approximately 1.5 hours, over approximately two months. Participants vote on the proposed dates for each session and the highest-voted date is selected. The November cohort is planned across November and December; exact dates are not invented.

Programs records two Accelerator cohorts (September and November 2026) and four university-course cycles (January 2025, October 2025, February 2026 and September 2026). At the owner's request, prior dates receive check marks, November is labeled Upcoming, and the September university cycle is labeled Current. Update those status labels as later cohorts begin; no seat counts or availability claims are published.

## MailerLite interest form

Created specifically for the 15-minute fit-call flow:

- [Form: Senior Data Analyst Accelerator - 15-minute Fit Call](https://dashboard.mailerlite.com/forms/198117827618539229/overview)
- Form ID: `198117827618539229`; embed slug: `vD7GjT`; account: `2031290`.
- Group: `Senior Data Analyst Accelerator - Fit Call Requests`, ID `198117811640338116`.
- Fields: required email, optional name, with visible labels.
- Copy explains that the request is for a conversation about programme fit.
- The form uses Poppins, 24px headings, 16px body/input/label text, charcoal `#202124`, warm `#faf9f4` background and gold `#e5b600` buttons with `#ffd145` hover and rounded corners.
- Double opt-in remains enabled. The success message asks the visitor to check their inbox and confirm their email address.

The shared MailerLite universal loader in `_includes/head/custom.html` already uses account `2031290`. The product page embeds the form under `#interest`; both “I’m interested” links lead there. The newsletter and existing waitlist forms/groups are untouched. No API key is needed in frontend code. If the embed ID is intentionally cleared, the page falls back to a direct email request for a fit call.

The homepage enrollment card also links directly to this form with “I’m interested (15-minute call)” beside “Enroll Now”; the buttons wrap on narrow screens.

## Follow-up email automation

[Senior Data Analyst Accelerator - Fit Call Follow-up](https://dashboard.mailerlite.com/automations/198118123691312220) is active and is a single-step workflow triggered by completion of the new embedded form. It uses the existing sender identity `Antonis Angelakis <antonis@data-conscious.com>`; replies go to that address. The form's double opt-in applies before subscriber automation delivery.

Subject: **Let’s find a time to talk about the Accelerator**

Email copy:

> Thanks for your interest
>
> Hi,
>
> The Senior Data Analyst Accelerator connects guided data-platform work, AI, governance and business communication through eight weekly live sessions of approximately 1.5 hours, with lifetime access to the course materials.
>
> Let’s have a 15-minute call to explore whether the programme fits your experience and goals. Please reply with three suitable time slots and your time zone, and I’ll confirm a time.
>
> Best,
> Antonis

The email uses Poppins, charcoal text and dark-gold links. It retains MailerLite's account-address and unsubscribe footer. No existing subscribers were imported into this workflow, and no broadcast or real test email was sent.

## Links and retiring the old hostname

The Programs button, homepage programme link and final header/footer link now point to the local product route. The final navigation label is **The Senior Data Analyst Accelerator**. There are no public source links to `labs.data-conscious.com`.

Local aliases `/data-career-accelerator/` and `/daaccelerator/` redirect to the new route. These do not redirect traffic arriving at the old subdomain: the service serving `labs.data-conscious.com` must retain the hostname and configure a redirect after the new page is merged and deployed. This PR does not modify DNS, remove the old MailerLite site, or migrate its privacy-policy/terms pages. Keep required old pages available until their migration is handled.

Future programmes should have their own `_pages/` source and a listing on `/programs/`. Preserve established public routes when adding new entries.

## Historical MailerLite exports

[intro.html](intro.html), [program.html](program.html) and [faq.html](faq.html) are archived rich-text exports from the 2026-09-06 heading/duplicate-section correction. They are excluded from the site build and retained only as historical reference. They contain superseded first-cohort, seat-count and one-hour-session wording; do not copy them into the current product page or republish them as the current offer.

## Verification (2026-09-09)

- Locked Ruby 3.2.2 / Bundler 2.4.10 Jekyll build passed; the existing missing GitHub API authentication warning remains non-blocking.
- `jekyll doctor` reported that everything looks fine after enabling the already-locked redirect plugin.
- Generated homepage, Programs and Accelerator links and anchors resolved. Eight sessions, twelve FAQs, both November enrollment labels, Stripe URL, MailerLite slug, legacy aliases and sitemap entry were verified.
- README, AGENTS and maintenance docs were excluded from generated output. The original architecture file and committed copy have identical SHA-256 hashes.
- Desktop (1280px) and mobile (390px) browser checks covered programme layout, cohort badges, the Programs button, header navigation, FAQ expansion and the interest anchor. No horizontal overflow was observed. The real MailerLite embed rendered name/email fields with Poppins and the site palette; its submit button matches the site's 44px minimum height.
- MailerLite's dry run confirmed the correct form trigger and one designed email, with no warnings. The dashboard showed the automation active (Pause control). No real form submission, test email or payment was performed.
- Compact-layout checks confirmed working session/tool disclosures at desktop and mobile widths, no visible HTML closing tags and no sections nested inside the pricing grid. The default desktop page height decreased from approximately 9,033px to 5,845px at 1280px width.

The PR does not merge or deploy the main site, or retire the external Labs hostname. The MailerLite form and automation are real account resources created as requested and are independent of GitHub deployment.
