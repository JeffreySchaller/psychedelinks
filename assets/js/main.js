/* =========================================================
   Psychedelinks — interactions
   - constellation hero (canvas)
   - sticky nav state
   - scroll reveal
   - shop category filter
   ========================================================= */

/* ---------- sticky nav ---------- */
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ---------- scroll reveal ---------- */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.16 });
  els.forEach((el) => io.observe(el));
})();

/* ---------- shop filter ---------- */
(function () {
  const btns = document.querySelectorAll('.filters button');
  if (!btns.length) return;
  const cards = document.querySelectorAll('.shop-grid .card');
  btns.forEach((b) => b.addEventListener('click', () => {
    btns.forEach((x) => x.classList.remove('active'));
    b.classList.add('active');
    const cat = b.dataset.cat;
    cards.forEach((c) => {
      const cats = (c.dataset.cat || '').split(' ');
      c.classList.toggle('hide', cat !== 'all' && !cats.includes(cat));
    });
  }));
})();

/* ---------- constellation hero ---------- */
(function () {
  const c = document.getElementById('net');
  if (!c) return;
  const x = c.getContext('2d');
  let w, h, pts;
  const COUNT = 46, LINK = 150;

  function star(cx, cy, s) {
    x.save(); x.translate(cx, cy); x.scale(s / 100, s / 100);
    x.beginPath();
    x.moveTo(50, 6);
    x.bezierCurveTo(56, 34, 66, 44, 94, 50);
    x.bezierCurveTo(66, 56, 56, 66, 50, 94);
    x.bezierCurveTo(44, 66, 34, 56, 6, 50);
    x.bezierCurveTo(34, 44, 44, 34, 50, 6);
    x.closePath(); x.fill(); x.restore();
  }
  function seed() {
    pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.6 + 0.8
    }));
  }
  function size() { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; seed(); }
  function tick() {
    x.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK) {
          x.strokeStyle = 'rgba(80,66,52,' + (0.16 * (1 - d / LINK)) + ')';
          x.lineWidth = 1;
          x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke();
        }
      }
    }
    x.fillStyle = 'rgba(60,48,36,0.55)';
    for (const p of pts) star(p.x, p.y, p.r * 7);
    requestAnimationFrame(tick);
  }
  window.addEventListener('resize', size);
  size(); tick();
})();
