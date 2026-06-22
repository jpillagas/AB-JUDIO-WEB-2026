"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import ScrollReveal from "@/components/ScrollReveal";
import { expertiseAreas } from "@/lib/site";

export default function ServicesIntro() {
  return (
    <section className="bg-bone py-24 lg:py-32">
      <div className="container-x">
        <ScrollReveal className="max-w-3xl">
          <span className="eyebrow">+ Áreas de práctica</span>
          <h2 className="display-2 mt-4">
            Conoce Nuestra <span className="text-gold">Amplia Gama De Servicios</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-700">
            Ofrecemos atención especializada en inmigración, bienes raíces y
            lesiones personales. Nuestro equipo legal está preparado para
            ayudarte en cada paso, con soluciones claras, efectivas y adaptadas
            a tu situación.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal variant="mask" className="relative aspect-video w-full overflow-hidden rounded-sm bg-ink">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1600&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-ink/60 via-transparent to-ink/60" />
            <button
              aria-label="Reproducir video"
              className="group absolute inset-0 flex items-center justify-center"
            >
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gold text-ink transition group-hover:scale-110">
                <span className="absolute inset-0 rounded-full bg-gold/40 animate-ping" />
                <Play className="relative h-7 w-7 fill-current" />
              </span>
            </button>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <h3 className="font-display text-2xl font-semibold">
              Áreas En Las Que Nos Especializamos
            </h3>
            <div className="mt-8 space-y-6">
              {expertiseAreas.map((a) => (
                <ProgressBar key={a.name} label={a.name} percent={a.percent} />
              ))}
            </div>
            <p className="mt-8 text-sm leading-relaxed text-ink-700">
              Te invitamos a hablar hoy con un miembro de nuestro equipo legal.
              Te orientamos sin compromiso y te ayudamos a entender cuál es el
              mejor camino legal para ti.
            </p>
            <Link href="/contacto" className="btn-dark mt-6">
              Hablar con un abogado
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
