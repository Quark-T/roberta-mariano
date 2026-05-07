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
   CALENDARIO SOPRALLUOGO — vanilla JS, niente librerie
   Auto-init su <div data-calendar="hidden-input-id">
   ══════════════════════════════════════════════════════════ */
class SopraCalendar {
  constructor(container, hiddenInput) {
    this.container = container;
    this.hidden = hiddenInput;
    this.today = new Date(); this.today.setHours(0,0,0,0);
    this.view = new Date(this.today);
    this.selected = null;
    this.MAX_MONTHS_AHEAD = 4;
    this.MONTHS = ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'];
    this.DAYS  = ['Lun','Mar','Mer','Gio','Ven','Sab','Dom'];
    this.container.classList.add('calendar');
    this.render();
  }
  fmt(d) {
    return d.toLocaleDateString('it-IT', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  }
  render() {
    const y = this.view.getFullYear(), m = this.view.getMonth();
    const first = new Date(y, m, 1);
    const last  = new Date(y, m+1, 0);
    let startWd = first.getDay() - 1; if (startWd < 0) startWd = 6;
    const limit = new Date(this.today); limit.setMonth(limit.getMonth() + this.MAX_MONTHS_AHEAD);
    const canPrev = (this.view.getFullYear() > this.today.getFullYear()) ||
                    (this.view.getFullYear() === this.today.getFullYear() && this.view.getMonth() > this.today.getMonth());
    const canNext = (this.view.getFullYear() < limit.getFullYear()) ||
                    (this.view.getFullYear() === limit.getFullYear() && this.view.getMonth() < limit.getMonth());

    let html = '<div class="cal-head">';
    html += `<button type="button" class="cal-nav" data-dir="-1" ${canPrev ? '' : 'disabled'} aria-label="Mese precedente">‹</button>`;
    html += `<h4>${this.MONTHS[m]} ${y}</h4>`;
    html += `<button type="button" class="cal-nav" data-dir="1" ${canNext ? '' : 'disabled'} aria-label="Mese successivo">›</button>`;
    html += '</div><div class="cal-grid">';
    this.DAYS.forEach(d => html += `<div class="cal-dn">${d}</div>`);
    for (let i = 0; i < startWd; i++) html += '<div class="cal-empty"></div>';
    for (let d = 1; d <= last.getDate(); d++) {
      const date = new Date(y, m, d);
      const past = date < this.today;
      const sun = date.getDay() === 0;
      const isToday = +date === +this.today;
      const isSel = this.selected && +date === +this.selected;
      const dis = past || sun;
      const cls = ['cal-day'];
      if (isToday) cls.push('today');
      if (isSel) cls.push('selected');
      const iso = `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      html += `<button type="button" class="${cls.join(' ')}" data-date="${iso}" ${dis ? 'disabled' : ''}>${d}</button>`;
    }
    html += '</div>';
    if (this.selected) {
      html += `<p class="cal-info cal-info-selected">Sopralluogo selezionato: <strong>${this.fmt(this.selected)}</strong></p>`;
    } else {
      html += `<p class="cal-info">Tocca un giorno disponibile per scegliere quando preferisci il sopralluogo. <strong>Domeniche e giorni passati non sono prenotabili</strong>.</p>`;
    }
    this.container.innerHTML = html;
    this.attach();
  }
  attach() {
    this.container.querySelectorAll('.cal-nav:not(:disabled)').forEach(b => {
      b.addEventListener('click', () => {
        this.view.setMonth(this.view.getMonth() + parseInt(b.dataset.dir));
        this.render();
      });
    });
    this.container.querySelectorAll('.cal-day:not(:disabled)').forEach(b => {
      b.addEventListener('click', () => {
        const [y,mo,d] = b.dataset.date.split('-').map(Number);
        this.selected = new Date(y, mo-1, d);
        if (this.hidden) {
          this.hidden.value = b.dataset.date;
          this.hidden.dispatchEvent(new Event('input', { bubbles: true }));
        }
        this.render();
      });
    });
  }
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-calendar]').forEach(el => {
    const input = document.getElementById(el.dataset.calendar);
    new SopraCalendar(el, input);
  });
});

/* ══════════════════════════════════════════════════════════
   FORM SUBMIT — invio email via FormSubmit (free, no signup)
   I form richiesta vengono identificati con classe .send-via-formsubmit
   POST a https://formsubmit.co/quarkteam00@gmail.com
   ══════════════════════════════════════════════════════════ */
window.RECIPIENT_EMAIL = 'quarkteam00@gmail.com';

window.handleRequestSubmit = async function(form, opts = {}) {
  const subject = opts.subject || 'Nuova richiesta dal sito';
  const recipient = opts.recipient || window.RECIPIENT_EMAIL;
  const fd = new FormData(form);
  fd.set('_subject', subject);
  fd.set('_template', 'table');
  fd.set('_captcha', 'false');
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
      method: 'POST',
      body: fd,
    });
    const data = await res.json();
    if (data.success === 'true' || data.success === true) return true;
    throw new Error(data.message || 'Errore nell\'invio');
  } catch (e) {
    alert('Errore di invio. Riprova o scrivimi su WhatsApp al +39 347 662 2673.\n\n' + (e.message || ''));
    return false;
  }
};

/* Helper "una riga": gestisce form semplici a singolo submit (perizia, termografia, progetti, arredo, partner, recensioni). */
window.bindSimpleForm = function(formId, opts = {}) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn ? btn.innerHTML : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Invio in corso…'; }
    const ok = await window.handleRequestSubmit(form, opts);
    if (ok) {
      form.innerHTML = opts.successHtml || '<div class="req-done"><div class="req-done-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></div><h2>Richiesta inviata</h2><p>Grazie! Ti contatto entro 24 ore con il preventivo e i dettagli per il versamento dell\'acconto.</p><a href="index.html" class="btn btn-o">Torna alla home</a></div>';
    } else if (btn) {
      btn.disabled = false; btn.innerHTML = orig;
    }
  });
};

/* ══════════════════════════════════════════════════════════
   PAGE LOADER — transizione elegante tra pagine
   ══════════════════════════════════════════════════════════ */
window.MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
window.ALLOWED_UPLOAD_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'webp', 'heic'];

window.formatFileSize = function(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 MB';
  if (bytes < 1024 * 1024) return `${Math.max(bytes / 1024, 0.1).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

window.uploadLeadFiles = async function(files, opts = {}) {
  const list = Array.isArray(files) ? files : Array.from(files || []);
  const kind = String(opts.kind || 'documenti');
  const maxFiles = opts.maxFiles || 10;

  if (list.length > maxFiles) {
    throw new Error(`Puoi caricare al massimo ${maxFiles} file.`);
  }

  const uploaded = [];

  for (let i = 0; i < list.length; i++) {
    const file = list[i];
    const ext = String(file.name || '').toLowerCase().split('.').pop();

    if (!window.ALLOWED_UPLOAD_EXTENSIONS.includes(ext)) {
      throw new Error(`Il file ${file.name} non ha un formato supportato.`);
    }

    if (file.size > window.MAX_UPLOAD_BYTES) {
      throw new Error(`Il file ${file.name} supera il limite di 10 MB.`);
    }

    const formData = new FormData();
    formData.set('file', file, file.name);
    formData.set('kind', kind);

    const response = await fetch('/api/uploads', {
      method: 'POST',
      body: formData,
    });

    let data = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok || !data?.ok) {
      throw new Error(data?.error || `Upload fallito per ${file.name}.`);
    }

    uploaded.push(data);

    if (typeof opts.onProgress === 'function') {
      opts.onProgress({
        current: i + 1,
        total: list.length,
        file,
        result: data,
      });
    }
  }

  return uploaded;
};

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

  /* h2 fade-up: rimosso per evitare lo stesso bug del .reveal — i titoli
     restano sempre visibili. */

  /* .reveal elements — gestito da IntersectionObserver fuori da matchMedia,
     così funziona anche con prefers-reduced-motion. Niente gsap.from() qui:
     gsap.from() con opacity:0 su elementi che potrebbero non triggerare
     correttamente lo scrollTrigger lasciava il contenuto invisibile. */

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
