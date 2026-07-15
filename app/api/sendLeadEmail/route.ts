import { NextResponse } from "next/server";

import { sendEmails } from "@/lib/email";
import { quickLeadSchema, SERVICE_OPTIONS } from "@/lib/validations/lead";

/** Same recipients as the main contact form (app/api/sendContactEmail/route.ts). */
const ADMIN_EMAILS = [
  "amit@axiom-renovation.com",
  "scott@axiom-renovation.com",
  "dgxagent@gmail.com",
];

const ADMIN_SUBJECT = "New quick lead from website";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function serviceLabel(value: string): string {
  return SERVICE_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lead = quickLeadSchema.parse(body);

    const rows: [string, string][] = [
      ["Name", lead.name],
      ["Phone", lead.phone],
      ["Service", serviceLabel(lead.service)],
    ];
    if (lead.page) rows.push(["Page", lead.page]);

    const attribution = lead.attribution ?? {};
    for (const [key, value] of Object.entries(attribution)) {
      if (value) rows.push([key, value]);
    }

    const rowsHtml = rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:4px 12px 4px 0;font-weight:600;color:#171717">${escapeHtml(
            label
          )}</td><td style="padding:4px 0;color:#4D4D4D">${escapeHtml(value)}</td></tr>`
      )
      .join("");

    const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px">
      <h2 style="color:#171717;margin:0 0 4px">New quick lead</h2>
      <p style="color:#4D4D4D;margin:0 0 16px">Submitted from the website lead form.</p>
      <table style="border-collapse:collapse;font-size:14px">${rowsHtml}</table>
    </div>`;

    await sendEmails(ADMIN_EMAILS.map((to) => ({ to, subject: ADMIN_SUBJECT, html })));

    return NextResponse.json({ message: "Lead sent" }, { status: 200 });
  } catch (error) {
    console.error("Error sending lead:", error);
    return NextResponse.json({ error: "Failed to send lead" }, { status: 500 });
  }
}
