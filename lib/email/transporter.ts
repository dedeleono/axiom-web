/**
 * Axiom Email Transporter
 * =======================
 *
 * Nodemailer configuration for sending emails.
 * Uses environment variables for SMTP configuration.
 */

import { createTransport } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

const transportConfig: SMTPTransport.Options = {
  host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_SERVER_PORT || "465", 10),
  secure: parseInt(process.env.EMAIL_SERVER_PORT || "465", 10) === 465,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
};

export const transporter = createTransport(transportConfig);

export const emailFrom =
  process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER || "noreply@axiomrenovation.com";

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailOptions) {
  return transporter.sendMail({
    from: emailFrom,
    to,
    subject,
    html,
    replyTo,
  });
}

export async function sendEmails(emails: SendEmailOptions[]) {
  return Promise.all(emails.map(sendEmail));
}
