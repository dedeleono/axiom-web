import { render } from "@react-email/render";
import { ContactAdminEmail } from "@/components/emails/ContactAdminEmail";
import { ContactUserEmail } from "@/components/emails/ContactUserEmail";
import { NextResponse } from "next/server";
import { sendEmails } from "@/lib/email";
import { contactSubmissionSchema } from "@/lib/validations/contact";

const ADMIN_EMAILS = ["amit@axiom-renovation.com", "dgxagent@gmail.com"];

const ADMIN_SUBJECT = "New potential client from website";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSubmissionSchema.parse(body);

    const adminHtml = await render(
      ContactAdminEmail({
        intent: validatedData.intent,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
        consultation:
          validatedData.intent === "consultation"
            ? {
                projectTypes: validatedData.projectTypes,
                hasArchitecturalPlans: validatedData.hasArchitecturalPlans,
                startTimeline: validatedData.startTimeline,
                planAttachments: validatedData.planAttachments,
              }
            : undefined,
      })
    );

    const userHtml = await render(
      ContactUserEmail({
        intent: validatedData.intent,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
        consultation:
          validatedData.intent === "consultation"
            ? {
                projectTypes: validatedData.projectTypes,
                hasArchitecturalPlans: validatedData.hasArchitecturalPlans,
                startTimeline: validatedData.startTimeline,
              }
            : undefined,
      })
    );

    await sendEmails([
      ...ADMIN_EMAILS.map((adminEmail) => ({
        to: adminEmail,
        subject: ADMIN_SUBJECT,
        html: adminHtml,
        replyTo: validatedData.email,
      })),
      {
        to: validatedData.email,
        subject: "Thank you for contacting Axiom Renovation",
        html: userHtml,
      },
    ]);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
