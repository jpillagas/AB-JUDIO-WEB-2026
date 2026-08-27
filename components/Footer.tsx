import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import Logo from "@/components/Logo";
import { site } from "@/lib/site";

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.5 2h3.1c.2 1.6 1 2.9 2.3 3.7 1 .6 2.1.9 3.1.9v3.1a8.6 8.6 0 0 1-5.3-1.7v6.6c0 4.4-3.5 7.4-7.4 7.4S1 18.9 1 14.5 4.5 7 8.4 7c.4 0 .8 0 1.2.1v3.2c-.4-.1-.8-.2-1.2-.2-2.4 0-4.1 1.9-4.1 4.4s1.7 4.4 4.1 4.4 4.1-1.9 4.1-4.4V2z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink text-bone/80">
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo
              variant="light"
              dual
              imageClassName="h-[34px] sm:h-[39px] max-w-[95px] sm:max-w-[110px]"
              partnerImageClassName="h-[38px] sm:h-[44px] max-w-[140px] sm:max-w-[160px]"
            />

            <p className="mt-6 max-w-md text-sm leading-relaxed text-bone/60">
              Contáctanos o agenda una cita presencial. Defendemos tus derechos
              en Nueva York, Nueva Jersey y Connecticut.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold" />
                <a href={`tel:${site.phoneRaw}`} className="hover:text-white">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold" />
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gold" />
                <span>
                  {site.address.line1}, {site.address.line2}
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
              Enlaces
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {site.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-bone/60 hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
              Otros Servicios
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/servicios#inmigracion" className="text-bone/60 hover:text-white">
                  Inmigración
                </Link>
              </li>
              <li>
                <Link href="/servicios#personal-injury" className="text-bone/60 hover:text-white">
                  Personal Injury
                </Link>
              </li>
              <li>
                <Link href="/servicios#real-estate" className="text-bone/60 hover:text-white">
                  Real Estate
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
              Síguenos
            </h4>
            <div className="mt-5 flex gap-3">
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-gold hover:text-gold"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-gold hover:text-gold"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={site.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-gold hover:text-gold"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/5 pt-6 text-xs text-bone/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>
            Diseñado con cuidado para la comunidad hispana en NY, NJ y CT.
          </p>
        </div>
      </div>
    </footer>
  );
}
