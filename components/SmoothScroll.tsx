"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { bindLenisToScrollTrigger } from "@/lib/animations/gsap-setup";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    const unbindGsap = bindLenisToScrollTrigger(lenis);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      unbindGsap();
      lenis.destroy();
    };
  }, []);

  return null;
}
