"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { site, ecuadorLanding } from "@/lib/site";
import { media } from "@/lib/media";
import PortraitFrame from "@/components/cinematic/PortraitFrame";

const ease = [0.22, 1, 0.36, 1] as const;
const AUTO_MS = 7000;

type SlideId = "mark" | "ecuador";

const slides: { id: SlideId; label: string }[] = [
  { id: "mark", label: "El Abogado Judío" },
  { id: "ecuador", label: "Cuenca, Ecuador" },
];

export default function CinematicHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = slides[index]?.id ?? "mark";

  const goTo = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      className="relative overflow-hidden bg-black text-white md:overflow-visible"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carrusel"
      aria-label="Presentación principal"
    >
      <AnimatePresence mode="wait" initial={false}>
        {active === "mark" ? (
          <motion.div
            key="mark-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease }}
            className="absolute inset-0 overflow-hidden"
            aria-hidden
          >
            <Image
              src={media.hero.background}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/70 to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/65" />
          </motion.div>
        ) : (
          <motion.div
            key="ecuador-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease }}
            className="absolute inset-0 overflow-hidden"
            aria-hidden
          >
            <Image
              src={media.sections.ecuadorOffice}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-[center_35%] opacity-90"
            />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(201,168,106,0.22)_0%,transparent_68%)]"
      />

      <div className="container-x relative pt-24 md:pt-28 lg:pt-32">
        <AnimatePresence mode="wait" initial={false}>
          {active === "mark" ? (
            <motion.div
              key="mark-content"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease }}
              className="grid md:grid-cols-12 md:items-stretch md:gap-6 lg:gap-8"
              aria-hidden={false}
            >
              <div className="relative z-10 flex flex-col justify-start pb-6 pt-2 md:col-span-6 md:pb-28 md:pt-20 lg:pt-36">
                <h1>
                  <span className="block font-display text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
                    El Abogado Judío
                  </span>
                  <span className="mt-4 flex items-center gap-3 font-display text-sm font-medium uppercase tracking-[0.28em] text-gold sm:text-base">
                    <span className="h-px w-6 bg-gold/80" />
                    {site.legalName}
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:mt-10 sm:text-lg">
                  Defensa legal experta para la comunidad hispana. Protegemos tus
                  derechos en casos de Inmigración, Lesiones y Bienes Raíces en
                  NY, NJ y CT.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4 md:mt-12">
                  <Link href={site.bookingSectionHref} className="btn-primary">
                    Agendar Cita Gratis <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/servicios" className="btn-secondary">
                    Ver Servicios
                  </Link>
                </div>
              </div>

              <div className="relative z-20 mx-auto mt-4 w-full max-w-[260px] pb-2 md:col-span-6 md:mt-0 md:flex md:min-h-full md:max-w-none md:items-start md:justify-center md:pb-0 md:pt-20 md:-mb-28 lg:pt-36 lg:-mb-32">
                <PortraitFrame
                  src={media.hero.portrait}
                  alt="Mark Neuhauser – Abogado, Neuhauser Law"
                  priority
                  className="w-full max-w-[220px] translate-y-0 sm:max-w-[260px] md:max-w-[340px] md:-translate-y-16 lg:max-w-[380px] lg:-translate-y-24"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ecuador-content"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease }}
              className="grid md:grid-cols-12 md:items-stretch md:gap-6 lg:gap-8"
            >
              <div className="relative z-10 flex flex-col justify-start pb-16 pt-2 md:col-span-7 md:pb-28 md:pt-20 lg:col-span-6 lg:pt-36">
                <p className="font-display text-sm font-medium uppercase tracking-[0.28em] text-gold">
                  LATAM – Cuenca, Ecuador
                </p>
                <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
                  Misma marca.
                  <br />
                  <span className="text-gold">También en Ecuador.</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:mt-10 sm:text-lg">
                  El Abogado Judío abre presencia en Cuenca para acompañarte con
                  la misma seriedad y cercanía, ahora desde Ecuador.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4 md:mt-12">
                  <Link href={ecuadorLanding.path} className="btn-primary">
                    Conoce Abogado Judío Ecuador{" "}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href={site.bookingSectionHref} className="btn-secondary">
                    Agendar Cita
                  </Link>
                </div>
              </div>
              {/* Espacio derecho vacío para equilibrar altura con el slide de Mark */}
              <div
                className="hidden md:col-span-5 md:block md:min-h-[420px] lg:col-span-6 lg:min-h-[480px]"
                aria-hidden
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Slide anterior"
        className="absolute left-2 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition hover:border-gold hover:bg-black/50 hover:text-gold sm:left-4 sm:h-12 sm:w-12 lg:left-6"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Slide siguiente"
        className="absolute right-2 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition hover:border-gold hover:bg-black/50 hover:text-gold sm:right-4 sm:h-12 sm:w-12 lg:right-6"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </section>
  );
}
