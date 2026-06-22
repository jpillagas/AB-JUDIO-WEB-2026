"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { animateReveal, type RevealVariant } from "@/lib/animations/scroll-reveal";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";

interface Options {
  variant?: RevealVariant;
  delay?: number;
  stagger?: number;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: Options = {}
) {
  const ref = useRef<T>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { variant = "fade", delay = 0, stagger = 0.1 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = animateReveal(el, {
      variant,
      delay,
      stagger,
      reducedMotion: reduced,
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [pathname, reduced, variant, delay, stagger]);

  return ref;
}
