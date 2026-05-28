import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { contactSchema } from "../src/lib/contact-schema";

// In-memory sliding-window rate limit. Reset on cold start (acceptable for low-traffic marketing site).
// Swap for Upstash Redis when traffic warrants it.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ipHits = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (hits.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, hits);
    return false;
  }
  hits.push(now);
  ipHits.set(ip, hits);
  return true;
}

function clientIp(req: VercelRequest): string {
  const fwd = req.headers["x-forwarded-for"];
  const raw = Array.isArray(fwd) ? fwd[0] : fwd;
  return (raw?.split(",")[0].trim()) || req.socket?.remoteAddress || "unknown";
}

function makeRef(): string {
  return "TP-" + Math.random().toString(36).slice(2, 10).toUpperCase();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: "Invalid form data",
      issues: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })),
    });
  }

  const data = parsed.data;

  // Honeypot: silently succeed without sending
  if (data.hp_field) {
    return res.status(200).json({ ok: true, ref: makeRef() });
  }

  if (!rateLimit(clientIp(req))) {
    return res.status(429).json({ ok: false, error: "Too many requests" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "TalentPortal <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return res.status(500).json({ ok: false, error: "Email is not configured" });
  }

  const ref = makeRef();
  const resend = new Resend(apiKey);

  const html = `
    <h2>New TalentPortal sales lead — ${escapeHtml(ref)}</h2>
    <p><strong>From:</strong> ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)} &lt;${escapeHtml(data.email)}&gt;</p>
    <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
    <p><strong>Team size:</strong> ${escapeHtml(data.size)}</p>
    <p><strong>Interested in:</strong> ${escapeHtml(data.topic)}</p>
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(data.message)}</pre>
  `;

  const text = [
    `New TalentPortal sales lead — ${ref}`,
    "",
    `From: ${data.firstName} ${data.lastName} <${data.email}>`,
    `Company: ${data.company}`,
    `Team size: ${data.size}`,
    `Interested in: ${data.topic}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  try {
    const result = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject: `[TalentPortal] ${data.firstName} ${data.lastName} (${data.company}) — ${data.topic}`,
      html,
      text,
    });
    if (result.error) {
      console.error("[contact] Resend error", result.error);
      return res.status(502).json({ ok: false, error: "Email provider rejected the message" });
    }
    return res.status(200).json({ ok: true, ref });
  } catch (err) {
    console.error("[contact] Send failed", err);
    return res.status(500).json({ ok: false, error: "Failed to send message" });
  }
}

// Test-only export: lets vitest reset rate-limit state between tests
export const __testReset = () => ipHits.clear();
