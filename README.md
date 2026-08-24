# Biodata — Ruhi Rumman Rinthi

Static one-page biodata. Plain HTML/CSS/JS, no build step, no dependencies.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page content |
| `style.css` | Styling, light/dark tokens, print stylesheet |
| `script.js` | Theme toggle, photo switcher, auto age, scroll reveal, print |
| `images/` | `r1.jpeg`, `r2.jpeg` |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

## Run locally

Open `index.html` in a browser. Or serve it:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Add biodata site"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.

Live at `https://<username>.github.io/<repo>/` after ~1 minute.

## Notes

- Age updates itself from the date of birth in `script.js`.
- Theme choice is remembered in `localStorage`.
- **Print / PDF** button prints A4 clean — controls and thumbnails are hidden.
- Repo is public if using free GitHub Pages, so the personal details on this page are public too. Use a private repo with GitHub Pages on a paid plan, or Netlify/Vercel with a hard-to-guess URL, if that matters.
