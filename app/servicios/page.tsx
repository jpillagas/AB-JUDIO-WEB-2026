import type { Metadata } from "next";
import CinematicPageHero from "@/components/cinematic/CinematicPageHero";
import ServicesPracticeAreas from "@/components/sections/ServicesPracticeAreas";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Servicios legales en Inmigración, Personal Injury y Real Estate para la comunidad hispana en Nueva York, New Jersey y Connecticut.",
};

export default function ServiciosPage() {
  return (
    <>
      <CinematicPageHero
        title="Servicios"
        subtitle="Inmigración, Personal Injury y Real Estate."
        pageKey="servicios"
      />
      <ServicesPracticeAreas />
    </>
  );
}
