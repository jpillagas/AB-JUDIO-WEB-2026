import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CinematicPageHero from "@/components/cinematic/CinematicPageHero";
import GoHighLevelCalendar from "@/components/booking/GoHighLevelCalendar";
import { bookingCalendars, site } from "@/lib/site";

const calendar = bookingCalendars.realEstate;

export const metadata: Metadata = {
  title: "Citas de Real Estate",
  description:
    "Agenda tu consulta de bienes raíces en El Abogado Judío. Elige el horario disponible en NY, NJ y CT.",
};

export default function RealEstateCitasPage() {
  return (
    <>
      <CinematicPageHero
        title={calendar.title}
        subtitle={calendar.subtitle}
        pageKey="contacto"
      />

      <section className="bg-bone py-16 lg:py-20">
        <div className="container-x">
          <Link
            href={site.bookingSectionHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-700 transition hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a elegir área de consulta
          </Link>

          <div className="mt-8 overflow-hidden border border-ink/10 bg-white shadow-[0_12px_40px_rgba(10,10,10,0.06)]">
            <div className="px-2 py-4 sm:px-4" data-lenis-prevent>
              <GoHighLevelCalendar
                src={calendar.widgetSrc}
                iframeId={calendar.iframeId}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
