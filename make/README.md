# Make files

Real files for the three lanes. Checkout is still off. Browse them on [make.html](../make.html).

| Path | What |
|------|------|
| `stl/LPF-STL-C3.stl` | Printable dice tray (catalog SKU) |
| `stl/PF-PLATE.stl` | 80 mm locked brand plaque — **no SKU** |
| `stl/PF-WALL-LONG.stl` | Doorway ruin wall — **no SKU** |
| `stl/PF-WALL-SHORT.stl` | Short broken wall — **no SKU** |
| `stl/PF-WALL-CORNER.stl` | L-corner — **no SKU** |
| `stl/PF-RUBBLE.stl` | Scatter rubble — **no SKU** |
| `stl/PF-BARRICADE.stl` | Crate barricade — **no SKU** |
| `stl/PF-CRATE.stl` | Ammo crate — **no SKU** |
| `stl/PF-CRATER.stl` | Blast ring — **no SKU** |
| `stl/PF-PILLAR.stl` | Broken pillar — **no SKU** |
| `stl/PF-MARKER-40.stl` | 40 mm objective disc — **no SKU** |
| `stl/PF-TOKEN-TRAY.stl` | Five-well token tray — **no SKU** |
| `license/PERSONAL-USE.txt` | Goes in every zip |
| `fdm/` | Printer notes |
| `paint/LPF-PHY-TA2P.txt` | Desk paint recipe for the nave |
| `tools/build_stl.py` | Regenerates the geometric STLs |
| `../img/merch/` | POD print masters. Printful URL still empty. |

Terrain centerpieces (nave, wreck, scrap, stack) still need image-to-3D from `prompts/stl-print-paint.md` + the plates. Do not pretend those STLs exist.

```bash
python3 make/tools/build_stl.py
```
