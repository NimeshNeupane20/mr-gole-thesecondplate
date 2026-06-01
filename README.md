# Mr Gole &amp; The Second Plate — website

Marketing/portfolio website for **Mr Gole** (Phuntsok Namgyel Lama), a Kathmandu-based Nepali
food &amp; travel content creator, and his restaurant **The Second Plate** in Budhanilkantha, Kathmandu.

- **`index.html`** — Mr Gole (creator): hero, about, what he does, notable videos, social links.
- **`the-second-plate.html`** — the restaurant: story, menu, reviews (Google 4.2★ + blogger testimonials), location &amp; contact with live Google Map.

Built as plain **HTML / CSS / JS** (no build step) on the *Mr Gole Design System* from Claude Design.
Fredoka + Inter + Pacifico type, one brick-red accent (`#BF3B30`) over warm neutrals; full-pill buttons,
hairline cards, calm scroll-reveal motion. Mobile-first, accessible (skip link, ARIA, keyboard nav,
`prefers-reduced-motion` aware).

## Run locally
```bash
cd mr-gole-site
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy
Static site → GitHub Pages (served from the repo root on the default branch).

## Content sourcing &amp; accuracy
All content comes from a verified research dossier. Items still needing the owner's confirmation are
marked in the HTML with `NOTE[owner]` / `TODO[owner]` comments. Known gaps to confirm before final launch:

- Full menu &amp; prices (only **Buff Mo:Mo Rs. 250** is publicly confirmed; others show "Ask in store").
- Exact opening hours/days (only "Opens 12 PM" is known).
- A licensed hero photo of Mr Gole (creator hero currently uses a warm gradient placeholder).
- Real food/interior photography (placeholders are clearly labeled).
- Social follower counts (shown without hard numbers — re-verify before adding).

### Deliberate corrections baked in (do not revert)
- Owner is **Phuntsok Namgyel Lama** — not "Mr Foodie Nepal" / "Jai Pradhan".
- Restaurant Instagram is **@thesecondplate3** only.
- Status is **OPEN** (temporary closure in Apr 2026 ended 5 May 2026).
- Concept is *"Because one plate is never enough"* — **no** food-waste/zero-waste mission claimed.
