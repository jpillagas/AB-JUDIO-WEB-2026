"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { site, uscisServices, courtServices } from "@/lib/site";

const subjectOptions = [
  "Inmigración – Consulta general",
  ...uscisServices.map((s) => s.title),
  ...courtServices.map((s) => s.title),
  "Lesiones Personales",
  "Bienes Raíces",
  "Otro",
];

export default function ContactBlock() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const form = e.currentTarget;
      const data = Object.fromEntries(new FormData(form));
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error en el envío");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    site.whatsappMessage
  )}`;

  return (
    <section className="bg-bone py-24 lg:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <span className="eyebrow">+ Cuéntanos tu caso</span>
          <h2 className="display-2 mt-4">
            Envíanos Un <span className="text-gold">Mensaje</span>
          </h2>
          <p className="mt-4 max-w-lg text-sm text-ink-700">
            Responderemos en menos de 24 horas hábiles. Toda la información que
            compartas se trata de forma estrictamente confidencial.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label className="text-xs uppercase tracking-widest text-ink-700">
                Nombre completo *
              </label>
              <input
                required
                name="name"
                type="text"
                className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 outline-none transition focus:border-ink"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="text-xs uppercase tracking-widest text-ink-700">
                Correo electrónico *
              </label>
              <input
                required
                name="email"
                type="email"
                className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 outline-none transition focus:border-ink"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="text-xs uppercase tracking-widest text-ink-700">
                Teléfono *
              </label>
              <input
                required
                name="phone"
                type="tel"
                className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 outline-none transition focus:border-ink"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="text-xs uppercase tracking-widest text-ink-700">
                País de origen
              </label>
              <input
                name="country"
                type="text"
                className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 outline-none transition focus:border-ink"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-widest text-ink-700">
                Tipo de caso *
              </label>
              <select
                required
                name="subject"
                defaultValue=""
                className="mt-2 w-full appearance-none border-b border-ink/20 bg-transparent py-3 outline-none transition focus:border-ink"
              >
                <option value="" disabled>
                  Selecciona un tipo de caso
                </option>
                {subjectOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-widest text-ink-700">
                Cuéntanos brevemente tu situación *
              </label>
              <textarea
                required
                name="message"
                rows={4}
                className="mt-2 w-full resize-none border-b border-ink/20 bg-transparent py-3 outline-none transition focus:border-ink"
              />
            </div>
            <label className="sm:col-span-2 flex items-start gap-3 text-xs text-ink-700">
              <input
                required
                name="privacy"
                type="checkbox"
                className="mt-0.5 h-4 w-4 accent-gold"
              />
              <span>
                Acepto la política de privacidad y autorizo a El Abogado Judio –
                Neuhauser Law a contactarme respecto a mi consulta.
              </span>
            </label>

            <div className="sm:col-span-2 flex flex-wrap items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-dark disabled:opacity-60"
              >
                {status === "loading" && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {status === "success" && (
                  <CheckCircle2 className="h-4 w-4 text-gold" />
                )}
                {status === "success" ? "Mensaje enviado" : "Enviar mensaje"}
              </button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-ink-700 hover:text-ink"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" /> O escríbenos
                por WhatsApp
              </a>
            </div>

            {status === "error" && (
              <p className="sm:col-span-2 text-sm text-red-600">
                Hubo un problema al enviar. Llámanos al {site.phoneDisplay} o
                escríbenos por WhatsApp.
              </p>
            )}
          </form>
        </motion.div>

        {/* Info */}
        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5"
        >
          <div className="rounded-sm bg-ink p-8 text-bone lg:p-10">
            <h3 className="font-display text-2xl font-semibold text-white">
              Información de contacto
            </h3>
            <p className="mt-3 text-sm text-bone/60">
              Atendemos a la comunidad hispana en Nueva York, Nueva Jersey y
              Connecticut.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-bone/50">
                    Teléfono
                  </div>
                  <a
                    href={`tel:${site.phoneRaw}`}
                    className="text-sm text-white hover:text-gold"
                  >
                    {site.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-bone/50">
                    Email
                  </div>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm text-white hover:text-gold"
                  >
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-bone/50">
                    Oficinas
                  </div>
                  <p className="text-sm text-white">
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                  <Clock className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-bone/50">
                    Horarios
                  </div>
                  <ul className="mt-1 space-y-1 text-sm text-white">
                    {site.hours.map((h) => (
                      <li key={h.day}>
                        <span className="text-bone/60">{h.day}:</span> {h.hours}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-medium uppercase tracking-widest text-white transition hover:bg-[#20BC5A]"
            >
              <MessageCircle className="h-4 w-4" /> Escribir por WhatsApp
            </a>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
