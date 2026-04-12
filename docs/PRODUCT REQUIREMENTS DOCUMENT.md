# Product Requirements Document

**Project:** Coast2c Artist Website
**Version:** 2.0
**Goal:** Conversion + Authority + Scalability

---

## Core Objective

Convert qualified visitors into booking inquiries (live modular, DJ sets, production services) while positioning the artist as a multi-disciplinary media, high-level modular, sound designer, sound for movies and DJ for festivals, press, and interdisciplinary collaborations.

---

## Primary Audience

### 1. Festival Bookers and Promoters

**Needs from client:**

- Immediate genre clarity
- Live performance video proof
- Professional photos
- Recognizable events (Mutek, Kontaktor)
- Technical rider
- Fast contact method

### 2. Musical Journalists and PR

- Strong narrative, high-res photos, press quotes
- Downloadable EPK
- Clear genre tags for SEO
- Strong positioning statement
- Achievements visible quickly

### 3. Creative Directors / Film and Ad Producers

**Needs:**

- Production portfolio
- Clear services
- Case examples
- Professional tone
- Contact clarity

### 4. Instagram Audience

- Seamless aesthetic continuity
- Music access
- Events
- Emotional narrative
- Deeper story

---

## Revenue Priorities (Next 12 Months)

1. Paid DJ gigs
2. Paid live modular performances
3. Paid music production / sound design commissions

> The website must prioritize performance credibility first, then services.

**Positioning Statement:**

> Live modular techno artist, DJ, and sound designer creating immersive performances for club stages, festivals, and interdisciplinary collaborations.

---

## Success Metrics

| Metric                         | Target                              |
| ------------------------------ | ----------------------------------- |
| Booking inquiries              | 3/month within 6 months             |
| Paid gigs                      | 2 within first 6 months post-launch |
| Spotify/Bandcamp click-through | 5%                                  |
| Newsletter signups             | 30                                  |
| Avg. session duration          | 1:45 min                            |
| Bounce rate                    | 55%                                 |

---

## Events + Tracking Framework

A booking inquiry counts when one of the following occurs:

**Primary Conversion (High Intent):**

- `contact_submit` — form submitted successfully
- `booking_form_submit` — if separated from general contact

**Secondary High-Intent Signals:**

- `email_click` — click on booking email link
- `calendar_request_click` — if added later

> Only form submissions count toward the official "Booking Inquiry" KPI. The others are supporting indicators.

### Core Events to Track

Configure these in GA4 (or Plausible with custom events).

**Booking & Contact**

- `book_live_click`
- `book_dj_click`
- `start_project_click`
- `contact_submit`
- `email_click`
- `whatsapp_click`

**Press & Authority** _(especially important for tracking booker and journalist behavior)_

- `epk_download`
- `rider_download`
- `press_photo_download`

**Engagement Signals** _(video engagement is a strong indicator of serious interest)_

- `video_play_live`
- `video_50_percent`
- `dj_mix_play`
- `portfolio_project_view`
- `services_page_view`

**Music Streaming Outbound** _(track as outbound link events)_

- `spotify_click`
- `bandcamp_click`
- `soundcloud_click`

**Newsletter Growth**

- `newsletter_signup_start`
- `newsletter_submit`

### Funnel Targets Per Audience

**1. Festival Booker Funnel**
`Landing → Live Video → Rider → Contact Submit`

Track: `video_play_live`, `rider_download`, `contact_submit`

Target benchmarks (first 6 months):

- 40% of live video viewers watch 50%+
- 15% of live viewers download rider
- 5% of rider downloaders submit inquiry

**2. DJ Booker Funnel**
`Landing → DJ Section → Mix Play → Contact`

Track: `dj_mix_play`, `book_dj_click`, `contact_submit`

**3. Film / Production Funnel**
`Landing → Production Page → Case Study View → Start Project`

Track: `portfolio_project_view`, `start_project_click`, `contact_submit`

**4. Instagram Fan Funnel**
`Landing → Music Click → Newsletter Signup`

Track: `spotify_click`, `newsletter_submit`

---

## Information Architecture

```
Inicio
Portafolio
Servicios
Press / EPK
Booking (or Contact)
Acerca
```

### Inicio

Página modular para ser escalable con bloques de contenido.

- **Bloque 1** — Descripción SEO con dos CTAs. Al lado, imagen del sistema modular y una canción local en HTML.
- **Bloque 2** — Galería de imágenes de portadas de todo el trabajo realizado, con navegador (todos, música, sonoro, videoremixes, dev). Al dar clic a la imagen se abre una vista detalle del proyecto en formato blog de Framer (con soporte para Soundcloud, embeds, imágenes, etc.).
- **Bloque 3** — Eventos en vivo. Bloque modular: si no hay eventos, desaparece con un booleano. Opción de mostrar eventos pasados relevantes.
- **Bloque 4** — Servicios: producción musical, diseño sonoro, talleres, colaboración artística, consulta técnica. CTA: _Trabaja conmigo_.
- **Bloque 5** — Prensa: listado con fecha, título y link del artículo.
- **Bloque 6** — Cierre de texto en desarrollo. Ejemplo: _"Producción Musical y Diseño Sonoro para Multimedia. Actualmente desarrollando un proyecto integral de diseño sonoro para una pieza de performance experimental, explorando la intersección entre síntesis modular, audio espacial y artes visuales."_
- **Bloque 7** — Galería de fotografías con descripción del evento (opcional).
- **Footer** — Izquierda: Ciudad de México, síntesis modular, diseño sonoro. Derecha: contacto y redes sociales.

### Portafolio

Galería de imágenes de las portadas de todo el trabajo realizado.

### Servicios

Descripción de servicios.

### Press / EPK

Lista de artículos de prensa con EPK descargable.

### Acerca De

- Short bio (80 words)
- Long bio (300–400 words)
- Studio and creative process
- Music production and sound design for multimedia case
- Artist statement
- Key milestones
- FAQ:
  - Technical setup?
  - Travel availability?
  - DJ vs Live differences?
  - Collaboration formats?
- Portrait press image / downloadable rider

### Press / EPK Page

Must include:

- Downloadable PDF (updated)
- Short bio
- Long bio
- High-res photos
- Technical rider
- Stage plot
- Video links
- Contact info
- List of articles with link and date

### Booking

Split the form into three entry points:

1. Booking Inquiry (Live / DJ)
2. Production / Sound Design Project
3. Press Inquiry

Each with slightly different form fields.

---

## Tone Guardrails

Regardless of direction:

- Avoid apologetic language.
- Avoid "emerging artist" framing.
- Avoid unnecessary personal narrative in booking-focused sections.
- Keep sentences under 20 words when possible.
- No filler adjectives like "amazing," "unique," "incredible."
- No overly technical jargon unless in rider/technical section.

---

## Core Features

- Live performance video
- Downloadable press kit
- Booking contact form
- Mobile-first design

**Nice to have:**

- Shop

---

## Brand and Visual Direction

See Figma.

**Principles:**

- Minimal but bold
- Dark-forward aesthetic
- Strong typography
- Modular-inspired layout logic
- High contrast for accessibility

---

## Content Requirements

- Bio (short 80-word version + long 300-word version)
- High-res press photos (3–5)
- Live performance video (1 strong)
- DJ mix (1)
- Logo
- EP cover arts
- Press quotes
- Updated technical rider
- Updated EPK PDF
- Short + long bio
- Service descriptions (case-oriented)
- Mutek / Kontaktor documentation

---

## Technical Requirements

- **Bilingual CMS:** Spanish primary with English translation. URLs localized (`/en/...`).
- **Video hosting:** YouTube
- **Structured data for events:** Only if events are first-class objects in the CMS.
- **Analytics:** GA4 or Plausible (simpler, privacy-forward).
- **Performance targets:** LCP under 2.5s on mobile; image formats WebP/AVIF.

---

## CTA Strategy

The website implements a clear CTA hierarchy aligned with audience intent to maximize conversions. Only one dominant CTA appears per section, with booking-related actions receiving highest visual priority.

### Festival & Club Bookers

**Primary Goal:** Secure performance booking
**Psychology:** "Can she deliver? Is she professional? Is it easy to book?"

| Priority   | CTA                      |
| ---------- | ------------------------ |
| Primary    | Book a Live Performance  |
| Secondary  | Download Technical Rider |
| Supporting | Watch Live Performance   |

### DJ Bookers

Separate Live and DJ clearly — DJ needs its own conversion path.

| Priority  | CTA              | Placement          |
| --------- | ---------------- | ------------------ |
| Primary   | Book DJ Set      | DJ section header  |
| Secondary | Listen to DJ Mix | After embedded mix |
| —         | —                | Footer quick link  |

### Journalists & PR

**Primary Goal:** Access assets quickly
**Psychology:** "Can I write about this easily?"

| Priority   | CTA                      |
| ---------- | ------------------------ |
| Primary    | Download Press Kit       |
| Secondary  | Download High-Res Photos |
| Supporting | Read Artist Bio          |

### Film Directors / Creative Directors / Agencies

**Primary Goal:** Initiate project conversation
**Psychology:** "Can she deliver for our production?"

| Priority    | CTA                            | Placement                           |
| ----------- | ------------------------------ | ----------------------------------- |
| Primary     | Start a Project                | Production & Sound Design page hero |
| Alternative | Discuss a Sound Design Project | End of case studies                 |
| Secondary   | View Production Work           | Homepage services section           |

---

## Booking-First Conversion Spine Strategy

### Core Principle

The website is optimized to convert festival and club bookers into inquiry submissions within 3–5 minutes of landing.

All major pages must support this path:
**Proof → Authority → Practical Info → Booking CTA**

### Conversion Hierarchy

**Primary Revenue Target (Year 1):**

1. Live Modular bookings
2. DJ bookings
3. Sound design commissions

**Visual and structural hierarchy:**

1. Book Live Performance
2. Book DJ Set
3. Start a Project
4. Download Press Kit
5. Listen Now

> Booking actions must always visually dominate.

### Homepage Conversion Spine

**Section 1 — Clear Positioning + Primary CTA**

- Headline: _Live Modular Techno Artist & DJ for Festivals and Clubs_
- Primary CTA: Book Live Performance
- Secondary: Watch Live
- Immediately answers: What genre? What format? Is she bookable?

**Section 2 — Immediate Proof**

- Embedded live performance video (strong, high production)
- Below it: "Performed at Mutek, Kontaktor."
- CTA: Download Technical Rider
- This is credibility acceleration.

**Section 3 — Offer Clarity**

Three clear tiles:

- Live Modular
- DJ
- Sound Design

Each with direct booking or project CTA. This removes confusion.

**Section 4 — Authority Signals**

- Press logos
- Venue highlights
- Quotes
- CTA: Download Press Kit

**Section 5 — Friction Reduction**

Short FAQ:

- International travel available?
- Technical setup requirements?
- Adaptable to club/festival formats?
- DJ vs Live differences?

You remove reasons not to book.

**Section 6 — Final Booking Push**

- Strong closing statement
- Primary CTA: Book Live Performance
- Secondary: Book DJ Set

This repetition is intentional.

### Live & DJ Pages (Deep Conversion Pages)

These are not portfolios. They are booking engines.

Each should include:

- Clear format explanation
- 2–3 performance images
- Video proof
- Technical rider download
- Short testimonial (if possible)
- Booking CTA repeated 3 times

Every scroll interval should reintroduce the booking action.

### Contact Page Optimization

Split entry points:

1. Booking Inquiry (Live / DJ)
2. Production / Sound Design
3. Press Inquiry

**Booking form fields:**

- Event type
- Location
- Date
- Budget range (optional but powerful)

This qualifies leads and signals professionalism.

### Trust Accelerators

To increase booking confidence:

- High-resolution stage photos
- Clear genre labeling (Modular Techno / DJ Set)
- Downloadable rider
- Clean EPK page
- Professional email address
- Bilingual execution

Bookers hesitate when friction exists. Remove ambiguity.

### Psychological Triggers

Subtle but important:

| Trigger                   | Example                                 |
| ------------------------- | --------------------------------------- |
| Authority                 | "Performed at Mutek."                   |
| Clarity                   | "60-minute Live Modular Set."           |
| Specificity               | "Fully hardware, improvisation-driven." |
| Professionalism           | "Available for international bookings." |
| Scarcity (optional later) | "Limited 2026 availability."            |

### Post-Launch Optimization Loop

After launch, measure:

- % of visitors clicking "Book Live"
- Rider downloads
- Video watch rate
- Contact submissions

**Diagnosis:**

- High traffic + low booking clicks → messaging issue
- High rider downloads + low contact → friction issue
- Low video play → hero not strong enough

The spine must evolve.

### Long-Term Booking Engine Evolution

**Phase 2:**

- Add testimonials from promoters
- Add short quotes from collaborators
- Add press excerpts

**Phase 3:**

- Add touring schedule
- Add residency highlights
- Add international press

Each layer increases conversion confidence.

### Core Strategic Rule

If a section does not:

- Prove performance quality
- Increase authority
- Reduce booking friction
- Or push toward inquiry

It does not belong on a booking-first homepage.

---

## MVP Checklist

- [ ] 10 high-quality photos
- [ ] 1 live video (strong)
- [ ] 6–10 curated releases/works
- [ ] 10 press quotes (even if short) with links
- [ ] 1 updated rider PDF
- [ ] Short bio + long bio
- [ ] Service descriptions with 1–2 concrete examples each

Everything else is Phase 2.
