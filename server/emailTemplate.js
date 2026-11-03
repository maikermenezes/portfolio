// Email template for contact-form submissions, following the portfolio's visual
// identity (ink background, teal accents, Space Grotesk / mono labels).
// Email clients need table layouts + inline styles; web fonts fall back gracefully.

const COLORS = {
  bg: "#05070a",
  surface: "#0d1117",
  surface2: "#141a21",
  line: "#1f2730",
  fg: "#e9eef1",
  muted: "#8b98a3",
  teal: "#00dddd",
  tealDeep: "#008080",
};

const FONT_DISPLAY = "'Space Grotesk', 'Segoe UI', Helvetica, Arial, sans-serif";
const FONT_BODY = "Inter, 'Segoe UI', Helvetica, Arial, sans-serif";
const FONT_MONO = "'JetBrains Mono', 'SFMono-Regular', Menlo, Consolas, monospace";

export const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const label = (text) => `
  <div style="font-family:${FONT_MONO};font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${COLORS.teal};margin:0 0 8px;">
    ${text}
  </div>`;

export const renderContactEmail = ({ name, email, message, receivedAt = new Date() }) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br />");
  const initial = escapeHtml(name.trim().charAt(0).toUpperCase() || "?");
  const date = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(receivedAt);
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Re: your message")}`;

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <title>New message from ${safeName}</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</head>
<body style="margin:0;padding:0;background:${COLORS.bg};">
  <!-- Preheader (inbox preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${safeName} sent you a message through your portfolio.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.bg};background-image:radial-gradient(ellipse at top, rgba(0,221,221,0.14), transparent 60%);">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">

          <!-- Brand row -->
          <tr>
            <td style="padding:0 4px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="40" height="40" align="center" style="width:40px;height:40px;border:2px solid ${COLORS.teal};border-radius:50%;font-family:${FONT_DISPLAY};font-weight:700;font-size:18px;color:${COLORS.teal};line-height:36px;">M</td>
                        <td style="padding-left:12px;font-family:${FONT_DISPLAY};font-weight:600;font-size:15px;color:${COLORS.fg};">Maike Menezes</td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align:middle;font-family:${FONT_MONO};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${COLORS.muted};">
                    <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${COLORS.teal};margin-right:8px;vertical-align:middle;"></span>Portfolio · Contact
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:${COLORS.surface};border:1px solid ${COLORS.line};border-radius:24px;overflow:hidden;">
              <!-- Teal top bar -->
              <div style="height:3px;line-height:3px;font-size:0;background:${COLORS.teal};background-image:linear-gradient(90deg, ${COLORS.tealDeep}, ${COLORS.teal}, #5ff2ec);">&nbsp;</div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <!-- Heading -->
                <tr>
                  <td style="padding:36px 36px 8px;">
                    ${label("— New message")}
                    <h1 style="margin:0;font-family:${FONT_DISPLAY};font-weight:600;font-size:34px;line-height:1.1;letter-spacing:-0.02em;color:${COLORS.fg};">
                      Someone wants to <span style="color:${COLORS.teal};">build something</span> with you.
                    </h1>
                  </td>
                </tr>

                <!-- Sender -->
                <tr>
                  <td style="padding:28px 36px 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.surface2};border:1px solid ${COLORS.line};border-radius:16px;">
                      <tr>
                        <td width="56" style="padding:18px 0 18px 18px;vertical-align:middle;">
                          <div style="width:44px;height:44px;border-radius:50%;background:${COLORS.teal};text-align:center;font-family:${FONT_DISPLAY};font-weight:700;font-size:20px;line-height:44px;color:${COLORS.bg};">${initial}</div>
                        </td>
                        <td style="padding:18px;vertical-align:middle;">
                          <div style="font-family:${FONT_DISPLAY};font-weight:600;font-size:17px;color:${COLORS.fg};">${safeName}</div>
                          <a href="mailto:${safeEmail}" style="font-family:${FONT_MONO};font-size:13px;color:${COLORS.teal};text-decoration:none;">${safeEmail}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td style="padding:28px 36px 0;">
                    ${label("Message")}
                    <div style="border-left:2px solid ${COLORS.teal};padding:4px 0 4px 18px;font-family:${FONT_BODY};font-size:16px;line-height:1.7;color:${COLORS.fg};word-break:break-word;">
                      ${safeMessage}
                    </div>
                  </td>
                </tr>

                <!-- CTA -->
                <tr>
                  <td style="padding:36px 36px 36px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="border-radius:999px;background:${COLORS.teal};box-shadow:0 0 32px rgba(0,221,221,0.45);">
                          <a href="${replyHref}" style="display:inline-block;padding:14px 28px;font-family:${FONT_BODY};font-weight:500;font-size:15px;color:${COLORS.bg};text-decoration:none;border-radius:999px;">
                            Reply to ${safeName} &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                    <div style="margin-top:14px;font-family:${FONT_BODY};font-size:13px;color:${COLORS.muted};">
                      Or just hit reply — this email's reply-to is set to the sender.
                    </div>
                  </td>
                </tr>

                <!-- Meta strip -->
                <tr>
                  <td style="border-top:1px solid ${COLORS.line};padding:16px 36px;font-family:${FONT_MONO};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${COLORS.muted};">
                    Received ${escapeHtml(date)} · GMT-3
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:28px 16px 0;font-family:${FONT_DISPLAY};font-weight:700;font-size:56px;letter-spacing:-0.03em;line-height:1;color:${COLORS.surface2};">
              MAIKE
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:12px 16px 0;font-family:${FONT_MONO};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:${COLORS.muted};">
              Sent from the contact form on your portfolio
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `New message from your portfolio`,
    ``,
    `From: ${name} <${email}>`,
    `Received: ${date} (GMT-3)`,
    ``,
    message,
    ``,
    `— Reply directly to this email to answer ${name}.`,
  ].join("\n");

  return { html, text };
};
