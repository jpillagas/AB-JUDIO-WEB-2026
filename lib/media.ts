// lib/media.ts
export const media = {
  /** Logo blanco — fondos oscuros (header, footer) */
  logo: "/imagenes/logo-blanco-abogado-judio-v2.png",
  /** Logo negro — fondos claros */
  logoHeader: "/imagenes/logo-negro-abogado-judio-v2.png",
  logoDark: "/imagenes/logo-negro-abogado-judio-v2.png",
  /** Neuhauser Law PLLC — blanco / negro */
  logoNeuhauser: "/imagenes/NEUHASERLAWpllc-LOGO-blanco.png",
  logoNeuhauserDark: "/imagenes/NEUHASERLAWpllc-LOGO-negro.png",
  hero: {
    background:
      "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=2400&q=80",
    portrait: "/imagenes/markPortada.png",
  },
  pageHeroes: {
    nosotros:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80",
    servicios:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2400&q=80",
    contacto:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80",
    blog:
      "https://images.unsplash.com/photo-1455390572262-044cdead277a?auto=format&fit=crop&w=2400&q=80",
  },
  sections: {
    whyUs: "/imagenes/SeccioNuestrosClientes.png",
    testimonials:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80",
    cta:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=2000&q=80",
  },
} as const;

export type PageHeroKey = keyof typeof media.pageHeroes;
