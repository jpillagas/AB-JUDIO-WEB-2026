"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/site";
import { cn } from "@/lib/utils";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < count ? "fill-gold text-gold" : "fill-ink/10 text-ink/10"
          )}
        />
      ))}
    </div>
  );
}

export default function HomeTestimonials() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const total = testimonials.length;

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 6000);
    return () => clearInterval(id);
  }, [total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
  }, [index]);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="bg-bone py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="eyebrow">+ Testimonios</span>
            <h2 className="display-2 mt-3 text-ink">
              La Experiencia De Quienes
              <br className="hidden sm:block" /> Ya Confiaron En Nosotros
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Anterior"
              className="flex h-10 w-10 items-center justify-center border border-ink/15 text-ink transition hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Siguiente"
              className="flex h-10 w-10 items-center justify-center border border-ink/15 text-ink transition hover:border-gold hover:text-gold"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex gap-5 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              className={cn(
                "flex w-[85%] max-w-[340px] flex-none flex-col border border-ink/[0.08] bg-white p-6 sm:w-[320px] sm:p-7",
                "shadow-[0_6px_24px_rgba(10,10,10,0.04)] transition duration-300",
                i === index ? "ring-1 ring-gold/30" : "opacity-75 hover:opacity-100"
              )}
            >
              <div className="h-px w-10 bg-gold" />

              <div className="mt-5 flex items-center justify-between gap-3">
                <Stars count={t.rating} />
                <span className="text-[11px] uppercase tracking-[0.14em] text-ink-600">
                  {t.timeAgo}
                </span>
              </div>

              <p className="mt-5 flex-1 text-sm leading-relaxed text-ink-800">
                “{t.text}”
              </p>

              <div className="mt-6 border-t border-ink/8 pt-4">
                <div className="font-display text-base font-semibold text-ink">
                  {t.name}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Reseña de ${t.name}`}
              className={cn(
                "h-1 rounded-full transition-all",
                i === index ? "w-7 bg-ink" : "w-2.5 bg-ink/20 hover:bg-ink/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
