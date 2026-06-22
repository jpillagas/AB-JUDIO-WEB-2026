"use client";

import { gsap, registerGsap } from "@/lib/animations/gsap-setup";

export type RevealVariant = "fade" | "scale" | "mask" | "stagger";

interface RevealOptions {
  variant?: RevealVariant;
  delay?: number;
  stagger?: number;
  start?: string;
  reducedMotion?: boolean;
}

export function animateReveal(
  el: HTMLElement,
  options: RevealOptions = {}
): gsap.core.Tween | gsap.core.Timeline {
  const {
    variant = "fade",
    delay = 0,
    stagger = 0.1,
    start = "top 85%",
    reducedMotion = false,
  } = options;

  registerGsap();

  if (reducedMotion) {
    if (variant === "stagger") {
      const kids = Array.from(el.children) as HTMLElement[];
      gsap.set(kids, { clearProps: "all", opacity: 1, y: 0 });
    } else if (variant === "mask") {
      gsap.set(el, { clearProps: "clipPath,opacity,transform", opacity: 1 });
    } else {
      gsap.set(el, { clearProps: "opacity,transform", opacity: 1, y: 0 });
    }
    return gsap.to(el, { opacity: 1, duration: 0.5, delay });
  }

  const children =
    variant === "stagger"
      ? (Array.from(el.children) as HTMLElement[])
      : [];

  const tweenConfig = {
    scrollTrigger: {
      trigger: el,
      start,
      toggleActions: "play none none none",
    },
    delay,
  };

  switch (variant) {
    case "scale":
      gsap.set(el, { opacity: 0, scale: 0.92 });
      return gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        ...tweenConfig,
      });
    case "mask":
      gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
      return gsap.to(el, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
        ease: "power3.inOut",
        ...tweenConfig,
      });
    case "stagger":
      gsap.set(children, { opacity: 0, y: 40 });
      return gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger,
        ease: "power3.out",
        ...tweenConfig,
      });
    case "fade":
    default:
      gsap.set(el, { opacity: 0, y: 40 });
      return gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        ...tweenConfig,
      });
  }
}
