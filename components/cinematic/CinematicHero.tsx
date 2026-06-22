"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { media } from "@/lib/media";
import { gsap, registerGsap } from "@/lib/animations/gsap-setup";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";
import FilmGrain from "@/components/cinematic/FilmGrain";
import ParallaxLayer from "@/components/cinematic/ParallaxLayer";
import MediaSlot from "@/components/cinematic/MediaSlot";
import PortraitFrame from "@/components/cinematic/PortraitFrame";
import ParticleField from "@/components/cinematic/ParticleField";

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.5 2h3.1c.2 1.6 1 2.9 2.3 3.7 1 .6 2.1.9 3.1.9v3.1a8.6 8.6 0 0 1-5.3-1.7v6.6c0 4.4-3.5 7.4-7.4 7.4S1 18.9 1 14.5 4.5 7 8.4 7c.4 0 .8 0 1.2.1v3.2c-.4-.1-.8-.2-1.2-.2-2.4 0-4.1 1.9-4.1 4.4s1.7 4.4 4.1 4.4 4.1-1.9 4.1-4.4V2z" />
    </svg>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function CinematicHero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!bgRef.current || reduced) return;
    registerGsap();
    const isMobile = window.innerWidth < 1024;
    const tween = gsap.to(bgRef.current, {
      scale: isMobile ? 1.04 : 1.08,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "none",
      transformOrigin: "center center",
    });
    return () => {
      tween.kill();
    };
  }, [reduced]);

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <ParallaxLayer speed={0.3} className="absolute inset-0">
          <div
            ref={bgRef}
            className="absolute inset-0 overflow-hidden opacity-30 grayscale"
          >
            <MediaSlot
              src={media.hero.background}
              alt="Oficina legal Neuhauser Law"
              priority
              className="h-full w-full"
            />
          </div>
        </ParallaxLayer>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <FilmGrain />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/5"
          style={{ animation: "light-leak 14s ease-in-out infinite" }}
        />
        <ParticleField />
      </div>

      <div className="container-x relative pt-36 pb-16 lg:pt-44 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="mb-8 flex items-center gap-4"
            >
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={site.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
              <span className="ml-2 h-px w-12 bg-gold/40" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold/80">
                {site.legalName}
              </span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
              className="display-1"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
                }}
                className="block"
              >
                El Abogado Judio
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
                }}
                className="block text-gold"
              >
                Neuhauser Law
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease }}
              className="mt-6 max-w-xl text-lg text-white/70"
            >
              {site.tagline}. Asesoría legal experta para la comunidad hispana en
              Nueva York, Nueva Jersey y Connecticut.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link href="/contacto" className="btn-primary">
                Agendar Cita Gratis <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/servicios" className="btn-ghost">
                Ver Servicios
              </Link>
            </motion.div>
          </div>

          <div className="relative isolate lg:col-span-5">
            <PortraitFrame
              src={media.hero.portrait}
              alt="Mark Neuhauser – Abogado, Neuhauser Law"
              priority
            />
          </div>
        </div>
      </div>

      <div className="gold-line absolute bottom-0 left-0 right-0" />
    </section>
  );
}
