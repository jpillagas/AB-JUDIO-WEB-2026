"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/animations/gsap-setup";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";

interface Props {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxLayer({ children, speed = 0.3, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const el = ref.current;
    registerGsap();
    const tween = gsap.to(el, {
      y: () => speed * 120,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed, reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
