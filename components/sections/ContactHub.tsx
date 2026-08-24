"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Phone,
  Mail,
  Clock,
  MessageCircle,
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

          <div
            className="min-h-[320px] overflow-hidden border border-ink/10 lg:col-span-6 lg:min-h-0"
            data-lenis-prevent
          >
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
