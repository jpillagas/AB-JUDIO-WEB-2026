# Contacto Tres Columnas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el bloque de contacto actual por una sección de tres columnas: calendarios Se Digital por área, lista de sucursales y mapa Leaflet que hace zoom al seleccionar una oficina.

**Architecture:** Un componente cliente `ContactHub` posee el estado `selectedOfficeId` y renderiza las tres columnas más la franja de contacto. El mapa vive en `ContactOfficesMap`, importado con `next/dynamic` y `ssr: false` para no romper el bundle de Next. Oficinas y URLs de booking viven en `lib/site.ts`.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind, Leaflet 1.9 + react-leaflet 4, Lucide, Framer Motion (opcional, solo si ya encaja).

## Global Constraints

- Calendarios: tres links en `site.bookingAreas`; placeholders `https://elabogadojudio.com/citas/` hasta Se Digital; abrir en `target="_blank" rel="noopener noreferrer"`.
- No iframes ni modales de Se Digital.
- Copy de citas: cada área abre su calendario (nunca “mismo calendario”).
- Sucursales: nombre = ciudad/barrio; dirección debajo; `lat`/`lng` hardcodeados (sin geocode en runtime).
- Mapa: Leaflet + OSM; sin Google API key; `fitBounds` inicial; `flyTo(..., 15)` al seleccionar.
- Clic en pin selecciona la misma oficina en la lista.
- Teléfono, email, horarios, WhatsApp debajo del grid; FAQ y `CinematicPageHero` sin cambios.
- Visual: ink / gold / bone; mapa con filtro grayscale/contrast.
- Desktop `lg+`: col 3/12 + 3/12 + 6/12, altura de fila ~520px. Mobile: servicios → sucursales → mapa.

---

## File map

| File | Role |
|------|------|
| `lib/site.ts` | Tipo `Office`, array `offices` con 6 sucursales + coords; `bookingAreas` placeholders |
| `components/sections/ContactOfficesMap.tsx` | Mapa Leaflet: pines, fitBounds, flyTo, clic en marker |
| `components/sections/ContactHub.tsx` | Layout 3 columnas + lista + booking + franja de contacto |
| `app/contacto/page.tsx` | Hero → ContactHub → ContactFAQ |
| `app/globals.css` | Import CSS Leaflet (o import en el mapa) + tweaks de marker |
| `package.json` | `leaflet`, `react-leaflet`, `@types/leaflet` |
| Delete after swap | `ContactBlock.tsx`, `ContactMap.tsx` si nadie más los importa |

---

### Task 1: Datos de oficinas y booking

**Files:**
- Modify: `lib/site.ts`

**Interfaces:**
- Consumes: objeto `site` existente
- Produces: `export type Office = { id: string; name: string; address: string; lat: number; lng: number }`; `site.offices: Office[]`; `site.bookingAreas` sin cambio de shape

- [ ] **Step 1: Reemplazar el tipo y el array `offices` vacío**

En `lib/site.ts`, quitar el comentario “se actualizará cuando el cliente envíe direcciones” y el array vacío. Añadir el tipo y las 6 oficinas (coordenadas Nominatim/OSM, suficientes para pines):

```ts
export type Office = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

// dentro de `site`:
offices: [
  {
    id: "glendale",
    name: "Glendale",
    address: "64-25 Central Ave, Glendale, Queens, NY 11385",
    lat: 40.7048,
    lng: -73.8819,
  },
  {
    id: "jackson-heights",
    name: "Jackson Heights",
    address: "90-20 Elmhurst Ave, Jackson Heights, Queens, NY 11372",
    lat: 40.7483,
    lng: -73.8790,
  },
  {
    id: "newark",
    name: "Newark",
    address: "110 Congress St, Newark, NJ 07105",
    lat: 40.7264,
    lng: -74.1565,
  },
  {
    id: "east-haven",
    name: "East Haven",
    address: "310 Main St, East Haven, CT 06512",
    lat: 41.2765,
    lng: -72.8682,
  },
  {
    id: "stratford",
    name: "Stratford",
    address: "919 Stratford Ave Unit 3, Stratford, CT 06615",
    lat: 41.1848,
    lng: -73.1330,
  },
  {
    id: "danbury",
    name: "Danbury",
    address: "3 West St, Danbury, CT 06810",
    lat: 41.3948,
    lng: -73.4540,
  },
] satisfies Office[],
```

Dejar `bookingAreas` con las tres etiquetas y `href: "https://elabogadojudio.com/citas/"` (placeholder).

- [ ] **Step 2: Verificar TypeScript**

Run: `npx tsc --noEmit`  
Expected: PASS. Si `ContactMap` o `ContactBlock` usan `mapQuery`, se arreglan en Task 4 al eliminarlos; si `tsc` falla ahora por `mapQuery`, quitar ese campo de cualquier leftover.

- [ ] **Step 3: Commit**

```bash
git add lib/site.ts
git commit -m "feat: sucursales con coordenadas para el mapa de contacto"
```

---

### Task 2: Dependencias Leaflet

**Files:**
- Modify: `package.json`, `package-lock.json`
- Modify: `types/lucide-react.d.ts` only if se añaden iconos nuevos (no obligatorio aquí)

**Interfaces:**
- Consumes: Next 14 / React 18
- Produces: paquetes `leaflet@^1.9.4`, `react-leaflet@^4.2.1`, `@types/leaflet`

- [ ] **Step 1: Instalar**

```bash
npm install leaflet react-leaflet
npm install -D @types/leaflet
```

Expected: `leaflet` y `react-leaflet` en `dependencies`.

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: añadir Leaflet y react-leaflet para el mapa de sucursales"
```

---

### Task 3: Mapa Leaflet (`ContactOfficesMap`)

**Files:**
- Create: `components/sections/ContactOfficesMap.tsx`
- Modify: `app/globals.css` (import Leaflet CSS al final del archivo, una sola vez)

**Interfaces:**
- Consumes: `Office` from `@/lib/site`
- Produces: `export default function ContactOfficesMap(props: { offices: Office[]; selectedId: string | null; onSelect: (id: string) => void })`

- [ ] **Step 1: Añadir CSS de Leaflet**

Al final de `app/globals.css`:

```css
@import "leaflet/dist/leaflet.css";

.contact-map.leaflet-container {
  height: 100%;
  width: 100%;
  background: #1a1a1a;
  filter: grayscale(0.85) contrast(1.08);
}

.contact-map .leaflet-control-attribution {
  font-size: 10px;
}
```

- [ ] **Step 2: Crear el mapa cliente**

`components/sections/ContactOfficesMap.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { Office } from "@/lib/site";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function MapSync({
  offices,
  selectedId,
}: {
  offices: Office[];
  selectedId: string | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!offices.length) return;
    const bounds = L.latLngBounds(offices.map((o) => [o.lat, o.lng]));
    map.fitBounds(bounds, { padding: [28, 28], maxZoom: 11 });
  }, [map, offices]);

  useEffect(() => {
    const office = offices.find((o) => o.id === selectedId);
    if (!office) return;
    map.flyTo([office.lat, office.lng], 15, { duration: 0.7 });
  }, [map, offices, selectedId]);

  return null;
}

export default function ContactOfficesMap({
  offices,
  selectedId,
  onSelect,
}: {
  offices: Office[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const center: [number, number] = [41.0, -73.6];

  return (
    <MapContainer
      center={center}
      zoom={7}
      className="contact-map h-full w-full"
      scrollWheelZoom
      aria-label="Mapa de sucursales El Abogado Judío"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapSync offices={offices} selectedId={selectedId} />
      {offices.map((office) => (
        <Marker
          key={office.id}
          position={[office.lat, office.lng]}
          icon={icon}
          eventHandlers={{ click: () => onSelect(office.id) }}
        >
          <Popup>
            <strong>{office.name}</strong>
            <br />
            {office.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
```

No importar este archivo desde un Server Component sin `dynamic(..., { ssr: false })`.

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`  
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css components/sections/ContactOfficesMap.tsx
git commit -m "feat: mapa Leaflet de sucursales con flyTo al seleccionar"
```

---

### Task 4: `ContactHub` y cablear `/contacto`

**Files:**
- Create: `components/sections/ContactHub.tsx`
- Modify: `app/contacto/page.tsx`
- Delete: `components/sections/ContactBlock.tsx`
- Delete: `components/sections/ContactMap.tsx`

**Interfaces:**
- Consumes: `site.offices`, `site.bookingAreas`, `site.phoneDisplay`, `site.phoneRaw`, `site.email`, `site.hours`, `site.whatsapp`, `site.whatsappMessage`; `ContactOfficesMap`
- Produces: `export default function ContactHub()` usado por `app/contacto/page.tsx`

- [ ] **Step 1: Crear `ContactHub.tsx`**

Usar `next/dynamic` para el mapa. Estado: `selectedOfficeId: string | null` inicial `null` (vista de todas). Lista: botones, `aria-pressed`. Columna 1: links `target="_blank"`. Copy: “Elige el área. Cada opción abre su calendario de citas.”

Estructura de clases:

- Sección `bg-bone py-24 lg:py-32`
- Grid: `grid gap-6 lg:grid-cols-12 lg:h-[520px]`
- Col1: `lg:col-span-3 bg-ink text-white p-6 flex flex-col`
- Col2: `lg:col-span-3 border border-ink/10 bg-white overflow-y-auto`
- Col3: `lg:col-span-6 min-h-[320px] lg:min-h-0 overflow-hidden border border-ink/10`
- Debajo: grid de teléfono / email / horarios / WhatsApp

Iconos Lucide ya tipados: `Phone`, `Mail`, `Clock`, `MessageCircle`, `MapPin`, `ArrowRight`. Si falta alguno, añadirlo en `types/lucide-react.d.ts`.

```tsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Phone,
  Mail,
  Clock,
  MessageCircle,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const ContactOfficesMap = dynamic(
  () => import("@/components/sections/ContactOfficesMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[320px] items-center justify-center bg-ink/90 text-xs uppercase tracking-widest text-bone/50">
        Cargando mapa
      </div>
    ),
  }
);

export default function ContactHub() {
  const [selectedOfficeId, setSelectedOfficeId] = useState<string | null>(null);
  const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    site.whatsappMessage
  )}`;

  return (
    <section className="bg-bone py-24 lg:py-32">
      <div className="container-x">
        <span className="eyebrow">+ Conversemos</span>
        <h2 className="display-2 mt-4">
          Agenda Tu <span className="text-gold">Cita</span>
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-ink-700">
          Elige el área de tu consulta. Cada opción abre su calendario de citas
          en una pestaña nueva. Selecciona una sucursal para verla en el mapa.
        </p>

        <div className="mt-10 grid gap-6 lg:h-[520px] lg:grid-cols-12">
          <div className="flex flex-col bg-ink p-6 text-white lg:col-span-3">
            <h3 className="font-display text-xl font-semibold">Agenda tu cita</h3>
            <ul className="mt-6 flex flex-1 flex-col gap-2">
              {site.bookingAreas.map((area) => (
                <li key={area.label}>
                  <a
                    href={area.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between border border-white/10 px-4 py-3 text-sm text-white/85 transition hover:border-gold hover:text-white"
                  >
                    {area.label}
                    <ArrowRight className="h-4 w-4 text-gold" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col overflow-hidden border border-ink/10 bg-white lg:col-span-3">
            <div className="border-b border-ink/10 px-4 py-3 text-xs uppercase tracking-[0.2em] text-ink-600">
              Sucursales
            </div>
            <ul className="flex-1 overflow-y-auto">
              {site.offices.map((office) => {
                const active = selectedOfficeId === office.id;
                return (
                  <li key={office.id}>
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelectedOfficeId(office.id)}
                      className={cn(
                        "w-full border-l-2 px-4 py-3 text-left transition",
                        active
                          ? "border-gold bg-gold/10"
                          : "border-transparent hover:bg-bone"
                      )}
                    >
                      <span className="block font-display text-sm font-semibold text-ink">
                        {office.name}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-ink-700">
                        {office.address}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="min-h-[320px] overflow-hidden border border-ink/10 lg:col-span-6 lg:min-h-0">
            <ContactOfficesMap
              offices={site.offices}
              selectedId={selectedOfficeId}
              onSelect={setSelectedOfficeId}
            />
          </div>
        </div>

        <div className="mt-10 grid gap-6 border-t border-ink/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <a href={`tel:${site.phoneRaw}`} className="flex gap-3 text-sm">
            <Phone className="mt-0.5 h-4 w-4 text-gold" />
            <span>
              <span className="block text-[11px] uppercase tracking-widest text-ink-600">
                Teléfono
              </span>
              {site.phoneDisplay}
            </span>
          </a>
          <a href={`mailto:${site.email}`} className="flex gap-3 text-sm">
            <Mail className="mt-0.5 h-4 w-4 text-gold" />
            <span>
              <span className="block text-[11px] uppercase tracking-widest text-ink-600">
                Email
              </span>
              {site.email}
            </span>
          </a>
          <div className="flex gap-3 text-sm">
            <Clock className="mt-0.5 h-4 w-4 text-gold" />
            <span>
              <span className="block text-[11px] uppercase tracking-widest text-ink-600">
                Horarios
              </span>
              {site.hours.map((h) => (
                <span key={h.day} className="block text-ink-800">
                  {h.day}: {h.hours}
                </span>
              ))}
            </span>
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-3 text-sm"
          >
            <MessageCircle className="mt-0.5 h-4 w-4 text-[#25D366]" />
            <span>
              <span className="block text-[11px] uppercase tracking-widest text-ink-600">
                WhatsApp
              </span>
              Escríbenos ahora
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
```

`MapPin` se puede omitir si no se usa.

- [ ] **Step 2: Actualizar la página**

`app/contacto/page.tsx`:

```tsx
import type { Metadata } from "next";
import CinematicPageHero from "@/components/cinematic/CinematicPageHero";
import ContactHub from "@/components/sections/ContactHub";
import ContactFAQ from "@/components/sections/ContactFAQ";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Agenda tu consulta. Elige Inmigración, Personal Injury o Real Estate y visita nuestras sucursales en NY, NJ y CT.",
};

export default function ContactoPage() {
  return (
    <>
      <CinematicPageHero
        title="Contáctanos"
        subtitle="Agenda tu consulta gratuita y hablemos hoy mismo de tu caso."
        pageKey="contacto"
      />
      <ContactHub />
      <ContactFAQ />
    </>
  );
}
```

- [ ] **Step 3: Borrar componentes viejos**

Eliminar `components/sections/ContactBlock.tsx` y `components/sections/ContactMap.tsx`. Grep `ContactBlock` y `ContactMap`; no deben quedar imports.

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`  
Expected: PASS.

- [ ] **Step 5: Verificar en el navegador**

Run: `npm run dev` → `http://localhost:3000/contacto`

Checklist:
- Desktop: 3 columnas (citas, sucursales, mapa)
- Cada servicio abre nueva pestaña a `/citas/`
- Seis sucursales con nombre de barrio + dirección
- Clic en sucursal hace zoom al pin
- Clic en pin marca la sucursal en la lista
- Debajo: teléfono, email, horarios, WhatsApp
- FAQ visible
- Mobile: orden servicios → lista → mapa
- Sin API key de Google

- [ ] **Step 6: Commit**

```bash
git add app/contacto/page.tsx components/sections/ContactHub.tsx
git add -u components/sections/ContactBlock.tsx components/sections/ContactMap.tsx
git commit -m "feat: contacto en tres columnas con mapa de sucursales"
```

---

## Self-review vs spec

| Spec | Task |
|------|------|
| 3 columnas desktop / stack mobile | Task 4 |
| Booking 3 áreas, nueva pestaña, placeholders | Task 1 + 4 |
| Copy no dice “mismo calendario” | Task 4 |
| 6 oficinas barrio + dirección + lat/lng | Task 1 |
| Leaflet OSM, fitBounds, flyTo 15, pin → lista | Task 3 + 4 |
| Franja teléfono/email/horarios/WhatsApp | Task 4 |
| FAQ + hero intactos | Task 4 |
| Sin Google key | Task 2–3 |
| Reemplazo ContactBlock/ContactMap | Task 4 |

No hay tests automatizados en el repo; la verificación es `tsc` + checklist de browser.
