module.exports = [
"[project]/.next-internal/server/app/api/contact/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/contact/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const NOTIFY_EMAIL = "ryanmoshi77@gmail.com";
const FROM_EMAIL = process.env.MAIL_FROM || "Ryan Moshi <onboarding@resend.dev>";
async function sendEmail(to, subject, html) {
    const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            from: FROM_EMAIL,
            to,
            subject,
            html
        })
    });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Email send failed: ${res.status} ${body}`);
    }
}
function renderUserTemplate(name) {
    return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0f16;color:#fff;padding:24px;font-family:Inter,system-ui,Arial,sans-serif">
    <tr>
      <td align="center">
        <table width="600" style="max-width:600px;background:#111827;border-radius:12px;padding:24px">
          <tr>
            <td style="text-align:center">
              <img src="https://ryan-moshi-portfolio.lindy.site/logo.png" alt="Ryan Moshi" width="56" height="56" style="display:block;margin:0 auto 12px;border-radius:12px"/>
              <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;letter-spacing:.3px">Thank you, ${name}!</h1>
              <p style="margin:0 0 16px;opacity:.85">Your message has been received. I’ll get back to you shortly.</p>
              <a href="https://ryan-moshi-portfolio.lindy.site" style="display:inline-block;background:#ef4444;color:#fff;text-decoration:none;padding:10px 16px;border-radius:8px;font-weight:600">Visit Portfolio</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}
function renderOwnerTemplate(payload) {
    const entries = Object.entries(payload);
    const rows = entries.map(([k, v])=>`<tr><td style="padding:6px 12px;background:#0b0f16;color:#9ca3af">${k}</td><td style="padding:6px 12px;background:#111827;color:#fff">${(v || "").toString().replace(/</g, "&lt;")}</td></tr>`).join("");
    return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0f16;color:#fff;padding:24px;font-family:Inter,system-ui,Arial,sans-serif">
    <tr><td align="center">
      <table width="700" style="max-width:700px;background:#111827;border-radius:12px;padding:0 0 8px">
        <tr><td style="padding:20px 24px"><h2 style="margin:0;font-size:18px">New Contact Form Submission</h2></td></tr>
        <tr><td>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${rows}</table>
        </td></tr>
      </table>
    </td></tr>
  </table>`;
}
async function POST(req) {
    try {
        const data = await req.json();
        const { name, email } = data;
        if (!name || !email) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing required fields"
            }, {
                status: 400
            });
        }
        if (!RESEND_API_KEY) {
            // In local/dev, allow submissions without sending email so the UI works.
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: true,
                note: "Email disabled (missing RESEND_API_KEY)."
            });
        }
        await Promise.all([
            sendEmail(email, "Thanks for reaching out to Ryan", renderUserTemplate(name)),
            sendEmail(NOTIFY_EMAIL, "New Portfolio Contact Submission", renderOwnerTemplate(data))
        ]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true
        });
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err?.message || "Unknown error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e97a16d1._.js.map