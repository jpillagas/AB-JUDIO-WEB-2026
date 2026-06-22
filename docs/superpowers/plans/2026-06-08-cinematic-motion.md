# Cinematic Motion & Hero Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the home page and internal page heroes into a cinematic experience with GSAP scroll reveals, multi-layer hero (Ken Burns, parallax, grain, particles, 3D portrait tilt), and swappable stock media via `lib/media.ts`.

**Architecture:** GSAP ScrollTrigger handles all scroll-linked choreography synced with existing Lenis smooth scroll. Framer Motion handles mouse-driven 3D tilt and retains existing UI animations (header, FAQ). New `components/cinematic/` primitives compose the hero layers; `lib/media.ts` centralizes image URLs for future swap.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, GSAP 3 + ScrollTrigger, Framer Motion 11, Lenis 1.1

**Spec reference:** `docs/superpowers/specs/2026-06-08-cinematic-motion-design.md`

---

## File Map

| File | Responsibility |
|------|----------------|
| `lib/media.ts` | Stock URLs keyed by hero/page |
| `lib/animations/useReducedMotion.ts` | `prefers-reduced-motion` hook |
| `lib/animations/gsap-setup.ts` | ScrollTrigger + Lenis sync, cleanup helper |
| `lib/animations/scroll-reveal.ts` | GSAP factory for reveal variants |
| `components/cinematic/FilmGrain.tsx` | CSS grain overlay |
| `components/cinematic/ParallaxLayer.tsx` | Scroll parallax wrapper |
| `components/cinematic/ParticleField.tsx` | Desktop-only particles |
| `components/cinematic/MediaSlot.tsx` | next/image wrapper with video-ready API |
| `components/cinematic/CinematicHero.tsx` | Full home hero |
| `components/cinematic/CinematicPageHero.tsx` | Compact internal hero |
| `components/GsapInit.tsx` | Client init mounted in layout |
| `components/sections/HomeHero.tsx` | Re-export or thin wrapper → CinematicHero |
| `components/sections/HomeStats.tsx` | GSAP stagger reveal |
| `components/sections/HomeWhyUs.tsx` | Mask reveal + parallax |
| `components/sections/HomeServices.tsx` | Stagger cards |
| `components/sections/HomeTestimonials.tsx` | Parallax image |
| `components/sections/HomeCTA.tsx` | Ken Burns background |
| `app/globals.css` | Reveal variants, reduced-motion, gold-pulse |
| `tailwind.config.ts` | `gold-pulse` keyframe |
| `app/layout.tsx` | Mount `GsapInit` |
| `app/nosotros/page.tsx` | CinematicPageHero |
| `app/servicios/page.tsx` | CinematicPageHero |
| `app/contacto/page.tsx` | CinematicPageHero |
| `app/blog/page.tsx` | CinematicPageHero |

---

### Task 1: Media registry and reduced-motion hook

**Files:**
- Create: `lib/media.ts`
- Create: `lib/animations/useReducedMotion.ts`

- [ ] **Step 1: Create `lib/media.ts`**

```ts
// lib/media.ts
export const media = {
  hero: {
    background:
      "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=2400&q=80",
    portrait:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80",
  },
  pageHeroes: {
    nosotros:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80",
    servicios:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2400&q=80",
    contacto:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80",
    blog:
      "https://images.unsplash.com/photo-1455390572262-044cdead277a?auto=format&fit=crop&w=2400&q=80",
  },
  sections: {
    whyUs:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80",
    testimonials:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80",
    cta:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=2000&q=80",
  },
} as const;

export type PageHeroKey = keyof typeof media.pageHeroes;
```

- [ ] **Step 2: Create `lib/animations/useReducedMotion.ts`**

```ts
"use client";

import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS (no errors)

- [ ] **Step 4: Commit**

```bash
git add lib/media.ts lib/animations/useReducedMotion.ts
git commit -m "feat: add media registry and reduced-motion hook"
```

---

### Task 2: GSAP setup with Lenis sync

**Files:**
- Create: `lib/animations/gsap-setup.ts`
- Create: `components/GsapInit.tsx`
- Modify: `app/layout.tsx`
- Modify: `components/SmoothScroll.tsx`

- [ ] **Step 1: Create `lib/animations/gsap-setup.ts`**

```ts
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap(): typeof ScrollTrigger {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return ScrollTrigger;
}

/** Call from SmoothScroll after Lenis instance is created */
export function bindLenisToScrollTrigger(
  lenis: { on: (event: string, cb: () => void) => void; raf: (time: number) => void }
): () => void {
  const ScrollTrigger = registerGsap();

  const onScroll = () => ScrollTrigger.update();
  lenis.on("scroll", onScroll);

  const ticker = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);

  return () => {
    lenis.on("scroll", () => {}); // lenis v1 has no off(); destroy handles cleanup
    gsap.ticker.remove(ticker);
  };
}

export function killAllScrollTriggers(): void {
  if (typeof window === "undefined") return;
  registerGsap().getAll().forEach((t) => t.kill());
}

export { gsap, ScrollTrigger };
```

- [ ] **Step 2: Update `components/SmoothScroll.tsx`** — bind Lenis to GSAP after init

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { bindLenisToScrollTrigger } from "@/lib/animations/gsap-setup";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    const unbindGsap = bindLenisToScrollTrigger(lenis);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      unbindGsap();
      lenis.destroy();
    };
  }, []);

  return null;
}
```

- [ ] **Step 3: Create `components/GsapInit.tsx`** — refresh ScrollTrigger on route change

```tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { registerGsap, killAllScrollTriggers } from "@/lib/animations/gsap-setup";

export default function GsapInit() {
  const pathname = usePathname();

  useEffect(() => {
    registerGsap();
  }, []);

  useEffect(() => {
    const ScrollTrigger = registerGsap();
    // Kill stale triggers from previous page, then refresh
    killAllScrollTriggers();
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
```

- [ ] **Step 4: Add `GsapInit` to `app/layout.tsx`** inside `<body>`, after `<SmoothScroll />`:

```tsx
import GsapInit from "@/components/GsapInit";
// ...
<SmoothScroll />
<GsapInit />
<RevealOnScroll />
```

- [ ] **Step 5: Verify**

Run: `npm run dev` → open `http://localhost:3000` → no console errors about GSAP.

- [ ] **Step 6: Commit**

```bash
git add lib/animations/gsap-setup.ts components/GsapInit.tsx components/SmoothScroll.tsx app/layout.tsx
git commit -m "feat: sync GSAP ScrollTrigger with Lenis smooth scroll"
```

---

### Task 3: Scroll reveal factory

**Files:**
- Create: `lib/animations/scroll-reveal.ts`

- [ ] **Step 1: Create `lib/animations/scroll-reveal.ts`**

```ts
"use client";

import { gsap, registerGsap } from "@/lib/animations/gsap-setup";

export type RevealVariant = "fade" | "scale" | "mask" | "stagger";

interface RevealOptions {
  variant?: RevealVariant;
  delay?: number;
  stagger?: number;
  start?: string;
  reducedMotion?: boolean;
}

export function animateReveal(
  el: HTMLElement,
  options: RevealOptions = {}
): gsap.core.Tween | gsap.core.Timeline {
  const {
    variant = "fade",
    delay = 0,
    stagger = 0.1,
    start = "top 85%",
    reducedMotion = false,
  } = options;

  registerGsap();

  if (reducedMotion) {
    return gsap.to(el, { opacity: 1, duration: 0.5, delay });
  }

  const children =
    variant === "stagger"
      ? (Array.from(el.children) as HTMLElement[])
      : [];

  const tweenConfig = {
    scrollTrigger: {
      trigger: el,
      start,
      toggleActions: "play none none none",
    },
    delay,
  };

  switch (variant) {
    case "scale":
      gsap.set(el, { opacity: 0, scale: 0.92 });
      return gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        ...tweenConfig,
      });
    case "mask":
      gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
      return gsap.to(el, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
        ease: "power3.inOut",
        ...tweenConfig,
      });
    case "stagger":
      gsap.set(children, { opacity: 0, y: 40 });
      return gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger,
        ease: "power3.out",
        ...tweenConfig,
      });
    case "fade":
    default:
      gsap.set(el, { opacity: 0, y: 40 });
      return gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        ...tweenConfig,
      });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/animations/scroll-reveal.ts
git commit -m "feat: add GSAP scroll reveal animation factory"
```

---

### Task 4: Cinematic primitives (FilmGrain, ParallaxLayer, MediaSlot, ParticleField)

**Files:**
- Create: `components/cinematic/FilmGrain.tsx`
- Create: `components/cinematic/ParallaxLayer.tsx`
- Create: `components/cinematic/MediaSlot.tsx`
- Create: `components/cinematic/ParticleField.tsx`

- [ ] **Step 1: Create `components/cinematic/FilmGrain.tsx`**

```tsx
export default function FilmGrain({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        animation: "grain-shift 8s steps(6) infinite",
      }}
    />
  );
}
```

- [ ] **Step 2: Add grain keyframe to `app/globals.css`** (inside file, after `.marquee-track`):

```css
@keyframes grain-shift {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-2%, -3%); }
  50% { transform: translate(3%, 2%); }
  75% { transform: translate(-1%, 4%); }
}
```

- [ ] **Step 3: Create `components/cinematic/ParallaxLayer.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/animations/gsap-setup";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";

interface Props {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxLayer({ children, speed = 0.3, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const el = ref.current;
    registerGsap();
    const tween = gsap.to(el, {
      y: () => speed * 120,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed, reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Create `components/cinematic/MediaSlot.tsx`**

```tsx
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  fill?: boolean;
}

export default function MediaSlot({
  src,
  alt,
  priority = false,
  className = "",
  fill = true,
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes="(max-width: 1024px) 100vw, 50vw"
      className={`object-cover ${className}`}
    />
  );
}
```

- [ ] **Step 5: Create `components/cinematic/ParticleField.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";

export default function ParticleField() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(window.innerWidth >= 1024 && !reduced);
  }, [reduced]);

  if (!show) return null;

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53) % 100}%`,
    size: 2 + (i % 3),
    delay: (i % 10) * 0.8,
    duration: 12 + (i % 8),
  }));

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-gold/40"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 6: Add particle keyframe to `app/globals.css`**

```css
@keyframes float-particle {
  0%, 100% { transform: translate(0, 0); opacity: 0.3; }
  50% { transform: translate(20px, -30px); opacity: 0.8; }
}
```

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add components/cinematic/ app/globals.css
git commit -m "feat: add cinematic primitives (grain, parallax, particles, media slot)"
```

---

### Task 5: CinematicHero (home)

**Files:**
- Create: `components/cinematic/CinematicHero.tsx`
- Modify: `components/sections/HomeHero.tsx`

- [ ] **Step 1: Create `components/cinematic/CinematicHero.tsx`**

Build the full hero with:
- Layer stack: background `MediaSlot` inside `ParallaxLayer` (speed 0.3)
- Ken Burns: `gsap.to(bgRef, { scale: 1.08, duration: 20, repeat: -1, yoyo: true, ease: "none" })` — skip if reduced motion
- Gradient overlay + `FilmGrain` + light leak div (animated `bg-gradient-to-r from-gold/10 to-transparent` with CSS animation `light-leak 14s ease-in-out infinite`)
- `ParticleField`
- Text column: Framer Motion stagger for h1 lines, p, CTAs (reuse existing copy from `HomeHero.tsx` and `site` from `lib/site.ts`)
- Portrait column: `motion.div` with `useMotionValue` + `useTransform` for rotateX/Y (max 8°), `ParallaxLayer` speed 0.15, clip-path reveal on mount via Framer `initial={{ clipPath: "inset(0 100% 0 0)" }}` → `animate={{ clipPath: "inset(0 0% 0 0)" }}`
- Gold corner accents (copy from current `HomeHero.tsx` lines 118-119)
- Section: `min-h-[90vh]`, `relative overflow-hidden bg-ink text-white`
- Import images from `media.hero.background` and `media.hero.portrait`

Add to `app/globals.css`:

```css
@keyframes light-leak {
  0%, 100% { transform: translateX(-20%) rotate(-5deg); opacity: 0.08; }
  50% { transform: translateX(30%) rotate(5deg); opacity: 0.14; }
}
```

- [ ] **Step 2: Replace `components/sections/HomeHero.tsx` body** with re-export:

```tsx
export { default } from "@/components/cinematic/CinematicHero";
```

- [ ] **Step 3: Manual verify**

Run: `npm run dev`
Open: `http://localhost:3000`
Check:
- Background slowly zooms (Ken Burns)
- Scroll moves background and portrait at different speeds
- Grain visible
- Particles on desktop (≥1024px)
- Portrait tilts on mouse move (desktop)
- Text staggers in on load

- [ ] **Step 4: Commit**

```bash
git add components/cinematic/CinematicHero.tsx components/sections/HomeHero.tsx app/globals.css
git commit -m "feat: cinematic multi-layer home hero with Ken Burns and 3D portrait"
```

---

### Task 6: CinematicPageHero (internal pages)

**Files:**
- Create: `components/cinematic/CinematicPageHero.tsx`
- Modify: `app/nosotros/page.tsx`
- Modify: `app/servicios/page.tsx`
- Modify: `app/contacto/page.tsx`
- Modify: `app/blog/page.tsx`

- [ ] **Step 1: Create `components/cinematic/CinematicPageHero.tsx`**

Props:
```ts
interface Props {
  title: string;
  subtitle?: string;
  pageKey: PageHeroKey; // from lib/media.ts
}
```

Implementation:
- Height: `h-[45vh] min-h-[300px]`
- Layers: `MediaSlot` (src from `media.pageHeroes[pageKey]`) + Ken Burns scale 1.0→1.05 + gradient `from-ink/70 via-ink/60 to-ink/85` + `FilmGrain`
- `ParallaxLayer` speed 0.15 on background image wrapper
- Title: Framer fade+slide up; subtitle optional with delay 0.2s
- No particles, no 3D tilt

- [ ] **Step 2: Update `app/nosotros/page.tsx`**

```tsx
import CinematicPageHero from "@/components/cinematic/CinematicPageHero";
// Remove PageHero import
// ...
<CinematicPageHero
  title="Nosotros"
  subtitle="Una firma legal comprometida con la comunidad hispana en NY, NJ y CT."
  pageKey="nosotros"
/>
```

- [ ] **Step 3: Update `app/servicios/page.tsx`**

```tsx
<CinematicPageHero
  title="Servicios"
  subtitle="Inmigración, lesiones personales y bienes raíces."
  pageKey="servicios"
/>
```

- [ ] **Step 4: Update `app/contacto/page.tsx`** — read file first, replace `PageHero` with:

```tsx
<CinematicPageHero
  title="Contacto"
  subtitle="Agenda tu consulta gratuita hoy."
  pageKey="contacto"
/>
```

- [ ] **Step 5: Update `app/blog/page.tsx`**

```tsx
<CinematicPageHero
  title="Blog"
  subtitle="Guías y noticias sobre inmigración y derecho."
  pageKey="blog"
/>
```

- [ ] **Step 6: Verify all 4 routes** — no layout shift, hero animates on load.

- [ ] **Step 7: Commit**

```bash
git add components/cinematic/CinematicPageHero.tsx app/nosotros/page.tsx app/servicios/page.tsx app/contacto/page.tsx app/blog/page.tsx
git commit -m "feat: compact cinematic heroes on internal pages"
```

---

### Task 7: Upgrade home sections with GSAP reveals

**Files:**
- Modify: `components/sections/HomeStats.tsx`
- Modify: `components/sections/HomeWhyUs.tsx`
- Modify: `components/sections/HomeServices.tsx`
- Modify: `components/sections/HomeTestimonials.tsx`
- Modify: `components/sections/HomeCTA.tsx`

Each section becomes `"use client"` and uses `useEffect` + `useRef` + `animateReveal` from `lib/animations/scroll-reveal.ts` + `useReducedMotion`.

- [ ] **Step 1: `HomeStats.tsx`** — convert to client component

```tsx
"use client";
// Add sectionRef on container
// data-reveal-variant="stagger" on grid
// On mount: animateReveal(gridEl, { variant: "stagger", stagger: 0.15, reducedMotion })
// Add decorative gold line under stats: ref lineRef, animate scaleX 0→1 with ScrollTrigger scrub
// Remove class "reveal" (GSAP handles it)
```

- [ ] **Step 2: `HomeWhyUs.tsx`**

- Image wrapper: `ref={imageRef}`, `animateReveal(imageRef, { variant: "mask" })`
- Text column: `animateReveal(textRef, { variant: "fade", delay: 0.2 })`
- Wrap image in `ParallaxLayer speed={0.2}`
- Use `media.sections.whyUs` for image src via `MediaSlot` or next/image

- [ ] **Step 3: `HomeServices.tsx`**

- Cards container: `animateReveal(cardsRef, { variant: "stagger", stagger: 0.1 })`
- Add hover classes: `transition-transform duration-300 hover:-translate-y-1 hover:ring-1 hover:ring-gold/50`

- [ ] **Step 4: `HomeTestimonials.tsx`**

- Side image: wrap in `ParallaxLayer speed={0.25}`
- Use `media.sections.testimonials`
- Text block: `animateReveal(textRef, { variant: "fade" })`

- [ ] **Step 5: `HomeCTA.tsx`** — convert to client

- Background image ref with Ken Burns loop (scale 1→1.06, 25s, yoyo) unless reduced motion
- Use `media.sections.cta`
- Content: `animateReveal(contentRef, { variant: "fade" })`
- Add `animate-gold-pulse` class to primary CTA button

- [ ] **Step 6: Add `gold-pulse` to `tailwind.config.ts`**

```ts
animation: {
  // existing...
  "gold-pulse": "goldPulse 3s ease-in-out infinite",
},
keyframes: {
  // existing...
  goldPulse: {
    "0%, 100%": { boxShadow: "0 0 0 0 rgba(201,168,106,0)" },
    "50%": { boxShadow: "0 0 0 6px rgba(201,168,106,0.25)" },
  },
},
```

- [ ] **Step 7: Scroll home top to bottom** — each section animates once on entry.

- [ ] **Step 8: Commit**

```bash
git add components/sections/HomeStats.tsx components/sections/HomeWhyUs.tsx components/sections/HomeServices.tsx components/sections/HomeTestimonials.tsx components/sections/HomeCTA.tsx tailwind.config.ts
git commit -m "feat: GSAP scroll reveals and parallax on home sections"
```

---

### Task 8: Reduced-motion overrides and cleanup

**Files:**
- Modify: `app/globals.css`
- Modify: `components/PageHero.tsx` (deprecate — add comment pointing to CinematicPageHero)

- [ ] **Step 1: Add to `app/globals.css`**

```css
@media (prefers-reduced-motion: reduce) {
  .marquee-track,
  [style*="grain-shift"],
  [style*="float-particle"],
  [style*="light-leak"] {
    animation: none !important;
  }
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 2: Add deprecation comment atop `components/PageHero.tsx`**

```ts
/** @deprecated Use CinematicPageHero instead */
```

- [ ] **Step 3: Enable `images.remotePatterns` in `next.config.mjs`** if build fails on Unsplash domains — verify domains already listed.

- [ ] **Step 4: Full verification**

Run:
```bash
npm run build
npm run lint
```

Manual checklist (spec §10):
- [ ] Home hero load + scroll + tilt
- [ ] All home sections reveal
- [ ] 4 internal heroes render
- [ ] Navigate between pages — no console errors
- [ ] Enable reduced motion in OS → animations degrade to fade only

- [ ] **Step 5: Commit**

```bash
git add app/globals.css components/PageHero.tsx
git commit -m "chore: reduced-motion overrides and PageHero deprecation"
```

---

## Spec Coverage Check

| Spec requirement | Task |
|------------------|------|
| GSAP + Lenis sync | Task 2 |
| `lib/media.ts` swappable URLs | Task 1 |
| Home hero multi-layer | Task 5 |
| Internal compact heroes | Task 6 |
| Home section reveals | Task 7 |
| Reduced motion | Tasks 1, 4, 8 |
| ScrollTrigger cleanup on route change | Task 2 (GsapInit) |
| Performance (desktop-only particles/tilt) | Tasks 4, 5 |
| Out of scope items excluded | Not in plan |

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-06-08-cinematic-motion.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — Fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** — Implement all tasks in this session with checkpoints for review

**Which approach do you prefer?**
