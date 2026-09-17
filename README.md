# Paradice Forge Website

Public site for **Paradice Forge** — the store and home for [Paradice Miniatures](https://www.youtube.com/@Lost-Paradice-Forge).

Paradice = paradise + dice. YouTube display name stays **Paradice Miniatures**. The YouTube URL handle `@Lost-Paradice-Forge` is unchanged.

## Live

GitHub Pages (after Actions runs on `main`):

https://mauivision.github.io/ParadiceForge/

Repo: https://github.com/Mauivision/ParadiceForge

## Local

This repo’s `main` is what GitHub Pages serves. On the Hawaii PC, pull before you open the site:

```powershell
git pull origin main
python -m http.server 8767 --bind 127.0.0.1
```

Or run `C:\Users\hawai\OPEN-PARADICE-FORGE.cmd`

## Make the next products

Ready-to-paste prompts for Meshy-style STLs, grey print-on-demand, merch art, and desk paint-on-demand live in [`prompts/stl-print-paint.md`](prompts/stl-print-paint.md). They match the catalog SKUs and the cinematic plates. No invented checkout URLs.

## Edit

| File | What |
|------|------|
| `js/config.js` | Store name, YouTube, Discord / Patreon / tip / eBay / POD URLs |
| `js/catalog.js` | Shop SKUs and catalog-draft prices |
| `js/worlds.js` | Books and story tree |
| `img/products/SKU.jpg` | Real product photos (branded plates are the fallback) |
| `img/hero.jpg` | Optional studio hero photo (falls back to `img/hero.webp`) |

Checkout is off until live shop URLs exist. Catalog prices are drafts for planning — they are not a live cart.

## Photos

Until Aaron drops real SKU shots, the shop and product pages use branded illustrated plates in `img/plates/`. See `img/README.md`.
