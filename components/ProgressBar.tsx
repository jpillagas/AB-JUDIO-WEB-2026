"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  label: string;
  percent: number;
}

export default function ProgressBar({ label, percent }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-ink-800">{label}</span>
        <span className="font-display text-base font-semibold">{percent}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-700/15">
        <div
          className="h-full rounded-full bg-gradient-to-r from-ink to-gold transition-all duration-[1.6s] ease-out"
          style={{ width: active ? `${percent}%` : "0%" }}
        />
      </div>
    </div>
  );
}
