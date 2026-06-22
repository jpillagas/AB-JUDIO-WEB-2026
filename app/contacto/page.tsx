import type { Metadata } from "next";
import CinematicPageHero from "@/components/cinematic/CinematicPageHero";
import ContactBlock from "@/components/sections/ContactBlock";
import ContactMap from "@/components/sections/ContactMap";
import ContactFAQ from "@/components/sections/ContactFAQ";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Agenda tu consulta gratuita. Contáctanos por teléfono, WhatsApp o formulario. Atendemos a la comunidad hispana en Nueva York, Nueva Jersey y Connecticut.",
};

export default function ContactoPage() {
  return (
    <>
      <CinematicPageHero
        title="Contáctanos"
        subtitle="Agenda tu consulta gratuita y hablemos hoy mismo de tu caso."
        pageKey="contacto"
      />
      <ContactBlock />
      <ContactMap />
      <ContactFAQ />
    </>
  );
}
