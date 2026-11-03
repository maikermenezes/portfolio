import { renderContactEmail } from "./emailTemplate.js";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
// Resend's shared sender works without domain verification (it can only deliver
// to the account owner's address, which is exactly our use case). Set
// RESEND_FROM to e.g. "Portfolio <contact@yourdomain.com>" after verifying a domain.
const DEFAULT_FROM = "Portfolio <onboarding@resend.dev>";

const LIMITS = { name: 100, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

// Best-effort, per-instance rate limit (serverless instances don't share memory).
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map();

const rateLimited = (ip) => {
  if (!ip) return false;
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
};

const clean = (value) => (typeof value === "string" ? value.trim() : "");

/**
 * Validates a contact submission and sends it to MY_EMAIL through Resend.
 * Returns { status, body } so it can be wrapped by any HTTP runtime.
 */
export const handleContact = async (payload, { env, ip } = {}) => {
  const name = clean(payload?.name);
  const email = clean(payload?.email);
  const message = clean(payload?.message);
  const honeypot = clean(payload?.website);

  // Bots fill the hidden field: pretend success, send nothing.
  if (honeypot) return { status: 200, body: { ok: true } };

  if (!name || !email || !message) {
    return { status: 400, body: { ok: false, error: "missing_fields" } };
  }
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return { status: 400, body: { ok: false, error: "too_long" } };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: 400, body: { ok: false, error: "invalid_email" } };
  }
  if (rateLimited(ip)) {
    return { status: 429, body: { ok: false, error: "rate_limited" } };
  }

  const apiKey = env?.RESEND_API_KEY;
  const to = env?.MY_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY or MY_EMAIL is not configured");
    return { status: 500, body: { ok: false, error: "not_configured" } };
  }

  const { html, text } = renderContactEmail({ name, email, message });
  const safeSubjectName = name.replace(/[\r\n]+/g, " ").slice(0, 80);

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.RESEND_FROM || DEFAULT_FROM,
        to: [to],
        reply_to: email,
        subject: `✦ New message from ${safeSubjectName}`,
        html,
        text,
        tags: [{ name: "source", value: "portfolio_contact" }],
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(`[contact] Resend responded ${response.status}: ${detail}`);
      return { status: 502, body: { ok: false, error: "send_failed" } };
    }

    const data = await response.json().catch(() => ({}));
    return { status: 200, body: { ok: true, id: data.id } };
  } catch (error) {
    console.error("[contact] Failed to reach Resend:", error);
    return { status: 502, body: { ok: false, error: "send_failed" } };
  }
};
