import type { Metadata } from "next";
import CinematicPageHero from "@/components/cinematic/CinematicPageHero";
import AccountDeletionForm from "@/components/sections/AccountDeletionForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solicitud de eliminación de cuenta",
  description:
    "Solicita el borrado de tu cuenta de la aplicación El Abogado Judío. Formulario para cumplir con los requisitos de Google Play.",
  robots: { index: true, follow: true },
};

export default function ContactAppPage() {
  return (
    <>
      <CinematicPageHero
        title="Eliminar mi cuenta"
        subtitle="Solicitud de borrado de cuenta de la aplicación móvil."
        pageKey="contacto"
      />

      <section className="bg-bone py-20 lg:py-28">
        <div className="container-x max-w-3xl">
          <span className="eyebrow">+ Aplicación móvil</span>
          <h2 className="display-2 mt-4">
            Solicito <span className="text-gold">borrar mi cuenta</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-700">
            Si tienes una cuenta en la aplicación de {site.name}, puedes
            solicitar su eliminación completa mediante este formulario. Usa el
            mismo correo y teléfono con los que te registraste en la app.
          </p>

          <div className="mt-8 space-y-4 border border-ink/10 bg-white p-6 text-sm leading-relaxed text-ink-700 lg:p-8">
            <p className="font-medium text-ink">
              Información sobre el borrado de datos
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Al solicitar el borrado, eliminaremos los datos personales
                asociados a tu cuenta (nombre, correo, teléfono e información
                de perfil en la app).
              </li>
              <li>
                Procesamos las solicitudes en un plazo máximo de{" "}
                <strong>30 días</strong> a partir de la recepción.
              </li>
              <li>
                Algunos datos podrán conservarse solo cuando la ley lo exija
                (por ejemplo, registros legales o fiscales), y por el tiempo
                mínimo necesario.
              </li>
              <li>
                Recibirás una confirmación al correo que indiques en el
                formulario.
              </li>
            </ul>
            <p>
              También puedes escribirnos a{" "}
              <a
                href={`mailto:${site.email}?subject=Solicitud%20de%20eliminaci%C3%B3n%20de%20cuenta%20(app)`}
                className="text-ink underline underline-offset-2"
              >
                {site.email}
              </a>{" "}
              o llamar al {site.phoneDisplay}.
            </p>
          </div>

          <AccountDeletionForm />
        </div>
      </section>
    </>
  );
}
