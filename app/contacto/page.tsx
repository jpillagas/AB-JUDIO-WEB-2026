import type { Metadata } from "next";
import CinematicPageHero from "@/components/cinematic/CinematicPageHero";
import ContactHub from "@/components/sections/ContactHub";
import ContactFAQ from "@/components/sections/ContactFAQ";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Agenda tu consulta. Elige Inmigración, Personal Injury o Real Estate y visita nuestras sucursales en NY, NJ y CT.",
};

export default function ContactoPage() {
  return (
    <>
      <CinematicPageHero
        title="Contáctanos"
        subtitle="Agenda tu consulta gratuita y hablemos hoy mismo de tu caso."
        pageKey="contacto"
      />
      <ContactHub />
      <ContactFAQ />
    </>
  );
}
