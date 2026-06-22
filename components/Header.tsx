"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500",
        scrolled
          ? "border-white/10 bg-ink/95 shadow-[0_4px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          : "border-gold/20 bg-white/95 backdrop-blur-md"
      )}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <div className="relative h-11 w-[220px] sm:w-[260px] lg:w-[300px]">
          <Logo
            priority
            variant="header"
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              scrolled ? "pointer-events-none opacity-0" : "opacity-100"
            )}
          />
          <Logo
            variant="light"
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              scrolled ? "opacity-100" : "pointer-events-none opacity-0"
            )}
            imageClassName="h-9 w-auto sm:h-10 lg:h-11 max-w-[220px] sm:max-w-[260px] lg:max-w-[300px]"
          />
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          {site.navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium tracking-wide transition",
                  scrolled
                    ? "text-white/85 hover:text-white"
                    : "text-ink-600 hover:text-ink",
                  active && (scrolled ? "text-white" : "text-ink")
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-gold"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contacto"
            className={cn(
              "hidden items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-widest transition sm:inline-flex",
              scrolled
                ? "border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
                : "btn-primary !px-5 !py-2.5 !text-xs"
            )}
          >
            <ArrowRight className="h-4 w-4" />
            Agendar Cita
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "lg:hidden transition-colors",
              scrolled ? "text-white" : "text-ink"
            )}
            aria-label="Abrir menú"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "border-t lg:hidden",
              scrolled
                ? "border-white/10 bg-ink/95 backdrop-blur-xl"
                : "border-ink/8 bg-white"
            )}
          >
            <div className="container-x flex flex-col gap-1 py-6">
              {site.navigation.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-lg px-3 py-3 text-sm font-medium transition",
                      scrolled
                        ? active
                          ? "text-white"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                        : active
                          ? "text-ink"
                          : "text-ink-600 hover:bg-bone hover:text-ink"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/contacto"
                className={cn(
                  "mt-3 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-medium uppercase tracking-widest transition",
                  scrolled
                    ? "bg-gold text-ink hover:bg-gold-light"
                    : "btn-primary !py-3 !text-xs"
                )}
              >
                <ArrowRight className="h-4 w-4" /> Agendar Cita
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
