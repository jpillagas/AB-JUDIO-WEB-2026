import type { Metadata } from "next";
import CinematicPageHero from "@/components/cinematic/CinematicPageHero";
import AboutIntro from "@/components/sections/AboutIntro";
import AboutTeam from "@/components/sections/AboutTeam";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce al equipo de El Abogado Judío – Neuhauser Law. Una firma legal comprometida con la comunidad hispana en Nueva York, Nueva Jersey y Connecticut.",
};

export default function NosotrosPage() {
  return (
    <>
      <CinematicPageHero
        title="Nosotros"
        subtitle="Una firma legal comprometida con la comunidad hispana en NY, NJ y CT."
        pageKey="nosotros"
      />
      <AboutIntro />
      <AboutTeam />
    </>
  );
}
