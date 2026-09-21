# Basic Homepage

Replace the template placeholder at `src/routes/index.tsx` with a clean, minimal homepage.

## What to build

A single-page homepage with:

1. **Header** — simple site name on the left, one nav link on the right.
2. **Hero section** — a short headline, one supporting sentence, and a single call-to-action button.
3. **Feature highlights** — three short cards (title + one line each) describing what the site offers.
4. **Footer** — copyright line.

Styling uses the existing design tokens in `src/styles.css` (semantic colors like `bg-background`, `text-foreground`, `bg-primary`), no hardcoded colors. Layout with Tailwind utility classes, responsive on mobile and desktop.

## Technical details

- Only file changed: `src/routes/index.tsx` (component code only, no new routes or packages).
- Add a proper `head()` with a unique title and description for the homepage.
- No backend, database, or authentication involved.

## Content note

Text content will be generic placeholder copy (e.g. "Welcome" headline, three feature blurbs). Share your real text anytime and it can be swapped in.
