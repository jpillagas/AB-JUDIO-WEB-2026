"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";

export default function ParticleField() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(window.innerWidth >= 1024 && !reduced);
  }, [reduced]);

  if (!show) return null;

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53) % 100}%`,
    size: 2 + (i % 3),
    delay: (i % 10) * 0.8,
    duration: 12 + (i % 8),
  }));

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-gold/40"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
