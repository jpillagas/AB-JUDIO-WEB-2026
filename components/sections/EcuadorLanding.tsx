"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, Calendar } from "lucide-react";
import { ecuadorLanding, ecuadorTeam, site } from "@/lib/site";
import { media } from "@/lib/media";
import ScrollReveal from "@/components/ScrollReveal";

export default function EcuadorLanding() {
  const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hola, vengo desde la página de Ecuador y quiero hablar con un asesor."
  )}`;

  useEffect(() => {
    if (window.location.hash !== "#agendar") return;
    const el = document.getElementById("agendar");
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <>
      {/* Banner */}
      <section className="relative min-h-[52vh] overflow-hidden bg-ink text-white lg:min-h-[58vh]">
        <div className="absolute inset-0">
          <Image
            src={media.pageHeroes.ecuador}
            alt={ecuadorLanding.bannerTitle}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] opacity-90"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-ink" />
        </div>
        <div className="container-x relative flex min-h-[52vh] flex-col justify-end pb-16 pt-28 lg:min-h-[58vh] lg:pb-20">
          <ScrollReveal>
            <span className="eyebrow">+ Ecuador</span>
            <h1 className="display-1 mt-4 max-w-4xl text-white">
              {ecuadorLanding.bannerTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base text-white/75 sm:text-lg">
              {ecuadorLanding.bannerSubtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Servicios — light */}
      <section className="bg-bone py-20 lg:py-28">
        <div className="container-x">
          <ScrollReveal>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-6">
                <span className="eyebrow">+ Qué ofrecemos</span>
                <h2 className="display-2 mt-4">
                  {ecuadorLanding.servicesTitle}
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-ink-700 lg:col-span-6 lg:pl-8">
                {ecuadorLanding.servicesLead}
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {ecuadorLanding.services.map((service, i) => (
              <ScrollReveal
                key={service.title}
                delay={Math.min(i * 0.05, 0.2)}
                className="group bg-bone p-7 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:ring-1 hover:ring-gold/50 lg:p-8"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl font-semibold text-ink lg:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-gold transition group-hover:scale-150" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-700">
                  {service.description}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo — dark */}
      <section className="bg-ink py-16 text-white lg:py-20">
        <div className="container-x">
          <ScrollReveal className="text-center">
            <span className="eyebrow">+ Equipo Ecuador</span>
            <h2 className="display-2 mt-4 text-white">
              {ecuadorLanding.teamTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-bone/65">
              {ecuadorLanding.teamLead}
            </p>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4 md:grid-cols-6 md:gap-x-4 md:gap-y-7">
            {ecuadorTeam.map((person) => (
              <div key={person.name} className="text-center">
                <div className="relative mx-auto aspect-square w-full max-w-[110px] overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15 sm:max-w-[120px]">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="120px"
                    className="object-cover object-top"
                  />
                </div>
                <p className="mt-2.5 text-[11px] font-medium leading-snug text-white sm:text-xs">
                  {person.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: cita / asesor — light */}
      <section
        id="agendar"
        className="scroll-mt-28 bg-bone py-20 lg:py-28"
      >
        <div className="container-x">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">+ Empecemos</span>
            <h2 className="display-2 mt-4">{ecuadorLanding.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-ink-700">
              {ecuadorLanding.ctaLead}
            </p>
          </ScrollReveal>

          <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
            <Link
              href={site.bookingSectionHref}
              className="group flex flex-col items-start border border-ink/10 bg-white p-7 transition hover:border-gold/60 hover:shadow-[0_12px_40px_rgba(10,10,10,0.08)]"
            >
              <span className="flex h-11 w-11 items-center justify-center border border-gold/30 bg-gold/10 text-gold">
                <Calendar className="h-5 w-5" />
              </span>
              <span className="mt-5 font-display text-xl font-semibold text-ink">
                Agenda tu cita
              </span>
              <span className="mt-2 text-sm text-ink-700">
                Reserva en línea y queda agendado de inmediato.
              </span>
              <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
                Ir a citas <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </Link>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-start border border-gold/40 bg-gold p-7 text-ink transition hover:bg-gold-light"
            >
              <span className="flex h-11 w-11 items-center justify-center border border-ink/15 bg-ink/5">
                <MessageCircle className="h-5 w-5" />
              </span>
              <span className="mt-5 font-display text-xl font-semibold">
                Hablar con un asesor
              </span>
              <span className="mt-2 text-sm text-ink/70">
                ¿Tienes preguntas antes de agendar? Escríbenos por WhatsApp.
              </span>
              <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-ink/75">
                Abrir chat <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
