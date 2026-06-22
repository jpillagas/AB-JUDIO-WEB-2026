"use client";

import { useEffect, useRef } from "react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { site } from "@/lib/site";
import { animateReveal } from "@/lib/animations/scroll-reveal";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";
import { gsap, registerGsap } from "@/lib/animations/gsap-setup";

export default function HomeStats() {
  const gridRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!gridRef.current) return;
    const tween = animateReveal(gridRef.current, {
      variant: "stagger",
      stagger: 0.15,
      reducedMotion: reduced,
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  useEffect(() => {
    if (!lineRef.current || reduced) return;
    registerGsap();
    const tween = gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  return (
    <section className="bg-ink text-white">
      <div
        ref={lineRef}
        className="gold-line origin-left"
        aria-hidden
      />
      <div
        ref={gridRef}
        className="container-x grid grid-cols-2 gap-8 py-12 lg:grid-cols-4 lg:py-16"
      >
        {site.stats.map((stat) => (
          <div key={stat.label} className="text-center lg:text-left">
            <div className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              <AnimatedCounter to={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.25em] text-bone/50">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
