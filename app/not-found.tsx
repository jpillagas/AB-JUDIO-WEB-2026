import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-ink text-bone">
      <div className="container-x text-center">
        <p className="eyebrow justify-center">+ Error 404</p>
        <h1 className="display-1 mt-4 text-white">Página no encontrada</h1>
        <p className="mx-auto mt-5 max-w-lg text-bone/60">
          La página que buscas no existe o fue movida. Vuelve al inicio o
          contáctanos directamente.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/" className="btn-primary">
            Volver al inicio
          </Link>
          <Link href="/contacto" className="btn-ghost">
            Contactar
          </Link>
        </div>
      </div>
    </section>
  );
}
