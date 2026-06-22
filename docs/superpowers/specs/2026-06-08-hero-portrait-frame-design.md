# Hero Portrait Frame — Editorial Asymmetric Cut

**Project:** El Abogado Judio / Neuhauser Law (`New-Web-2026`)  
**Date:** 2026-06-08  
**Status:** Approved

---

## 1. Problem

The hero portrait uses a symmetric oval frame that feels soft and generic. It does not align with the site's editorial/cinematic identity (ink + gold, angular accents, corner L-brackets used previously).

---

## 2. Decision

Replace the oval frame with an **editorial asymmetric cut** (Option A), moderate asymmetry.

| Topic | Decision |
|-------|----------|
| Shape | Vertical rectangle with **bottom-right diagonal cut** |
| Border | Thin gold border following the same clip-path |
| Accent | **L-bracket** top-left (original site pattern), offset outside frame |
| Motion | Portrait remains **static** (no tilt, parallax, or mouse interaction) |
| Decor | Remove oval halo, outer rings, and floating circles |
| Depth | Drop shadow + short horizontal gold line below frame |

---

## 3. Visual Spec

### Clip-path polygon (desktop reference)

Cut ~52px on bottom-right corner of a portrait container (`aspect-[4/5]`):

```
polygon(
  0% 0%,
  100% 0%,
  100% calc(100% - 52px),
  calc(100% - 52px) 100%,
  0% 100%
)
```

Mobile: ~36px cut. Scale proportionally via CSS custom property or Tailwind arbitrary values.

### Layers (inside-out)

1. L-bracket decoration (top-left, absolute, gold 2px borders)
2. Gold border wrapper (clip-path + padding 2px, gradient optional: solid gold)
3. Image container (same clip-path, overflow hidden)
4. Inner vignette gradient (bottom, ink/40 → transparent)
5. Shadow on outer wrapper
6. Gold accent line below (centered, gradient fade)

---

## 4. Architecture

### New file

```
components/cinematic/PortraitFrame.tsx
```

Props:
- `src: string`
- `alt: string`
- `priority?: boolean`
- `className?: string` (optional outer wrapper)

Uses existing `MediaSlot` for image abstraction.

### Modified file

```
components/cinematic/CinematicHero.tsx  — replace inline oval markup with <PortraitFrame />
```

### CSS

Optional utility in `globals.css`:

```css
.clip-portrait-editorial { clip-path: polygon(...); }
```

Or inline Tailwind `[clip-path:polygon(...)]` on the component.

---

## 5. Responsive

- Same shape at all breakpoints; cut size scales down on mobile (`--cut: 36px` → `52px` at `sm+`).
- Portrait max-width unchanged (`max-w-md`).

---

## 6. Accessibility

- Decorative elements: `aria-hidden`
- Image: meaningful `alt` (unchanged)
- No motion added; `prefers-reduced-motion` unaffected

---

## 7. Success Criteria

- [ ] No oval/circular shape visible
- [ ] Bottom-right diagonal cut clearly visible at first glance
- [ ] Gold L-bracket top-left present
- [ ] Portrait static on mouse move
- [ ] Coherent with ink/gold cinematic hero

---

## 8. Out of Scope

- Reuse on internal page heroes (future)
- Animation on frame
- SVG custom border shapes beyond clip-path
