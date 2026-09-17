#!/usr/bin/env python3
"""Build printable Paradice Forge STLs (mm). No extra packages."""
from __future__ import annotations

import os
import struct

OUT = os.path.join(os.path.dirname(__file__), "..", "stl")


class Mesh:
    def __init__(self):
        self.tris = []

    def tri(self, a, b, c):
        self.tris.append((a, b, c))

    def quad(self, a, b, c, d):
        self.tri(a, b, c)
        self.tri(a, c, d)

    def box(self, x0, y0, z0, x1, y1, z1):
        p = {
            "000": (x0, y0, z0),
            "100": (x1, y0, z0),
            "110": (x1, y1, z0),
            "010": (x0, y1, z0),
            "001": (x0, y0, z1),
            "101": (x1, y0, z1),
            "111": (x1, y1, z1),
            "011": (x0, y1, z1),
        }
        self.quad(p["000"], p["100"], p["110"], p["010"])  # bottom
        self.quad(p["001"], p["011"], p["111"], p["101"])  # top
        self.quad(p["000"], p["010"], p["011"], p["001"])  # west
        self.quad(p["100"], p["101"], p["111"], p["110"])  # east
        self.quad(p["000"], p["001"], p["101"], p["100"])  # south
        self.quad(p["010"], p["110"], p["111"], p["011"])  # north

    def write(self, path, name="paradice-forge"):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        header = name.encode("ascii", "replace")[:80].ljust(80, b"\0")
        with open(path, "wb") as f:
            f.write(header)
            f.write(struct.pack("<I", len(self.tris)))
            for a, b, c in self.tris:
                ux = b[0] - a[0]
                uy = b[1] - a[1]
                uz = b[2] - a[2]
                vx = c[0] - a[0]
                vy = c[1] - a[1]
                vz = c[2] - a[2]
                nx = uy * vz - uz * vy
                ny = uz * vx - ux * vz
                nz = ux * vy - uy * vx
                mag = (nx * nx + ny * ny + nz * nz) ** 0.5 or 1.0
                f.write(struct.pack("<12fH", nx / mag, ny / mag, nz / mag, *a, *b, *c, 0))
        print("wrote", path, "tris", len(self.tris))


def dice_tray():
    """LPF-STL-C3 — 140 x 90 x 12 mm tray, 5 mm walls, 4 mm floor, raised mark."""
    m = Mesh()
    L, W, H = 140.0, 90.0, 12.0
    wall, floor = 5.0, 4.0
    m.box(0, 0, 0, L, W, floor)
    m.box(0, 0, floor, L, wall, H)
    m.box(0, W - wall, floor, L, W, H)
    m.box(0, wall, floor, wall, W - wall, H)
    m.box(L - wall, wall, floor, L, W - wall, H)

    # Raised original forge-gate mark on the floor (not an aquila).
    cx, cy = L / 2, W / 2
    z0, z1 = floor, floor + 0.8
    s = 14.0
    t = 1.6
    m.box(cx - s, cy - s, z0, cx + s, cy - s + t, z1)
    m.box(cx - s, cy + s - t, z0, cx + s, cy + s, z1)
    m.box(cx - s, cy - s + t, z0, cx - s + t, cy + s - t, z1)
    m.box(cx + s - t, cy - s + t, z0, cx + s, cy + s - t, z1)
    # Gate: posts + lintel + anvil base
    m.box(cx - 6.5, cy - 5.5, z0, cx - 4.5, cy + 4.0, z1)
    m.box(cx + 4.5, cy - 5.5, z0, cx + 6.5, cy + 4.0, z1)
    m.box(cx - 6.5, cy + 2.2, z0, cx + 6.5, cy + 4.0, z1)
    m.box(cx - 3.2, cy - 1.2, z0, cx + 3.2, cy + 2.2, z1)
    m.box(cx - 2.0, cy - 5.5, z0, cx + 2.0, cy - 1.2, z1)
    return m


def marker_40():
    """40 mm objective disc, 3.2 mm thick, same gate mark. Not a catalog SKU."""
    m = Mesh()
    r, h, segs = 20.0, 3.2, 48
    import math

    for i in range(segs):
        a0 = 2 * math.pi * i / segs
        a1 = 2 * math.pi * (i + 1) / segs
        x0, y0 = r * math.cos(a0), r * math.sin(a0)
        x1, y1 = r * math.cos(a1), r * math.sin(a1)
        m.tri((0, 0, h), (x0, y0, h), (x1, y1, h))
        m.tri((0, 0, 0), (x1, y1, 0), (x0, y0, 0))
        m.quad((x0, y0, 0), (x1, y1, 0), (x1, y1, h), (x0, y0, h))
    cx, cy = 0.0, 0.0
    z0, z1 = h, h + 0.7
    s, t = 7.5, 1.3
    m.box(cx - s, cy - s, z0, cx + s, cy - s + t, z1)
    m.box(cx - s, cy + s - t, z0, cx + s, cy + s, z1)
    m.box(cx - s, cy - s + t, z0, cx - s + t, cy + s - t, z1)
    m.box(cx + s - t, cy - s + t, z0, cx + s, cy + s - t, z1)
    m.box(cx - 3.4, cy - 3.0, z0, cx - 2.1, cy + 2.2, z1)
    m.box(cx + 2.1, cy - 3.0, z0, cx + 3.4, cy + 2.2, z1)
    m.box(cx - 3.4, cy + 1.0, z0, cx + 3.4, cy + 2.2, z1)
    m.box(cx - 1.6, cy - 0.6, z0, cx + 1.6, cy + 1.0, z1)
    m.box(cx - 1.0, cy - 3.0, z0, cx + 1.0, cy - 0.6, z1)
    return m


def main():
    root = os.path.abspath(OUT)
    dice_tray().write(os.path.join(root, "LPF-STL-C3.stl"), "LPF-STL-C3")
    marker_40().write(os.path.join(root, "PF-MARKER-40.stl"), "PF-MARKER-40")


if __name__ == "__main__":
    main()
