# PVP TEXTURE — Minecraft resource pack landing page

What this is

- A minimal single-page landing page for the "PVP TEXTURE" resource pack.
- Includes: hero with download CTA, screenshots gallery, a "How to use" modal, and a support/contact placeholder.

Files created

- `index.html` — single-page markup for the resource pack
- `styles.css` — styles and responsive rules
- `script.js` — small JS for mobile menu, smooth scroll, modal and download handling

Assets and screenshots

- Added `assets/pack.png` — the hero preview image you provided (copied from your desktop).
- Optionally add preview images to `assets/` named `screenshot1.png`, `screenshot2.png`, `screenshot3.png` (or update `index.html` to match your filenames).
- Place your distributable ZIP at `downloads/PVP-TEXTURE.zip`. The Download CTA points to that path and the script triggers a download named `PVP-TEXTURE.zip`.

Run locally

- Open `index.html` directly (double-click) — Download will work via the native link handling.
- For the most reliable behavior (fetch+blob download and consistent CORS), serve the folder with a simple HTTP server:

```powershell
cd 'C:\Users\Saaim&Sarim\Desktop\WALLiNG'
python -m http.server 8000
# then open http://localhost:8000
```

Deploy

- GitHub Pages: push this folder to a repo and enable Pages on the `main` branch (or deploy from `/docs`).
- Netlify / Vercel: connect the repo — they auto-detect static sites and serve from root by default.

Next suggestions (optional)

- Add your logo in the header and update `.brand` text.
- Replace or add screenshots in `assets/` for the gallery.
- Add a JSON manifest or release notes for versioning and changelog.

Support / Contact

- Replace the placeholder email `you@example.com` in `index.html` with your real support contact or set up a contact form (Formspree or small backend).

Notes

- Update the pack's supported Minecraft versions in `index.html`.
- If you'd like, I can prepare a GitHub Actions workflow to zip the pack from `assets/` and publish a release so the download link is always up-to-date.
