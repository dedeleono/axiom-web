import { render } from "@react-email/render";
import ContactEmail from "@/components/emails/contact";
import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import { contactFormSchema } from "@/lib/validations/contact";

const transportConfig = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.SECRET_KEY_APP_EMAIL,
  },
} as const;

const transporter = createTransport(transportConfig);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    const adminHtml = await render(
      ContactEmail({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
        recipient: "admin",
      })
    );

    const userHtml = await render(
      ContactEmail({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
        recipient: "user",
      })
    );

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL ?? "info@axiomrenovation.com",
      subject: `Contact Form Submission - ${validatedData.name}`,
      html: adminHtml,
      replyTo: validatedData.email,
    };

    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: validatedData.email,
      subject: "Thank you for contacting Axiom Renovation",
      html: userHtml,
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
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
