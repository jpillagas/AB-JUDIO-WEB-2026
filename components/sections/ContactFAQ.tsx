"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const faqs = [
  {
    q: "¿La consulta es realmente gratis?",
    a: "Sí. La primera consulta para evaluar tu caso es completamente gratuita y sin compromiso. Te orientaremos honestamente sobre las posibilidades reales de tu situación.",
  },
  {
    q: "¿Qué documentos llevo a mi primera cita?",
    a: "Lleva cualquier documento migratorio que tengas (pasaporte, visa, I-94, peticiones previas), identificaciones, comprobantes de domicilio y, si aplica, documentos relacionados con tu caso. Si no tienes nada, también podemos comenzar.",
  },
  {
    q: "¿Atienden virtualmente?",
    a: "Sí. Ofrecemos consultas presenciales en nuestras oficinas y consultas virtuales por video llamada para clientes en Nueva York, Nueva Jersey, Connecticut y otros estados.",
  },
  {
    q: "¿En qué idiomas atienden?",
    a: "Atendemos en español e inglés. Todo nuestro equipo es bilingüe y entiende las particularidades culturales de la comunidad hispana.",
  },
  {
    q: "¿Trabajan casos con planes de pago?",
    a: "Sí. Sabemos que los procesos legales pueden representar un gasto importante. Por eso ofrecemos planes de pago flexibles ajustados a la realidad de cada cliente.",
  },
];

export default function ContactFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-bone py-24 lg:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <ScrollReveal className="lg:col-span-4">
          <span className="eyebrow">+ Preguntas frecuentes</span>
          <h2 className="display-2 mt-4">
            Resolvamos Tus <span className="text-gold">Dudas</span>
          </h2>
          <p className="mt-5 text-sm text-ink-700">
            Las preguntas que más nos hacen cuando alguien está pensando en
            buscar ayuda legal por primera vez.
          </p>
        </ScrollReveal>

        <div className="lg:col-span-8">
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-lg font-semibold">
                      {f.q}
                    </span>
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-ink text-bone">
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-12 text-sm leading-relaxed text-ink-700">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
