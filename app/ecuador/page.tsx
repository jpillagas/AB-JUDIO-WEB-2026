import type { Metadata } from "next";
import EcuadorLanding from "@/components/sections/EcuadorLanding";

export const metadata: Metadata = {
  title: "El Abogado Judío en Cuenca, Ecuador",
  description:
    "Misma marca, ahora también en Ecuador. Asesoría legal en Cuenca: visas, consultas migratorias y atención personalizada.",
};

export default function EcuadorPage() {
  return <EcuadorLanding />;
}
