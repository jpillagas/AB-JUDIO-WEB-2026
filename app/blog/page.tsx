import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CinematicPageHero from "@/components/cinematic/CinematicPageHero";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos, guías y noticias sobre inmigración, asilo, lesiones personales y bienes raíces escritos por el equipo de El Abogado Judio.",
};

export default function BlogPage() {
  const [feature, ...rest] = blogPosts;

  return (
    <>
      <CinematicPageHero
        title="Blog"
        subtitle="Guías, noticias y consejos legales para la comunidad hispana en EE. UU."
        pageKey="blog"
      />

      <section className="bg-bone py-24 lg:py-32">
        <div className="container-x">
          {/* Featured */}
          {feature && (
            <Link
              href={`/blog/${feature.slug}`}
              className="reveal group block overflow-hidden rounded-sm bg-ink"
            >
              <div className="grid lg:grid-cols-2">
                <div
                  className="aspect-[16/10] w-full bg-cover bg-center transition duration-700 group-hover:scale-105 lg:aspect-auto lg:h-full"
                  style={{ backgroundImage: `url(${feature.cover})` }}
                />
                <div className="flex flex-col justify-center p-10 text-bone lg:p-14">
                  <span className="eyebrow">+ Destacado · {feature.category}</span>
                  <h2 className="display-2 mt-4 text-white">{feature.title}</h2>
                  <p className="mt-5 max-w-lg text-sm leading-relaxed text-bone/60">
                    {feature.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-widest text-bone/40">
                    <span>{new Date(feature.date).toLocaleDateString("es-ES")}</span>
                    <span>•</span>
                    <span>{feature.readMinutes} min de lectura</span>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold">
                    Leer artículo <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="reveal group block"
              >
                <div className="overflow-hidden rounded-sm bg-ink-800">
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center transition duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${p.cover})` }}
                  />
                </div>
                <div className="mt-5">
                  <span className="text-xs uppercase tracking-widest text-gold">
                    {p.category}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-semibold leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-700">
                    {p.excerpt}
                  </p>
                  <div className="mt-4 text-xs uppercase tracking-widest text-ink-700/60">
                    {new Date(p.date).toLocaleDateString("es-ES")} ·{" "}
                    {p.readMinutes} min
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
