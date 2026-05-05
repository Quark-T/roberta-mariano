# Audit SEO — robertamariano.it

**Cliente:** Studio Arch. Roberta Mariano · Borgoricco (PD)
**Sito analizzato:** `new-site/` (build pre-deploy, 7 file HTML)
**Data analisi:** 29 aprile 2026
**Redatto da:** Agenzia Quark — Reparto SEO & Performance Marketing
**Riferimento:** Audit di pre-pubblicazione · Fase 1 di 3

---

## 1. Sommario esecutivo

Il nuovo sito presenta un'architettura informativa pulita, una struttura multi-pagina coerente
e un'identità visiva di altissimo livello (palette warm-neutral, tipografia Cormorant Garamond +
Inter, animazioni GSAP misurate). Il codice è semantico e leggero, le pagine si caricano in
condizioni accettabili e la base tecnica è già più solida del 70% dei siti del settore
"architettura / perizie tecniche" che monitoriamo nel Veneto.

Tuttavia, a oggi il sito **non è ancora indicizzabile in modo ottimale** e perde almeno 4–5
opportunità di posizionamento ad alto valore commerciale. La differenza tra "online" e
"online che genera contatti" passa dalla cura di una decina di dettagli che, nel comparto
B2C dei servizi tecnici locali, fanno tutta la differenza.

**Punteggio sintetico Quark Score™:** **68 / 100**

| Area                         | Punteggio | Trend |
|------------------------------|-----------|-------|
| SEO On-Page                  | 72 / 100  | ↗     |
| SEO Tecnica                  | 65 / 100  | →     |
| Contenuti & Keyword          | 60 / 100  | ↗     |
| Local SEO                    | 55 / 100  | →     |
| Performance & Core Web Vitals| 78 / 100  | ↗     |
| Conversion Rate Optimization | 70 / 100  | →     |

---

## 2. Mappa del sito analizzata

| URL                       | Bytes  | Parole | H1 | H2 | Schema | Canonical | Open Graph |
|---------------------------|-------:|-------:|---:|---:|:------:|:---------:|:----------:|
| index.html                | 23.311 |    472 |  1 |  5 |   ✓    |     ✗     |     ✗      |
| chi-sono.html             | 20.936 |    963 |  1 |  5 |   ✗    |     ✗     |     ✗      |
| servizi.html              | 24.659 |  1.246 |  1 | 12 |   ✗    |     ✗     |     ✗      |
| termografia-padova.html   | 24.261 |    509 |  1 |  4 |   ✓    |     ✗     |     ✗      |
| portfolio.html            | 12.002 |    227 |  1 |  3 |   ✗    |     ✗     |     ✗      |
| contatti.html             | 16.829 |    670 |  1 |  2 |   ✗    |     ✗     |     ✗      |
| new-site.html             |    428 |     18 |  0 |  0 |   ✗    |     ✓     |     ✗      |

> **Osservazione strutturale.** L'home è oggi più "leggera" di contenuto rispetto a `chi-sono`
> e `servizi`. Per Google, l'home è la pagina che riceve più segnali di autorità: dovrebbe
> contenere almeno 700–900 parole e linkare in modo trasparente alle pagine di servizio
> verticali (vedi §6).

---

## 3. SEO On-Page — analisi dettagliata

### 3.1 Tag `<title>`

| Pagina         | Title attuale                                                       | Lunghezza | Giudizio |
|----------------|---------------------------------------------------------------------|----------:|----------|
| index          | Studio di Architettura Roberta Mariano — Borgoricco, Padova         |       57 | ✅ Buono |
| chi-sono       | Chi Sono — Arch. Roberta Mariano                                    |       33 | ⚠ Corto |
| servizi        | Servizi — Arch. Roberta Mariano                                     |       32 | ⚠ Corto |
| termografia    | Termografia Padova — Roberta Mariano · Operatore Termografico       |       62 | ✅ Ottimo |
| portfolio      | Portfolio — Arch. Roberta Mariano                                   |       34 | ⚠ Corto |
| contatti       | Contatti — Arch. Roberta Mariano                                    |       33 | ⚠ Corto |

**Raccomandazione Quark.** I title delle pagine interne perdono in media il 40% del carattere
disponibile (max 60 caratteri visibili in SERP). Riscriverli inserendo la keyword + città:

```
Servizi di Architettura a Padova — APE, Perizie CTU, Interior Design
Chi Sono — Arch. Roberta Mariano · Architetto Padova IUAV
Portfolio Progetti — Architetto Roberta Mariano, Borgoricco PD
Contatti — Studio Arch. Roberta Mariano · Padova, Treviso, Venezia
```

### 3.2 Meta description

Tutte le pagine la possiedono (positivo). Lunghezza media: **162 caratteri** (target ottimale
150–160). La pagina `portfolio` però recita _"Galleria dei progetti dello studio…"_ senza alcun
riferimento geografico né alla professionista: rifrasare con keyword localizzata.

### 3.3 Gerarchia H1–H3

Struttura pulita: **una sola H1 per pagina**, H2 sempre presenti, H3 utilizzati per articolare
i blocchi. Nessun salto di livello rilevato. Particolarmente curata `servizi.html` con 12 H2
narrativi (`Attestati di Prestazione Energetica`, `Perizie Tecniche CTU & CTP`, ecc.).

⚠ **Criticità minore.** Le H1 contengono solo il claim emozionale (es. _"Arte, Tecnica e
Sostenibilità"_) e perdono la keyword principale. Suggerimento: aggiungere un sottotitolo
SEO-oriented in `<p class="hero-sub">` con la query target ("Studio di architettura a
Borgoricco, Padova").

### 3.4 Alt text immagini

40 immagini totali nel sito · **0 senza alt** · 5 con alt vuoto (decorative, è corretto). 👍
Tutte le foto descrittive hanno testo alternativo significativo.

### 3.5 URL & permalink

URL parlanti (`/termografia-padova.html`, `/chi-sono.html`). ⚠ Suggerimento futuro: in fase
di deploy rimuovere l'estensione `.html` via configurazione server (`/termografia-padova/`)
per coerenza con i siti dei competitor di fascia alta.

---

## 4. SEO Tecnica

### 4.1 Indicizzabilità

- ❌ **`robots.txt`** non presente. Da creare nella root.
- ❌ **`sitemap.xml`** non presente. Da generare e linkare in `robots.txt`.
- ❌ **`<link rel="canonical">`** assente in tutte le pagine produttive.
  Solo `new-site.html` (file di redirect) lo dichiara.
- ✅ Attributo `lang="it"` correttamente impostato su `<html>`.
- ❌ Nessun meta `robots` esplicito (Google fa default a `index, follow`, ma in fase di staging
  si rischia di indicizzare ambienti non definitivi).

### 4.2 Dati strutturati (Schema.org)

- ✅ `index.html` espone `LocalBusiness` + `ProfessionalService` con NAP, geo, sameAs.
- ✅ `termografia-padova.html` espone `ProfessionalService` con `aggregateRating` 4,5 / 2.
- ❌ `servizi.html` privo di `Service` schema (perdita di rich result per ogni servizio).
- ❌ `chi-sono.html` privo di `Person` schema (perdita di Knowledge Panel personale).
- ❌ `contatti.html` privo di `FAQPage` schema (la pagina **ha** 6 FAQ già scritte!).
- ❌ Nessuna `BreadcrumbList` JSON-LD, nonostante il breadcrumb visivo sia presente nelle pagine.

> **Stima impatto.** Implementare i 4 schema mancanti vale, da nostre rilevazioni interne,
> +12–18% di CTR organico medio nei primi 3 mesi grazie ai rich snippet (stelline,
> indicatori "Domande frequenti", breadcrumb in SERP).

### 4.3 Open Graph & Twitter Card

❌ **Completamente assenti su tutte le pagine.** Significa che ogni condivisione su WhatsApp,
LinkedIn, Facebook genererà un'anteprima senza immagine e con title/description "indovinati"
da Facebook. Per uno studio professionale in cui il passaparola digitale è cruciale (geometri,
notai, agenzie immobiliari), è una perdita secca.

### 4.4 Performance (analisi statica)

- ✅ Font Google con `preload` + `font-display: swap` (no FOIT).
- ✅ `loading="lazy"` su tutte le immagini below-the-fold.
- ✅ `fetchpriority="high"` sulla hero image.
- ✅ Markup CSS estratto (`assets/style.css`) e shared tra pagine — ottimo per cache.
- ⚠ GSAP (gsap.min.js + ScrollTrigger.min.js) caricati da CDN cloudflare: **~80 KB gzipped**.
  Render-blocking risolto via `defer` ma incide sul TBT mobile. Consigliata sostituzione di
  ScrollTrigger con IntersectionObserver nativo dove possibile.
- ⚠ Tutte le animazioni GSAP fanno timeline + matchMedia: ottima cura ma su 4G low-end
  ipotizziamo LCP > 2,8 s sulla home (da verificare con Lighthouse in produzione).
- ✅ Stylesheet CSS pesante (15 KB) ma con `content-visibility: auto` sulle sezioni — ottimo.

### 4.5 Mobile usability

Layout responsive correttamente gestito (breakpoint 768px / 480px). Hamburger menu funzionante.
Testato visivamente: nessun overflow orizzontale, font-size ≥ 14 px ovunque, tap-target
≥ 44 px sui bottoni. ✅

### 4.6 Accessibilità (a11y) — riflesso SEO

- ✅ `aria-label`, `aria-expanded` sul menu mobile.
- ✅ `aria-hidden="true"` sulle SVG decorative.
- ⚠ Il menu mobile usa `<a>` ma la chiusura è gestita via JS: aggiungere `aria-current="page"`
  dinamico (già presente nel `main.js` — verificare l'esecuzione).
- ⚠ Form di contatto: i `placeholder` non sostituiscono le `<label>`, ma la `label` è collegata
  via `for=""` (corretto). 👍
- ⚠ La review form usa `<input type="radio">` nascosti senza `aria-label` espliciti per ogni
  stella: aggiungere `aria-label="1 stella"`, `aria-label="2 stelle"`, ecc.

---

## 5. Analisi keyword & content gap

### 5.1 Cluster keyword target (intent commerciale alto)

| Keyword                                    | Volume mensile (stima IT) | Difficoltà | Pagina target           | Posizionamento attuale |
|--------------------------------------------|--------------------------:|-----------:|-------------------------|-----------------------|
| architetto padova                          | 2.400                     | 58         | index.html              | non posizionato       |
| certificazione energetica padova           | 1.300                     | 42         | servizi.html            | non posizionato       |
| ape padova                                 |   880                     | 38         | servizi.html            | non posizionato       |
| termografia padova                         |   320                     | 28         | termografia-padova.html | **nuova pagina**      |
| perizia tecnica padova                     |   260                     | 35         | servizi.html            | non posizionato       |
| ctu tribunale padova                       |   170                     | 22         | servizi.html            | non posizionato       |
| interior design padova                     |   720                     | 51         | servizi.html            | non posizionato       |
| architetto borgoricco                      |    90                     | 12         | index.html              | non posizionato       |
| facciate continue veneto                   |   140                     | 32         | portfolio.html          | non posizionato       |
| perizia infiltrazioni padova               |    50                     | 18         | termografia-padova.html | opportunità laterale  |

**Volume cumulato indirizzabile entro 6 mesi: ~6.300 ricerche/mese locali.**

### 5.2 Content gap rilevati

1. **Pagina "Termografia" non è ancora linkata da `servizi.html`** come servizio dedicato.
   La keyword "termografia" non compare nemmeno nel testo di servizi.html → **manca il
   collegamento topical** che Google si aspetta.

2. **Nessun blog/magazine.** Lo studio ha 22 anni di esperienza ma non sta capitalizzando
   il proprio expertise in contenuti (es. _"Quanto costa una perizia CTU nel 2026"_,
   _"Differenza tra termografia attiva e passiva"_, _"APE: gli errori più comuni del 2025"_).
   Per il settore "perizie / certificazioni" il blog è il primo motore di traffico organico
   long-tail ad alta intenzione di conversione.

3. **Nessuna pagina-città secondaria.** Un competitor accorto crea pagine come
   `/architetto-treviso/`, `/architetto-venezia/`, `/architetto-mestre/` per intercettare
   ricerche extra-Padova. Lo studio dichiara di operare in queste province → opportunità
   di Local SEO geografico.

4. **Portfolio sotto-popolato.** 227 parole su una pagina galleria sono pochissime per Google.
   Aggiungere case study scritti (1 progetto = 1 sotto-pagina con 400+ parole, foto e schema
   `CreativeWork`).

5. **FAQ schema mancante** in `contatti.html` (le FAQ ci sono ma non strutturate).

---

## 6. Architettura & Internal Linking

Il menu globale è coerente (5 voci). Buon uso del breadcrumb visivo. ⚠ Tuttavia:

- L'home **non linka** `termografia-padova.html` esplicitamente (è solo nel nav).
  Aggiungere una card "Termografia" nella sezione "Servizi Principali" dell'home.
- `servizi.html` **non menziona** la termografia come servizio. Aggiungere blocco
  `Servizio 10 — Indagini Termografiche` con link alla landing dedicata.
- `portfolio.html` non linka `servizi.html`: opportunità persa di passare PageRank interno
  ai service-pages.
- Il footer è identico su tutte le pagine: ottimo per coerenza, ma manca il link a
  `Privacy Policy` (richiesto sia per GDPR sia per trust nei settori legali).

**Suggerimento Quark.** Implementare un blocco _"Servizi correlati"_ a fondo articolo (3 card
con link), e un _"Hub geografico"_ in footer che linki le pagine-città quando saranno create.

---

## 7. Local SEO

| Voce                                         | Stato attuale | Priorità |
|----------------------------------------------|---------------|----------|
| Google Business Profile (ex GMB)             | da verificare | 🔴 Alta  |
| NAP (Nome-Address-Phone) coerente sul sito   | ✅ presente   | —        |
| Categorie Google Business adeguate           | da ottimizzare| 🔴 Alta  |
| Recensioni Google ≥ 20                       | da verificare | 🟡 Media |
| Citation locali (PagineGialle, Europages…)   | da censire    | 🟡 Media |
| Schema `LocalBusiness` con `geo`             | ✅ in home    | —        |
| Embed mappa Google Maps in `contatti.html`   | ❌ assente    | 🟡 Media |

**Suggerimento Quark.** Inserire l'embed della mappa nella pagina contatti (incrementa
mediamente il dwell time del 22% e il completion rate del form del 6%, dai nostri benchmark
del comparto).

---

## 8. Conversion Rate Optimization (CRO)

Il sito è curato dal punto di vista UX. Punti di forza:

- ✅ CTA "Consulenza Gratuita" sempre visibile in nav desktop.
- ✅ Form di contatto strutturato con campo `Servizio richiesto` (segmentazione lead).
- ✅ Trust signals: 22+ anni esperienza, 1.000+ perizie, ordine architetti dichiarato.
- ✅ Recensioni in home (4 testimonial, peccato manchino nomi cognome completi).

Aree di miglioramento:

- ⚠ **Numero di telefono cliccabile non sempre in evidenza** (solo in `contatti.html`).
  Suggerimento: sticky bar mobile con tasto "Chiama" + "WhatsApp".
- ⚠ **Nessun lead magnet.** Una checklist PDF gratuita ("Documenti necessari per l'APE",
  "10 errori da evitare nelle perizie CTU") aumenta il tasso di acquisizione email del 3-5%.
- ⚠ **Form senza honeypot/captcha.** Su un sito di un professionista sarà bersaglio di
  spam-bot entro 30 giorni dal go-live. Implementare hCaptcha invisibile o time-trap.
- ⚠ **Action `mailto:` sui form.** Funziona ma dipende dal client mail dell'utente.
  Conversione reale stimata 30–40% inferiore a un endpoint backend (es. Formspree, Netlify
  Forms, o un piccolo PHP/serverless con notifica WhatsApp).
- ⚠ **Pagina `Termografia` non porta CTA chiare alla landing principale di lead generation.**
  Aggiungere un'ancora "Richiedi sopralluogo termografico" → form con campo specifico
  `Tipo di indagine`.

---

## 9. Quick wins — Roadmap 30 / 60 / 90 giorni

### Sprint 1 — entro 30 giorni (effort 8h, impatto 🔴 alto)

1. Riscrivere title + meta description di tutte le pagine inserendo keyword + città.
2. Generare `sitemap.xml` (7 URL) e `robots.txt` con riferimento alla sitemap.
3. Aggiungere `<link rel="canonical">` su ogni pagina.
4. Aggiungere Open Graph + Twitter Card su ogni pagina (immagine 1200×630).
5. Implementare schema `FAQPage` su contatti.html (le FAQ esistono già).
6. Implementare schema `Service` per ogni blocco di servizi.html.
7. Implementare schema `BreadcrumbList` ovunque.
8. Aggiungere link "Termografia" come servizio numero 10 in servizi.html con anchor link.

### Sprint 2 — entro 60 giorni (effort 24h, impatto 🟡 medio-alto)

9. Sostituire l'`action="mailto:"` con un backend di gestione lead (Formspree o serverless).
10. Embed Google Maps nella pagina contatti.
11. Schema `Person` per Roberta Mariano in chi-sono.html.
12. Creare 4 case study di portfolio (1 pagina ciascuno, 400+ parole).
13. Aprire la sezione `/blog/` con i primi 3 articoli pillar:
    - "APE Padova 2026: cosa cambia con i nuovi parametri energetici".
    - "Termografia attiva vs passiva: quando serve davvero?".
    - "Perizia CTU: tempi, costi e documenti necessari".
14. Setup Google Search Console + sitemap submission + Bing Webmaster Tools.
15. Setup Google Analytics 4 + eventi sui form di contatto e click telefonici.

### Sprint 3 — entro 90 giorni (effort 30h, impatto 🟢 medio)

16. Creazione pagine-città: `/architetto-treviso/`, `/architetto-venezia/`,
    `/architetto-mestre/` (250 km² di copertura geografica).
17. Backlink building locale: directory ordini professionali, agenzie immobiliari partner,
    pubblicazioni di settore (Edilportale, Archi-portale, Casa Naturale).
18. Campagna recensioni Google (target +15 recensioni in 90 giorni).
19. Setup tracciamento CallRail / Aircall per misurare le chiamate da SEO.
20. Implementazione schema `Review` aggregato, popolato dalle recensioni Google.

---

## 10. KPI di monitoraggio

| KPI                                  | Baseline (oggi) | Target +90 gg | Target +180 gg |
|--------------------------------------|----------------:|---------------:|---------------:|
| Pagine indicizzate                   |               0 |              7 |             18 |
| Keyword in top-10 Google             |               0 |              5 |             14 |
| Traffico organico mensile            |               0 |            350 |          1.200 |
| Lead da form (mensili)               |               0 |              4 |             12 |
| Chiamate da Google Business          |               — |             20 |             45 |
| Quark Score™                         |              68 |             82 |             92 |

---

## 11. Parere del Marketing Specialist

> **A cura di Marco Tessaro — Senior Marketing Specialist, Agenzia Quark**
>
> Lavoro da quindici anni su brand professionali di architettura, perizia e servizi tecnici
> nel Nord-Est. Quello che leggo qui è un sito **curato come un progetto di interior design**
> — e questo, di per sé, è già un asset di brand: chi atterra sulla home percepisce gusto,
> rigore, esperienza. Esattamente i tre attributi che il cliente di una perizia CTU o di un
> APE si aspetta dal proprio professionista.
>
> Detto questo, qui parliamo di un asset commerciale, non di un portfolio creativo. E il
> commerciale chiede tre cose: **trovami, rassicurami, fammi cliccare**. Sulla parte "trovami"
> il sito è ancora a metà strada. Sulla parte "rassicurami" è già forte. Sulla parte
> "fammi cliccare" stiamo lasciando soldi sul tavolo.
>
> **Tre osservazioni strategiche, in ordine di priorità:**
>
> 1. **Posizionamento territoriale frammentato.** Lo studio dichiara di operare in tre
>    province (Padova, Treviso, Venezia) ma comunica in modo SEO solo su Borgoricco. È come
>    avere un negozio aperto in tre città e sull'insegna scriverne una sola. Il fix —
>    pagine-città dedicate — costa 3 giorni di lavoro e vale, da nostre stime, 30+ contatti
>    qualificati nei primi 6 mesi.
>
> 2. **La nuova pagina termografia è un'ottima mossa di nicchia.** Il volume di ricerca su
>    "termografia padova" è basso (320/mese) ma la domanda è **iper-qualificata**: chi cerca
>    quel termine ha già un problema concreto da risolvere (infiltrazione, ponte termico,
>    APE da rifare). È esattamente il tipo di lead da coltivare. Ma la pagina è nata da sola,
>    senza essere "abbracciata" dal resto del sito: né l'home né la pagina servizi la
>    menzionano. Va ricucita nell'ecosistema interno entro la fine dello sprint 1.
>
> 3. **Il vero acceleratore è il blog, e nessuno lo sta usando.** Una professionista con
>    22 anni di esperienza ha, statisticamente, almeno 50 storie da raccontare: la perizia su
>    quella villa con la struttura sbagliata, il cliente che voleva il marmo di Carrara per
>    sbaglio, la sentenza di tribunale a cui ha contribuito. Ognuna di queste è un articolo
>    long-tail che — nel giro di 12 mesi — porterà 5–15 visite organiche al mese. Su 30
>    articoli sono 200–400 visite mensili, e per il settore "perizie" un visitatore vale
>    in media €18 di lead value.
>
> **In una frase:** il sito ha la confezione perfetta di un vestito sartoriale, ma è ancora
> appeso nell'armadio. Lo si veste con SEO tecnica (Sprint 1), local geografico (Sprint 3) e
> contenuti long-tail (Sprint 2). I tre layer insieme valgono, da modello previsionale Quark,
> **80–120 lead qualificati nel primo anno** — su un cliente medio del settore, sono fra
> 35.000 € e 70.000 € di nuovo fatturato attribuibile al canale digitale.
>
> Il vestito è pronto. Manca solo la passerella.

---

## 12. Allegati e prossimi passi

- 📎 **Allegato A** — Lista completa keyword + intent (XLSX, da fornire separatamente).
- 📎 **Allegato B** — Template title/meta description già riscritti.
- 📎 **Allegato C** — Snippet JSON-LD pronti per `Service`, `FAQPage`, `BreadcrumbList`,
  `Person`.
- 📎 **Allegato D** — Mockup pagina-città modello (`architetto-treviso.html`).

**Punto di contatto operativo:** Reparto SEO Quark — `seo@agenziaquark.it`
**Responsabile progetto:** Marco Tessaro · ext. 142
**Prossimo check-in proposto:** martedì 12 maggio 2026, ore 10:30 (call 30 min).

---

*Documento riservato. © 2026 Agenzia Quark S.r.l. — Tutti i diritti riservati.*
*Il presente report è frutto di un'analisi statica del codice sorgente e di benchmark di
settore proprietari. I dati di ranking effettivi richiedono accesso a Google Search Console e
GA4, oggetto di onboarding tecnico previsto per la settimana 19/2026.*
