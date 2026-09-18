# Paradice Forge — STL, print on demand, paint on demand

Working prompts to *make* the next products. The cinematic plates on the site are the look target. Checkout stays off until a real shop URL is pasted into `js/config.js`. Do not invent SKUs or live prices.

**Motto:** Love what I do, Love what you do.  
**Paradice** = paradise + dice. Channel stays **Paradice Miniatures**. Store is **Paradice Forge**.

## Sync (pull this locally)

This cloud copy, `origin/main`, and the live site are the same commit.

On the Hawaii PC, in the Paradice Forge folder:

```powershell
git pull origin main
```

Then `OPEN-PARADICE-FORGE.cmd` → http://127.0.0.1:8767/

Live: https://mauivision.github.io/ParadiceForge/

## Files that exist now

| File | Lane |
|------|------|
| `make/stl/LPF-STL-C3.stl` | STL — dice tray, printable |
| `make/stl/PF-PLATE.stl` | locked brand plaque, **no SKU** |
| `make/stl/PF-WALL-*.stl`, `PF-RUBBLE.stl` | board-frame samples, **no SKU** |
| `make/stl/PF-BARRICADE.stl`, `PF-CRATE.stl`, `PF-CRATER.stl`, `PF-PILLAR.stl` | next scatter, **no SKU** |
| `make/stl/PF-MARKER-40.stl`, `PF-TOKEN-TRAY.stl` | desk samples, **no SKU** |
| `img/merch/*.png` + `forge-mark.svg` + `plate-lock.png` | POD masters — Printful URL still empty |
| `img/logos/plate-lock.png` + `plate-mark.png` | locked picture brand + nav crop |
| `make/paint/LPF-PHY-TA2P.txt` | paint-on-demand recipe for the nave |
| `make/license/PERSONAL-USE.txt` | zip license |

Nave / wreck / scrap / stack **terrain STLs are not meshes yet.** Generate those with the prompts below.

## Three products — never one cart

| Lane | What it is | How it is made | How it ships |
|------|------------|----------------|--------------|
| **STL** | Original Forge files | Image-to-3D (Meshy / similar) from the plate + prompt below → cleanup → test print | Digital zip, personal use. Lemon Squeezy later. |
| **Print on demand** | Repeatable physical | Same STL, farm-printed grey **or** merch printed from Forge art | Filament farm / Printful-style. URL empty until the account exists. |
| **Paint on demand** | One-of-one from the desk | Grey Forge print *or* a retail kit, painted at the Armageddon desk | You-ship from Hawaii. Priced as art, not as an STL. |

STLs are never GW sculpts. Heroes (Lemartes, Ghaz, a winged hive tyrant) are kit + paint, not downloads.

## Hard locks (every prompt)

Paste this block at the top of every generation.

```
Original Paradice Forge work. Gothic sci-fi hobby terrain / workshop, not a licensed miniature range.
No Games Workshop intellectual property. No aquila, no chapter badges, no named factions, no box-art copies, no real-person likenesses.
Gold / auramite metal, charcoal stone, ember light, yellow-rust industrial accents.
Cinematic tabletop photography: low light, subject sharp, background soft, volumetric smoke, shrine-candle or forge-fire warm highlights.
```

Reference the matching plate when the tool accepts an image:

| Make this | Plate | SKU already in `js/catalog.js` |
|-----------|-------|--------------------------------|
| Ruined nave / shrine | `img/plates/cathedral.webp` | `LPF-STL-TA2` (digital) · `LPF-PHY-TA2` (grey print) · `LPF-PHY-TA2P` (painted) |
| Void-wreck hull | `img/plates/wreck.webp` | `LPF-STL-TA1` |
| Scrap keep | `img/plates/scrap.webp` | `LPF-STL-TA3` |
| Manufactorum stack | `img/plates/manufactorum.webp` | no SKU yet — keep as pack option D until it is added to the catalog |
| Forge dice tray | gold mark language below | `LPF-STL-C3` |
| Desk / army / merch art | `img/hero.webp`, `img/plates/army.webp`, `img/plates/ba.webp`, `img/plates/ork.webp` | merch URL empty |

## Pipeline

1. Vote (site already does this) → recommended first drop: **ruined cathedral**.
2. Generate 3D from **plate + STL prompt** (several variations, pick one).
3. Cleanup (Blender / similar): manifold mesh, 2–3 mm walls, drain holes, FDM-friendly cuts, no copyrighted icons hiding in the geometry.
4. Test print at 28 mm heroic tabletop scale.
5. Photograph the real print → `img/products/SKU.jpg`.
6. Zip: STLs + `LICENSE.txt` (personal use) + FDM cut notes.
7. Only then paste a real checkout / farm / Printful URL into `js/config.js`.

---

## 1. STL prompts (image-to-3D)

Use **image-to-3D** with the plate attached. If the tool is text-only, paste the prompt as-is. Ask for a **printable terrain mesh**, not a miniature character.

### Shared 3D constraints (append to every STL prompt)

```
Single centerpiece terrain mesh for a 28mm heroic-scale wargame table.
Watertight, manifold, 3D-printable FDM (0.4 mm nozzle). Minimum wall 2.2 mm. No paper-thin filigree.
Hollow where bulky, with drain holes. Slight draft angles. No floating islands.
Sits flat on the table. Modular halves that meet on a clean cut if the piece is larger than a 220 mm printer bed.
Footprint in inches as given. Height dramatic but stable (no needle spires that snap).
Output: STL, millimeters, Y-up or Z-up consistent, 0.2 mm layer-friendly detail (rivets and bricks yes; hairline cracks no).
```

### LPF-STL-TA2 — Ruined nave / shrine (pack #1 pick)

Footprint on the map: **10 × 12 in**. Plate: `img/plates/cathedral.webp`.

```
Ruined gothic nave and shrine as tabletop terrain, matching the attached photograph.
Broken stone nave, collapsed ribbed roof open to dark sky, one intact pointed arch still standing.
Candlelit shrine at the far end: clustered candles, warm gold light, simple original reliquary (not a named saint, not a copyrighted icon).
Brass / auramite pipework and conduits snaking along the stone — industrial gothic, workshop-forged, not cathedral souvenir kitsch.
Rubble piles that double as miniature cover. Floor slabs large enough for 32 mm bases.
Charcoal stone, soot, gold metal catch-lights. Volumetric dust and smoke in the volume, but the mesh itself is solid ruin + shrine + pipes.
Look like a centerpiece someone actually puts in the middle of a 44×60" game table.
```

### LPF-STL-TA1 — Void-wreck hull

Footprint: **12 × 8 in**. Plate: `img/plates/wreck.webp`.

```
Crashed void-wreck hull as tabletop terrain, matching the attached photograph.
Split fuselage / landing-craft ribs, open hatches, bundled cables and gold-lit innards, scorched plates in the dirt.
Modular halves: two printable chunks that butt into one wreck.
Hatches large enough for a 40 mm base to stand in. No faction roundels, no imperial eagles, no studio-miniature copies.
Charcoal metal, yellow-rust scoring, ember light in the torn cavity. Sky-crusade centerpiece, industrial wreck, original Paradice Forge sculpt.
```

### LPF-STL-TA3 — Scrap keep

Footprint: **10 × 10 in**. Plate: `img/plates/scrap.webp`.

```
Riveted scrap-fort keep as tabletop terrain, matching the attached photograph.
Welded plates, gun ports, yellow-rust industrial keep, stacked junk walls, a climbable parapet.
Brutal, homemade, Armageddon-mob energy — original geometry, not a named ork fortress or a licensed kitbash.
Gold-brass bolts and a warm forge glow in one doorway. Printable battlements thick enough for FDM.
```

### Manufactorum stack (option D — no SKU yet)

Footprint on the map: **8 × 10 in**. Plate: `img/plates/manufactorum.webp`. Generate the mesh; do not add a catalog SKU until Aaron drops it into `js/catalog.js`.

```
Industrial manufactorum stack as tabletop terrain, matching the attached photograph.
Chimneys, gantries, slag heaps, pipe racks, a climbable scaffold. Charcoal brick and rusted iron, auramite banding.
Original factory ruin, not a named hive or licensed industrial kit. Stable chimney cluster, FDM-thick rails.
```

### LPF-STL-C3 — Forge dice tray

Small desk file. No environment plate required; use the gold mark language.

```
Small rectangular 3D-printable dice tray, personal-use desk object.
Outer wall ~12 mm tall, inner well ~8 mm, footprint about 140 × 90 mm, rounded inner corners so dice do not chip.
Lidless. Thick enough FDM walls. Recessed or raised original Paradice Forge workshop mark: a simple gold-on-charcoal square frame with a tiny anvil / forge-gate glyph (geometric, original — not a copyrighted logo, not an aquila).
Optional felt-well recess 1 mm. No text except optional "PF" monogram in Cinzel-like caps if the tool can do clean raised letters.
```

### PF-PLATE — locked brand plaque (geometric, already built)

`make/stl/PF-PLATE.stl` is the raised locked gate on an 80 mm square. Do not replace it with a Meshy mesh. Photo of a real print goes in `img/products/` only if a SKU is added later.

### Later (Tier B / C) — do not SKU yet

When pack #1 prints: modular ruin walls, rubble scatter, walkways, craters, fuel silos, objective markers, token holders, army placards. Same hard locks. One prompt per piece. Pair with a centerpiece, do not dump a 40-file mega pack on day one. Board-frame files already on the desk: `PF-BARRICADE`, `PF-CRATE`, `PF-CRATER`, `PF-PILLAR`.

---

## 2. Print on demand

Two different products. Do not mix them in one listing.

### A. Grey terrain (physical of the STL)

No new art prompt. The file *is* the STL.

Farm notes (for the print partner, when a real URL exists):

```
Print LPF-STL-TA2 (ruined nave) in standard FDM grey PLA or PETG.
0.2 mm layers, 15–20% infill, supports from build plate only, remove supports, knock off nubs. Do not sand to display quality.
Do not paint. Personal-use object. Pack as Paradice Forge, not as a licensed miniature.
CONUS ship from the farm. This listing is LPF-PHY-TA2 — not the painted commission.
```

Same pattern later for TA1 / TA3 physicals. Add those SKUs in `js/catalog.js` only when the grey listing is real.

### B. Merch art (shirts, art prints, dice-tray graphics)

Image generation. Attach the plate. Printful-style later; `printOnDemand` in `js/config.js` stays blank until the shop exists.

**Shirt / poster master (square or 3:4, no garbled text):**

```
Paradice Forge merch illustration, original grimdark hobby workshop.
Use the attached environment photograph as the scene. Cinematic, gold auramite and charcoal, soft smoke.
Leave a dark lower third for type. Do not invent a Games Workshop logo. Do not put copyrighted faction marks on cloth or stone.
If lettering is requested, only these exact lines, Cinzel / high-contrast serif, gold:
PARADICE FORGE
Love what I do, Love what you do.
No extra slogans. No fake URLs. No "Warhammer" word.
Print-ready, centered, wearable as a dark charcoal shirt or a fine-art print of the plate itself.
```

Run once per plate: cathedral, wreck, scrap, manufactorum, hero desk (`img/hero.webp`). Official picture brand for shirts and stickers is `img/merch/plate-lock.png` (same pixels as `img/logos/plate-lock.png`). The merch *is* the Forge art people already saw on the site — not a new IP.

Dice-tray merch can use the same mark as `LPF-STL-C3` (physical tray via POD printer, or printed graphic on a bought tray). Still no live URL.

---

## 3. Paint on demand

These are desk recipes, not image-gen characters. Photograph the finished piece for `img/products/SKU.jpg`. No box-art copies.

### LPF-PHY-TA2P — Ruined nave, table-ready

```
Paint the FDM nave print to match img/plates/cathedral.webp — not a studio box scheme.
Charcoal and soot stone, selective gold / auramite on the pipes and shrine metal, warm candle glow (glaze, not neon).
Rubble dusty, not static-grass pretty. Table-ready, not museum porcelain. Hawaii-desk lighting in the photos.
This is a commission on a Forge print. Price as art. It is not an STL and not an army tray.
```

### Hero singles (kit + paint, never STL)

Use the existing catalog names only: winged hive tyrant (`LPF-HERO-TYRANT`), Lemartes, jump captain, Ghaz, Dante / Sanguinor as ideas. Retail kit, built, painted to an agreed scheme. Channel schemes: Blood Angels / Knights of the Chalice vs Ork yellow-rust — those are *desk paint jobs on plastic Aaron buys*, not files for sale.

### 2k trays

`LPF-ARMY-BA2K` and `LPF-ARMY-ORK2K` stay painted one-of-ones. Photos of the actual tray when it exists. You-ship. Not dropship. Not POD.

---

## Drop-in checklist (when a file is actually made)

- [ ] STL prints on the desk without mystery holes
- [ ] `LICENSE.txt` says personal use
- [ ] Photo at `img/products/SKU.jpg`
- [ ] Catalog blurb still matches the real object (edit `js/catalog.js`, do not invent a new SKU)
- [ ] Digital vs grey print vs painted commission are three listings, three prices
- [ ] `js/config.js` URLs still blank until the real Lemon Squeezy / farm / Printful / booking link exists

## Ideas still flowing (do not SKU)

- Board-frame scatter to surround pack #1
- Objective markers with the Forge square-gate mark
- Patron “STL of the month” (community page already teases this; Discord URL empty)
- Logo merch after the mark is locked on the dice tray
- Print-on-demand art prints of the four environment plates as a set — after one plate is a proven shirt/print
