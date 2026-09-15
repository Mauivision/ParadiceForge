# Paradice Forge Website

Public site for **Paradice Forge** — the store and home for [Paradice Miniatures](https://www.youtube.com/@Lost-Paradice-Forge).

Paradice = paradise + dice. YouTube display name stays **Paradice Miniatures**. The YouTube URL handle `@Lost-Paradice-Forge` is unchanged.

## Live

GitHub Pages (after Actions runs on `main`):

https://mauivision.github.io/ParadiceForge/

Repo: https://github.com/Mauivision/ParadiceForge

## Local

From this folder:

```powershell
python -m http.server 8767 --bind 127.0.0.1
```

Or run `C:\Users\hawai\OPEN-PARADICE-FORGE.cmd`

## Edit

| File | What |
|------|------|
| `js/config.js` | Store name, YouTube, Discord / Patreon / tip / eBay / POD URLs |
| `js/catalog.js` | Shop SKUs and test prices |
| `js/worlds.js` | Books and story tree |
| `img/products/SKU.jpg` | Real product photos (plates are the fallback) |

Checkout is off until live shop URLs exist.
