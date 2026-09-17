(function () {
  const cfg = window.FORGE_CONFIG || {};
  const page = document.body.getAttribute("data-page") || "";
  const VOTE_KEY = "paradice-forge-terrain-vote";
  const THEME_KEY = "paradice-forge-theme";
  const FOCUS_KEY = "paradice-forge-focus";

  function readStore(key, fallback) {
    try {
      return localStorage.getItem(key) || fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeStore(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) { }
  }

  function applyLook() {
    const theme = readStore(THEME_KEY, "armageddon");
    const focus = readStore(FOCUS_KEY, "subject");
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-focus", focus);
    document.querySelectorAll("[data-theme-set]").forEach(function (btn) {
      btn.classList.toggle("is-on", btn.getAttribute("data-theme-set") === theme);
    });
    document.querySelectorAll("[data-focus-set]").forEach(function (btn) {
      btn.classList.toggle("is-on", btn.getAttribute("data-focus-set") === focus);
    });
  }

  function ensureFonts() {
    if (document.getElementById("forge-fonts")) return;
    const link = document.createElement("link");
    link.id = "forge-fonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap";
    document.head.appendChild(link);
  }

  function renderAtmosphere() {
    if (document.querySelector(".atmosphere")) return;
    const el = document.createElement("div");
    el.className = "atmosphere";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = '<div class="atm-wash"></div><div class="atm-grain"></div><div class="atm-vignette"></div>';
    document.body.insertBefore(el, document.body.firstChild);
  }

  function bindFallbacks(root) {
    (root || document).querySelectorAll("img[data-fallback]").forEach(function (img) {
      if (img.getAttribute("data-fb-on") === "1") return;
      img.setAttribute("data-fb-on", "1");
      const chain = (img.getAttribute("data-fallback") || "")
        .split("|")
        .map(function (s) { return s.trim(); })
        .filter(Boolean);
      let step = 0;
      let locked = false;
      function onErr() {
        if (locked || step >= chain.length) {
          if (step >= chain.length) img.removeEventListener("error", onErr);
          return;
        }
        locked = true;
        const next = chain[step];
        step += 1;
        img.src = next;
        window.setTimeout(function () {
          locked = false;
          if (img.complete && img.naturalWidth === 0 && step < chain.length) onErr();
        }, 0);
        if (step >= chain.length) img.removeEventListener("error", onErr);
      }
      img.addEventListener("error", onErr);
      if (img.complete && img.naturalWidth === 0) onErr();
    });
  }

  function plateKey(p) {
    if (p && p.plate) return p.plate.replace(/^img\/plates\//, "").replace(/\.(webp|svg|jpg|png)$/, "");
    const s = (p && p.sku) || "";
    if (/TA1|WRECK/i.test(s)) return "wreck";
    if (/TA3|SCRAP/i.test(s)) return "scrap";
    if (/TA2|NAVE|CATHEDRAL/i.test(s)) return "cathedral";
    if (/STACK|MANUFACTOR/i.test(s)) return "manufactorum";
    if (/BA|LEMARTES|DANTE|JUMP/i.test(s)) return "ba";
    if (/ORK|GHAZ/i.test(s)) return "ork";
    if (p && p.lane === "hero") return "hero";
    if (p && (p.lane === "stl" || p.lane === "terrain")) return "cathedral";
    if (p && p.lane === "book") return "books";
    return "army";
  }

  function plateChain(p) {
    const key = plateKey(p);
    return "img/plates/" + key + ".webp|img/plates/" + key + ".svg";
  }

  function mediaHtml(p, extraClass) {
    const photo = (p && p.image) || ("img/products/" + p.sku + ".jpg");
    const alt = p && p.name ? p.name.replace(/"/g, "") : "";
    return (
      '<div class="focal ' +
      (extraClass || "") +
      '"><img src="' +
      photo +
      '" alt="' +
      alt +
      '" data-fallback="' +
      plateChain(p) +
      '"><span class="focal-caption">' +
      (p.lane || "desk") +
      "</span></div>"
    );
  }

  function plateMedia(key, caption, extraClass) {
    return (
      '<div class="focal ' +
      (extraClass || "focal-card") +
      '"><img src="img/plates/' +
      key +
      '.webp" alt="" data-fallback="img/plates/' +
      key +
      '.svg"><span class="focal-caption">' +
      (caption || "") +
      "</span></div>"
    );
  }

  applyLook();
  ensureFonts();
  renderAtmosphere();

  const MARK = `<svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
    <rect x="3.5" y="3.5" width="25" height="25" rx="3" fill="none" stroke="#d4af5a" stroke-width="1.4"/>
    <path d="M10 20h12M12 20v-6h8v6M14 14V10h4v4" fill="none" stroke="#d4af5a" stroke-width="1.3"/>
  </svg>`;

  const NAV = [
    { id: "home", href: "index.html", label: "Home" },
    { id: "creations", href: "creations.html", label: "Creations" },
    { id: "shop", href: "shop.html", label: "Shop" },
    { id: "maps", href: "maps.html", label: "Maps" },
    { id: "adventure", href: "adventure.html", label: "Adventure" },
    { id: "community", href: "community.html", label: "Community" },
    { id: "about", href: "about.html", label: "About" },
  ];

  function comingLabel(kind) {
    const map = {
      discord: "Invite coming",
      patreon: "Tiers coming",
      tip: "Tip link coming",
      commissions: "Tiers coming",
      ebay: "Auction link coming",
      pod: "Print shop coming",
      dropship: "Dropship coming",
      logos: "Logo merch coming",
    };
    return map[kind] || "Coming";
  }

  function hrefOrHash(url) {
    return url && String(url).trim() ? url : null;
  }

  function bindExternal(el, url, kind) {
    if (!el) return;
    const live = hrefOrHash(url);
    if (live) {
      el.href = live;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
      el.classList.remove("is-pending");
      return;
    }
    el.href = "#" + (kind || "coming");
    el.classList.add("is-pending");
    el.removeAttribute("target");
    if (el.matches(".btn, .link")) {
      const label = comingLabel(kind);
      if (el.dataset.keepLabel !== "true") el.textContent = label;
    }
  }

  function renderNav() {
    const host = document.getElementById("site-header");
    if (!host) return;
    const links = NAV.map(function (item) {
      const current = item.id === page ? ' aria-current="page"' : "";
      return '<li><a href="' + item.href + '"' + current + ">" + item.label + "</a></li>";
    }).join("");

    host.innerHTML =
      '<a class="skip" href="#main">Skip to content</a>' +
      '<nav class="site-nav" aria-label="Forge">' +
      '<div class="nav-inner">' +
      '<a class="nav-brand" href="index.html">' + MARK + (cfg.storeName || "Paradice Forge") + "</a>" +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-links">Menu</button>' +
      '<ul class="nav-links" id="nav-links">' +
      links +
      '<li><a class="js-youtube" href="https://www.youtube.com/@Lost-Paradice-Forge">Watch</a></li>' +
      "</ul></div></nav>";

    const nav = host.querySelector(".site-nav");
    const toggle = host.querySelector(".nav-toggle");

    function setMenuOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    }

    toggle.addEventListener("click", function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      setMenuOpen(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        setMenuOpen(false);
      });
    });

    function closeIfWide() {
      if (window.innerWidth > 1100) setMenuOpen(false);
    }
    window.addEventListener("resize", closeIfWide);
    if (window.matchMedia) {
      const mq = window.matchMedia("(min-width: 1101px)");
      if (mq.addEventListener) mq.addEventListener("change", closeIfWide);
      else if (mq.addListener) mq.addListener(closeIfWide);
    }
  }

  function renderFooter() {
    const host = document.getElementById("site-footer");
    if (!host) return;
    const year = new Date().getFullYear();
    host.innerHTML =
      '<footer><div class="wrap">' +
      '<p class="brand-mini">' + (cfg.storeName || "Paradice Forge") + "</p>" +
      '<p class="motto-foot">' +
      (cfg.motto || "Love what I do, Love what you do.") +
      "</p>" +
      '<div class="foot-links">' +
      '<a href="creations.html">Creations</a>' +
      '<a href="shop.html">Shop</a>' +
      '<a href="maps.html">Maps</a>' +
      '<a href="commissions.html">Commissions</a>' +
      '<a href="worlds.html">Tree</a>' +
      '<a href="adventure.html">Adventure</a>' +
      '<a href="price-guide.html">Prices</a>' +
      '<a href="terrain.html">Terrain</a>' +
      '<a href="community.html">Community</a>' +
      '<a href="about.html">About</a>' +
      '<a class="js-youtube" href="https://www.youtube.com/@Lost-Paradice-Forge">YouTube</a>' +
      "</div>" +
      "<p>© " + year + " Aaron · Paradice Miniatures · was Paradise Treasures.</p>" +
      '<p class="preview-banner">Checkout is not live. Discord, Patreon, eBay, and print shops stay empty until real URLs are pasted into js/config.js.</p>' +
      '<div class="theme-bar">' +
      '<span class="lbl">Palette</span><div class="theme-picks" role="group" aria-label="Theme">' +
      '<button type="button" data-theme-set="armageddon">Night</button>' +
      '<button type="button" data-theme-set="forge">Forge</button>' +
      '<button type="button" data-theme-set="chalice">Chalice</button></div>' +
      '<span class="lbl">Background</span><div class="theme-picks" role="group" aria-label="Focus">' +
      '<button type="button" data-focus-set="subject">Subject sharp</button>' +
      '<button type="button" data-focus-set="scene">Show the scene</button></div></div>' +
      "</div></footer>";

    host.querySelectorAll("[data-theme-set]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        writeStore(THEME_KEY, btn.getAttribute("data-theme-set"));
        applyLook();
      });
    });
    host.querySelectorAll("[data-focus-set]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        writeStore(FOCUS_KEY, btn.getAttribute("data-focus-set"));
        applyLook();
      });
    });
    applyLook();
  }

  function wireLinks() {
    document.querySelectorAll(".js-youtube").forEach(function (el) {
      bindExternal(el, cfg.youtube, "youtube");
    });
    document.querySelectorAll(".js-discord").forEach(function (el) {
      bindExternal(el, cfg.discord, "discord");
    });
    document.querySelectorAll(".js-patreon").forEach(function (el) {
      bindExternal(el, cfg.patreon, "patreon");
    });
    document.querySelectorAll(".js-tip").forEach(function (el) {
      bindExternal(el, cfg.tip, "tip");
    });
    document.querySelectorAll(".js-commissions").forEach(function (el) {
      bindExternal(el, cfg.commissions, "commissions");
    });
    document.querySelectorAll(".js-ebay").forEach(function (el) {
      bindExternal(el, cfg.ebay, "ebay");
    });
    document.querySelectorAll(".js-pod").forEach(function (el) {
      bindExternal(el, cfg.printOnDemand, "pod");
    });
    document.querySelectorAll(".js-dropship").forEach(function (el) {
      bindExternal(el, cfg.dropship || cfg.logos, "dropship");
    });
    document.querySelectorAll(".js-logos").forEach(function (el) {
      bindExternal(el, cfg.logos || cfg.printOnDemand, "logos");
    });
    const mail = (cfg.emails && cfg.emails.hello) || "";
    document.querySelectorAll(".js-email-hello").forEach(function (el) {
      if (mail) {
        el.href = "mailto:" + mail;
        el.textContent = mail;
        el.classList.remove("is-pending");
      } else {
        el.href = "#";
        el.classList.add("is-pending");
      }
    });
  }

  function pct(n, of) {
    if (!of) return 0;
    return Math.max(0, Math.min(100, Math.round((n / of) * 100)));
  }

  function renderMilestones() {
    const host = document.getElementById("milestones");
    if (!host || !cfg.armies) return;
    host.innerHTML = cfg.armies
      .map(function (army) {
        const desk = pct(army.deskPts, army.target);
        const tips = pct(army.tips, army.target);
        return (
          '<article class="milestone">' +
          '<div class="milestone-head"><span>' +
          army.name +
          " — " +
          army.subtitle +
          '</span><span class="pts">' +
          army.target.toLocaleString() +
          " pts</span></div>" +
          '<div class="bar-pair">' +
          '<div><div class="bar-label"><span>Desk (approx)</span><span>' +
          army.deskPts.toLocaleString() +
          " / " +
          army.target.toLocaleString() +
          '</span></div><div class="bar" aria-hidden="true"><span style="width:' +
          desk +
          '%"></span></div></div>' +
          '<div><div class="bar-label"><span>Tips</span><span>' +
          (cfg.tip ? army.tips.toLocaleString() + " toward goal" : "Not open yet") +
          '</span></div><div class="bar" aria-hidden="true"><span style="width:' +
          tips +
          '%"></span></div></div>' +
          "</div>" +
          '<p class="note" style="margin-top:0.7rem">' +
          army.note +
          "</p></article>"
        );
      })
      .join("");
  }

  function loadVotes() {
    try {
      return JSON.parse(localStorage.getItem(VOTE_KEY) || "{}");
    } catch (e) {
      return {};
    }
  }

  function saveVotes(data) {
    localStorage.setItem(VOTE_KEY, JSON.stringify(data));
  }

  function renderVote() {
    const host = document.getElementById("terrain-vote");
    if (!host || !cfg.vote) return;
    const tallies = loadVotes();
    const picked = tallies._mine || "";

    host.innerHTML = cfg.vote
      .map(function (opt) {
        const count = Number(tallies[opt.id] || 0);
        const rec = opt.recommended
          ? '<span class="pill">First-drop pick</span>'
          : "";
        const art = opt.plate || { cathedral: "cathedral", wreck: "wreck", scrap: "scrap", manufactorum: "manufactorum" }[opt.id] || "cathedral";
        return (
          '<button type="button" class="card vote-card card-media' +
          (picked === opt.id ? " is-picked" : "") +
          '" data-vote="' +
          opt.id +
          '">' +
          plateMedia(art, opt.name, "focal-card") +
          '<div class="card-body">' +
          rec +
          '<div class="letter">' +
          opt.letter +
          "</div><h3>" +
          opt.name +
          "</h3><p>" +
          opt.blurb +
          '</p><p class="vote-tally js-tally">' +
          count +
          " vote" +
          (count === 1 ? "" : "s") +
          " on this device</p></div></button>"
        );
      })
      .join("");

    const result = document.getElementById("vote-result");
    host.querySelectorAll("[data-vote]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const id = btn.getAttribute("data-vote");
        const next = loadVotes();
        if (next._mine === id) return;
        if (next._mine) next[next._mine] = Math.max(0, Number(next[next._mine] || 0) - 1);
        next[id] = Number(next[id] || 0) + 1;
        next._mine = id;
        saveVotes(next);
        renderVote();
        if (result) {
          const opt = cfg.vote.find(function (v) { return v.id === id; });
          result.classList.add("is-on");
          result.textContent =
            "Logged " +
            opt.letter +
            " — " +
            opt.name +
            ". Preview tally on this browser until Discord is live. Winner becomes STL pack #1.";
        }
      });
    });
    bindFallbacks(host);
  }

  function usd(n) {
    return "$" + Number(n).toLocaleString();
  }

  function productHref(sku) {
    return "product.html?sku=" + encodeURIComponent(sku);
  }

  function renderShop() {
    const host = document.getElementById("shop-grid");
    const cat = window.FORGE_CATALOG;
    if (!host || !cat) return;
    host.innerHTML = cat.products
      .map(function (p) {
        return (
          '<article class="card product-card" data-lane="' +
          p.lane +
          '">' +
          mediaHtml(p, "focal-card") +
          '<div class="product-body">' +
          '<span class="pill">' +
          p.tag +
          "</span>" +
          '<p class="sku">' +
          p.sku +
          "</p>" +
          "<h3>" +
          p.name +
          "</h3>" +
          "<p>" +
          p.blurb +
          "</p>" +
          '<p class="price-lg">' +
          usd(p.price) +
          '<span class="guide">Guide price · catalog draft · checkout off</span></p>' +
          '<a class="link" href="' +
          productHref(p.sku) +
          '">View item →</a></div></article>'
        );
      })
      .join("");
    bindFallbacks(host);

    const filters = document.getElementById("shop-filters");
    if (!filters) return;
    filters.querySelectorAll("[data-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const lane = btn.getAttribute("data-filter");
        filters.querySelectorAll("[data-filter]").forEach(function (b) {
          b.classList.toggle("is-on", b === btn);
        });
        host.querySelectorAll("[data-lane]").forEach(function (card) {
          card.classList.toggle("hidden", lane !== "all" && card.getAttribute("data-lane") !== lane);
        });
      });
    });
  }

  function renderProduct() {
    const host = document.getElementById("product-root");
    const cat = window.FORGE_CATALOG;
    if (!host || !cat) return;
    const sku = new URLSearchParams(window.location.search).get("sku");
    const p = cat.products.find(function (item) { return item.sku === sku; });
    if (!p) {
      host.innerHTML =
        '<p class="section-lede">No item for that SKU. <a href="shop.html">Back to shop</a>.</p>';
      return;
    }
    document.title = p.name + " — " + (cfg.storeName || "Paradice Forge");
    const extras = (p.includes || [])
      .map(function (line) { return "<li>" + line + "</li>"; })
      .join("");
    const guide = p.hrefGuide
      ? '<a class="btn btn-ghost" href="' + p.hrefGuide + '">Open 2k price guide</a>'
      : "";
    host.innerHTML =
      '<p class="eyebrow"><a href="shop.html">Shop</a> · ' +
      p.lane +
      '</p>' +
      '<div class="product-layout">' +
      "<div>" +
      mediaHtml(p, "focal-hero") +
      "<span class=\"pill\" style=\"margin-top:1.25rem\">" +
      p.tag +
      "</span><p class=\"sku\">" +
      p.sku +
      "</p><h1 class=\"brand\" style=\"font-size:clamp(2rem,5vw,3.2rem)\">" +
      p.name +
      "</h1><p class=\"lede\">" +
      p.blurb +
      "</p><ul>" +
      extras +
      "</ul></div>" +
      '<aside class="buy-panel">' +
      '<p class="price-lg">' +
      usd(p.price) +
      '<span class="guide">Guide price · not for sale yet · checkout off</span></p>' +
      "<p class=\"note\">" +
      p.ship +
      "</p>" +
      '<div class="cta-row" style="margin-top:1.25rem">' +
      '<a class="btn btn-primary is-pending" href="#coming">Checkout not open</a>' +
      guide +
      '<a class="btn btn-ghost" href="shop.html">All test items</a>' +
      "</div></aside></div>";
    bindFallbacks(host);
  }

  function renderPriceGuide() {
    const host = document.getElementById("price-guides");
    const cat = window.FORGE_CATALOG;
    if (!host || !cat) return;
    host.innerHTML = cat.guides
      .map(function (g) {
        const rows = g.units
          .map(function (u) {
            return (
              "<tr><td>" +
              u.unit +
              "</td><td>" +
              u.role +
              "</td><td>" +
              usd(u.plastic) +
              "</td></tr>"
            );
          })
          .join("");
        return (
          '<article class="card card-media" id="' +
          g.id +
          '" style="margin-bottom:1.5rem">' +
          mediaHtml({ sku: g.sku, lane: "army", name: g.name }, "focal-card") +
          '<div class="card-body">' +
          '<span class="pill">' +
          g.status +
          " · " +
          g.points.toLocaleString() +
          " pts · guide</span>" +
          "<h3>" +
          g.name +
          "</h3>" +
          "<p>" +
          g.match +
          "</p>" +
          '<table class="guide-table"><thead><tr><th>Unit</th><th>Role</th><th>Plastic (est.)</th></tr></thead><tbody>' +
          rows +
          "</tbody></table>" +
          '<div class="totals">' +
          '<div class="total-box"><p class="lbl">Kit / plastic</p><p class="price-lg">' +
          usd(g.plasticEst) +
          "<span>Buy the boxes yourself</span></p></div>" +
          '<div class="total-box"><p class="lbl">Assembled grey</p><p class="price-lg">' +
          usd(g.greyEst) +
          "<span>Built, unpainted tray</span></p></div>" +
          '<div class="total-box"><p class="lbl">Table-ready paint</p><p class="price-lg">' +
          usd(g.paintedEst) +
          "<span>Forge sale test price</span></p></div>" +
          "</div>" +
          '<p class="note">' +
          g.note +
          " " +
          g.ship +
          '</p>' +
          '<a class="link" href="' +
          productHref(g.sku) +
          '">Open army item page →</a></div></article>'
        );
      })
      .join("");
    bindFallbacks(host);
  }

  function statusLabel(status) {
    const map = {
      open: "Open now",
      next: "Next drop",
      soft: "Soft launch",
      shelf: "On the shelf",
    };
    return map[status] || status;
  }

  function isBookWorld(w) {
    return /book/i.test((w && w.kind) || "");
  }

  function worldCardHtml(w) {
    const link = w.href
      ? '<a class="link" href="' + w.href + '">' + (w.cta || "Open") + " →</a>"
      : '<p class="note" style="margin-top:1rem">Waits its season.</p>';
    let key = "army";
    if (isBookWorld(w)) key = "books";
    else if (/commission|art/i.test((w && w.kind) || "")) key = "commission";
    else if (/terrain|map/i.test((w && w.kind) || "")) key = "terrain";
    return (
      '<article class="card card-media" id="' +
      w.id +
      '">' +
      plateMedia(key, w.kind || "branch") +
      '<div class="card-body"><span class="pill">' +
      statusLabel(w.status) +
      '</span><p class="sku">' +
      w.kind +
      " · " +
      w.when +
      "</p><h3>" +
      w.name +
      "</h3><p>" +
      w.blurb +
      "</p>" +
      link +
      "</div></article>"
    );
  }

  function renderWorlds() {
    const tree = window.FORGE_WORLDS;
    if (!tree) return;
    const lede = document.getElementById("cadence-lede");
    if (lede) lede.textContent = tree.cadence;
    const seasons = document.getElementById("season-grid");
    if (seasons) {
      seasons.innerHTML = (tree.seasons || [])
        .map(function (s) {
          return (
            '<article class="card"><span class="pill">' +
            s.when +
            "</span><h3>" +
            s.name +
            "</h3><p>" +
            s.drop +
            "</p></article>"
          );
        })
        .join("");
    }
    const grid = document.getElementById("world-grid");
    if (grid) grid.innerHTML = tree.worlds.map(worldCardHtml).join("");
  }

  function renderCreations() {
    const tree = window.FORGE_WORLDS;
    if (!tree || !tree.worlds) return;
    const books = tree.worlds.filter(isBookWorld);
    const others = tree.worlds.filter(function (w) {
      return !isBookWorld(w);
    });
    const bookGrid = document.getElementById("book-grid");
    if (bookGrid) bookGrid.innerHTML = books.map(worldCardHtml).join("");
    const otherGrid = document.getElementById("creation-grid");
    if (otherGrid) otherGrid.innerHTML = others.map(worldCardHtml).join("");
    const homeBooks = document.getElementById("home-book-grid");
    if (homeBooks) {
      const rank = { open: 0, next: 1, soft: 2, shelf: 3 };
      const featured = books
        .slice()
        .sort(function (a, b) {
          return (rank[a.status] || 9) - (rank[b.status] || 9);
        })
        .slice(0, 3);
      homeBooks.innerHTML = featured.map(worldCardHtml).join("");
    }
  }

  renderNav();
  renderFooter();
  wireLinks();
  renderMilestones();
  renderVote();
  renderShop();
  renderProduct();
  renderPriceGuide();
  renderWorlds();
  renderCreations();
  bindFallbacks(document);
  window.FORGE_bindFallbacks = bindFallbacks;
})();
