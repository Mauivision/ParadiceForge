/**
 * Paradice Forge environment map — drag footprints.
 * Original starts only. Public table sizes + reported 11th-ed kit dimensions.
 * Table surfaces: grass, sand, ash, blue metal, hive, snow, marsh, void.
 */
(function () {
  const STORE = "paradice-forge-env-map";

  const SURFACES = [
    {
      id: "grass",
      label: "Green grass · meadow / Armageddon fields",
      idea: "BA vs Orks on open ground. Soft green base, darker hedges under ruins.",
      png: { felt: "#1a3d28", grid: "rgba(180,220,160,0.12)", piece: "rgba(28,55,40,0.92)", line: "#8fd4a0" },
    },
    {
      id: "sand",
      label: "Sand · desert / Isstvan ash-edge",
      idea: "Warm dunes. Dust under footprints. Good for Heresy dropsite energy.",
      png: { felt: "#c4a574", grid: "rgba(90,60,30,0.18)", piece: "rgba(90,70,48,0.88)", line: "#8a6a3c" },
    },
    {
      id: "ash-red",
      label: "Red ash · Armageddon / volcanic",
      idea: "Rust-red dust and slag. Matches Ork yellow-rust and BA crimson contrast.",
      png: { felt: "#5c241c", grid: "rgba(255,140,90,0.14)", piece: "rgba(70,30,24,0.9)", line: "#e07a55" },
    },
    {
      id: "blue-metal",
      label: "Blue metal · hive deck / void station",
      idea: "Cold plating, rivet grid, cyan edge light. Custodes / Kill Team yards.",
      png: { felt: "#1a2a44", grid: "rgba(100,180,255,0.16)", piece: "rgba(24,40,70,0.92)", line: "#6eb6ff" },
    },
    {
      id: "hive-grey",
      label: "Hive grey · manufactorum floor",
      idea: "Concrete and steel grit. Neutral for Necromunda / Zone Mortalis.",
      png: { felt: "#3a3e46", grid: "rgba(220,220,230,0.1)", piece: "rgba(50,54,62,0.92)", line: "#a8b0bc" },
    },
    {
      id: "snow",
      label: "Snow · ice world / Fenris vibe",
      idea: "Pale base, blue shadows in ruins. High contrast gold/red models.",
      png: { felt: "#d8e4f0", grid: "rgba(60,90,130,0.14)", piece: "rgba(90,110,140,0.85)", line: "#5a7a9a" },
    },
    {
      id: "marsh",
      label: "Marsh · swamp / verdant leak",
      idea: "Mud green + stagnant pools. Soft blob woods read as mangroves.",
      png: { felt: "#243820", grid: "rgba(120,180,90,0.12)", piece: "rgba(40,55,32,0.9)", line: "#7aaa55" },
    },
    {
      id: "void",
      label: "Void night · classic Forge felt",
      idea: "Dark desk glow. Default planner look when you want silhouette only.",
      png: { felt: "#07101c", grid: "rgba(61,240,255,0.08)", piece: "rgba(18,48,90,0.9)", line: "#3df0ff" },
    },
  ];

  const EXTRAS = [
    { id: "wreck", sku: "LPF-STL-TA1", name: "Void-wreck hull", kind: "Crashed ship", w: 12, h: 8, shape: "extra" },
    { id: "nave", sku: "LPF-STL-TA2", name: "Ruined nave / shrine", kind: "Cathedral", w: 10, h: 12, shape: "extra" },
    { id: "scrap", sku: "LPF-STL-TA3", name: "Scrap keep", kind: "Fort", w: 10, h: 10, shape: "extra" },
    { id: "print", sku: "LPF-PHY-TA2", name: "Ruined nave — print", kind: "Cathedral", w: 10, h: 12, shape: "extra" },
    { id: "stack", sku: "", name: "Manufactorum stack", kind: "Factory", w: 8, h: 10, shape: "extra" },
  ];

  const DEPLOYS = {
    long: [
      { side: "A", x: 0, y: 0, w: 100, h: 20 },
      { side: "B", x: 0, y: 80, w: 100, h: 20 },
    ],
    short: [
      { side: "A", x: 0, y: 0, w: 20, h: 100 },
      { side: "B", x: 80, y: 0, w: 20, h: 100 },
    ],
    corners: [
      { side: "A", x: 0, y: 0, w: 36, h: 36 },
      { side: "B", x: 64, y: 64, w: 36, h: 36 },
    ],
    none: [],
  };

  function kit40() {
    return [
      { key: "LRECT", w: 7, h: 11.5, shape: "rect", label: "Large 7×11.5" },
      { key: "TRI", w: 8, h: 11.5, shape: "tri", label: "Wedge 8×11.5" },
      { key: "MRECT", w: 6, h: 4, shape: "rect", label: "Medium 6×4" },
      { key: "LLINE", w: 10, h: 2.5, shape: "line", label: "Long 10×2.5" },
      { key: "SLINE", w: 6, h: 2, shape: "line", label: "Short 6×2" },
    ];
  }

  function place(type, x, y, rot) {
    return { type: type, x: x, y: y, rot: rot || 0 };
  }

  const SYSTEMS = [
    {
      id: "wh40k11",
      name: "Warhammer 40,000 · 11th",
      table: { w: 60, h: 44 },
      note: "2,000-pt rectangle. 16-piece footprint kit (public sizes). Forge starts — not Event Companion maps.",
      kit: kit40(),
      deploys: ["long", "short", "corners", "none"],
      starts: [
        {
          id: "m1",
          label: "Map 1 — Corner keeps",
          pieces: [
            place("LRECT", 3, 3),
            place("LRECT", 50, 3),
            place("LRECT", 3, 29),
            place("LRECT", 50, 29),
            place("TRI", 22, 4),
            place("TRI", 30, 28, 180),
            place("MRECT", 18, 20),
            place("MRECT", 36, 20),
            place("MRECT", 18, 26),
            place("MRECT", 36, 26),
            place("LLINE", 12, 16),
            place("LLINE", 38, 25.5),
            place("SLINE", 26, 10),
            place("SLINE", 28, 32),
            place("SLINE", 8, 22),
            place("SLINE", 46, 22),
          ],
        },
        {
          id: "m2",
          label: "Map 2 — Spine lanes",
          pieces: [
            place("LRECT", 4, 6, 90),
            place("LRECT", 4, 26, 90),
            place("LRECT", 44.5, 6, 90),
            place("LRECT", 44.5, 26, 90),
            place("TRI", 24, 2),
            place("TRI", 28, 30, 180),
            place("MRECT", 20, 16),
            place("MRECT", 34, 16),
            place("MRECT", 20, 24),
            place("MRECT", 34, 24),
            place("LLINE", 16, 21),
            place("LLINE", 34, 21),
            place("SLINE", 26, 8),
            place("SLINE", 28, 34),
            place("SLINE", 12, 18),
            place("SLINE", 42, 18),
          ],
        },
        {
          id: "m3",
          label: "Map 3 — Cross fire",
          pieces: [
            place("LRECT", 8, 4),
            place("LRECT", 45, 4),
            place("LRECT", 8, 28),
            place("LRECT", 45, 28),
            place("TRI", 18, 16, 90),
            place("TRI", 34, 16, 270),
            place("MRECT", 2, 18),
            place("MRECT", 52, 18),
            place("MRECT", 26, 4),
            place("MRECT", 28, 36),
            place("LLINE", 20, 12),
            place("LLINE", 30, 29.5),
            place("SLINE", 14, 22),
            place("SLINE", 40, 22),
            place("SLINE", 26, 20),
            place("SLINE", 28, 24),
          ],
        },
        {
          id: "m4",
          label: "Map 4 — Split mid",
          pieces: [
            place("LRECT", 2, 8),
            place("LRECT", 51, 8),
            place("LRECT", 2, 24),
            place("LRECT", 51, 24),
            place("TRI", 16, 6),
            place("TRI", 36, 26, 180),
            place("MRECT", 20, 18),
            place("MRECT", 34, 18),
            place("MRECT", 20, 24),
            place("MRECT", 34, 24),
            place("LLINE", 22, 14),
            place("LLINE", 28, 30),
            place("SLINE", 10, 20),
            place("SLINE", 44, 20),
            place("SLINE", 26, 8),
            place("SLINE", 28, 36),
          ],
        },
      ],
    },
    {
      id: "aos4",
      name: "Age of Sigmar · 4e (2k)",
      table: { w: 60, h: 44 },
      note: "GHB 2025–26 size: ~8 features. Original woods/ruins — not named battleplans.",
      kit: [{ key: "WOOD", w: 10, h: 8, shape: "blob", label: "Feature 10×8" }],
      deploys: ["long", "short", "corners", "none"],
      starts: [
        {
          id: "m1",
          label: "Map 1 — Facing plains",
          pieces: [
            place("WOOD", 4, 8),
            place("WOOD", 46, 8),
            place("WOOD", 4, 28),
            place("WOOD", 46, 28),
            place("WOOD", 18, 16),
            place("WOOD", 32, 16),
            place("WOOD", 18, 24),
            place("WOOD", 32, 24),
          ],
        },
        {
          id: "m2",
          label: "Map 2 — River gap",
          pieces: [
            place("WOOD", 2, 10),
            place("WOOD", 2, 26),
            place("WOOD", 48, 10),
            place("WOOD", 48, 26),
            place("WOOD", 16, 6),
            place("WOOD", 34, 6),
            place("WOOD", 16, 30),
            place("WOOD", 34, 30),
          ],
        },
        {
          id: "m3",
          label: "Map 3 — Corner holds",
          pieces: [
            place("WOOD", 4, 4),
            place("WOOD", 46, 32),
            place("WOOD", 38, 4),
            place("WOOD", 4, 32),
            place("WOOD", 22, 14),
            place("WOOD", 28, 22),
            place("WOOD", 16, 20),
            place("WOOD", 34, 16),
          ],
        },
        {
          id: "m4",
          label: "Map 4 — Meeting stone",
          pieces: [
            place("WOOD", 6, 6),
            place("WOOD", 44, 6),
            place("WOOD", 6, 30),
            place("WOOD", 44, 30),
            place("WOOD", 22, 16),
            place("WOOD", 28, 20),
            place("WOOD", 14, 18),
            place("WOOD", 36, 18),
          ],
        },
      ],
    },
    {
      id: "aos1k",
      name: "Age of Sigmar · 1k board",
      table: { w: 44, h: 30 },
      note: "Smaller pitched table. About 4 features.",
      kit: [{ key: "WOOD", w: 8, h: 6, shape: "blob", label: "Feature 8×6" }],
      deploys: ["long", "short", "none"],
      starts: [
        {
          id: "m1",
          label: "Map 1 — Four corners",
          pieces: [place("WOOD", 3, 3), place("WOOD", 33, 3), place("WOOD", 3, 21), place("WOOD", 33, 21)],
        },
        {
          id: "m2",
          label: "Map 2 — Mid pair",
          pieces: [place("WOOD", 6, 10), place("WOOD", 30, 10), place("WOOD", 16, 4), place("WOOD", 18, 20)],
        },
      ],
    },
    {
      id: "heresy3",
      name: "Horus Heresy · 3e (6×4)",
      table: { w: 72, h: 48 },
      note: "Open Age of Darkness table. Three deployment types. Vehicle-scale ruins.",
      kit: [
        { key: "RUIN", w: 10, h: 8, shape: "rect", label: "Ruin 10×8" },
        { key: "WALL", w: 12, h: 3, shape: "line", label: "Wall 12×3" },
      ],
      deploys: ["long", "short", "corners", "none"],
      starts: [
        {
          id: "m1",
          label: "Map 1 — Legion line",
          pieces: [
            place("RUIN", 4, 6),
            place("RUIN", 58, 6),
            place("RUIN", 4, 34),
            place("RUIN", 58, 34),
            place("RUIN", 28, 18),
            place("WALL", 16, 16),
            place("WALL", 44, 29),
            place("RUIN", 20, 30),
            place("RUIN", 42, 8),
          ],
        },
        {
          id: "m2",
          label: "Map 2 — Siege corridor",
          pieces: [
            place("RUIN", 8, 4),
            place("RUIN", 8, 36),
            place("RUIN", 54, 4),
            place("RUIN", 54, 36),
            place("WALL", 24, 10),
            place("WALL", 36, 35),
            place("RUIN", 30, 18),
            place("WALL", 20, 22, 90),
            place("WALL", 48, 22, 90),
          ],
        },
        {
          id: "m3",
          label: "Map 3 — Crossed banners",
          pieces: [
            place("RUIN", 6, 6),
            place("RUIN", 56, 34),
            place("RUIN", 50, 6),
            place("RUIN", 8, 34),
            place("RUIN", 30, 18),
            place("WALL", 22, 14),
            place("WALL", 38, 30),
          ],
        },
      ],
    },
    {
      id: "zm",
      name: "Heresy · Zone Mortalis",
      table: { w: 48, h: 48 },
      note: "4×4 of 12 in sectors. Move walls. Not a published ZM city map.",
      kit: [{ key: "WALL", w: 12, h: 2, shape: "line", label: "Wall 12×2" }],
      deploys: ["corners", "short", "none"],
      starts: [
        {
          id: "m1",
          label: "Map 1 — Cross halls",
          pieces: [
            place("WALL", 12, 11),
            place("WALL", 24, 11),
            place("WALL", 12, 35),
            place("WALL", 24, 35),
            place("WALL", 11, 12, 90),
            place("WALL", 35, 12, 90),
            place("WALL", 11, 24, 90),
            place("WALL", 35, 24, 90),
          ],
        },
        {
          id: "m2",
          label: "Map 2 — Tight rooms",
          pieces: [
            place("WALL", 0, 12),
            place("WALL", 12, 12),
            place("WALL", 24, 24),
            place("WALL", 36, 24),
            place("WALL", 12, 0, 90),
            place("WALL", 12, 24, 90),
            place("WALL", 24, 12, 90),
            place("WALL", 36, 24, 90),
          ],
        },
      ],
    },
    {
      id: "killteam",
      name: "Kill Team",
      table: { w: 30, h: 22 },
      note: "30×22 board. Original yards — not Volkus / Gallowdark maps.",
      kit: [
        { key: "HEAVY", w: 6, h: 5, shape: "rect", label: "Heavy 6×5" },
        { key: "LIGHT", w: 4, h: 2, shape: "line", label: "Light 4×2" },
      ],
      deploys: ["long", "short", "corners", "none"],
      starts: [
        {
          id: "m1",
          label: "Map 1 — Tight yards",
          pieces: [
            place("HEAVY", 2, 5),
            place("HEAVY", 22, 5),
            place("HEAVY", 2, 12),
            place("HEAVY", 22, 12),
            place("LIGHT", 10, 8),
            place("LIGHT", 16, 12),
          ],
        },
        {
          id: "m2",
          label: "Map 2 — Split halls",
          pieces: [
            place("HEAVY", 12, 2),
            place("HEAVY", 12, 15),
            place("LIGHT", 2, 10),
            place("LIGHT", 24, 10),
            place("HEAVY", 4, 4),
            place("HEAVY", 20, 13),
          ],
        },
        {
          id: "m3",
          label: "Map 3 — Cross streets",
          pieces: [
            place("HEAVY", 2, 3),
            place("HEAVY", 22, 3),
            place("HEAVY", 2, 14),
            place("HEAVY", 22, 14),
            place("LIGHT", 11, 8),
            place("LIGHT", 15, 12),
          ],
        },
        {
          id: "m4",
          label: "Map 4 — Stacked rooms",
          pieces: [
            place("HEAVY", 8, 1),
            place("HEAVY", 8, 8.5),
            place("HEAVY", 8, 16),
            place("LIGHT", 3, 7),
            place("LIGHT", 23, 14),
          ],
        },
      ],
    },
    {
      id: "warcry",
      name: "Warcry",
      table: { w: 30, h: 22 },
      note: "Skirmish rectangle. Scatter you can shove around.",
      kit: [{ key: "ROCK", w: 5, h: 4, shape: "blob", label: "Scatter 5×4" }],
      deploys: ["corners", "none"],
      starts: [
        {
          id: "m1",
          label: "Map 1 — Two rocks",
          pieces: [
            place("ROCK", 4, 4),
            place("ROCK", 21, 14),
            place("ROCK", 12, 8),
            place("ROCK", 6, 14),
            place("ROCK", 20, 3),
          ],
        },
      ],
    },
    {
      id: "necromunda",
      name: "Necromunda",
      table: { w: 36, h: 36 },
      note: "3×3 of 12 in tiles. Move walls. Not an official hive map.",
      kit: [{ key: "WALL", w: 12, h: 2, shape: "line", label: "Tile wall" }],
      deploys: ["corners", "none"],
      starts: [
        {
          id: "m1",
          label: "Map 1 — Tile grid",
          pieces: [
            place("WALL", 12, 11),
            place("WALL", 12, 23),
            place("WALL", 11, 12, 90),
            place("WALL", 23, 12, 90),
          ],
        },
      ],
    },
  ];

  function surfaceById(id) {
    return SURFACES.find(function (s) { return s.id === id; }) || SURFACES[0];
  }

  function sys(id) {
    return SYSTEMS.find(function (s) { return s.id === id; }) || SYSTEMS[0];
  }

  function kitItem(system, key) {
    return system.kit.find(function (k) { return k.key === key; }) || system.kit[0];
  }

  function extraDef(id) {
    return EXTRAS.find(function (e) { return e.id === id; }) || null;
  }

  function uid() {
    return "p" + Math.random().toString(36).slice(2, 9);
  }

  function inflate(system, start) {
    return start.pieces.map(function (p) {
      const extra = extraDef(p.type);
      const spec = extra || kitItem(system, p.type);
      return {
        id: uid(),
        type: p.type,
        x: p.x,
        y: p.y,
        rot: p.rot || 0,
        w: spec.w,
        h: spec.h,
        shape: spec.shape || "rect",
        label: spec.label || spec.name || p.type,
        sku: spec.sku || "",
        extra: !!extra,
      };
    });
  }

  function readState() {
    try {
      return JSON.parse(localStorage.getItem(STORE) || "{}") || {};
    } catch (e) {
      return {};
    }
  }

  function writeState(state) {
    try {
      localStorage.setItem(STORE, JSON.stringify(state));
    } catch (e) {}
  }

  function fill(sel, items, val, lab, cur) {
    sel.innerHTML = items
      .map(function (it) {
        const v = val(it);
        return '<option value="' + v + '"' + (v === cur ? " selected" : "") + ">" + lab(it) + "</option>";
      })
      .join("");
  }

  let drag = null;
  let selected = "";

  function tableEl() {
    return document.getElementById("map-table");
  }

  function toInches(system, clientX, clientY) {
    const box = tableEl().getBoundingClientRect();
    return {
      x: ((clientX - box.left) / box.width) * system.table.w,
      y: ((clientY - box.top) / box.height) * system.table.h,
    };
  }

  function clampPiece(system, p) {
    p.x = Math.max(0, Math.min(system.table.w - p.w * 0.35, p.x));
    p.y = Math.max(0, Math.min(system.table.h - p.h * 0.35, p.y));
  }

  function drawZones(deployKey) {
    return (DEPLOYS[deployKey] || [])
      .map(function (z) {
        return (
          '<div class="map-zone map-zone-' +
          z.side.toLowerCase() +
          '" style="left:' +
          z.x +
          "%;top:" +
          z.y +
          "%;width:" +
          z.w +
          "%;height:" +
          z.h +
          '%"><span>Camp ' +
          z.side +
          "</span></div>"
        );
      })
      .join("");
  }

  function drawPiece(system, p) {
    const left = (p.x / system.table.w) * 100;
    const top = (p.y / system.table.h) * 100;
    const width = (p.w / system.table.w) * 100;
    const height = (p.h / system.table.h) * 100;
    const cls = [
      "map-piece",
      "is-" + p.shape,
      p.extra ? "is-extra" : "",
      p.id === selected ? "is-sel" : "",
    ]
      .filter(Boolean)
      .join(" ");
    return (
      '<button type="button" class="' +
      cls +
      '" data-id="' +
      p.id +
      '" style="left:' +
      left +
      "%;top:" +
      top +
      "%;width:" +
      width +
      "%;height:" +
      height +
      "%;transform:rotate(" +
      p.rot +
      'deg)">' +
      "<span>" +
      p.label +
      "</span></button>"
    );
  }

  function current() {
    const gameSel = document.getElementById("map-game");
    const styleSel = document.getElementById("map-style");
    const deploySel = document.getElementById("map-deploy");
    const surfaceSel = document.getElementById("map-surface");
    const system = sys(gameSel.value);
    const start = system.starts.find(function (s) { return s.id === styleSel.value; }) || system.starts[0];
    const surface = surfaceById(surfaceSel ? surfaceSel.value : "grass");
    return {
      system: system,
      start: start,
      deploy: deploySel.value,
      surface: surface,
      gameSel: gameSel,
      styleSel: styleSel,
      deploySel: deploySel,
      surfaceSel: surfaceSel,
    };
  }

  function render() {
    const c = current();
    const state = readState();
    if (!state.pieces || state.game !== c.system.id || state.start !== c.start.id) {
      state.game = c.system.id;
      state.start = c.start.id;
      state.deploy = c.deploy;
      state.surface = c.surface.id;
      state.pieces = inflate(c.system, c.start);
      writeState(state);
    } else {
      state.deploy = c.deploy;
      state.surface = c.surface.id;
      writeState(state);
    }

    const table = tableEl();
    table.style.setProperty("--map-aspect", String(c.system.table.w / c.system.table.h));
    table.setAttribute("data-surface", c.surface.id);
    table.innerHTML =
      '<div class="map-felt" data-surface="' +
      c.surface.id +
      '">' +
      drawZones(c.deploy) +
      state.pieces.map(function (p) { return drawPiece(c.system, p); }).join("") +
      "</div>";

    const ideas = document.getElementById("map-surface-ideas");
    if (ideas) ideas.textContent = c.surface.idea;

    document.getElementById("map-hint").textContent =
      c.system.table.w +
      " × " +
      c.system.table.h +
      " in · " +
      c.surface.label.split("·")[0].trim() +
      " · drag a shape · double-click rotate · " +
      state.pieces.length +
      " objects";
    document.getElementById("map-meta").innerHTML =
      "<p><strong>" +
      c.system.name +
      "</strong> · " +
      c.start.label +
      " · <em>" +
      c.surface.label +
      "</em></p><p>" +
      c.system.note +
      "</p>";

    document.getElementById("map-extras").innerHTML = EXTRAS.map(function (e) {
      return (
        '<button type="button" class="extra-chip" data-add="' +
        e.id +
        '"><span class="pill">' +
        e.kind +
        "</span><strong>" +
        e.name +
        "</strong>" +
        (e.sku ? '<span class="sku">' + e.sku + "</span>" : "") +
        "</button>"
      );
    }).join("");
  }

  function bindTable() {
    const table = tableEl();
    table.addEventListener("pointerdown", function (evt) {
      const btn = evt.target.closest(".map-piece");
      if (!btn) return;
      const state = readState();
      const piece = state.pieces.find(function (p) { return p.id === btn.getAttribute("data-id"); });
      if (!piece) return;
      selected = piece.id;
      const c = current();
      const at = toInches(c.system, evt.clientX, evt.clientY);
      drag = { id: piece.id, dx: at.x - piece.x, dy: at.y - piece.y };
      btn.setPointerCapture(evt.pointerId);
      evt.preventDefault();
      renderPiecesOnly();
    });
    table.addEventListener("pointermove", function (evt) {
      if (!drag) return;
      const c = current();
      const state = readState();
      const piece = state.pieces.find(function (p) { return p.id === drag.id; });
      if (!piece) return;
      const at = toInches(c.system, evt.clientX, evt.clientY);
      piece.x = at.x - drag.dx;
      piece.y = at.y - drag.dy;
      clampPiece(c.system, piece);
      writeState(state);
      renderPiecesOnly();
    });
    table.addEventListener("pointerup", function () {
      drag = null;
    });
    table.addEventListener("dblclick", function (evt) {
      const btn = evt.target.closest(".map-piece");
      if (!btn) return;
      rotateId(btn.getAttribute("data-id"));
    });
  }

  function renderPiecesOnly() {
    const c = current();
    const state = readState();
    const table = tableEl();
    table.setAttribute("data-surface", c.surface.id);
    const felt = table.querySelector(".map-felt");
    if (!felt) return;
    felt.setAttribute("data-surface", c.surface.id);
    felt.innerHTML =
      drawZones(c.deploy) +
      state.pieces.map(function (p) { return drawPiece(c.system, p); }).join("");
  }

  function rotateId(id) {
    const state = readState();
    const piece = state.pieces.find(function (p) { return p.id === id; });
    if (!piece) return;
    piece.rot = (piece.rot + 45) % 360;
    selected = id;
    writeState(state);
    renderPiecesOnly();
  }

  function addExtra(id) {
    const def = extraDef(id);
    const c = current();
    const state = readState();
    state.pieces.push({
      id: uid(),
      type: def.id,
      x: c.system.table.w / 2 - def.w / 2,
      y: c.system.table.h / 2 - def.h / 2,
      rot: 0,
      w: def.w,
      h: def.h,
      shape: "extra",
      label: def.name,
      sku: def.sku,
      extra: true,
    });
    selected = state.pieces[state.pieces.length - 1].id;
    writeState(state);
    renderPiecesOnly();
    document.getElementById("map-hint").textContent = "Added " + def.name + " — drag it.";
  }

  function generateLayoutPicture() {
    const c = current();
    const state = readState();
    const pieces = state.pieces || [];
    const pal = c.surface.png;
    const scale = 18;
    const pad = 36;
    const tw = Math.round(c.system.table.w * scale);
    const th = Math.round(c.system.table.h * scale);
    const canvas = document.createElement("canvas");
    canvas.width = tw;
    canvas.height = th + pad;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#040816";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#3df0ff";
    ctx.font = "600 13px DM Sans, system-ui, sans-serif";
    ctx.fillText("Paradice Forge  ·  " + c.system.name + "  ·  " + c.start.label, 10, 22);
    ctx.fillStyle = "#7d93b8";
    ctx.font = "12px DM Sans, system-ui, sans-serif";
    ctx.fillText(
      c.system.table.w +
        " × " +
        c.system.table.h +
        " in  ·  " +
        c.surface.label.split("·")[0].trim() +
        "  ·  unofficial Forge start",
      10,
      34
    );

    ctx.save();
    ctx.translate(0, pad);
    ctx.fillStyle = pal.felt;
    ctx.fillRect(0, 0, tw, th);
    ctx.strokeStyle = pal.grid;
    ctx.lineWidth = 1;
    for (let x = 0; x <= tw; x += scale) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, th);
      ctx.stroke();
    }
    for (let y = 0; y <= th; y += scale) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(tw, y);
      ctx.stroke();
    }

    (DEPLOYS[c.deploy] || []).forEach(function (z) {
      ctx.fillStyle = z.side === "A" ? "rgba(61,240,255,0.12)" : "rgba(77,124,255,0.16)";
      ctx.strokeStyle = "rgba(61,240,255,0.4)";
      ctx.setLineDash([6, 4]);
      ctx.fillRect((z.x / 100) * tw, (z.y / 100) * th, (z.w / 100) * tw, (z.h / 100) * th);
      ctx.strokeRect((z.x / 100) * tw, (z.y / 100) * th, (z.w / 100) * tw, (z.h / 100) * th);
      ctx.setLineDash([]);
      ctx.fillStyle = "#7af6ff";
      ctx.font = "600 11px DM Sans, system-ui, sans-serif";
      ctx.fillText("Camp " + z.side, (z.x / 100) * tw + 8, (z.y / 100) * th + 16);
    });

    pieces.forEach(function (p) {
      const w = p.w * scale;
      const h = p.h * scale;
      const x = p.x * scale;
      const y = p.y * scale;
      ctx.save();
      ctx.translate(x + w / 2, y + h / 2);
      ctx.rotate(((p.rot || 0) * Math.PI) / 180);
      ctx.translate(-w / 2, -h / 2);
      ctx.shadowColor = "rgba(0,0,0,0.35)";
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 2;
      if (p.shape === "tri") {
        ctx.fillStyle = p.extra ? "rgba(61,240,255,0.45)" : pal.piece;
        ctx.beginPath();
        ctx.moveTo(0, h);
        ctx.lineTo(w, h);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fill();
        ctx.shadowColor = "transparent";
        ctx.strokeStyle = pal.line;
        ctx.stroke();
      } else if (p.shape === "blob") {
        ctx.fillStyle = "rgba(42,106,72,0.7)";
        ctx.beginPath();
        ctx.ellipse(w / 2, h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = "transparent";
        ctx.strokeStyle = "#5ee0c0";
        ctx.stroke();
      } else {
        ctx.fillStyle = p.extra
          ? "rgba(61,240,255,0.38)"
          : p.shape === "line"
            ? "rgba(0,0,0,0.35)"
            : pal.piece;
        ctx.strokeStyle = pal.line;
        ctx.fillRect(0, 0, w, h);
        ctx.shadowColor = "transparent";
        ctx.strokeRect(0, 0, w, h);
        if (p.shape !== "line") {
          ctx.fillStyle = "rgba(255,255,255,0.08)";
          ctx.fillRect(0, 0, w, Math.max(3, h * 0.18));
        }
      }
      ctx.fillStyle = c.surface.id === "snow" || c.surface.id === "sand" ? "#1a1a22" : "#e4f0ff";
      ctx.font = "600 10px DM Sans, system-ui, sans-serif";
      ctx.fillText(String(p.label || "").slice(0, 22), 4, Math.min(h - 4, 14));
      ctx.restore();
    });
    ctx.restore();

    const data = canvas.toDataURL("image/png");
    const img = document.getElementById("map-picture-img");
    const frame = document.getElementById("map-picture-frame");
    const dl = document.getElementById("map-picture-download");
    img.src = data;
    frame.classList.remove("hidden");
    dl.href = data;
    const slug = (c.system.id + "-" + c.start.id + "-" + c.surface.id).replace(/[^a-z0-9-]+/gi, "-");
    dl.download = "paradice-forge-" + slug + ".png";
    dl.classList.remove("hidden");
    frame.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  function init() {
    const gameSel = document.getElementById("map-game");
    const styleSel = document.getElementById("map-style");
    const deploySel = document.getElementById("map-deploy");
    const surfaceSel = document.getElementById("map-surface");
    if (!gameSel) return;

    const saved = readState();
    fill(gameSel, SYSTEMS, function (s) { return s.id; }, function (s) { return s.name; }, saved.game || "wh40k11");
    if (surfaceSel) {
      fill(
        surfaceSel,
        SURFACES,
        function (s) { return s.id; },
        function (s) { return s.label; },
        saved.surface || "grass"
      );
    }

    function syncLists() {
      const system = sys(gameSel.value);
      fill(styleSel, system.starts, function (s) { return s.id; }, function (s) { return s.label; }, system.starts[0].id);
      fill(
        deploySel,
        system.deploys,
        function (d) { return d; },
        function (d) {
          return { long: "Long-edge camps", short: "Short-edge camps", corners: "Corner camps", none: "No overlay" }[d];
        },
        system.deploys[0]
      );
    }

    syncLists();
    if (saved.start) styleSel.value = saved.start;
    if (saved.deploy) deploySel.value = saved.deploy;
    if (surfaceSel && saved.surface) surfaceSel.value = saved.surface;

    gameSel.addEventListener("change", function () {
      const keepSurface = surfaceSel ? surfaceSel.value : "grass";
      writeState({ surface: keepSurface });
      selected = "";
      syncLists();
      if (surfaceSel) surfaceSel.value = keepSurface;
      render();
    });
    styleSel.addEventListener("change", function () {
      writeState({
        game: gameSel.value,
        start: styleSel.value,
        deploy: deploySel.value,
        surface: surfaceSel ? surfaceSel.value : "grass",
        pieces: null,
      });
      selected = "";
      render();
    });
    deploySel.addEventListener("change", render);
    if (surfaceSel) {
      surfaceSel.addEventListener("change", function () {
        const state = readState();
        state.surface = surfaceSel.value;
        writeState(state);
        render();
      });
    }

    document.getElementById("map-reset").addEventListener("click", function () {
      writeState({
        game: gameSel.value,
        start: styleSel.value,
        deploy: deploySel.value,
        surface: surfaceSel ? surfaceSel.value : "grass",
        pieces: null,
      });
      selected = "";
      render();
    });
    document.getElementById("map-random").addEventListener("click", function () {
      const system = SYSTEMS[Math.floor(Math.random() * SYSTEMS.length)];
      const start = system.starts[Math.floor(Math.random() * system.starts.length)];
      const surf = SURFACES[Math.floor(Math.random() * SURFACES.length)];
      gameSel.value = system.id;
      syncLists();
      styleSel.value = start.id;
      if (surfaceSel) surfaceSel.value = surf.id;
      writeState({
        game: system.id,
        start: start.id,
        deploy: deploySel.value,
        surface: surf.id,
        pieces: null,
      });
      render();
    });
    document.getElementById("map-rotate").addEventListener("click", function () {
      if (selected) rotateId(selected);
    });
    document.getElementById("map-delete").addEventListener("click", function () {
      if (!selected) return;
      const state = readState();
      state.pieces = state.pieces.filter(function (p) { return p.id !== selected; });
      selected = "";
      writeState(state);
      renderPiecesOnly();
    });
    document.getElementById("map-extras").addEventListener("click", function (evt) {
      const btn = evt.target.closest("[data-add]");
      if (btn) addExtra(btn.getAttribute("data-add"));
    });
    document.getElementById("map-picture").addEventListener("click", generateLayoutPicture);

    bindTable();
    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
