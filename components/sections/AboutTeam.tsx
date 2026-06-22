"use client";

import { motion } from "framer-motion";
import { team } from "@/lib/site";
import ScrollReveal from "@/components/ScrollReveal";

// Imágenes placeholder genéricas profesionales (se pueden reemplazar luego con las reales del despacho)
const portraitPool = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1541823709867-1b206113eafd?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
];

export default function AboutTeam() {
  return (
    <section className="bg-bone py-24 lg:py-32">
      <div className="container-x">
        <ScrollReveal className="text-center">
          <span className="eyebrow">+ Nuestro Team</span>
          <h2 className="display-2 mt-4">
            Conoce A <span className="text-gold">Nuestro Equipo</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm text-ink-700">
            Más de 16 profesionales comprometidos con tu caso, distribuidos en
            nuestras oficinas de Nueva York y Nueva Jersey.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {team.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.06 }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-ink-800">
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale transition duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${portraitPool[i % portraitPool.length]})`,
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/90 to-transparent" />
              </div>
              <div className="mt-4">
                <h3 className="font-medium">{person.name}</h3>
                <p className="text-xs text-ink-700">{person.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
