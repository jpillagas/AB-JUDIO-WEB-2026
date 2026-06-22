"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { mainServices } from "@/lib/site";
import { animateReveal } from "@/lib/animations/scroll-reveal";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";

export default function HomeServices() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!cardsRef.current) return;
    const tween = animateReveal(cardsRef.current, {
      variant: "stagger",
      stagger: 0.1,
      reducedMotion: reduced,
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  return (
    <section className="relative bg-ink py-24 text-bone lg:py-32">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="eyebrow">+ Nuestros servicios</span>
            <h2 className="display-2 mt-4 text-white">
              Nuestros Servicios Abarcan Varias Áreas Legales
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pl-8">
            <p className="text-base leading-relaxed text-bone/60">
              En El Abogado Judio brindamos asesoría y representación legal
              enfocada a las necesidades de la comunidad de habla hispana en
              Nueva York, Nueva Jersey y Connecticut. Nuestro equipo se concentra
              en áreas clave para ofrecerte el apoyo que necesitas.
            </p>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="mt-16 grid gap-px bg-white/10 lg:grid-cols-3"
        >
          {mainServices.map((s) => (
            <div
              key={s.number}
              className="group bg-ink p-8 transition duration-300 hover:-translate-y-1 hover:bg-ink-800 hover:ring-1 hover:ring-gold/50 lg:p-10"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-5xl font-semibold text-white">
                  {s.number}
                </span>
                <span className="h-2 w-2 rounded-full bg-gold transition group-hover:scale-150" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-bone/60">
                {s.description}
              </p>
              <Link
                href={s.href}
                className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold transition group-hover:gap-3"
              >
                Ver más <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/servicios" className="btn-primary">
            Ver Servicios <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
