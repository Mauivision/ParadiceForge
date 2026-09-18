# Product photos

Drop real shots here using the SKU as the filename. The shop looks for `img/products/SKU.jpg` first, then falls back to branded plates in `img/plates/` (WebP, then SVG).

```
img/products/LPF-ARMY-BA2K.jpg
img/products/LPF-ARMY-ORK2K.jpg
img/products/LPF-HERO-TYRANT.jpg
img/products/LPF-STL-TA2.jpg
```

Hero / desk shot for the home page (optional — until it exists, `img/hero.webp` is the branded plate):

```
img/hero.jpg
```

Landscape, low light, subject sharp, background soft. No box art. No Games Workshop product photography.

The site uses these plates as full-bleed cinematic scenes (with drifting smoke) behind each page. Until a studio `img/hero.jpg` exists, `img/hero.webp` is both the home scene and the branded fallback.

## Branded plates (fallbacks)

Illustrated / generated workshop art for the site until studio photos exist. Original grimdark hobby look — not GW IP, not a live product photo.

| File | Used for |
|------|----------|
| `img/hero.webp` | Home hero |
| `img/plates/ba.webp` | Crimson / chalice tray items |
| `img/plates/ork.webp` | Scrap-clan / Ork tray items |
| `img/plates/hero.webp` | Hero singles |
| `img/plates/army.webp` | Army trays / shop |
| `img/plates/cathedral.webp` | Ruined nave / shrine (broken nave, collapsed roof, shrine light) |
| `img/plates/wreck.webp` | Void-wreck hull (ribs, hatches, modular halves) |
| `img/plates/scrap.webp` | Scrap keep (riveted plates, gun ports, yellow-rust) |
| `img/plates/manufactorum.webp` | Manufactorum stack (chimneys, gantries, slag) |
| `img/plates/terrain.webp` | Alias of the nave plate for older refs |
| `img/plates/books.webp` | Library / worlds |
| `img/plates/commission.webp` | Commissions / community |

Matching `.svg` files are gold-on-charcoal fallbacks if WebP cannot load.

Print-on-demand masters (not a live shop): `img/merch/`. Locked brand plate: `img/logos/plate-lock.png` (nav crop `plate-mark.png`). Favicon stays the geometric SVG.
