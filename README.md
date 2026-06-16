# Psychedelinks — Rebuild Foundation (Preview)

A high-concept rebuild of psychedelinks.com, built as a static site so it drops straight into the **GitHub → Netlify** pipeline with no build step. Open any `.html` file in a browser to review locally.

**Design direction:** "calm confidence." Hopeful (dawn palette, light rising), curious (the living constellation of links in the hero), premium (restraint, whitespace, slow motion), and approachable for regular people (plain language, no psychedelic clichés). Restraint is what lets it read as premium *and* universal at once.

---

## Pages

| File | Page | Notes |
|------|------|-------|
| `index.html` | Home | Animated constellation hero, mission, 3 pillars, **live funding tracker**, featured products, stories teaser |
| `research.html` | Research & Responsibility | Cleaned copy; all builder placeholder text removed |
| `our-story.html` | Our Story | Cleaned narrative; em dashes and typos fixed |
| `shop.html` | Shop | Dark theme, working category filter, 10 products |
| `stories.html` | Stories | **New page** — the "Amplify Experience" layer the old site promised but never built |
| `contact.html` | Contact | **New page** — Formspree-ready form (old site had none; footer links 404'd) |

```
Psychedelinks_Site/
├── index.html  research.html  our-story.html  shop.html  stories.html  contact.html
├── assets/css/main.css      (full design system: light brand theme + dark shop theme)
├── assets/js/main.js        (constellation canvas, sticky nav, scroll reveals, shop filter)
└── README.md
```

## Stack

- **Pure static HTML/CSS/JS.** No framework, no build, no dependencies. Fonts load from Google Fonts (Inter + Fraunces).
- **Hosting:** push to GitHub, connect to Netlify, auto-deploys on push to `main`. No build command needed; publish directory is the repo root.
- **Forms:** `contact.html` is wired for **Formspree** — replace `YOUR_FORM_ID` in the form action.
- **Commerce:** the shop is a faithful visual preview. See "Commerce" below for the real path.

## What's real vs. placeholder

- **Real:** all page structure, navigation, copy (cleaned from the live site), interactions, responsive layout, the funding-tracker concept, and the two new pages.
- **Placeholder:** product images (text tiles), funding-tracker numbers, story quotes, and the Formspree ID. Each placeholder is labeled on-page.

## Fixes applied (issues found on the current Squarespace site)

- Removed live builder/placeholder text from the Research page ("TO BE LISTED", "you don't need links immediately...").
- Built a real **Contact page + form** (none existed).
- Resolved the two **dead footer links** (`/resources`, `/contact-us`).
- **De-duplicated** the "Everyday Backpack" listing.
- Added a **Pets** product so the category isn't empty.
- Copy-edited to house style: no em dashes; fixed "growth..yet".

## Commerce path (decision needed)

The product catalog is owned by the **print-on-demand provider** (Printful/Printify), not Squarespace — that's the migration unlock. Three options to wire real checkout into this static foundation:

1. **Snipcart** — drop-in `<button>` data attributes, keeps everything static. Lowest friction, best fit for the Netlify stack.
2. **Shopify (headless / Storefront API + Buy Button)** — deepest POD integration, scales to a real store.
3. **Stripe Checkout / Payment Links** — simplest for a small catalog.

Recommended starting point: **Snipcart**, syncing products from the existing POD account.

## Next steps for review

1. Open `index.html` and let the hero animate.
2. Walk Shop → filter by category; Stories and Contact are the new additions.
3. Decide commerce engine (above) and confirm the POD provider to pull real product images.
4. On approval: create the GitHub repo, connect Netlify, swap in real assets and Formspree ID.
