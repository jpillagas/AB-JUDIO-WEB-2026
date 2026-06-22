"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { media, type PageHeroKey } from "@/lib/media";
import { gsap, registerGsap } from "@/lib/animations/gsap-setup";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";
import FilmGrain from "@/components/cinematic/FilmGrain";
import MediaSlot from "@/components/cinematic/MediaSlot";

interface Props {
  title: string;
  subtitle?: string;
  pageKey: PageHeroKey;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function CinematicPageHero({ title, subtitle, pageKey }: Props) {
  const bgRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!bgRef.current || reduced) return;
    registerGsap();
    const tween = gsap.to(bgRef.current, {
      scale: 1.05,
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
    <section className="relative h-[45vh] min-h-[320px] w-full overflow-hidden bg-ink">
      <div ref={bgRef} className="absolute inset-0 overflow-hidden will-change-transform">
        <MediaSlot
          src={media.pageHeroes[pageKey]}
          alt={title}
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/65 to-ink/90" />
      <FilmGrain />

      <div className="relative z-10 flex h-full items-center justify-center px-5 pt-20 text-center sm:px-8">
        <div className="container-x">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="display-1 text-white"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="mx-auto mt-5 max-w-2xl text-base text-white/70 sm:text-lg"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
