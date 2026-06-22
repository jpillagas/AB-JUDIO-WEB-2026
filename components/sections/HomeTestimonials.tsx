"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/site";
import { media } from "@/lib/media";
import { animateReveal } from "@/lib/animations/scroll-reveal";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";
import ParallaxLayer from "@/components/cinematic/ParallaxLayer";
import MediaSlot from "@/components/cinematic/MediaSlot";

export default function HomeTestimonials() {
  const [index, setIndex] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!textRef.current) return;
    const tween = animateReveal(textRef.current, {
      variant: "fade",
      reducedMotion: reduced,
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  return (
    <section className="bg-bone py-24 lg:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <ParallaxLayer speed={0.25} className="relative">
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-sm">
            <MediaSlot
              src={media.sections.testimonials}
              alt="Clientes satisfechos Neuhauser Law"
            />
          </div>
        </ParallaxLayer>

        <div ref={textRef}>
          <span className="eyebrow">+ Testimonios</span>
          <h2 className="display-2 mt-4">
            La Experiencia De Quienes
            <br />
            Ya Confiaron En Nosotros
          </h2>

          <div className="mt-10 min-h-[200px]">
            <Quote className="h-8 w-8 text-gold" />
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mt-4"
              >
                <p className="text-lg leading-relaxed text-ink-800">
                  {testimonials[index].text}
                </p>
                <div className="mt-6">
                  <div className="font-semibold">{testimonials[index].name}</div>
                  <div className="text-xs uppercase tracking-widest text-ink-600">
                    {testimonials[index].role}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Testimonio ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-ink" : "w-3 bg-ink/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
