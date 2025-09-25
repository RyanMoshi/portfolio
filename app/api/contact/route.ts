import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const NOTIFY_EMAIL = "ryanmoshi77@gmail.com";
// IMPORTANT: Emails can't load images from localhost. Default to your live site,
// and allow overriding via env SITE_URL when deploying elsewhere.
const SITE_URL = process.env.SITE_URL || "https://ryan-moshi-portfolio.lindy.site";
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const FROM_EMAIL = process.env.MAIL_FROM || "Ryan Moshi <noreply@your-domain.com>";

async function sendEmail(to: string, subject: string, html: string) {
  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP not configured. Set SMTP_USER and SMTP_PASS in .env.local");
  }
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  await transporter.sendMail({ from: FROM_EMAIL, to, subject, html });
}

function renderUserTemplate(name: string) {
  const logo = `${SITE_URL}/images/ryan-profile-red.jpg`;
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0f16;color:#fff;padding:24px;font-family:Inter,system-ui,Arial,sans-serif">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#111827;border-radius:16px;overflow:hidden">
          <tr>
            <td style="background:#ef4444;padding:20px 24px;text-align:center">
              <img src="${logo}" alt="Ryan Moshi" width="56" height="56" style="border-radius:12px;display:block;margin:0 auto 8px" />
              <div style="font-size:18px;font-weight:700;letter-spacing:.3px;margin:0;color:#fff">Ryan Moshi</div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 24px 8px">
              <h1 style="margin:0 0 10px;font-size:22px;font-weight:700;letter-spacing:.3px;color:#fff">Thank you, ${name}!</h1>
              <p style="margin:0 0 16px;opacity:.9;line-height:1.6;color:#e5e7eb">Your message has been received. I’ll get back to you shortly. In the meantime, feel free to explore recent work and capabilities.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 24px 24px;text-align:center">
              <a href="${SITE_URL}" style="display:inline-block;background:#ef4444;color:#fff;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:600">Visit Portfolio</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}

function renderOwnerTemplate(payload: any) {
  const entries = Object.entries(payload) as [string, string][];
  const rows = entries
    .map(([k, v]) => `<tr><td style="padding:6px 12px;background:#0b0f16;color:#9ca3af">${k}</td><td style="padding:6px 12px;background:#111827;color:#fff">${(v||"")
      .toString()
      .replace(/</g, "&lt;")}</td></tr>`) 
    .join("");
  const logo = `${SITE_URL}/images/ryan-profile-red.jpg`;
  const retrosoft = `${SITE_URL}/images/retrosoft-logo.png`;
  const retroworld = `${SITE_URL}/images/retroworld-logo.png`;
  const dropex = `${SITE_URL}/images/dropex-logo-blue.png`;
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0f16;color:#fff;padding:24px;font-family:Inter,system-ui,Arial,sans-serif">
    <tr><td align="center">
      <table role="presentation" width="700" cellpadding="0" cellspacing="0" style="max-width:700px;background:#111827;border-radius:16px;overflow:hidden">
        <tr>
          <td style="background:#ef4444;padding:16px 20px;text-align:center">
            <img src="${logo}" width="44" height="44" alt="Ryan Moshi" style="border-radius:10px;display:block;margin:0 auto 8px" />
            <div style="font-weight:700;color:#fff;margin:0">New Contact Form Submission</div>
          </td>
        </tr>
        <tr><td style="padding:16px 20px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
            ${rows}
          </table>
        </td></tr>
        <tr>
          <td style="padding:12px 20px 20px;text-align:center;opacity:.9">
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto">
              <tr>
                <td style="padding:0 6px"><img src="${retrosoft}" width="28" height="28" alt="Retrosoft" style="border-radius:6px;display:block" /></td>
                <td style="padding:0 6px"><img src="${retroworld}" width="28" height="28" alt="RetroWorld Studios" style="border-radius:6px;display:block" /></td>
                <td style="padding:0 6px"><img src="${dropex}" width="28" height="28" alt="DropEx Logistics" style="border-radius:6px;display:block" /></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>`;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, projectName, projectType, budget, timeline, description, source } = data;

    // Enhanced validation
    if (!name || !email || !projectName || !projectType || !description) {
      return NextResponse.json({ 
        error: "Missing required fields. Please fill in all required fields." 
      }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: "Please provide a valid email address." 
      }, { status: 400 });
    }

    // Prepare enhanced data for email templates
    const enhancedData = {
      name: name.trim(),
      email: email.trim(),
      projectName: projectName.trim(),
      projectType: projectType,
      budget: budget ? `$${Number(budget).toLocaleString()}` : 'Not specified',
      timeline: timeline ? `${timeline} months` : 'Not specified',
      description: description.trim(),
      source: source || 'Not specified',
      submittedAt: new Date().toLocaleString()
    };

    await Promise.all([
      sendEmail(email, "Thanks for reaching out to Ryan Moshi", renderUserTemplate(name)),
      sendEmail(NOTIFY_EMAIL, "New Project Inquiry - Portfolio Contact", renderOwnerTemplate(enhancedData)),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Contact form error:', err);
    return NextResponse.json({ 
      error: err?.message || "Failed to send message. Please try again later." 
    }, { status: 500 });
  }
}


