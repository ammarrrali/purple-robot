import { NextResponse } from "next/server";

// Sends contact-form submissions to the company inbox via Resend.
// Requires RESEND_API_KEY in the environment (https://resend.com — free tier
// covers ~100 emails/day). CONTACT_FROM must be a sender verified in Resend;
// until a domain is verified, Resend's onboarding sender works for testing.
// Without a key the route returns 503 and the form falls back to mailto.

const TO_ADDRESS = "info@codeeee.com";

export async function POST(req: Request) {
  let body: {
    name?: string;
    email?: string;
    message?: string;
    landingPage?: string;
    referrer?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = (body.name ?? "").toString().trim().slice(0, 200);
  const email = (body.email ?? "").toString().trim().slice(0, 200);
  const message = (body.message ?? "").toString().trim().slice(0, 5000);
  // Lead source travels with the enquiry so organic leads can be traced back
  // to the page — and therefore the query — that produced them.
  const landingPage = (body.landingPage ?? "").toString().trim().slice(0, 300);
  const referrer = (body.referrer ?? "").toString().trim().slice(0, 300);

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
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
      from: process.env.CONTACT_FROM ?? "Codeeee Website <onboarding@resend.dev>",
      to: [TO_ADDRESS],
      reply_to: email || undefined,
      subject: `Project inquiry from ${name || "website visitor"}`,
      text:
        `Name: ${name || "—"}\nEmail: ${email || "—"}\n` +
        `Landing page: ${landingPage || "—"}\nReferrer: ${referrer || "—"}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Resend error:", res.status, detail);
    return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
