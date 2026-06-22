"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { courtServices } from "@/lib/site";
import ScrollReveal from "@/components/ScrollReveal";

export default function ServicesCourt() {
  return (
    <section id="corte" className="bg-bone py-24 lg:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <ScrollReveal className="lg:col-span-4">
          <span className="eyebrow">+ Otros Servicios</span>
          <h2 className="display-2 mt-4">
            Corte De <span className="text-gold">Inmigración</span>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-ink-700">
            Además de nuestros servicios principales, ofrecemos soluciones
            legales especializadas para situaciones migratorias complejas. Cada
            caso es tratado con la misma dedicación, experiencia y enfoque
            estratégico que caracteriza a El Abogado Judio.
          </p>
          <Link href="/contacto" className="btn-dark mt-8">
            Agenda una cita
          </Link>
        </ScrollReveal>

        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {courtServices.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="border-t border-ink/10 pt-5"
              >
                <div className="text-xs uppercase tracking-widest text-gold">
                  {s.n}
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold">
                  {s.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-ink-700">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
