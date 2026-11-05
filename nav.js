// Top bar shared by every page: the phone menu and, on the home, the current section highlighted.
(() => {
  const menuBtn = document.querySelector('.tb-menu');
  const panel = document.getElementById('tbLinks');
  if (!menuBtn || !panel) return;
  const setMenu = (open) => {
    panel.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
  };
  menuBtn.addEventListener('click', () => setMenu(!panel.classList.contains('open')));
  panel.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));
  addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));

  // Only links to a section of this page take part in the highlight.
  const links = [...panel.querySelectorAll('.tb-nav a[href^="#"]')];
  const targets = links.map((a) => document.querySelector(a.getAttribute('href')));
  if (!links.length) return;
  const spy = () => {
    const y = innerHeight * 0.35;
    let cur = 0;
    targets.forEach((t, i) => { if (t && t.getBoundingClientRect().top <= y) cur = i; });
    links.forEach((a, i) => a.classList.toggle('on', i === cur));
  };
  addEventListener('scroll', spy, { passive: true });
  spy();
})();
