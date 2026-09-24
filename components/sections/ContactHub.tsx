"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ArrowRight,
  Navigation,
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
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  const activeService = site.bookingAreas[activeServiceIndex];
  const selectedOffice =
    site.offices.find((o) => o.id === selectedOfficeId) ?? null;

  const directionsUrl = selectedOffice
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        `${selectedOffice.lat},${selectedOffice.lng}`
      )}&travelmode=driving`
    : null;

  const appleMapsUrl = selectedOffice
    ? `https://maps.apple.com/?daddr=${selectedOffice.lat},${selectedOffice.lng}&dirflg=d`
    : null;

  const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    site.whatsappMessage
  )}`;

  useEffect(() => {
    if (window.location.hash !== "#agendar-cita") return;
    const el = document.getElementById("agendar-cita");
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const isExternalBooking = activeService.href.startsWith("http");

  return (
    <section className="scroll-mt-28 bg-bone pt-24 pb-10 lg:pt-32 lg:pb-14">
      <div className="container-x">
        {/* —— Agenda + sucursales —— */}
        <div id="agendar-cita">
          <span className="eyebrow">+ Conversemos</span>
          <h2 className="display-2 mt-4">
            Agenda Tu <span className="text-gold">Cita</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-ink-700">
            Elige el tipo de consulta y revisa nuestras sucursales en el mapa.
          </p>

          <div className="mt-8">
            <p className="mb-4 text-sm font-medium text-ink-700">
              Tipo de consulta:
            </p>
            <div
              className="grid gap-3 sm:grid-cols-3"
              role="tablist"
              aria-label="Tipo de consulta"
            >
              {site.bookingAreas.map((area, index) => {
                const active = activeServiceIndex === index;
                return (
                  <button
                    key={area.label}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls={`panel-${index}`}
                    id={`tab-${index}`}
                    onClick={() => setActiveServiceIndex(index)}
                    className={cn(
                      "w-full rounded-sm border-2 px-4 py-5 font-display text-base font-semibold transition-all sm:text-lg",
                      active
                        ? "border-gold bg-gold text-ink shadow-[0_8px_30px_rgba(201,168,106,0.35)]"
                        : "border-ink/20 bg-white text-ink shadow-sm hover:border-gold/70 hover:shadow-md active:scale-[0.98]"
                    )}
                  >
                    {area.label}
                  </button>
                );
              })}
            </div>

            <div
              id={`panel-${activeServiceIndex}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeServiceIndex}`}
              className="mt-4 border border-ink/10 bg-white p-5 sm:p-6"
            >
              <p className="max-w-3xl text-sm leading-relaxed text-ink-700">
                {activeService.description}
              </p>
              {isExternalBooking ? (
                <a
                  href={activeService.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-5 !px-6 !py-3 !text-xs"
                >
                  Agendar cita <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  href={activeService.href}
                  className="btn-primary mt-5 !px-6 !py-3 !text-xs"
                >
                  Agendar cita <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Sucursales 30% + mapa 70% */}
          <div className="mt-10 grid gap-6 lg:min-h-[520px] lg:grid-cols-10">
            <div className="flex min-h-0 flex-col overflow-hidden border border-ink/10 bg-white lg:col-span-3">
              <div className="border-b border-ink/10 px-4 py-3 text-xs uppercase tracking-[0.2em] text-ink-600">
                Sucursales
              </div>
              <ul className="max-h-[420px] flex-1 overflow-y-auto lg:max-h-none">
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

            <div className="relative z-0 flex min-h-[320px] flex-col isolate overflow-hidden border border-ink/10 lg:col-span-7 lg:min-h-0">
              <div
                className="relative z-0 min-h-[280px] flex-1"
                data-lenis-prevent
              >
                <ContactOfficesMap
                  offices={site.offices}
                  selectedId={selectedOfficeId}
                  onSelect={setSelectedOfficeId}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2 border-t border-ink/10 bg-ink px-3 py-3">
                <a
                  href={directionsUrl ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!directionsUrl}
                  onClick={(e) => {
                    if (!directionsUrl) e.preventDefault();
                  }}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition",
                    directionsUrl
                      ? "bg-gold text-ink hover:bg-gold-light"
                      : "cursor-not-allowed bg-white/10 text-white/35"
                  )}
                >
                  <Navigation className="h-3.5 w-3.5" />
                  Cómo llegar
                </a>
                <a
                  href={appleMapsUrl ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!appleMapsUrl}
                  onClick={(e) => {
                    if (!appleMapsUrl) e.preventDefault();
                  }}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition",
                    appleMapsUrl
                      ? "border-white/25 text-white hover:border-gold hover:text-gold"
                      : "cursor-not-allowed border-white/10 text-white/30"
                  )}
                >
                  Apple Maps
                </a>
                <span className="w-full text-[10px] uppercase tracking-[0.14em] text-bone/45 sm:ml-auto sm:w-auto">
                  {selectedOffice
                    ? `Ruta a ${selectedOffice.name}`
                    : "Selecciona una sucursal"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* —— Contactos —— */}
        <div id="contactos" className="relative z-10 mt-16 lg:mt-20">
          <span className="eyebrow">+ Estamos para ayudarte</span>
          <h2 className="display-2 mt-4">
            <span className="text-gold">Contactos</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-ink-700">
            Llámanos, escríbenos o escríbenos por WhatsApp. Atendemos en Nueva
            York, Nueva Jersey y Connecticut.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href={`tel:${site.phoneRaw}`}
              className="group relative flex flex-col border border-ink/10 bg-white p-6 transition hover:border-gold/60 hover:shadow-[0_12px_40px_rgba(10,10,10,0.08)]"
            >
              <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition duration-500 group-hover:scale-x-100" />
              <span className="flex h-11 w-11 items-center justify-center border border-gold/30 bg-gold/10 text-gold transition group-hover:bg-gold group-hover:text-ink">
                <Phone className="h-4 w-4" />
              </span>
              <span className="mt-5 text-[11px] font-medium uppercase tracking-[0.22em] text-ink-600">
                Teléfono
              </span>
              <span className="mt-2 font-display text-lg font-semibold tracking-tight text-ink">
                {site.phoneDisplay}
              </span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-gold opacity-0 transition group-hover:opacity-100">
                Llamar ahora <ArrowRight className="h-3 w-3" />
              </span>
            </a>

            <a
              href={`mailto:${site.email}`}
              className="group relative flex flex-col border border-ink/10 bg-white p-6 transition hover:border-gold/60 hover:shadow-[0_12px_40px_rgba(10,10,10,0.08)]"
            >
              <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition duration-500 group-hover:scale-x-100" />
              <span className="flex h-11 w-11 items-center justify-center border border-gold/30 bg-gold/10 text-gold transition group-hover:bg-gold group-hover:text-ink">
                <Mail className="h-4 w-4" />
              </span>
              <span className="mt-5 text-[11px] font-medium uppercase tracking-[0.22em] text-ink-600">
                Email
              </span>
              <span className="mt-2 break-all font-display text-lg font-semibold tracking-tight text-ink">
                {site.email}
              </span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-gold opacity-0 transition group-hover:opacity-100">
                Enviar correo <ArrowRight className="h-3 w-3" />
              </span>
            </a>

            <div className="relative flex flex-col border border-ink/10 bg-ink p-6 text-white">
              <span className="absolute inset-x-0 top-0 h-0.5 bg-gold" />
              <span className="flex h-11 w-11 items-center justify-center border border-gold/40 bg-gold/15 text-gold">
                <Clock className="h-4 w-4" />
              </span>
              <span className="mt-5 text-[11px] font-medium uppercase tracking-[0.22em] text-bone/55">
                Horarios
              </span>
              <ul className="mt-3 space-y-2">
                {site.hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-2 text-sm last:border-0 last:pb-0"
                  >
                    <span className="text-bone/65">{h.day}</span>
                    <span className="shrink-0 font-medium text-white">
                      {h.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col border border-gold/40 bg-gold p-6 text-ink transition hover:bg-gold-light hover:shadow-[0_12px_40px_rgba(201,168,106,0.35)]"
            >
              <span className="flex h-11 w-11 items-center justify-center border border-ink/15 bg-ink/5 text-ink">
                <MessageCircle className="h-4 w-4" />
              </span>
              <span className="mt-5 text-[11px] font-medium uppercase tracking-[0.22em] text-ink/60">
                WhatsApp
              </span>
              <span className="mt-2 font-display text-lg font-semibold tracking-tight">
                Escríbenos ahora
              </span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink/70 transition group-hover:gap-2.5">
                Abrir chat <ArrowRight className="h-3 w-3" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
