// Big desktop screens (an iMac or Studio Display, a 1920px monitor) show the site as a MacBook does, only
// bigger: past 1728px wide the page is zoomed by width / 1728 (at most 2), but never so much that the page
// would be less than 900px tall (ultra-wide 21:9 monitors get a wider layout instead of a squashed one, and the
// max-height media queries in styles.css, which see the real window, stay true for the zoomed page). CSS zoom also enlarges viewport
// units, so styles.css uses var(--vh), var(--vw)… instead of vh, vw…: here they are set to the window's size
// in page pixels. Loaded in <head> of every page, before the page is drawn.
(function () {
  var root = document.documentElement, BASE = 1728, UNITS = ['--vh', '--svh', '--dvh', '--vw', '--vmin', '--vmax'];
  function apply() {
    var w = innerWidth, h = innerHeight, k = w > BASE ? Math.max(1, Math.min(2, w / BASE, h / 900)) : 1, s = root.style;
    window.__zoom = k;
    if (k === 1) { s.zoom = ''; UNITS.forEach(function (p) { s.removeProperty(p); }); return; }
    s.zoom = k;
    var vh = h / k / 100 + 'px', vw = w / k / 100 + 'px';
    s.setProperty('--vh', vh); s.setProperty('--svh', vh); s.setProperty('--dvh', vh); s.setProperty('--vw', vw);
    s.setProperty('--vmin', Math.min(w, h) / k / 100 + 'px'); s.setProperty('--vmax', Math.max(w, h) / k / 100 + 'px');
  }
  apply();
  addEventListener('resize', apply);
})();
