export default function ContactMap() {
  return (
    <section className="bg-ink">
      <div className="relative h-[440px] w-full overflow-hidden">
        <iframe
          title="Ubicación El Abogado Judio – Neuhauser Law"
          src="https://www.google.com/maps?q=Brooklyn,New+York&output=embed"
          loading="lazy"
          className="absolute inset-0 h-full w-full grayscale"
          style={{ filter: "grayscale(0.9) contrast(1.1)" }}
        />
      </div>
    </section>
  );
}
