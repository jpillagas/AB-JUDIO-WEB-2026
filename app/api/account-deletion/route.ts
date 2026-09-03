import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, reason, confirmDeletion, privacy } = body || {};

    if (!name || !email || !phone || !confirmDeletion || !privacy) {
      return NextResponse.json(
        { ok: false, error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // TODO: Integración real con Resend / SendGrid / Supabase.
    console.log("[AccountDeletion] solicitud de borrado de cuenta (app):", {
      name,
      email,
      phone,
      reason: reason || null,
      confirmDeletion,
      receivedAt: new Date().toISOString(),
      source: "contact-app",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[AccountDeletion] error:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
