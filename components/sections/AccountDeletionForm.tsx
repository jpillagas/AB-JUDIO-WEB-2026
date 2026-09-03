"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { site } from "@/lib/site";

export default function AccountDeletionForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const form = e.currentTarget;
      const data = Object.fromEntries(new FormData(form));
      const res = await fetch("/api/account-deletion", {
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

  return (
    <form onSubmit={handleSubmit} className="mt-10 grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <label className="text-xs uppercase tracking-widest text-ink-700">
          Nombre completo *
        </label>
        <input
          required
          name="name"
          type="text"
          autoComplete="name"
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
          autoComplete="email"
          className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 outline-none transition focus:border-ink"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="text-xs uppercase tracking-widest text-ink-700">
          Teléfono *
        </label>
        <input
          required
          name="phone"
          type="tel"
          autoComplete="tel"
          className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 outline-none transition focus:border-ink"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="text-xs uppercase tracking-widest text-ink-700">
          Motivo (opcional)
        </label>
        <textarea
          name="reason"
          rows={4}
          placeholder="Cuéntanos por qué deseas eliminar tu cuenta, si lo deseas."
          className="mt-2 w-full resize-none border-b border-ink/20 bg-transparent py-3 outline-none transition focus:border-ink"
        />
      </div>

      <label className="sm:col-span-2 flex items-start gap-3 text-sm text-ink-700">
        <input
          required
          name="confirmDeletion"
          type="checkbox"
          value="yes"
          className="mt-1 h-4 w-4 accent-gold"
        />
        <span>
          <strong className="text-ink">Solicito borrar mi cuenta</strong> de la
          aplicación de {site.name} y autorizo el procesamiento de esta
          solicitud.
        </span>
      </label>

      <label className="sm:col-span-2 flex items-start gap-3 text-xs text-ink-700">
        <input
          required
          name="privacy"
          type="checkbox"
          value="yes"
          className="mt-0.5 h-4 w-4 accent-gold"
        />
        <span>
          Confirmo que la información proporcionada es correcta y corresponde a
          mi cuenta en la app.
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
          {status === "success"
            ? "Solicitud enviada"
            : "Enviar solicitud de borrado"}
        </button>
      </div>

      {status === "error" && (
        <p className="sm:col-span-2 text-sm text-red-600">
          Hubo un problema al enviar. Escríbenos a{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>{" "}
          o llámanos al {site.phoneDisplay}.
        </p>
      )}

      {status === "success" && (
        <p className="sm:col-span-2 text-sm text-ink-700">
          Recibimos tu solicitud. Te contactaremos al correo indicado para
          confirmar la eliminación de tu cuenta.
        </p>
      )}
    </form>
  );
}
