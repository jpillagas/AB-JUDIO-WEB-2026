import type { Metadata } from "next";
import CinematicPageHero from "@/components/cinematic/CinematicPageHero";
import ServicesIntro from "@/components/sections/ServicesIntro";
import ServicesUSCIS from "@/components/sections/ServicesUSCIS";
import ServicesCourt from "@/components/sections/ServicesCourt";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Servicios legales en inmigración, lesiones personales y bienes raíces: EAD, Visa de Trabajo, TPS, Petición Familiar, Ciudadanía, Green Card, VAWA, Visa U, Estatus Juvenil, Waiver, asilo y más.",
};

export default function ServiciosPage() {
  return (
    <>
      <CinematicPageHero
        title="Servicios"
        subtitle="Inmigración, lesiones personales y bienes raíces."
        pageKey="servicios"
      />
      <ServicesIntro />
      <ServicesUSCIS />
      <ServicesCourt />
    </>
  );
}
