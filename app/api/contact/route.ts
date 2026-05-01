import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const submissions = new Map<string, number[]>();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PROJECT_TYPE_LABELS: Record<string, string> = {
  launch: "Launch — landing site",
  studio: "Studio — full marketing site",
  scale: "Scale — ongoing partnership",
  custom: "Custom plan (à la carte)",
  other: "Not sure yet",
};

type Payload = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
};

function getIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0];
    if (first) return first.trim();
  }
  const xri = req.headers.get("x-real-ip");
  if (xri) return xri;
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    submissions.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nl2br(s: string): string {
  return escapeHtml(s).split(/\r?\n/).join("<br />");
}

function validate(p: Payload): { ok: true } | { ok: false; error: string } {
  if (!p.name) return { ok: false, error: "Please include your name." };
  if (p.name.length > 100) return { ok: false, error: "Name is too long." };
  if (!p.email || !EMAIL_RE.test(p.email) || p.email.length > 254) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!p.message || p.message.length < 4) {
    return { ok: false, error: "Please share a few details about your project." };
  }
  if (p.message.length > 5000) {
    return { ok: false, error: "Message is too long (max 5000 characters)." };
  }
  if (p.company.length > 200) {
    return { ok: false, error: "Company name is too long." };
  }
  if (p.projectType.length > 50) {
    return { ok: false, error: "Project type is invalid." };
  }
  return { ok: true };
}

function renderEmailHtml(p: Payload & { projectTypeLabel: string }): string {
  const rows: { label: string; value: string }[] = [
    { label: "Name", value: escapeHtml(p.name) },
    {
      label: "Email",
      value: `<a href="mailto:${escapeHtml(p.email)}" style="color:#8A87FF;text-decoration:none;">${escapeHtml(p.email)}</a>`,
    },
  ];
  if (p.company) rows.push({ label: "Company", value: escapeHtml(p.company) });
  rows.push({ label: "Project type", value: escapeHtml(p.projectTypeLabel) });

  const rowsHtml = rows
    .map(
      (r) => `<tr>
        <td style="padding:12px 16px;background:#0F1023;color:#A4A6B5;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;width:140px;border-bottom:1px solid #1F2138;vertical-align:top;">${r.label}</td>
        <td style="padding:12px 16px;background:#15172A;color:#F4F4F8;font-size:14px;border-bottom:1px solid #1F2138;">${r.value}</td>
      </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New lead from ${escapeHtml(p.name)}</title>
  </head>
  <body style="margin:0;padding:32px 16px;background:#070709;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#F4F4F8;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;max-width:640px;width:100%;background:#0B0C18;border:1px solid #1F2138;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="padding:28px 28px 16px 28px;background:linear-gradient(135deg,#111128,#0B0C18);">
          <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#8A87FF;">New lead</div>
          <h1 style="margin:8px 0 0 0;font-size:22px;font-weight:600;letter-spacing:-0.01em;color:#F4F4F8;">From ${escapeHtml(p.name)}</h1>
        </td>
      </tr>
      <tr>
        <td>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${rowsHtml}</table>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 28px 8px 28px;">
          <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#A4A6B5;">Message</div>
          <div style="margin-top:10px;padding:16px 18px;background:#15172A;border:1px solid #1F2138;border-radius:12px;font-size:14px;line-height:1.6;color:#F4F4F8;">${nl2br(p.message)}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 28px 28px 28px;font-size:12px;color:#A4A6B5;">
          Reply directly to this email — replies go straight to
          <a href="mailto:${escapeHtml(p.email)}" style="color:#8A87FF;">${escapeHtml(p.email)}</a>.
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  const b = body as Record<string, unknown>;

  // Honeypot — bots tend to autofill every field. Pretend success so they
  // don't probe; log it server-side for visibility.
  if (typeof b.website === "string" && b.website.trim().length > 0) {
    console.warn("[contact] honeypot tripped", { ip: getIp(req) });
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const payload: Payload = {
    name: typeof b.name === "string" ? b.name.trim() : "",
    email: typeof b.email === "string" ? b.email.trim() : "",
    company: typeof b.company === "string" ? b.company.trim() : "",
    projectType: typeof b.projectType === "string" ? b.projectType.trim() : "",
    message: typeof b.message === "string" ? b.message.trim() : "",
  };

  const v = validate(payload);
  if (!v.ok) {
    return NextResponse.json({ error: v.error }, { status: 400 });
  }

  const ip = getIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions from this address. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;
  if (!apiKey || !to || !from) {
    console.error(
      "[contact] missing env vars (need RESEND_API_KEY, CONTACT_EMAIL_TO, CONTACT_EMAIL_FROM)",
    );
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const projectTypeLabel = payload.projectType
    ? (PROJECT_TYPE_LABELS[payload.projectType] ?? payload.projectType)
    : "—";
  const html = renderEmailHtml({ ...payload, projectTypeLabel });

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: payload.email,
      subject: `New lead from ${payload.name} — Locked In Web Design`,
      html,
    });
    if (error) {
      console.error("[contact] Resend API error", error);
      return NextResponse.json(
        { error: "Could not send your message right now. Please try again." },
        { status: 500 },
      );
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] unexpected error sending email", err);
    return NextResponse.json(
      { error: "Could not send your message right now. Please try again." },
      { status: 500 },
    );
  }
}
