import { NextResponse } from "next/server";

// Sends careers/job applications to the company inbox via Resend.
// Requires RESEND_API_KEY in the environment (https://resend.com). CONTACT_FROM
// must be a sender verified in Resend. Without a key the route returns 503 and
// the form falls back to mailto so an application is never lost.

const TO_ADDRESS = "info@codeeee.com";

export async function POST(req: Request) {
  let body: { name?: string; email?: string; role?: string; link?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = (body.name ?? "").toString().trim().slice(0, 200);
  const email = (body.email ?? "").toString().trim().slice(0, 200);
  const role = (body.role ?? "").toString().trim().slice(0, 200);
  const link = (body.link ?? "").toString().trim().slice(0, 500);
  const message = (body.message ?? "").toString().trim().slice(0, 5000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Codeeee Careers <onboarding@resend.dev>",
      to: [TO_ADDRESS],
      reply_to: email || undefined,
      subject: `Job application${role ? ` — ${role}` : ""} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nRole: ${role || "—"}\nPortfolio/LinkedIn: ${link || "—"}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Resend error (careers):", res.status, detail);
    return NextResponse.json({ error: "Failed to send application" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
