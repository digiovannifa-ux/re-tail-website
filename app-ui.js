// Phone mockups of the Re·Tail app: real screenshots of the app (the web version at app.re-tail.it,
// with its example catalogue of made-up stores and brands), shown inside an iPhone frame at the app's
// real size (402 × 874 points) under an iOS status bar. Screens live in media/screens/.
(() => {
  // English on the /en/ pages (<html lang="en">), Italian elsewhere. Assets resolve from this script's
  // folder, so /en/ pages find them too.
  const EN = document.documentElement.lang === 'en';
  const BASE = new URL('.', document.currentScript.src).href;

  // name → [file, colour behind the status bar, colour under the app's tab bar]
  const MINT = '#D9EBE1';
  const SHOTS = {
    search: ['search', MINT, MINT],
    product: ['product', MINT, MINT],
    sheet: ['sheet', '#6B736D', '#FFFFFF', true],
    pickup: ['pickup', MINT, MINT],
    map: ['map', MINT, MINT],
    store: ['store', MINT, MINT],
    home: ['home', MINT, MINT],
    partner: ['partner', MINT, MINT, false, true],
  };
  const src = (name) => {
    const [file, , , , shared] = SHOTS[name];
    return `${BASE}media/screens/${shared ? file : `${EN ? 'en' : 'it'}-${file}`}.jpg`;
  };

  // ---------- QR code look-alike (deterministic, with the three finder squares) ----------
  const qr = (seed, size) => {
    const n = 25;
    let h = 0;
    for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    const rnd = () => ((h = (h * 1103515245 + 12345) >>> 0) / 2 ** 32);
    const finder = (x, y) => x < 8 && y < 8 ? [x, y] : x > n - 9 && y < 8 ? [x - (n - 7), y] : x < 8 && y > n - 9 ? [x, y - (n - 7)] : null;
    let r = '';
    for (let y = 0; y < n; y++)
      for (let x = 0; x < n; x++) {
        const f = finder(x, y);
        let on;
        if (f) {
          const [a, b] = f;
          on = a < 7 && b < 7 && (a === 0 || a === 6 || b === 0 || b === 6 || (a > 1 && a < 5 && b > 1 && b < 5));
        } else on = rnd() < 0.5;
        if (on) r += `M${x} ${y}h1v1h-1z`;
      }
    return `<svg viewBox="0 0 ${n} ${n}" width="${size}" height="${size}" shape-rendering="crispEdges" aria-hidden="true"><path d="${r}" fill="#11110F"/></svg>`;
  };

  // ---------- iOS status bar ----------
  const statusBar = `
    <div class="sb"><span>9:41</span><span class="sb-r">
      <svg width="19" height="12" viewBox="0 0 19 12"><rect x="0" y="8" width="3.2" height="4" rx="1"/><rect x="5" y="5.5" width="3.2" height="6.5" rx="1"/><rect x="10" y="3" width="3.2" height="9" rx="1"/><rect x="15" y="0" width="3.2" height="12" rx="1"/></svg>
      <svg width="17" height="12" viewBox="0 0 17 12"><path d="M8.5 2.3c2.3 0 4.4.9 6 2.4l1.2-1.2A10.1 10.1 0 0 0 8.5.6C5.7.6 3.2 1.7 1.3 3.5l1.2 1.2c1.6-1.5 3.7-2.4 6-2.4zm0 3.4c1.4 0 2.6.5 3.6 1.4l1.2-1.2a6.8 6.8 0 0 0-9.6 0l1.2 1.2c1-.9 2.2-1.4 3.6-1.4zm0 3.4c.5 0 1 .2 1.3.5L8.5 11 7.2 9.6c.3-.3.8-.5 1.3-.5z"/></svg>
      <svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.8" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="20" height="9" rx="2.5"/><path d="M25 4.5v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2z" opacity=".45"/></svg>
    </span></div>`;

  // Each screen: the colour behind the status bar on top, the screenshot (402 × 786), then the
  // home-indicator strip in the colour of the app's tab bar.
  const screen = (name, i, eager) => {
    const [, top, bottom, dark] = SHOTS[name];
    return `<div class="scr${i ? '' : ' on'}${dark ? ' dark' : ''}" data-name="${name}" style="--top:${top};--bottom:${bottom}">
      <img class="shot" src="${src(name)}" alt="" width="402" height="786" decoding="async"${eager ? '' : ' loading="lazy"'}>${statusBar}</div>`;
  };

  // ---------- mount ----------
  document.querySelectorAll('.device[data-screens]').forEach((dev) => {
    const names = dev.dataset.screens.split(' ');
    const eager = dev.id === 'phone';
    dev.innerHTML = `<div class="glass"><div class="ui">${names.map((n, i) => screen(n, i, eager)).join('')}<div class="island"></div></div></div>`;
  });
  document.querySelectorAll('[data-qr]').forEach((el) => (el.innerHTML = qr(el.dataset.qr, +el.dataset.size || 60)));

  // Scale the 402-point screen to the device's width.
  const fit = (dev) => {
    const g = dev.querySelector('.glass');
    if (g) dev.style.setProperty('--s', (g.clientWidth / 402).toFixed(4));
  };
  const ro = new ResizeObserver((es) => es.forEach((e) => fit(e.target)));
  document.querySelectorAll('.device').forEach((d) => {
    fit(d);
    ro.observe(d);
  });
})();
