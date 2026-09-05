import type { Metadata } from "next";
import Link from "next/link";
import CinematicPageHero from "@/components/cinematic/CinematicPageHero";
import { privacyPolicy } from "@/lib/privacy-policy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de la aplicación de El Abogado Judío, donde los clientes consultan el seguimiento de su caso.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${site.url}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <CinematicPageHero
        title="Política de Privacidad"
        subtitle="Cómo protegemos la información de los clientes en la aplicación de seguimiento de casos."
        pageKey="contacto"
      />

      <section className="bg-bone py-20 lg:py-28">
        <div className="container-x max-w-3xl">
          <span className="eyebrow">+ Aplicación móvil</span>
          <h2 className="display-2 mt-4">
            Privacidad de tu <span className="text-gold">cuenta y tu caso</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-700">
            Esta política explica qué datos trata {site.name} / {site.legalName}{" "}
            cuando usas la App para ver el seguimiento de tu caso, y cómo puedes
            pedir acceso, corrección o eliminación de tu cuenta.
          </p>
          <p className="mt-3 text-xs uppercase tracking-widest text-ink-700">
            Última actualización: {privacyPolicy.lastUpdated}
          </p>

          <div className="mt-10 space-y-10">
            {privacyPolicy.sections.map((section) => (
              <article key={section.title}>
                <h3 className="font-display text-2xl font-semibold text-ink">
                  {section.title}
                </h3>
                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-base leading-relaxed text-ink-700"
                  >
                    {paragraph}
                  </p>
                ))}
                {"bullets" in section && section.bullets && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-700">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {"closing" in section && section.closing && (
                  <p className="mt-4 text-base leading-relaxed text-ink-700">
                    {section.closing}
                  </p>
                )}
              </article>
            ))}
          </div>

          <div className="mt-14 space-y-4 border border-ink/10 bg-white p-6 text-sm leading-relaxed text-ink-700 lg:p-8">
            <p className="font-medium text-ink">Eliminar mi cuenta de la App</p>
            <p>
              Si ya no quieres usar la aplicación, puedes pedir el borrado de tu
              cuenta. Procesamos esa solicitud en un plazo máximo de 30 días.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/contact-app" className="btn-dark">
                Solicitar borrado de cuenta
              </Link>
              <a href={`mailto:${site.email}`} className="btn-dark bg-ink-700">
                Escribir a {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
