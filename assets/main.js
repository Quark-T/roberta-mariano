/* ============================================================
   STUDIO ARCH. ROBERTA MARIANO — Shared JS 2026
   ============================================================ */

// Safety net: se GSAP non si è caricato (CDN bloccato, rete lenta) o se
// l'utente ha "riduci movimento" attivo, dopo 2s rendiamo visibile tutto
// quello che il CSS ha lasciato invisibile in attesa dell'animazione.
setTimeout(() => {
  document.querySelectorAll('.reveal:not(.done)').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
  document.querySelectorAll('.hero-pre, .hero-h1, .hero-sub, .hero-btns, .hero-scroll').forEach(el => {
    if (getComputedStyle(el).opacity === '0') {
      el.style.opacity = '1';
      el.style.transform = 'none';
    }
  });
}, 2000);

if (typeof gsap === 'undefined') {
  console.warn('GSAP non caricato — animazioni disabilitate');
} else {
  gsap.registerPlugin(ScrollTrigger);
}

/* ══════════════════════════════════════════════════════════
   PAGE LOADER — transizione elegante tra pagine
   ══════════════════════════════════════════════════════════ */
(function initLoader() {
  /* ── Inietta HTML ── */
  const el = document.createElement('div');
  el.id = 'loader';
  el.innerHTML = `
    <div class="loader-inner">
      <span class="loader-mono">RM</span>
      <span class="loader-name">Roberta Mariano</span>
      <div class="loader-bar"><div class="loader-progress"></div></div>
    </div>
  `;
  document.body.prepend(el);

  let busy = false;

  /* ── ENTER: il loader esce verso l'alto, rivela la pagina ── */
  gsap.set('#loader', { yPercent: 0 });
  gsap.set('.loader-progress', { scaleX: 0 });

  const enterTl = gsap.timeline({ delay: .05 });
  enterTl
    .to('.loader-progress', {
      scaleX: 1, duration: .55, ease: 'power2.inOut',
    })
    .to('.loader-mono, .loader-name', {
      opacity: 0, duration: .25, ease: 'power2.in',
    }, .3)
    .to('#loader', {
      yPercent: -100, duration: .75, ease: 'expo.inOut',
    }, .35)
    .set('#loader', { display: 'none' });

  /* ── EXIT: copre la pagina, poi naviga ── */
  function goTo(href) {
    if (busy) return;
    busy = true;

    gsap.set('#loader', { display: 'flex', yPercent: 100 });
    gsap.set('.loader-progress', { scaleX: 0 });
    gsap.set('.loader-mono, .loader-name', { opacity: 1 });

    gsap.timeline({
      onComplete() { window.location.href = href; },
    })
    .to('#loader', {
      yPercent: 0, duration: .6, ease: 'expo.inOut',
    })
    .to('.loader-progress', {
      scaleX: 1, duration: .35, ease: 'power2.inOut',
    }, .25);
  }

  /* ── Reset su bfcache restore ── */
  window.addEventListener('pageshow', e => {
    if (e.persisted) {
      busy = false;
      gsap.set('#loader', { display: 'none' });
    }
  });

  /* ── Intercetta click su link interni ── */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (
      !href ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      /^https?:\/\//.test(href) ||
      a.target === '_blank'
    ) return;
    e.preventDefault();
    e.stopPropagation();
    closeMenu();
    goTo(href);
  }, true); // capture — prima degli altri listener

})();

/* ── Active nav link ── */
(function markActive() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mob a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === page || (page === '' && href === 'index.html')) {
      a.setAttribute('aria-current', 'page');
    }
  });
})();

/* ── Navbar scroll ── */
const nav = document.getElementById('nav');
if (nav) {
  ScrollTrigger.create({
    start: '80px top',
    onEnter:     () => nav.classList.add('scrolled'),
    onLeaveBack: () => nav.classList.remove('scrolled'),
  });
}

/* ── Mobile menu ── */
const ham    = document.getElementById('ham');
const navMob = document.getElementById('navMob');

function closeMenu() {
  if (!navMob) return;
  navMob.classList.remove('open');
  if (ham) { ham.classList.remove('open'); ham.setAttribute('aria-expanded','false'); }
  document.body.style.overflow = '';
}
if (ham && navMob) {
  ham.addEventListener('click', () => {
    const open = navMob.classList.toggle('open');
    ham.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  navMob.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
}

/* ── Smooth anchor scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    closeMenu();
    window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 76, behavior: 'smooth' });
  });
});

/* ── Stats counters ── */
function initCounters() {
  document.querySelectorAll('.ctr').forEach(el => {
    const target = parseInt(el.dataset.t);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter() {
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate() { el.textContent = Math.round(obj.v).toLocaleString('it-IT'); },
        });
      },
    });
  });
}

/* ── Portfolio filter ── */
function initPortfolioFilter() {
  const btns  = document.querySelectorAll('.pf-btn');
  const items = document.querySelectorAll('.pf-item');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      const f = btn.dataset.f;
      items.forEach(item => {
        const show = f === 'all' || item.dataset.c === f;
        gsap.to(item, { opacity: show ? 1 : .12, scale: show ? 1 : .97, duration: .35, ease: 'power2.out' });
        item.style.pointerEvents = show ? 'all' : 'none';
      });
    });
  });
}

/* ── FAQ accordion ── */
function initFaq() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-a');
    if (!btn || !ans) return;
    ans.style.height = '0';
    ans.style.overflow = 'hidden';

    btn.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      gsap.to(ans, {
        height: open ? ans.scrollHeight : 0,
        duration: .45,
        ease: 'power3.inOut',
      });
      item.querySelector('.faq-icon').textContent = open ? '−' : '+';
    });
  });
}

/* ── Generic scroll animations (matchMedia: no reduced motion) ── */
gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {

  /* Deco lines */
  gsap.utils.toArray('.dline').forEach(l => {
    gsap.from(l, {
      scaleX: 0, duration: .75, ease: 'power3.out',
      scrollTrigger: { trigger: l, start: 'top 88%', once: true },
    });
  });

  /* h2 fade-up */
  gsap.utils.toArray('h2').forEach(h => {
    if (h.closest('.hero, .page-hero')) return; // skip hero headings
    gsap.from(h, {
      opacity: 0, y: 28, duration: .75, ease: 'power3.out',
      scrollTrigger: { trigger: h, start: 'top 86%', once: true },
    });
  });

  /* .reveal elements */
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    const delay = parseFloat(el.dataset.delay || 0);
    gsap.from(el, {
      opacity: 0, y: 30, duration: .7, ease: 'power3.out', delay,
      scrollTrigger: { trigger: el, start: 'top 87%', once: true },
    });
  });

  /* .stagger-parent → children with [data-stagger] */
  gsap.utils.toArray('.stagger-parent').forEach(parent => {
    const children = parent.querySelectorAll('.stagger-item');
    gsap.from(children, {
      opacity: 0, y: 35, duration: .65, stagger: .09, ease: 'power3.out',
      scrollTrigger: { trigger: parent, start: 'top 80%', once: true },
    });
  });

  /* Portfolio clip-path reveals */
  gsap.utils.toArray('.pf-img').forEach((img, i) => {
    gsap.to(img, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.0, ease: 'power3.inOut',
      delay: (i % 3) * .08,
      scrollTrigger: { trigger: img, start: 'top 88%', once: true },
    });
  });

  /* Stats bar */
  gsap.from('.stat', {
    opacity: 0, y: 18, duration: .55, stagger: .1, ease: 'power3.out',
    scrollTrigger: { trigger: '.stats', start: 'top 88%', once: true },
  });

  /* Testimonials */
  gsap.from('.tst-card', {
    opacity: 0, y: 28, duration: .65, stagger: .1, ease: 'power3.out',
    scrollTrigger: { trigger: '.tst-grid', start: 'top 80%', once: true },
  });

  /* CTA band */
  const cta = document.querySelector('.cta-band');
  if (cta) {
    gsap.from(cta.children, {
      opacity: 0, y: 24, duration: .7, stagger: .12, ease: 'power3.out',
      scrollTrigger: { trigger: cta, start: 'top 82%', once: true },
    });
  }

});

/* ── Init ── */
initCounters();
initPortfolioFilter();
initFaq();
