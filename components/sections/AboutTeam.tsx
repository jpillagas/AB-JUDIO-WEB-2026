"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { team } from "@/lib/site";
import ScrollReveal from "@/components/ScrollReveal";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

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
            Profesionales comprometidos con tu caso, en nuestras oficinas de
            Nueva York y Nueva Jersey.
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
                {person.image ? (
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover object-top grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-ink-700 to-ink">
                    <span className="font-display text-3xl font-semibold tracking-wide text-gold/80 sm:text-4xl">
                      {initials(person.name)}
                    </span>
                  </div>
                )}
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
