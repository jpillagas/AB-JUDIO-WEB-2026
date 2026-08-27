import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts, getPost } from "@/lib/blog";
import { site } from "@/lib/site";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Artículo no encontrado" };
  return { title: post.title, description: post.excerpt };
}

export default function PostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <article>
      <header
        className="relative h-[55vh] min-h-[420px] w-full overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${post.cover})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink/95" />
        <div className="container-x relative flex h-full items-end pb-14">
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Volver al blog
            </Link>
            <h1 className="display-1 mt-5 max-w-3xl text-white">{post.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-bone/60">
              <span>{post.category}</span>
              <span>•</span>
              <span>{new Date(post.date).toLocaleDateString("es-ES")}</span>
              <span>•</span>
              <span>{post.readMinutes} min de lectura</span>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-bone py-20 lg:py-28">
        <div className="container-x mx-auto max-w-3xl">
          <p className="text-xl leading-relaxed text-ink-800">{post.excerpt}</p>
          <div className="gold-line my-10" />
          <div className="prose prose-lg max-w-none text-ink-800">
            {post.body.split("\n").map((p, i) => (
              <p key={i} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-16 rounded-sm bg-ink p-8 text-bone lg:p-10">
            <h3 className="font-display text-2xl font-semibold text-white">
              ¿Tu caso es similar?
            </h3>
            <p className="mt-3 max-w-xl text-sm text-bone/60">
              Cada situación es única. Agenda una consulta gratuita con nuestro
              equipo y te orientamos con honestidad sobre tus opciones.
            </p>
            <Link href={site.bookingSectionHref} className="btn-primary mt-6">
              Agendar consulta gratis
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
