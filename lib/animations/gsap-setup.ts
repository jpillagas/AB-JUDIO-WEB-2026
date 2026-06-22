"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

let registered = false;

export function registerGsap(): typeof ScrollTrigger {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return ScrollTrigger;
}

/** Call from SmoothScroll after Lenis instance is created */
export function bindLenisToScrollTrigger(lenis: Lenis): () => void {
  const ScrollTrigger = registerGsap();

  const onScroll = () => ScrollTrigger.update();
  lenis.on("scroll", onScroll);

  const ticker = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(ticker);
  };
}

export function killAllScrollTriggers(): void {
  if (typeof window === "undefined") return;
  registerGsap().getAll().forEach((t) => t.kill());
}

export { gsap, ScrollTrigger };
