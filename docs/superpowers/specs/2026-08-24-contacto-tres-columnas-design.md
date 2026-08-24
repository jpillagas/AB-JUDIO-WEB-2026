# Contacto — Tres columnas (citas, sucursales, mapa)

**Project:** El Abogado Judío / Neuhauser Law (`New-Web-2026`)  
**Date:** 2026-08-24  
**Status:** Approved (design); pending user review of this spec

---

## 1. Problem

La página `/contacto` hoy separa “Agenda tu cita” (dropdown a un solo calendario) y un mapa iframe estático. `site.offices` está vacío. El cliente pide un bloque único de **tres columnas**: agendar por área (calendarios Se Digital), lista de sucursales, y mapa con pines que se centra/zoom al hacer clic en una sucursal.

---

## 2. Decisions

| Topic | Decision |
|-------|----------|
| Layout | Una sección de 3 columnas (desktop); apilado en mobile |
| Calendarios | Un link Se Digital por área; **placeholders** hasta que lleguen las URLs |
| Apertura de citas | **Nueva pestaña** |
| Etiqueta de sucursal | **Ciudad/barrio** (Glendale, Jackson Heights, Newark, East Haven, Stratford, Danbury) + dirección debajo |
| Mapa | **Leaflet + OpenStreetMap** (sin API key) |
| Clic en sucursal | Selecciona ítem + `flyTo` / zoom ~15 en el mapa |
| Teléfono, email, horarios, WhatsApp | **Franja compacta debajo** de las 3 columnas |
| FAQ | Sin cambios |
| Approach | **Un bloque cliente único** que reemplaza `ContactBlock` + `ContactMap` |

---

## 3. Layout

### Desktop (`lg+`)

Grid 12 columnas, altura de trabajo ~480–560px:

- Col 1 (~3/12): Agenda tu cita — 3 CTAs
- Col 2 (~3/12): Lista de sucursales (scroll si hace falta)
- Col 3 (~6/12): Mapa Leaflet a altura completa de la fila

Identidad visual: ink / gold / bone. Columna 1 puede usar panel ink (como el recuadro actual de “Agenda tu cita”). Lista con estado activo (borde o acento gold). Mapa con filtro grayscale/contrast para alinearlo al sitio.

### Mobile / tablet

Orden: servicios → sucursales → mapa. El clic en la lista sigue centrando el mapa (visible al hacer scroll o el mapa permanece debajo).

---

## 4. Column 1 — Services / booking

Three items, labels:

1. Inmigración  
2. Personal Injury  
3. Real Estate  

Each is an `<a target="_blank" rel="noopener noreferrer">` to `site.bookingAreas[].href`.

Until Se Digital URLs arrive, keep the existing placeholder (`https://elabogadojudio.com/citas/` or empty-safe same URL). Copy nearby should not say “mismo calendario”; it should say each area opens its booking calendar.

Do not embed Se Digital iframes or modals.

---

## 5. Column 2 — Offices

Data in `lib/site.ts` (`site.offices`):

| id | name | address |
|----|------|---------|
| glendale | Glendale | 64-25 Central Ave, Glendale, Queens, NY 11385 |
| jackson-heights | Jackson Heights | 90-20 Elmhurst Ave, Jackson Heights, Queens, NY 11372 |
| newark | Newark | 110 Congress St, Newark, NJ 07105 |
| east-haven | East Haven | 310 Main St, East Haven, CT 06512 |
| stratford | Stratford | 919 Stratford Ave Unit 3, Stratford, CT 06615 |
| danbury | Danbury | 3 West St, Danbury, CT 06810 |

Also store `lat` and `lng` (geocode once at implementation; hardcode in config, no runtime geocoding).

UI: clickable rows. Selected row is visually distinct. Click sets `selectedOfficeId`.

---

## 6. Column 3 — Map

- Client-only Leaflet map (dynamic import / `"use client"`).
- OSM tile layer.
- One marker per office.
- Initial view: `fitBounds` of all six points.
- On `selectedOfficeId` change: `flyTo([lat, lng], 15)` (or equivalent).
- Clicking a marker also selects the matching list item.
- Accessibility: map has a title; list is the primary keyboard path.

---

## 7. Below the grid

Compact strip (not a second competing hero):

- Phone (`site.phoneDisplay` / `tel:`)
- Email
- Hours (`site.hours`)
- WhatsApp (same number as rest of site)

Then existing `ContactFAQ`. Page hero (`CinematicPageHero`) stays.

---

## 8. Architecture

### Replace

- `components/sections/ContactBlock.tsx` — current form-replacement + sidebar
- `components/sections/ContactMap.tsx` — iframe + empty offices list

### New / primary

- `components/sections/ContactHub.tsx` (client) — 3 columns + selected office state + Leaflet map
- Optional small `ContactMapView.tsx` if map lifecycle is cleaner isolated (still owned by ContactHub)

### Config

- `lib/site.ts`: populate `offices` with id, name, address, lat, lng
- `lib/site.ts`: keep `bookingAreas` with three labels; href placeholders until real Se Digital URLs

### Page

`app/contacto/page.tsx`: Hero → ContactHub → ContactFAQ. Remove separate ContactBlock + ContactMap.

### Dependencies

Add `leaflet` + types (and React wrapper if used, e.g. `react-leaflet`). CSS for Leaflet markers imported in the client map module. No Google Maps API key.

---

## 9. Out of scope

- Real Se Digital URLs (swap in `site.bookingAreas` later)
- Embedding Se Digital widgets
- Changing FAQ, header submenu, or home stats
- Directions/routing UI beyond opening the selected pin

---

## 10. Success criteria

- [ ] Desktop shows three columns: booking, offices, map
- [ ] Each service opens a calendar URL in a new tab
- [ ] Six offices listed by neighborhood name + address
- [ ] Clicking an office selects it and zooms the map to that pin
- [ ] Clicking a pin selects the matching office in the list
- [ ] Phone, email, hours, WhatsApp appear below the grid
- [ ] FAQ remains
- [ ] Works without a Google API key
