# Psychedelinks → Off Squarespace, onto Netlify

**For: Cody**
**From: Jeff (built with Claude)**

You're looking at a complete, working rebuild of psychedelinks.com. It's pure static HTML/CSS/JS, so there's nothing to compile and nothing to break. This guide gets it live on Netlify first, then walks the move off Squarespace. The short version: **deploy it before you change anything, work with Claude at each step, and only touch DNS once you're happy.**

---

## The methodology (why it's built this way)

This wasn't hand-coded from a blank file. The flow was:

1. **Catalog** the existing Squarespace site (every page, product, asset, broken link).
2. **Define the feeling** first: hopeful, curious, premium, and for regular people. That became the design direction ("calm confidence").
3. **Prototype** one hero to lock the direction.
4. **Build the foundation** (this repo) once the direction was approved.
5. **Iterate with Claude** from here.

You can run this same loop for everything that's left. The point of working with Claude is that you describe intent and review output, instead of grinding boilerplate. Each step below names what to hand Claude.

---

## Step 1 — Get it on Netlify FIRST (15 minutes, no git needed)

Don't wire up domains, don't migrate anything yet. Just see it live on a Netlify preview URL so you and Jeff can click through the real thing.

1. Go to **https://app.netlify.com/drop**
2. Drag the entire `Psychedelinks_Site` folder onto the page.
3. Netlify gives you a live URL like `random-name-123.netlify.app`. Share it.

That's the whole point of "Netlify first": you get a real, shareable staging site in minutes, before any risk. The `netlify.toml` in this repo already configures clean URLs, redirects, headers, and the 404 page, so the drop deploy behaves like the real thing.

> When you want a nicer staging name, rename the site under **Site settings → Change site name** (e.g. `psychedelinks-preview.netlify.app`).

---

## Step 2 — Put it under proper version control (then auto-deploy)

Drag-and-drop is great for a first look, but for ongoing work you want **GitHub → Netlify auto-deploy** (push to `main`, site updates itself). This is the stack Jeff already uses for theancientatlas.com.

The GitHub repo is already created and empty: **https://github.com/JeffreySchaller/psychedelinks** (public). You just need to push the files to it.

**Important — do NOT keep the git repo inside iCloud.** iCloud and git fight each other (sync churn, locked files, corrupted objects). Move the project to a normal folder, then push. Run this block in Terminal on the Mac:

```bash
# 1. Copy the project out of iCloud into your GitHub working dir
cp -R ~/Library/Mobile\ Documents/com~apple~CloudDocs/Psychedelinks_Site ~/Documents/GitHub/psychedelinks

# 2. Start git cleanly in the new location (clears any iCloud-churned .git)
cd ~/Documents/GitHub/psychedelinks
rm -rf .git
git init
git add -A
git commit -m "Initial commit: Psychedelinks rebuild foundation"

# 3. Connect to the GitHub repo and push
git branch -M main
git remote add origin https://github.com/JeffreySchaller/psychedelinks.git
git push -u origin main
```

Then connect it to Netlify for auto-deploy:

4. In Netlify: **Add new site → Import an existing project → GitHub →** pick `psychedelinks`.
5. Build settings: **build command = empty**, **publish directory = `.`** (it's static). Deploy.
6. From now on, every `git push` to `main` redeploys the site automatically.

Now every push to `main` redeploys automatically. Use a branch or Netlify Deploy Previews for review before merging.

---

## Step 3 — Replace the placeholders (work with Claude)

Everything labeled "placeholder" on the pages needs real content. Hand these to Claude one at a time:

- **Product images** — the catalog actually lives in your **print-on-demand provider** (Printful/Printify), not Squarespace. That's the migration shortcut: pull the real product images/variants from the POD account. Ask Claude to wire the product grid to that source.
- **Funding tracker numbers** — decide whether this is manual (update a number) or pulled from a real total. Ask Claude to build whichever you choose.
- **Stories** — collect real, consented stories. Ask Claude to format and lay them out on `stories.html`.
- **Contact form** — create a free endpoint at **formspree.io**, then replace `YOUR_FORM_ID` in `contact.html`.
- **Logo / hero art** — drop the real compass-star SVG and the shop's psychedelic illustration in `assets/`; the placeholders are clearly marked.

---

## Step 4 — Wire real checkout (work with Claude)

The site is a faithful visual preview of the shop; it doesn't process payments yet. Because the catalog is owned by the POD provider, you can attach commerce to this static site without rebuilding it. Three options, lightest first:

1. **Snipcart** (recommended) — add a few data attributes to each product button, keep everything static. Best fit for the Netlify stack.
2. **Shopify (headless / Buy Button)** — deepest POD integration, scales to a full store.
3. **Stripe Checkout / Payment Links** — simplest for a small catalog.

Ask Claude to implement whichever you pick and sync it to the POD product list.

---

## Step 5 — Cut over from Squarespace (last, and reversible)

Only do this once the Netlify site is complete and approved. Nothing here is irreversible until the final cancel.

1. **Keep Squarespace running.** Don't cancel anything yet.
2. In **Netlify → Domain settings**, add the custom domain `psychedelinks.com`.
3. Update DNS to point the domain at Netlify (Netlify gives you the exact records). If the domain is registered through Squarespace, you change DNS there; if elsewhere, change it at that registrar.
4. Let DNS propagate, enable Netlify's free HTTPS (Let's Encrypt), and verify every page, the redirects, and the shop on the live domain.
5. **Only after it's confirmed working**, downgrade or cancel the Squarespace plan.

The site is also currently behind a **Squarespace site-wide password** — that lock disappears automatically once you're off Squarespace. If you want a password on the Netlify staging site during review, Netlify offers password protection under Site settings.

---

## What's already handled for you

- **Clean URLs** (`/research`, not `/research.html`) — configured in `netlify.toml`.
- **Legacy redirects** — the old broken links (`/resources`, `/contact-us`) and Squarespace product URLs (`/shop/p/*`) 301-redirect to the right new pages, so no inbound link breaks.
- **Security headers + asset caching** — set in `netlify.toml`.
- **Custom 404** — branded `404.html`.
- **Content fixes** — removed the live builder placeholder text from Research, de-duped the backpack, populated the empty Pets category, built the missing Stories and Contact pages, and copy-edited throughout.

---

## How to keep working with Claude

The fastest path on everything above is to describe what you want and review what comes back. Good prompts to start with:

- "Pull the real Psychedelinks product images and variants from our Printful account into `shop.html`."
- "Build product detail pages from a template using the POD data."
- "Add Snipcart checkout to the shop and sync it to our product list."
- "Here are 8 real customer stories; lay them out on the Stories page in the existing style."

Claude already has the full site catalog and design system, so it can extend this foundation without starting over.

Questions on any of this — loop in Jeff, or just ask Claude.
