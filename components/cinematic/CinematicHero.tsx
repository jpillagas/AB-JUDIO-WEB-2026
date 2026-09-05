"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { media } from "@/lib/media";
import PortraitFrame from "@/components/cinematic/PortraitFrame";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CinematicHero() {
  return (
    <section className="relative overflow-visible bg-black text-white">
      <div aria-hidden className="absolute inset-0 overflow-hidden">
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
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(201,168,106,0.22)_0%,transparent_68%)]"
      />

      <div className="container-x relative pt-28 lg:pt-32">
        <div className="grid md:grid-cols-12 md:items-stretch md:gap-6 lg:gap-8">
          <div className="relative z-10 flex flex-col justify-start pb-16 pt-2 md:col-span-6 md:pb-28 md:pt-20 lg:pt-36">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.9, ease },
                  },
                }}
                className="block font-display text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl"
              >
                El Abogado Judío
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease },
                  },
                }}
                className="mt-4 flex items-center gap-3 font-display text-sm font-medium uppercase tracking-[0.28em] text-gold sm:text-base"
              >
                <span className="h-px w-6 bg-gold/80" />
                {site.legalName}
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease }}
              className="mt-10 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
            >
              Defensa legal experta para la comunidad hispana. Protegemos tus
              derechos en casos de Inmigración, Lesiones y Bienes Raíces en NY,
              NJ y CT.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease }}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <Link href={site.bookingSectionHref} className="btn-primary">
                Agendar Cita Gratis <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/servicios" className="btn-secondary">
                Ver Servicios
              </Link>
            </motion.div>
          </div>

          <div className="relative z-20 mx-auto mt-6 w-full max-w-[300px] md:col-span-6 md:mt-0 md:flex md:min-h-full md:max-w-none md:items-start md:justify-center md:pt-20 md:-mb-28 lg:pt-36 lg:-mb-32">
            <PortraitFrame
              src={media.hero.portrait}
              alt="Mark Neuhauser – Abogado, Neuhauser Law"
              priority
              className="w-full max-w-[280px] -translate-y-8 sm:max-w-[300px] md:max-w-[340px] md:-translate-y-16 lg:max-w-[380px] lg:-translate-y-24"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
