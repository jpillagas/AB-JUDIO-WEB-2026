"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { media } from "@/lib/media";
import { animateReveal } from "@/lib/animations/scroll-reveal";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";
import ParallaxLayer from "@/components/cinematic/ParallaxLayer";
import MediaSlot from "@/components/cinematic/MediaSlot";

const benefits = [
  "Consulta inicial gratuita y sin compromiso",
  "Actualizaciones constantes y acceso a tu caso",
  "Defensa estratégica en procesos complejos",
  "Atención personalizada en español",
];

export default function HomeWhyUs() {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!imageRef.current || !textRef.current) return;
    const imageTween = animateReveal(imageRef.current, {
      variant: "mask",
      reducedMotion: reduced,
    });
    const textTween = animateReveal(textRef.current, {
      variant: "fade",
      delay: 0.2,
      reducedMotion: reduced,
    });
    return () => {
      imageTween.scrollTrigger?.kill();
      imageTween.kill();
      textTween.scrollTrigger?.kill();
      textTween.kill();
    };
  }, [reduced]);

  return (
    <section className="relative bg-bone py-24 lg:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <ParallaxLayer speed={0.2} className="relative">
          <div ref={imageRef} className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
            <MediaSlot src={media.sections.whyUs} alt="Equipo legal Neuhauser Law" />
            <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 items-center justify-center rounded-full bg-gold text-center text-ink shadow-lg lg:flex">
              <div>
                <div className="font-display text-3xl font-semibold leading-none">
                  15+
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-widest">
                  Años de
                  <br />
                  experiencia
                </div>
              </div>
            </div>
          </div>
        </ParallaxLayer>

        <div ref={textRef}>
          <span className="eyebrow">+ Por qué elegirnos</span>
          <h2 className="display-2 mt-4">
            Nuestros Clientes
            <br />
            <span className="text-gold">Son Prioridad</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-700">
            No hacemos promesas vacías: ofrecemos asesoría legal experta,
            procesos bien gestionados y acompañamiento real en cada etapa.
            Nuestro enfoque está orientado a resolver, no a complicar.
          </p>

          <ul className="mt-8 space-y-4">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-ink text-bone">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm leading-relaxed text-ink-800">{b}</span>
              </li>
            ))}
          </ul>

          <Link href="/contacto" className="btn-dark mt-10">
            Agendar Una Cita Gratis <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
