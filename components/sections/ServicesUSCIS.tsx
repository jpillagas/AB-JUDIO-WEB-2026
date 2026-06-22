"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { uscisServices } from "@/lib/site";
import ScrollReveal from "@/components/ScrollReveal";

export default function ServicesUSCIS() {
  return (
    <section id="inmigracion" className="bg-ink py-24 text-bone lg:py-32">
      <div className="container-x">
        <ScrollReveal className="max-w-4xl">
          <span className="eyebrow">+ Servicios de USCIS</span>
          <h2 className="display-2 mt-4 text-white">
            El Servicio De Ciudadanía E Inmigración De Los
            <span className="text-gold"> Estados Unidos</span>
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-px border-t border-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {uscisServices.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.05 }}
              className="group relative border-b border-r border-white/10 p-6 transition hover:bg-white/[0.03] lg:p-8"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-semibold text-white">
                  {s.n}
                </span>
                <span className="text-gold">.</span>
              </div>
              <h3 className="mt-4 font-medium text-white">{s.title}</h3>
              <p className="mt-3 text-xs leading-relaxed text-bone/55">{s.desc}</p>
              <span className="absolute bottom-4 right-4 text-gold opacity-0 transition group-hover:opacity-100">
                <ArrowRight className="h-4 w-4" />
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/contacto" className="btn-primary">
            Agenda Una Cita <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
