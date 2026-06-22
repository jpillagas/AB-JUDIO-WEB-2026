import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, country, subject, message, privacy } = body || {};

    if (!name || !email || !phone || !subject || !message || !privacy) {
      return NextResponse.json(
        { ok: false, error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // TODO: Integración real con Resend / SendGrid / Supabase.
    // Por ahora se loguea en el servidor para que la web sea funcional desde el día uno.
    console.log("[Contacto] nuevo mensaje:", {
      name,
      email,
      phone,
      country,
      subject,
      message,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Contacto] error:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
