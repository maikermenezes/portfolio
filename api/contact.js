// Serverless endpoint: POST /api/contact
// Works as a Vercel Node function. Configure RESEND_API_KEY and MY_EMAIL
// (and optionally RESEND_FROM) in the hosting provider's environment variables.
import { handleContact } from "../server/contact.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  let payload = req.body;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      return res.status(400).json({ ok: false, error: "invalid_json" });
    }
  }

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.socket?.remoteAddress;
  const { status, body } = await handleContact(payload, { env: process.env, ip });
  return res.status(status).json(body);
}
