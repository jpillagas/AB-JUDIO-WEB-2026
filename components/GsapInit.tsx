"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { registerGsap, killAllScrollTriggers } from "@/lib/animations/gsap-setup";

export default function GsapInit() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    registerGsap();
  }, []);

  useEffect(() => {
    const ScrollTrigger = registerGsap();

    if (isFirst.current) {
      isFirst.current = false;
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }

    killAllScrollTriggers();
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
