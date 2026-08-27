"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { media } from "@/lib/media";
import { animateReveal } from "@/lib/animations/scroll-reveal";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";
import { gsap, registerGsap } from "@/lib/animations/gsap-setup";
import MediaSlot from "@/components/cinematic/MediaSlot";

export default function HomeCTA() {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!bgRef.current || reduced) return;
    registerGsap();
    const tween = gsap.to(bgRef.current, {
      scale: 1.06,
      duration: 25,
      repeat: -1,
      yoyo: true,
      ease: "none",
      transformOrigin: "center center",
    });
    return () => {
      tween.kill();
    };
  }, [reduced]);

  useEffect(() => {
    if (!contentRef.current) return;
    const tween = animateReveal(contentRef.current, {
      variant: "fade",
      reducedMotion: reduced,
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white">
      <div
        ref={bgRef}
        className="absolute inset-0 overflow-hidden opacity-15 grayscale"
      >
        <MediaSlot src={media.sections.cta} alt="Consulta legal gratuita" />
      </div>
      <div
        ref={contentRef}
        className="container-x relative grid items-center gap-8 lg:grid-cols-12"
      >
        <div className="lg:col-span-8">
          <span className="eyebrow">+ Hablemos hoy</span>
          <h2 className="display-2 mt-4 text-white">
            Tu caso merece la mejor defensa.
            <br />
            <span className="text-gold">Hablemos sin compromiso.</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-4 lg:col-span-4 lg:justify-end">
          <a href={`tel:${site.phoneRaw}`} className="btn-ghost">
            <Phone className="h-4 w-4" />
            Llamar
          </a>
          <Link href={site.bookingSectionHref} className="btn-primary animate-gold-pulse">
            Agendar Cita <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
