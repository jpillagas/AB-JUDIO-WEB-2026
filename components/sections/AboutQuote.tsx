import ScrollReveal from "@/components/ScrollReveal";

export default function AboutQuote() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 grayscale"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=2400&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-transparent" />
      <div className="container-x relative grid lg:grid-cols-12">
        <ScrollReveal className="lg:col-span-9">
          <blockquote>
            <p className="display-2 leading-tight text-white">
              Ofrecemos asesoría legal confiable y efectiva, con compromiso,
              empatía y excelencia, protegiendo tus derechos en
              <span className="text-gold"> Nueva York, Nueva Jersey y Connecticut.</span>
            </p>
            <footer className="mt-8 text-xs uppercase tracking-[0.3em] text-bone/50">
              — El Abogado Judio
            </footer>
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  );
}
