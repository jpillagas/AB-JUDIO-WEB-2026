# Cinematic Motion & Hero Redesign — Design Spec

**Project:** El Abogado Judio / Neuhauser Law (`New-Web-2026`)  
**Date:** 2026-06-08  
**Status:** Approved

---

## 1. Problem Statement

The current site has basic entry animations (Framer Motion fade-in, CSS `.reveal` on scroll) and a static hero: grayscale background image, static portrait with gold corner borders, no parallax or interaction. GSAP is installed but unused. The site does not feel premium or cinematic enough for a high-end law firm targeting the Hispanic community in NY, NJ, and CT.

**User goal:** Make pages significantly more professional with effects and movement. The hero photo is the primary pain point.

---

## 2. Decisions (Brainstorming Outcomes)

| Topic | Decision |
|-------|----------|
| Visual intensity | **Cinematográfico** — agency/creative style with strong scroll-driven motion |
| Media assets | **Stock premium now** — architecture ready to swap real photos/video later without rewriting components |
| Scope | **Home (all sections) + internal page heroes** (`/nosotros`, `/servicios`, `/contacto`, `/blog`) |
| Home scroll style | **Reveal progresivo** — blocks enter with zoom, parallax, masks, and layered effects on viewport entry (no pinned sections) |
| Home hero treatment | **Multi-layer photo** — Ken Burns + scroll parallax + grain/light/particles + portrait with 3D mouse tilt |
| Internal heroes | **Same system, compact** — Ken Burns + parallax + grain; shorter height; no particles or 3D tilt |
| Technical approach | **Hybrid (recommended & approved)** — GSAP ScrollTrigger for scroll choreography; Framer Motion for UI interactions (header, FAQ, tilt, hovers) |

---

## 3. Architecture

### 3.1 New files

```
lib/
  animations/
    gsap-setup.ts          # ScrollTrigger registration + Lenis sync
    useScrollReveal.ts     # Reusable hook: fade, parallax, stagger variants
    useReducedMotion.ts    # prefers-reduced-motion detection
  media.ts                 # Centralized stock URLs + keys for future swap

components/cinematic/
  CinematicHero.tsx        # Home hero (full multi-layer)
  CinematicPageHero.tsx    # Internal pages (compact variant)
  ParallaxLayer.tsx        # Layer with configurable scroll speed
  FilmGrain.tsx            # CSS grain overlay
  ParticleField.tsx        # Subtle particles (home hero, desktop only)
  MediaSlot.tsx            # Image/video abstraction for easy replacement
```

### 3.2 Modified files

```
app/layout.tsx             # Import gsap-setup provider/init
app/globals.css            # New reveal variants, grain utilities, reduced-motion overrides
components/sections/HomeHero.tsx       # Replace with CinematicHero
components/PageHero.tsx                # Replace with CinematicPageHero (or deprecate)
components/sections/HomeStats.tsx      # GSAP stagger reveal
components/sections/HomeWhyUs.tsx      # Mask reveal + parallax image
components/sections/HomeServices.tsx   # Stagger cards + hover lift
components/sections/HomeTestimonials.tsx # Parallax image + improved crossfade
components/sections/HomeCTA.tsx        # Ken Burns background
app/nosotros/page.tsx      # Use CinematicPageHero
app/servicios/page.tsx     # Use CinematicPageHero
app/contacto/page.tsx      # Use CinematicPageHero
app/blog/page.tsx          # Use CinematicPageHero
```

### 3.3 Responsibility split

| Library | Responsibility |
|---------|----------------|
| **GSAP ScrollTrigger** | Scroll-linked parallax, Ken Burns tied to scroll, section reveals (fade/scale/mask/stagger), hero layer choreography, ScrollTrigger cleanup on route change |
| **Framer Motion** | Header menu, FAQ accordion, testimonial crossfade, button hovers, portrait 3D tilt (mouse), initial mount stagger on hero text |
| **Lenis** | Smooth scroll (existing); synced with ScrollTrigger via `gsap-setup.ts` |
| **CSS** | Film grain overlay, reduced-motion fallbacks, marquee (existing) |

### 3.4 Data flow

```
Lenis raf loop
  → GSAP ScrollTrigger.update on scroll
    → ParallaxLayer / section reveal triggers fire
      → DOM transforms & opacity update

Mouse move on portrait (desktop)
  → Framer Motion useMotionValue / useTransform
    → 3D rotateX/Y on portrait container (max 8°)
```

### 3.5 Media swap system (`lib/media.ts`)

All cinematic imagery referenced by semantic keys, not hardcoded URLs in components:

```ts
export const media = {
  hero: {
    background: "https://images.unsplash.com/...",
    portrait: "https://images.unsplash.com/...",
  },
  pageHeroes: {
    nosotros: "https://images.unsplash.com/...",
    servicios: "https://images.unsplash.com/...",
    contacto: "https://images.unsplash.com/...",
    blog: "https://images.unsplash.com/...",
  },
  sections: {
    // existing section images can migrate here in future phases
  },
} as const;
```

`MediaSlot` accepts `src`, `alt`, `priority`, and optional `videoSrc` for phase-2 video support. Changing a URL in `lib/media.ts` updates the entire site.

---

## 4. Home Hero — Detailed Design

### 4.1 Layer stack (back to front)

1. **Background Ken Burns** — Slow scale 1.0 → 1.08 over 20s (infinite loop) + vertical parallax on scroll (speed factor 0.3).
2. **Cinematic gradient** — `from-ink via-ink/85 to-ink/40` with edge vignette.
3. **Film grain** — 4–6% opacity animated noise overlay (`FilmGrain.tsx`).
4. **Light leak** — Slow-moving gold gradient (10–15s loop), opacity 8–12%.
5. **Particle field** — ~30 gold/white particles, slow drift (desktop only, `ParticleField.tsx`).
6. **Text content** — Staggered entry: eyebrow → H1 (per-line split) → paragraph → CTA buttons.
7. **Portrait** — Clip-path reveal from right; gold corner accents (existing design language); independent scroll parallax (speed 0.15); 3D tilt on mouse (desktop, max 8°).

### 4.2 Initial load sequence

| Time | Element |
|------|---------|
| 0ms | Background fades in (opacity 0 → 1, 1.2s) |
| 200ms | Text eyebrow slides up |
| 400ms | H1 lines stagger (100ms between lines) |
| 600ms | Paragraph fades in |
| 800ms | CTAs fade in |
| 300ms (parallel) | Portrait clip-path reveal from right (1s) |

### 4.3 Mobile adaptations (< 1024px)

- No `ParticleField`
- No 3D tilt on portrait
- Ken Burns scale reduced (1.0 → 1.04)
- Parallax intensity halved
- Portrait moves below text content (existing grid order)

### 4.4 Stock imagery (placeholder)

- **Background:** Law/courthouse architectural shot, high contrast, suitable for dark gradient overlay.
- **Portrait:** Professional attorney portrait (placeholder until real photo provided).

---

## 5. Home Sections — Scroll Reveal Upgrades

Replace generic `.reveal` CSS with GSAP-driven variants:

| Variant | Behavior |
|---------|----------|
| `reveal-fade` | Opacity 0 → 1, translateY 40px → 0 |
| `reveal-scale` | Opacity 0 → 1, scale 0.92 → 1 |
| `reveal-mask` | Clip-path inset reveal (diagonal or bottom-up) |
| `reveal-stagger` | Parent triggers children with 0.1s stagger |

### Per-section treatment

| Section | Effect |
|---------|--------|
| **HomeStats** | Staggered number reveal; gold horizontal line draws via scaleX 0 → 1; subtle background parallax |
| **HomeWhyUs** | Image: `reveal-mask` diagonal; text: stagger per paragraph |
| **HomeServices** | Cards: `reveal-stagger` + hover lift (translateY -4px) + animated gold border on hover |
| **HomeTestimonials** | Side image parallax; blockquote gold marks animate in; existing Framer crossfade retained |
| **HomeCTA** | Background Ken Burns (subtle); CTA button gold border pulse (CSS keyframe, 3s loop) |

### Header refinement

Existing scroll state (blur + background) enhanced with GSAP scrub on `scrollY` for smoother opacity/blur transition (0–100px scroll range).

---

## 6. Internal Page Heroes — Compact Variant

`CinematicPageHero` reuses layers 1–3 from home hero (Ken Burns + gradient + grain). No particles, no 3D tilt.

| Property | Home hero | Page hero |
|----------|-----------|-----------|
| Height | ~90vh (min 600px) | 45vh (min 300px) |
| Ken Burns scale | 1.0 → 1.08 | 1.0 → 1.05 |
| Parallax intensity | Full | 50% |
| Particles | Yes (desktop) | No |
| 3D tilt | Yes (desktop) | No |
| Title animation | Multi-line stagger | Single fade + slide up |

### Stock themes per page

| Route | Thematic stock |
|-------|----------------|
| `/nosotros` | Team / professionals in meeting |
| `/servicios` | Courthouse / legal documents |
| `/contacto` | Office / reception |
| `/blog` | Desk / reading / writing |

Title and optional subtitle passed as props; image sourced from `media.pageHeroes[page]`.

---

## 7. Performance & Accessibility

### 7.1 Reduced motion

When `prefers-reduced-motion: reduce`:
- Disable Ken Burns loops
- Disable parallax (all layers static)
- Disable particles and 3D tilt
- Keep simple opacity fade-in (0.5s) for content

Implemented via `useReducedMotion()` hook; all cinematic components check before initializing GSAP timelines.

### 7.2 Performance budget

- Particles and 3D tilt: desktop only (`window.innerWidth >= 1024`)
- `will-change: transform` applied only during active animation; removed on complete
- Hero images: `next/image` with `priority` and `sizes` optimized
- `ScrollTrigger.kill()` and timeline cleanup in `useEffect` return on all GSAP components
- Target: Lighthouse Performance ≥ 80 on mobile

### 7.3 Lenis + ScrollTrigger integration

```ts
// gsap-setup.ts pattern
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

ScrollTrigger `scroller` proxy configured if needed for Lenis compatibility.

---

## 8. Out of Scope (Phase 1)

- Page transitions between routes
- Pinned / horizontal scroll sections
- Video backgrounds (MediaSlot API reserved for phase 2)
- Cinematic treatment on blog post cards or footer
- Replacing all section body images (only heroes + reveal upgrades)
- CMS integration for media management

---

## 9. Success Criteria

1. Home hero feels alive: visible Ken Burns, parallax on scroll, grain overlay, portrait reacts to mouse (desktop).
2. All home sections animate on scroll with distinct, polished reveals (not identical fade-up).
3. Internal pages have compact cinematic heroes consistent with home visual language.
4. Swapping an image URL in `lib/media.ts` updates the correct hero without code changes.
5. Site remains usable with `prefers-reduced-motion: reduce` (no jarring motion).
6. No ScrollTrigger memory leaks on client-side navigation between pages.
7. `npm run build` passes without errors.

---

## 10. Testing Checklist

- [ ] Home hero: load animation plays correctly
- [ ] Home hero: scroll parallax on background and portrait
- [ ] Home hero: mouse tilt on portrait (desktop)
- [ ] Home hero: particles visible desktop, hidden mobile
- [ ] Each home section reveals on scroll
- [ ] Internal heroes on all 4 routes render with correct stock
- [ ] Reduced motion: animations degrade gracefully
- [ ] Navigate home → nosotros → servicios → contacto → blog: no console errors, no scroll jank
- [ ] Lighthouse mobile performance ≥ 80
- [ ] Change URL in `lib/media.ts` → hero image updates
