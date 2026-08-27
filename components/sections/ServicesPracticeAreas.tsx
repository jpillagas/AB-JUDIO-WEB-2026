"use client";

import { useEffect } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { practiceAreas, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function ServicesPracticeAreas() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  return (
    <div>
      {practiceAreas.map((area, index) => {
        const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
          area.whatsappMessage
        )}`;
        const reverse = index % 2 === 1;

        return (
          <section
            key={area.id}
            id={area.id}
            className={cn(
              "scroll-mt-28 py-20 lg:py-28",
              index % 2 === 0 ? "bg-bone" : "bg-white"
            )}
          >
            <div className="container-x grid items-center gap-12 lg:grid-cols-12">
              <div
                className={cn(
                  "relative aspect-[4/3] overflow-hidden rounded-sm lg:col-span-5",
                  reverse && "lg:order-2"
                )}
              >
                <Image
                  src={area.image}
                  alt={area.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              </div>

              <div
                className={cn(
                  "lg:col-span-7",
                  reverse ? "lg:order-1 lg:pr-8" : "lg:pl-4"
                )}
              >
                <span className="eyebrow">+ {area.title}</span>
                <h2 className="display-2 mt-4">{area.eyebrow}</h2>
                <p className="mt-6 text-base font-medium text-ink">{area.lead}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-700">
                  {area.body}
                </p>

                <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-gold">
                  {area.listLabel}
                </p>
                <ul className="mt-4 space-y-2">
                  {area.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-ink-800"
                    >
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-sm italic text-ink-700">{area.closing}</p>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-8"
                >
                  <MessageCircle className="h-4 w-4" />
                  Agendar cita por WhatsApp
                </a>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
