// Phone mockups of the Re·Tail app, drawn at the app's real size (402 × 874 points, iPhone 18 Pro)
// with its colours, fonts, icons and copy (src/theme/retail.ts, src/components/retail/*).
// Stores, brands and products are made up for the website; photos are from Unsplash.
(() => {
  // ---------- icons (same paths as src/components/retail/icon.tsx) ----------
  const P = {
    back: '<path d="m15 18-6-6 6-6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    pin: '<path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    chat: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5"/>',
    map: '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15M9 3.236v15"/>',
    heart: '<path d="M2 9.5a5.5 5.5 0 0 1 9.6-3.7.56.56 0 0 0 .8 0A5.5 5.5 0 0 1 22 9.5c0 2.3-1.5 4-3 5.5l-5.5 5.3a2 2 0 0 1-3 0L5 15c-1.5-1.5-3-3.2-3-5.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    send: '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',
    navigate: '<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    locate: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle cx="12" cy="12" r="8"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
    qr: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3M21 14v.01M14 21h3M21 17v4"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    users: '<circle cx="9" cy="8" r="4"/><path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1M16 4a4 4 0 0 1 0 8M22 21v-1a6 6 0 0 0-4-5.6"/>',
  };
  const ic = (name, size = 20, color = '#11110F', sw = 1.7, fill = 'none') =>
    `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="${fill}" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name]}</svg>`;

  // ---------- data (invented for the website) ----------
  const IMG = (n) => `media/app/${n}.jpg`;
  const PROD = {
    coat: { img: 'cappotto-beige', brand: 'Corallo', item: 'Cappotto in lana doppiopetto', price: '€290', avail: '3 negozi · 650 m' },
    red: { img: 'cappotto-rosso', brand: 'Corallo', item: 'Cappotto con cintura', price: '€320', avail: '2 negozi · 1,1 km' },
    leather: { img: 'giacca', brand: 'Atelier 9', item: 'Giacca in pelle', price: '€390', avail: '1 negozio · 1,4 km' },
    knit: { img: 'maglione', brand: 'Vento', item: 'Maglione a coste in lana', price: '€120', avail: '4 negozi · 650 m' },
    bag: { img: 'borsa', brand: 'Ottobre', item: 'Borsa a mano in pelle', price: '€240' },
    sneaker: { img: 'sneakers', brand: 'Nodo', item: 'Sneakers in pelle e suede', price: '€165' },
    jeans: { img: 'jeans', brand: 'Marea', item: 'Jeans slim in cimosa', price: '€140' },
    shirt: { img: 'camicia', brand: 'Atelier 9', item: 'Camicia in popeline', price: '€95' },
  };
  const STORES = [
    { mono: 'SL', name: 'Sartoria Levante', kind: 'Multi-brand · Donna/Uomo', addr: 'Via Argiro 48', dist: '650 m' },
    { mono: 'BV', name: 'Bottega Ventuno', kind: 'Designer · Donna', addr: 'Corso Cavour 112', dist: '1,1 km' },
    { mono: 'AC', name: 'Atelier Corallo', kind: 'Boutique · Donna', addr: 'Via Sparano 31', dist: '1,4 km' },
    { mono: 'SM', name: 'Studio Marea', kind: 'Concept store', addr: 'Via Putignani 70', dist: '2,0 km' },
  ];

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

  // ---------- shared chrome ----------
  const statusBar = (light) => `
    <div class="sb${light ? ' light' : ''}"><span>9:41</span><span class="sb-r">
      <svg width="19" height="12" viewBox="0 0 19 12"><rect x="0" y="8" width="3.2" height="4" rx="1"/><rect x="5" y="5.5" width="3.2" height="6.5" rx="1"/><rect x="10" y="3" width="3.2" height="9" rx="1"/><rect x="15" y="0" width="3.2" height="12" rx="1"/></svg>
      <svg width="17" height="12" viewBox="0 0 17 12"><path d="M8.5 2.3c2.3 0 4.4.9 6 2.4l1.2-1.2A10.1 10.1 0 0 0 8.5.6C5.7.6 3.2 1.7 1.3 3.5l1.2 1.2c1.6-1.5 3.7-2.4 6-2.4zm0 3.4c1.4 0 2.6.5 3.6 1.4l1.2-1.2a6.8 6.8 0 0 0-9.6 0l1.2 1.2c1-.9 2.2-1.4 3.6-1.4zm0 3.4c.5 0 1 .2 1.3.5L8.5 11 7.2 9.6c.3-.3.8-.5 1.3-.5z"/></svg>
      <svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.8" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="20" height="9" rx="2.5"/><path d="M25 4.5v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2z" opacity=".45"/></svg>
    </span></div>`;
  const wordmark = `<span class="wm">RE<i>·</i>TAIL</span>`;
  // Home shows the wordmark; the other tabs show the section name in its place, as in the app.
  const headTab = (extra = '', title = '') => `
    <div class="hd"><div class="hd-row">${title ? `<span class="wm-t">${title}<i>.</i></span>` : wordmark}<span class="hd-ic">${ic('pin', 25, '#11110F', 1.6)}${ic('chat', 24, '#11110F', 1.6)}</span></div>${extra}</div>`;
  const headPush = (extra = '') => `
    <div class="hd push"><div class="hd-row">${ic('back', 26, '#11110F', 1.8)}<span class="hd-ic">${ic('pin', 25, '#11110F', 1.6)}${ic('chat', 24, '#11110F', 1.6)}</span></div>${extra}</div>`;
  const TABS = [['home', 'Home'], ['search', 'Cerca'], ['tag', 'Brand'], ['map', 'Mappa'], ['heart', 'Wishlist'], ['user', 'Io']];
  const nav = (active) => `
    <div class="nav">${TABS.map(([k, l]) => {
      const on = k === active;
      const icon = k === 'home' ? `<b class="nav-re">RE<i>·</i></b>` : ic(k, 24, on ? '#D75BA0' : '#B8B4A8', 1.6);
      return `<span class="nav-i${on ? ' on' : ''}">${icon}<em>${l}</em></span>`;
    }).join('')}</div>`;
  const card = (p) => `
    <div class="card">
      <div class="card-img"><img src="${IMG(p.img)}" alt=""><span class="card-heart">${ic('heart', 21, '#11110F', 1.5)}</span></div>
      <div class="card-b">${p.brand}</div><div class="card-n">${p.item}</div><div class="card-p">${p.price}</div>
      ${p.avail ? `<div class="card-a"><i></i>${p.avail}</div>` : ''}
    </div>`;
  // Store logo: a white rounded square with the (made-up) store name set as a wordmark, as in the app.
  const mono = (s, size = 44) => `<span class="mono" style="width:${size}px;height:${size}px;border-radius:${Math.round(size * 0.24)}px;font-size:${(size * 0.12).toFixed(1)}px">${s.name.split(' ').join('<br>')}</span>`;

  // A stylised street map (no tiles: the site loads nothing from third parties).
  const streetMap = (pins) => `
    <svg class="smap" viewBox="0 0 402 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><filter id="pinShadow" x="-30%" y="-60%" width="160%" height="220%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#11110F" flood-opacity=".18"/></filter></defs>
      <rect width="402" height="240" fill="#EEF0EA"/>
      <path d="M-10 40 L420 -10 M-10 120 L420 70 M-10 200 L420 150 M-10 270 L420 225" stroke="#fff" stroke-width="13"/>
      <path d="M40 -10 L110 260 M170 -10 L240 260 M300 -10 L370 260" stroke="#fff" stroke-width="10"/>
      <path d="M-10 80 L420 30 M-10 160 L420 112 M95 -10 L165 260 M235 -10 L305 260" stroke="#fff" stroke-width="5"/>
      <rect x="250" y="160" width="70" height="44" rx="4" fill="#DDEBD9" transform="rotate(-7 285 182)"/>
      <rect x="20" y="10" width="60" height="30" rx="4" fill="#DDEBD9" transform="rotate(-7 50 25)"/>
      <path d="M-10 236 C 120 210, 260 250, 420 214 L420 260 L-10 260Z" fill="#CFE3EE"/>
      ${pins}
    </svg>`;
  // Store marker as in the app: a green drop with a white rim and a small white shopping bag, no text.
  // The tip sits on (x, y).
  const pinAt = (x, y) => `
    <g transform="translate(${x - 14} ${y - 34.5}) scale(.78)" filter="url(#pinShadow)">
      <ellipse cx="18" cy="44.5" rx="4.5" ry="1.5" fill="rgba(17,17,15,.2)"/>
      <path d="M18 44.5C17 41.5 3 30 3 17.5a15 15 0 1 1 30 0C33 30 19 41.5 18 44.5Z" fill="#55585A"/>
      <circle cx="18" cy="17.5" r="8.5" fill="#fff"/>
    </g>`;

  // ---------- screens ----------
  const S = {};

  S.search = () => `
    ${headTab(`<div class="hd-search">${ic('search', 20, '#9A968B', 1.7)}<span id="typed">cappotto</span><span class="caret"></span></div>`, 'Cerca')}
    <div class="bd">
      <div class="crumb">Donna · Risultati</div>
      <div class="ttl">Cappotti e giacche</div>
      <div class="meta">18 capi · 10 km da te</div>
      <div class="grid">${[PROD.coat, PROD.red, PROD.leather, PROD.knit].map(card).join('')}</div>
    </div>
    ${nav('search')}`;

  const productBody = () => `
    ${headPush()}
    <div class="bd">
      <div class="pd-img"><img src="${IMG('cappotto-beige')}" alt=""><span class="pd-heart">${ic('heart', 20, '#11110F', 1.6)}</span><span class="pd-dots"><i class="on"></i><i></i><i></i></span></div>
      <div class="pd">
        <div class="pd-b">Corallo</div>
        <div class="pd-n">Cappotto in lana doppiopetto</div>
        <div class="pd-row"><b>€290</b><span>Disponibile</span></div>
        <div class="lbl">Taglia</div>
        <div class="sizes"><span>38</span><span>40</span><span class="on">42</span><span>44</span><span class="out">46</span></div>
        <div class="avail">
          <div class="avail-h"><i></i>Disponibile in 3 negozi</div>
          <div class="avail-s">entro 10 km da te · tocca per prenotare il ritiro</div>
          ${STORES.slice(0, 2).map((s, i) => `<div class="avail-r">${ic('pin', 16, '#11110F', 1.6)}<div><b>${s.name}</b><small>${s.addr} · ${s.dist}</small></div><em>${i ? 1 : 2} pz</em></div>`).join('')}
        </div>
      </div>
    </div>
    <div class="pd-cta"><span class="btn-pine">${ic('pin', 16, '#fff', 1.8)}Prenota taglia 42 in negozio</span></div>
    ${nav('search')}`;
  S.product = productBody;

  S.schedule = () => `
    ${productBody()}
    <div class="dim"></div>
    <div class="sheet">
      <div class="sheet-h"><span>Prenota la visita</span><i>${ic('close', 16, '#11110F', 2)}</i></div>
      <div class="sheet-s">Sartoria Levante · 1 capo — scegli quando passare a provarli.</div>
      <div class="note">${ic('info', 17, '#C0398A', 1.8)}<span>Prenoti la <b>visita</b>, non il capo: l'articolo resta in vendita fino al tuo arrivo e potrebbe non essere più disponibile.</span></div>
      <div class="lbl">Oggi · mercoledì 4</div>
      <div class="slot">17:00 – 18:00</div>
      <div class="slot on">18:00 – 19:00 ${ic('check', 18, '#fff', 2.2)}</div>
      <div class="slot">19:00 – 20:00</div>
      <div class="lbl">Domani · giovedì 5</div>
      <div class="slot">10:00 – 11:00</div>
      <div class="slot">11:00 – 12:00</div>
    </div>`;

  S.pickup = () => `
    ${headPush()}
    <div class="bd">
      <div class="pk-map">${streetMap(pinAt(206, 150))}</div>
      <div class="pk">
        <span class="pk-ok">${ic('check', 30, '#1C7A4E', 2)}</span>
        <div class="pk-t">Visita prenotata</div>
        <p>Da <b>Sartoria Levante</b> · <b>Oggi, 18:00–19:00</b>. Mostra il codice in negozio quando arrivi.</p>
        <div class="pk-qr">${qr('RT-2048', 132)}<span>RT-2048</span></div>
      </div>
      <div class="pk-cta"><span class="btn-pine">${ic('navigate', 17, '#fff', 1.8)}Indicazioni · 9 min a piedi</span></div>
    </div>
    ${nav('home')}`;

  S.map = () => `
    ${headTab(`<div class="hd-loc">${ic('pin', 18, '#1C7A4E', 1.8)}<span>Bari · raggio <b>10 km</b></span><em>Cambia</em></div>`, 'Mappa')}
    <div class="bd">
      <div class="chips"><span class="on">Tutti</span><span>Uomo</span><span>Donna</span><span>Bambino</span></div>
      <div class="mapbox">${streetMap(pinAt(140, 96) + pinAt(262, 150) + pinAt(318, 70) + pinAt(84, 196))}
        <span class="mapbtn" style="top:12px">${ic('plus', 18, '#11110F', 1.8)}</span><span class="mapbtn" style="top:56px">${ic('minus', 18, '#11110F', 1.8)}</span><span class="mapbtn" style="bottom:12px">${ic('locate', 18, '#11110F', 1.7)}</span></div>
      <div class="sec-h"><span>Negozi vicino a te</span><small>4 negozi</small></div>
      ${STORES.map((s) => `<div class="st-r">${mono(s)}<div><b>${s.name}</b><small>${s.kind}</small><small class="l">${s.addr} · ${s.dist}</small></div>${ic('chevronRight', 18, '#C2BEB2', 1.8)}</div>`).join('')}
    </div>
    ${nav('map')}`;

  S.store = () => `
    ${headPush()}
    <div class="bd">
      <div class="so-ph"><img src="media/foto/negozio-4.jpg" alt=""><img src="media/foto/negozio-9.jpg" alt=""></div>
      <div class="so">
        <span class="so-mono">Sartoria<br>Levante</span>
        <div class="so-n">Sartoria Levante</div>
        <div class="so-k">Multi-brand · Bari</div>
        <p>Dal 1987 in via Argiro: capispalla, maglieria e piccoli marchi italiani scelti uno per uno.</p>
        <div class="so-r">${ic('pin', 18, '#11110F', 1.6)}<span>Via Argiro 48</span><small>650 m</small></div>
        <div class="so-r">${ic('clock', 18, '#11110F', 1.6)}<span>Aperto · 09:30–20:00</span><em>Ora aperto</em></div>
        <div class="lbl">In negozio ora</div>
        <div class="so-strip">${[PROD.coat, PROD.bag, PROD.sneaker, PROD.jeans].map((p) => `<div><img src="${IMG(p.img)}" alt=""><b>${p.brand}</b><small>${p.price}</small></div>`).join('')}</div>
      </div>
    </div>
    ${nav('map')}`;

  S.chat = () => `
    ${headPush(`<div class="ch-h">${mono(STORES[0], 38)}<div><b>Sartoria Levante</b><small><i></i>Risponde di solito in 10 min</small></div></div>`)}
    <div class="bd ch">
      <div class="ch-day">Oggi</div>
      <div class="bub them">Ciao Giulia! Sono Marta di Sartoria Levante. Come possiamo aiutarti?<small>17:02</small></div>
      <div class="bub me">Ciao! Il cappotto Corallo lo avete anche in blu, taglia 42?<small>17:04</small></div>
      <div class="bub them">Sì, ne abbiamo uno. Te lo mettiamo in camerino con il beige, così li provi entrambi.<small>17:06</small></div>
      <div class="bub me">Perfetto, passo alle 18 👍<small>17:06</small></div>
      <div class="ch-in"><span>Scrivi un messaggio</span><i>${ic('send', 19, '#fff', 1.8)}</i></div>
    </div>
    ${nav('home')}`;

  // The store side (base of the Retailer Dashboard): today's visits.
  S.partner = () => `
    <div class="hd"><div class="hd-row">${wordmark}<span class="pt-badge">Negozio</span></div></div>
    <div class="bd">
      <div class="crumb">Sartoria Levante · mercoledì 4</div>
      <div class="ttl">Visite di oggi</div>
      <div class="pt-stats"><div><b>6</b><small>Visite</small></div><div><b>2</b><small>In arrivo</small></div><div class="hot"><b>1</b><small>Chat</small></div></div>
      ${[
        ['17:00', 'Luca R.', 'Nodo · Sneakers · 42', 'Ritirato', 'done'],
        ['18:00', 'Giulia M.', 'Corallo · Cappotto · 42', 'In arrivo', 'next'],
        ['18:00', 'Sara P.', 'Vento · Maglione · M', 'Confermata', ''],
        ['19:00', 'Marco D.', 'Marea · Jeans · 32', 'Confermata', ''],
      ].map(([t, n, it, st, c]) => `<div class="pt-r"><span class="pt-t">${t}</span><div><b>${n}</b><small>${it}</small></div><em class="${c}">${st}</em></div>`).join('')}
      <div class="pt-cta"><span class="btn-pine">${ic('qr', 17, '#fff', 1.8)}Scansiona il codice</span></div>
    </div>
    <div class="nav partner">${[['grid', 'Oggi'], ['calendar', 'Agenda'], ['box', 'Stock'], ['chat', 'Chat'], ['users', 'Clienti']]
      .map(([k, l], i) => `<span class="nav-i${i ? '' : ' on'}">${ic(k, 23, i ? '#B8B4A8' : '#1C7A4E', 1.6)}<em>${l}</em></span>`).join('')}</div>`;

  // ---------- mount ----------
  const frame = (inner) => `<div class="glass"><div class="ui">${inner}<div class="island"></div></div></div>`;
  document.querySelectorAll('.device[data-screens]').forEach((dev) => {
    const names = dev.dataset.screens.split(' ');
    const light = dev.hasAttribute('data-light');
    const scr = names.map((n, i) => `<div class="scr${i ? '' : ' on'}" data-name="${n}">${S[n]()}</div>`).join('');
    dev.innerHTML = frame(scr + statusBar(light));
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
