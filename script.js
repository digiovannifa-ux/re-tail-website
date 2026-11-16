// Scroll-driven hero (phone screens + floating cards) and the word-by-word manifesto.
// Runs after app-ui.js, which draws the phone screens.
(() => {
  const BASE = new URL('.', document.currentScript.src).href;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  // 0 when the section's top reaches the top of the viewport, 1 when its sticky part ends.
  const progress = (el) => {
    const r = el.getBoundingClientRect();
    return clamp(-r.top / (r.height - innerHeight), 0, 1);
  };

  const hero = document.querySelector('.hero');
  const phone = document.getElementById('phone');
  const screens = [...phone.querySelectorAll('.scr')];
  const floats = [...document.querySelectorAll('.float')];
  const parallax = [...document.querySelectorAll('[data-par]')];
  const bars = [...document.querySelectorAll('.bars i')];
  const pill = document.querySelector('.pill');
  const stepN = document.getElementById('stepN');
  const stepT = document.getElementById('stepT');
  const EN = document.documentElement.lang === 'en';
  const STEPS = EN
    ? ['Find the item', 'Pick your size', 'Book your visit', 'Try it in store']
    : ['Cerca il capo', 'Scegli la taglia', 'Prenota la visita', 'Provalo in negozio'];

  // Manifesto: split into words; *word* marks the green ones.
  const reveal = document.getElementById('reveal');
  const manifesto = document.querySelector('.manifesto');
  reveal.innerHTML = reveal.textContent
    .trim()
    .split(/\s+/)
    .map((w) => (w.startsWith('*') ? `<span class="w g">${w.replace(/\*/g, '')}</span>` : `<span class="w">${w}</span>`))
    .join(' ');
  const words = [...reveal.querySelectorAll('.w')];

  let step = -1;
  const frame = () => {
    const p = progress(hero);
    const s = Math.min(screens.length - 1, Math.floor(p * screens.length));
    if (s !== step) {
      step = s;
      screens.forEach((el, i) => el.classList.toggle('on', i === s));
      bars.forEach((el, i) => el.classList.toggle('on', i <= s));
      stepN.textContent = '0' + (s + 1);
      stepT.textContent = STEPS[s];
    }
    // A card is shown from data-at and, if it has one, until data-to.
    floats.forEach((el) => el.classList.toggle('on', p >= +el.dataset.at && p < +(el.dataset.to || 2)));
    pill?.classList.toggle('away', p < 1);
    const y = p * innerHeight;
    // `translate` composes with the CSS `transform` used by the entrance animation.
    parallax.forEach((el) => (el.style.translate = `0 ${(+el.dataset.par * y).toFixed(1)}px`));
    phone.style.transform = `translate(-50%, -50%) rotate(${(-4 + p * 8).toFixed(2)}deg)`;

    const m = progress(manifesto);
    const lit = Math.round(clamp(m * 1.25, 0, 1) * words.length);
    words.forEach((w, i) => w.classList.toggle('on', i < lit));
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      frame();
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  frame();

  // Typing effect in the search bar of the first screen.
  const typed = document.getElementById('typed');
  const queries = EN ? ['coat', 'wool coat', 'jacket'] : ['cappotto', 'cappotto in lana', 'giacca'];
  let q = 0;
  const type = (text, i = 0) => {
    typed.textContent = text.slice(0, i);
    if (i < text.length) return setTimeout(() => type(text, i + 1), 90);
    setTimeout(() => type(queries[(q = (q + 1) % queries.length)]), 2400);
  };
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) type(queries[0]);

  // Live countdown on the visit card.
  const clock = document.getElementById('clock');
  if (clock && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let left = 42 * 60 + 17;
    const pad = (n) => String(n).padStart(2, '0');
    setInterval(() => {
      left = left > 0 ? left - 1 : 42 * 60 + 17;
      clock.textContent = `00:${pad(Math.floor(left / 60))}:${pad(left % 60)}`;
    }, 1000);
  }

  // Manifesto background: columns of halftone bags on emerald, sliding in opposite directions,
  // the outer columns blurred (idea from patternbreak.ing). Drawn on a canvas, only while visible.
  const pat = document.getElementById('pattern');
  if (pat) {
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = pat.getContext('2d');
    const img = new Image();
    let sprite, soft, W, H, dpr, cols, cellW, cellH, sw, sh, raf = 0, visible = false;
    // Turn the photo into dots: darker pixel = bigger dot; the white background is left empty.
    const halftone = (w) => {
      const h = Math.round((w * img.height) / img.width);
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      const g = c.getContext('2d', { willReadFrequently: true });
      g.drawImage(img, 0, 0, w, h);
      const d = g.getImageData(0, 0, w, h).data;
      g.clearRect(0, 0, w, h);
      const step = Math.max(3, Math.round(w / 70));
      for (let y = 0; y < h; y += step)
        for (let x = 0; x < w; x += step) {
          const i = ((Math.min(h - 1, y + (step >> 1)) * w) + Math.min(w - 1, x + (step >> 1))) * 4;
          const l = (0.3 * d[i] + 0.59 * d[i + 1] + 0.11 * d[i + 2]) / 255;
          if (l > 0.88) continue;
          const k = Math.min(1, Math.max(0, (0.95 - l) / 0.8));
          g.fillStyle = l < 0.5 ? '#11110F' : '#FFFFFF';
          g.beginPath(); g.arc(x + step / 2, y + step / 2, Math.max(0.6, k * step * 0.62), 0, 7); g.fill();
        }
      return c;
    };
    // Cheap blur that works everywhere: shrink, then stretch back.
    const blurred = (src) => {
      const t = document.createElement('canvas'); t.width = Math.max(1, src.width / 7 | 0); t.height = Math.max(1, src.height / 7 | 0);
      t.getContext('2d').drawImage(src, 0, 0, t.width, t.height);
      const c = document.createElement('canvas'); c.width = src.width; c.height = src.height;
      const g = c.getContext('2d'); g.imageSmoothingQuality = 'high'; g.drawImage(t, 0, 0, c.width, c.height);
      return c;
    };
    const layout = () => {
      dpr = Math.min(2, devicePixelRatio || 1);
      W = pat.clientWidth; H = pat.clientHeight;
      if (!W || !H) return false;
      pat.width = W * dpr; pat.height = H * dpr;
      cols = W < 700 ? 4 : 6;
      cellW = W / cols; sw = cellW * 0.74; sh = (sw * img.height) / img.width; cellH = sh + cellW * 0.16;
      sprite = halftone(Math.round(sw * dpr)); soft = blurred(sprite);
      return true;
    };
    const draw = (t) => {
      if (!sprite && !layout()) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const shift = (still ? 0 : t * 0.018) + progress(manifesto) * cellH * 1.5;
      for (let c = 0; c < cols; c++) {
        const edge = c === 0 || c === cols - 1;
        const off = ((c % 2 ? shift : -shift) % cellH + cellH) % cellH;
        ctx.globalAlpha = edge ? 0.7 : 1;
        for (let y = off - cellH; y < H; y += cellH) ctx.drawImage(edge ? soft : sprite, c * cellW + (cellW - sw) / 2, y, sw, sh);
      }
      if (!still && visible) raf = requestAnimationFrame(draw);
    };
    img.onload = () => {
      layout();
      new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(draw);
      }).observe(manifesto);
      addEventListener('resize', () => { if (layout()) draw(performance.now()); });
      if (still) addEventListener('scroll', () => visible && draw(0), { passive: true });
    };
    img.src = BASE + 'media/app/borsa.jpg';
  }

  // Before/after comparison: reveal the steps when it comes into view.
  const vs = document.querySelector('.vs');
  if (vs) new IntersectionObserver(([e], o) => {
    if (e.isIntersecting) { vs.classList.add('in'); o.disconnect(); }
  }, { threshold: 0.3 }).observe(vs);

  // Play background videos only while visible.
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause()));
  });
  document.querySelectorAll('video').forEach((v) => io.observe(v));
})();
