import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutIntro() {
  return (
    <section className="bg-bone py-24 lg:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <ScrollReveal variant="mask" className="relative lg:col-span-5">
          <div
            className="aspect-[4/5] w-full rounded-sm bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80')",
            }}
          />
          <div className="absolute bottom-6 left-6 rounded-sm bg-ink p-6 text-white shadow-xl">
            <div className="font-display text-3xl font-semibold text-gold">+12</div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-bone/70">
              Personal
              <br />
              capacitado
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="lg:col-span-7 lg:pl-6">
          <span className="eyebrow">+ Quiénes somos</span>
          <h2 className="display-2 mt-4">
            Una Firma Legal Para
            <br />
            <span className="text-gold">Casos Migratorios</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-700">
            Nuestro propósito es servir a la comunidad de habla hispana en Nueva
            York, Nueva Jersey y Connecticut. Nos especializamos en inmigración,
            bienes raíces y lesiones personales.
          </p>

          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl font-semibold">Misión</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">
                Brindar asesoramiento y representación legal de alta calidad en
                inmigración, bienes raíces y lesiones personales, comprometidos
                por proteger los derechos de nuestros clientes y ofrecer
                soluciones legales efectivas a una comunidad diversa en Nueva
                York, Nueva Jersey y Connecticut.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold">Visión</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">
                Ser reconocidos como la firma de abogados más confiable y
                accesible de la región, destacando por nuestro compromiso con la
                excelencia, la empatía y el profesionalismo, y siendo líderes en
                la defensa de los derechos de nuestros clientes.
              </p>
            </div>
          </div>

          <Link href="/servicios" className="btn-dark mt-10">
            Conocer Más <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
