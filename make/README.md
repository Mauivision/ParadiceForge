# Make files

Real files for the three lanes. Checkout is still off.

| Path | What |
|------|------|
| `stl/LPF-STL-C3.stl` | Printable dice tray (catalog SKU) |
| `stl/PF-MARKER-40.stl` | 40 mm objective disc — **not** in the catalog yet |
| `license/PERSONAL-USE.txt` | Goes in every zip |
| `fdm/` | Printer notes |
| `paint/LPF-PHY-TA2P.txt` | Desk paint recipe for the nave |
| `tools/build_stl.py` | Regenerates the geometric STLs |
| `../img/merch/` | POD print masters (nave, wreck, mark). Printful URL still empty. |

Terrain centerpieces (nave, wreck, scrap, stack) still need image-to-3D from `prompts/stl-print-paint.md` + the plates. Do not pretend those STLs exist.

```bash
python3 make/tools/build_stl.py
```
