// Scroll-driven hero (phone screens + floating cards) and the word-by-word manifesto.
// Runs after app-ui.js, which draws the phone screens.
(() => {
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
  const stepN = document.getElementById('stepN');
  const stepT = document.getElementById('stepT');
  const STEPS = ['Cerca il capo', 'Scegli la taglia', 'Prenota la visita', 'Provalo in negozio'];

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
    floats.forEach((el) => el.classList.toggle('on', p >= +el.dataset.at));
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
  const queries = ['cappotto', 'cappotto in lana', 'giacca'];
  let q = 0;
  const type = (text, i = 0) => {
    typed.textContent = text.slice(0, i);
    if (i < text.length) return setTimeout(() => type(text, i + 1), 90);
    setTimeout(() => type(queries[(q = (q + 1) % queries.length)]), 2400);
  };
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) type(queries[0]);

  // Top bar: phone menu and the current section highlighted.
  const menuBtn = document.querySelector('.tb-menu');
  const tbLinks = document.getElementById('tbLinks');
  const setMenu = (open) => {
    tbLinks.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
  };
  menuBtn.addEventListener('click', () => setMenu(!tbLinks.classList.contains('open')));
  tbLinks.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));
  addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));
  const navLinks = [...tbLinks.querySelectorAll('a:not(.tb-cta-m)')];
  const targets = navLinks.map((a) => document.querySelector(a.getAttribute('href')));
  const spy = () => {
    const y = innerHeight * 0.35;
    let cur = 0;
    targets.forEach((t, i) => { if (t && t.getBoundingClientRect().top <= y) cur = i; });
    navLinks.forEach((a, i) => a.classList.toggle('on', i === cur));
  };
  addEventListener('scroll', spy, { passive: true });
  spy();

  // Play background videos only while visible.
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause()));
  });
  document.querySelectorAll('video').forEach((v) => io.observe(v));
})();
