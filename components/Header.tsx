"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const linkClass = (active: boolean) =>
    cn(
      "relative text-sm font-medium tracking-wide text-white/85 transition hover:text-white",
      active && "text-white"
    );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500",
        scrolled
          ? "border-white/10 bg-ink/95 shadow-[0_4px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          : "border-transparent bg-black/25 backdrop-blur-sm"
      )}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Logo
          priority
          variant="light"
          dual
          imageClassName="h-[27px] sm:h-[32px] lg:h-[36px] max-w-[76px] sm:max-w-[90px] lg:max-w-[104px]"
          partnerImageClassName="h-[34px] sm:h-[40px] lg:h-[44px] max-w-[118px] sm:max-w-[138px] lg:max-w-[158px]"
        />

        <nav className="hidden items-center gap-8 lg:flex">
          {site.navigation.map((item) => {
            const active =
              pathname === item.href ||
              (item.href === "/servicios" && pathname.startsWith("/servicios"));

            if (item.href === "/servicios") {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={cn(linkClass(active), "inline-flex items-center gap-1")}
                    aria-expanded={servicesOpen}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition",
                        servicesOpen && "rotate-180"
                      )}
                    />
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-gold"
                      />
                    )}
                  </Link>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18 }}
                        className={cn(
                          "absolute left-0 top-full z-50 min-w-[220px] pt-3"
                        )}
                      >
                        <div className="overflow-hidden rounded-sm border border-white/10 bg-ink py-2 shadow-xl">
                          {site.servicesSubmenu.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="block px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link key={item.href} href={item.href} className={linkClass(active)}>
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
            href={site.bookingSectionHref}
            className={cn(
              "hidden items-center gap-2 rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-widest transition sm:inline-flex",
              isHome || scrolled
                ? "border border-white/30 bg-white/5 text-white hover:bg-white/15"
                : "btn-primary !px-5 !py-2.5 !text-xs"
            )}
          >
            <ArrowRight className="h-3.5 w-3.5" />
            Agendar Cita
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-white transition-colors lg:hidden"
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
            className="border-t border-white/10 bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-6">
              {site.navigation.map((item) => {
                const active = pathname === item.href;

                if (item.href === "/servicios") {
                  return (
                    <div key={item.href}>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium transition",
                          active
                            ? "text-white"
                            : "text-white/80 hover:bg-white/10"
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition",
                            mobileServicesOpen && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-3"
                          >
                            <Link
                              href="/servicios"
                              className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:text-white"
                            >
                              Ver todos
                            </Link>
                            {site.servicesSubmenu.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:text-white"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-lg px-3 py-3 text-sm font-medium transition",
                      active
                        ? "text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href={site.bookingSectionHref}
                className={cn(
                  "mt-3 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-medium uppercase tracking-widest transition",
                  isHome
                    ? "border border-white/30 bg-white/5 text-white hover:bg-white/15"
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
