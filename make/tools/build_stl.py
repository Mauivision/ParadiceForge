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


def ruin_wall_long():
    """Board-frame wall ~6 in. Doorway ruin. Not a catalog SKU. Not the nave centerpiece."""
    m = Mesh()
    # Left / right piers
    m.box(0, 0, 0, 22, 24, 48)
    m.box(98, 0, 0, 120, 24, 42)
    # Threshold
    m.box(22, 0, 0, 98, 24, 6)
    # Lintel
    m.box(18, 0, 36, 102, 24, 48)
    # Broken crenels
    m.box(0, 0, 48, 18, 24, 58)
    m.box(36, 0, 48, 54, 24, 54)
    m.box(88, 0, 48, 108, 24, 52)
    # Buttress (keep X >= 0 for slicers)
    m.box(0, 4, 0, 8, 20, 32)
    return m


def ruin_wall_short():
    """Shorter broken wall ~3.2 in. Not a catalog SKU."""
    m = Mesh()
    m.box(0, 0, 0, 80, 22, 28)
    m.box(0, 0, 28, 22, 22, 44)
    m.box(50, 0, 28, 80, 22, 38)
    m.box(22, 0, 28, 38, 22, 32)
    return m


def ruin_corner():
    """L-corner ruin. Not a catalog SKU."""
    m = Mesh()
    m.box(0, 0, 0, 70, 22, 40)
    m.box(0, 0, 0, 22, 70, 40)
    m.box(0, 0, 40, 28, 22, 50)
    m.box(0, 0, 40, 22, 28, 48)
    return m


def rubble_pile():
    """Scatter rubble. Print as many as the table needs. Not a catalog SKU."""
    m = Mesh()
    m.box(0, 0, 0, 42, 28, 10)
    m.box(8, 6, 10, 30, 24, 18)
    m.box(18, 4, 18, 34, 18, 26)
    m.box(24, 10, 0, 48, 32, 8)
    m.box(0, 8, 0, 10, 22, 7)
    return m


def token_tray():
    """Small token / dice-well tray. Not a catalog SKU."""
    m = Mesh()
    L, W, H, wall, floor = 72.0, 28.0, 8.0, 2.4, 2.2
    m.box(0, 0, 0, L, W, floor)
    m.box(0, 0, floor, L, wall, H)
    m.box(0, W - wall, floor, L, W, H)
    m.box(0, wall, floor, wall, W - wall, H)
    m.box(L - wall, wall, floor, L, W - wall, H)
    # Dividers — five wells
    for i in range(1, 5):
        x = wall + i * ((L - 2 * wall) / 5.0)
        m.box(x - 1.0, wall, floor, x + 1.0, W - wall, H)
    return m


def locked_gate(m, cx, cy, z0, z1, s, t):
    """Raised locked plate mark: frame, posts, inner lintel, bottom rail. No aquila."""
    m.box(cx - s, cy - s, z0, cx + s, cy - s + t, z1)
    m.box(cx - s, cy + s - t, z0, cx + s, cy + s, z1)
    m.box(cx - s, cy - s + t, z0, cx - s + t, cy + s - t, z1)
    m.box(cx + s - t, cy - s + t, z0, cx + s, cy + s - t, z1)
    post = t * 1.15
    inner = s - t * 2.4
    # Posts
    m.box(cx - inner, cy - inner + post, z0, cx - inner + post, cy + inner - post * 0.2, z1)
    m.box(cx + inner - post, cy - inner + post, z0, cx + inner, cy + inner - post * 0.2, z1)
    # Bottom rail
    m.box(cx - inner, cy - inner, z0, cx + inner, cy - inner + post, z1)
    # Inner lintel (T) sitting on the posts, inside the frame
    m.box(cx - inner - post * 0.35, cy + inner - post * 1.15, z0, cx + inner + post * 0.35, cy + inner, z1)


def brand_plate():
    """80 mm desk plaque with the locked brass-gate mark. Not a catalog SKU."""
    m = Mesh()
    L, floor = 80.0, 3.2
    m.box(0, 0, 0, L, L, floor)
    locked_gate(m, L / 2, L / 2, floor, floor + 1.5, 22.0, 3.2)
    return m


def barricade():
    """Low crate barricade ~90 mm. Not a catalog SKU."""
    m = Mesh()
    m.box(0, 0, 0, 46, 22, 16)
    m.box(44, 0, 0, 90, 22, 14)
    m.box(12, 1, 16, 54, 21, 28)
    m.box(50, 1, 14, 84, 21, 24)
    m.box(4, 2, 2, 8, 20, 14)
    m.box(78, 2, 2, 86, 20, 12)
    return m


def crate():
    """Ammo crate scatter. Not a catalog SKU."""
    m = Mesh()
    m.box(0, 0, 0, 28, 20, 14)
    m.box(0, 0, 14, 28, 20, 16)
    m.box(1, 1, 16, 27, 19, 17.2)
    m.box(6, 0, 2, 8.2, 20, 14)
    m.box(19.8, 0, 2, 22, 20, 14)
    return m


def crater():
    """Blast ring ~60 mm. Stepped boxes, not a sculpted bowl. Not a catalog SKU."""
    m = Mesh()
    m.box(8, 8, 0, 52, 52, 2.2)
    m.box(0, 16, 0, 60, 44, 3)
    m.box(16, 0, 0, 44, 60, 3)
    m.box(0, 14, 3, 8, 46, 7)
    m.box(52, 14, 3, 60, 46, 7)
    m.box(8, 0, 3, 52, 8, 7)
    m.box(8, 52, 3, 52, 60, 7)
    m.box(2, 4, 3, 14, 16, 6)
    m.box(46, 4, 3, 58, 16, 6)
    m.box(2, 44, 3, 14, 56, 6)
    m.box(46, 44, 3, 58, 56, 6)
    return m


def pillar():
    """Broken objective column. Not a catalog SKU. Not the nave."""
    m = Mesh()
    m.box(0, 0, 0, 26, 26, 6)
    m.box(4, 4, 6, 22, 22, 40)
    m.box(3, 3, 40, 23, 23, 44)
    m.box(2, 4, 44, 18, 20, 52)
    m.box(6, 8, 52, 14, 16, 56)
    return m


def main():
    root = os.path.abspath(OUT)
    dice_tray().write(os.path.join(root, "LPF-STL-C3.stl"), "LPF-STL-C3")
    marker_40().write(os.path.join(root, "PF-MARKER-40.stl"), "PF-MARKER-40")
    ruin_wall_long().write(os.path.join(root, "PF-WALL-LONG.stl"), "PF-WALL-LONG")
    ruin_wall_short().write(os.path.join(root, "PF-WALL-SHORT.stl"), "PF-WALL-SHORT")
    ruin_corner().write(os.path.join(root, "PF-WALL-CORNER.stl"), "PF-WALL-CORNER")
    rubble_pile().write(os.path.join(root, "PF-RUBBLE.stl"), "PF-RUBBLE")
    token_tray().write(os.path.join(root, "PF-TOKEN-TRAY.stl"), "PF-TOKEN-TRAY")
    brand_plate().write(os.path.join(root, "PF-PLATE.stl"), "PF-PLATE")
    barricade().write(os.path.join(root, "PF-BARRICADE.stl"), "PF-BARRICADE")
    crate().write(os.path.join(root, "PF-CRATE.stl"), "PF-CRATE")
    crater().write(os.path.join(root, "PF-CRATER.stl"), "PF-CRATER")
    pillar().write(os.path.join(root, "PF-PILLAR.stl"), "PF-PILLAR")


if __name__ == "__main__":
    main()
