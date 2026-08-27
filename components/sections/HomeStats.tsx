"use client";

import { useEffect, useRef } from "react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { site } from "@/lib/site";
import { animateReveal } from "@/lib/animations/scroll-reveal";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";

export default function HomeStats() {
  const gridRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!gridRef.current) return;
    const tween = animateReveal(gridRef.current, {
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
    <section
      aria-label="Estadísticas"
      className="relative z-30 bg-black px-0 pb-6 pt-2 sm:h-0 sm:overflow-visible sm:bg-transparent sm:pb-0 sm:pt-0"
    >
      <div
        ref={gridRef}
        className="container-x relative grid grid-cols-1 gap-4 sm:-translate-y-12 sm:grid-cols-3 sm:gap-5 lg:-translate-y-14"
      >
        {site.stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-xl border border-white/10 border-t-2 border-t-gold bg-black/70 px-5 py-8 text-center shadow-2xl shadow-black/50 backdrop-blur-md sm:px-6 sm:py-9 lg:py-10"
          >
            <div className="font-display text-[2.7rem] font-semibold leading-none tracking-tight text-gold sm:text-[3.6rem]">
              <AnimatedCounter
                to={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </div>
            <div className="mt-3 text-sm font-semibold text-white">
              {stat.label}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-white/70">
              {stat.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
