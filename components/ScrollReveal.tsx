"use client";

import { useScrollReveal } from "@/lib/animations/useScrollReveal";
import type { RevealVariant } from "@/lib/animations/scroll-reveal";

interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  stagger?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  variant = "fade",
  delay = 0,
  stagger = 0.1,
}: Props) {
  const ref = useScrollReveal<HTMLDivElement>({ variant, delay, stagger });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
