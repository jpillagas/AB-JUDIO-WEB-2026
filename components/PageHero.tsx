/** @deprecated Use CinematicPageHero instead */
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  subtitle?: string;
  bgImage?: string;
  height?: "sm" | "md" | "lg";
}

export default function PageHero({
  title,
  subtitle,
  bgImage = "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2000&q=80",
  height = "md",
}: Props) {
  const heightClass = cn(
    height === "sm" && "h-[40vh] min-h-[300px]",
    height === "md" && "h-[55vh] min-h-[420px]",
    height === "lg" && "h-[75vh] min-h-[560px]"
  );

  return (
    <section className={cn("relative w-full overflow-hidden", heightClass)}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink/85" />
      <div className="relative z-10 flex h-full items-center justify-center text-center">
        <div className="container-x">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="display-1 text-white"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-5 max-w-2xl text-base text-white/70 sm:text-lg"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
