"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fallback para elementos con clase "reveal" (blog, legacy).
 * Se re-escanea en cada cambio de ruta.
 */
export default function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    function revealInView(el: HTMLElement) {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.88 && rect.bottom > 0;
      if (inView) el.classList.add("visible");
    }

    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window) || els.length === 0) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => {
      el.classList.remove("visible");
      revealInView(el);
      if (!el.classList.contains("visible")) io.observe(el);
    });

    const mo = new MutationObserver(() => {
      const fresh = document.querySelectorAll<HTMLElement>(".reveal:not(.visible)");
      fresh.forEach((el) => {
        revealInView(el);
        if (!el.classList.contains("visible")) io.observe(el);
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
