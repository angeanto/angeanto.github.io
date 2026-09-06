# Accelerator heading and duplicate-section corrections

Prepared from the public https://labs.data-conscious.com/daaccelerator page on 2026-09-06. These are rich-text HTML fragments for review, not a second Jekyll landing page. `/docs` is excluded from the site build. The same corrections were applied directly in the MailerLite HTML editor and published with Save and update on 2026-09-06, following the owner's explicit request. The public page was verified afterward.

## Changes

- Replace copied GitHub heading permalink destinations with local heading anchors and visible ¶ links. Preserve existing `user-content-…` anchor IDs.
- Retain the complete Vendor Requests And Collaborations section in the program block; remove the shorter repeated section before the FAQ.
- Preserve all 11 FAQ questions, program copy, links, and rich-text formatting. Remove editor-specific `builder-link-id` attributes from these exports.

## Maintaining or restoring these blocks

In MailerLite Sites, open the landing page serving `/daaccelerator`. Back up its current version and compare against these fragments if the page has changed since export. Replace the HTML content of only the corresponding rich-text blocks, retaining their surrounding layout, styles, forms, and other blocks:

| Fragment | Existing block | Identifying heading |
| --- | --- | --- |
| [intro.html](intro.html) | `.ml-lp-16` content column | Work inside a real modern data platform… |
| [program.html](program.html) | `.ml-lp-23` content column | The 8 Live Sessions |
| [faq.html](faq.html) | `.ml-lp-28` content column | Duplicate collaborations section followed by FAQ |

Block classes are snapshot identifiers; use the headings to confirm the intended blocks in the editor. Preview at desktop and mobile widths, click ¶ links to confirm they scroll within the landing page, and confirm there is one collaborations section and all FAQ answers remain. Publish future changes according to the owner's instructions. GitHub merging alone cannot publish these fragments.

## Validation

Parsed the three fragments together: IDs are unique, fragment links resolve to existing IDs, no GitHub links remain, exactly one collaborations heading remains, and the FAQ retains 11 questions. Live browser verification confirmed all 23 permalink targets exist, zero GitHub links remain, one collaborations section and all 11 FAQ questions remain. Clicking the FAQ permalink updated the URL to #faq and scrolled to the FAQ heading.
