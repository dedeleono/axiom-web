/**
 * Contact User Email
 * ==================
 *
 * Confirmation email sent to users after submitting a contact form.
 * Includes a summary of their submitted information.
 */

import { Section } from "@react-email/components";
import { ActionTemplate } from "./templates";
import { EmailText, EmailCard, EmailDivider } from "./components";
import { urls, colors, fontFamily, fontSize, fontWeight, spacing } from "./design-system";
import { projectTypeIdsToLabels } from "@/lib/consultation-project-options";
import type { CSSProperties } from "react";

interface ContactUserEmailProps {
  intent: "consultation" | "general";
  name: string;
  email: string;
  phone?: string;
  message?: string;
  consultation?: {
    projectTypes: string[];
    hasArchitecturalPlans: "yes" | "no";
    startTimeline: string;
  };
}

function timelineLabel(t: string): string {
  const map: Record<string, string> = {
    asap: "As soon as possible",
    within_year: "Within the next year",
    over_year: "Over a year from now",
    undecided: "Needs help deciding",
  };
  return map[t] ?? t;
}

export function ContactUserEmail({
  intent,
  name,
  email,
  phone,
  message,
  consultation,
}: ContactUserEmailProps) {
  const isConsultation = intent === "consultation";

  const heading = isConsultation
    ? "Consultation Request Received"
    : "We've Received Your Message";

  const body = isConsultation
    ? [
        "Thank you for your interest in Axiom Renovation. We're excited to help bring your vision to life.",
        "Our team will review your consultation request and reach out shortly to schedule a time that works for you.",
      ]
    : [
        "Thank you for reaching out to Axiom Renovation. We've received your message and our team will get back to you as soon as possible.",
        "We typically respond within 1-2 business days. If your matter is urgent, please don't hesitate to give us a call.",
      ];

  return (
    <ActionTemplate
      preview={
        isConsultation
          ? "Your consultation request has been received"
          : "Thank you for contacting Axiom Renovation"
      }
      heading={heading}
      greeting={`Hi ${name},`}
      body={body}
      ctaText="View Our Projects"
      ctaHref={urls.projects}
      closingText="We look forward to working with you!"
    >
      <EmailDivider spacing="sm" />
      <EmailText variant="small" bold>
        Your Submitted Information:
      </EmailText>

      <Section style={detailsTableStyle}>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={labelCellStyle}>Name</td>
              <td style={valueCellStyle}>{name}</td>
            </tr>
            <tr>
              <td style={labelCellStyle}>Email</td>
              <td style={valueCellStyle}>{email}</td>
            </tr>
            {phone && (
              <tr>
                <td style={labelCellStyle}>Phone Number</td>
                <td style={valueCellStyle}>{phone}</td>
              </tr>
            )}
            {isConsultation && consultation && (
              <>
                <tr>
                  <td style={labelCellStyle}>Projects Interested In</td>
                  <td style={valueCellStyle}>
                    {projectTypeIdsToLabels(consultation.projectTypes)}
                  </td>
                </tr>
                <tr>
                  <td style={labelCellStyle}>Project Timeline</td>
                  <td style={valueCellStyle}>
                    {timelineLabel(consultation.startTimeline)}
                  </td>
                </tr>
                <tr>
                  <td style={labelCellStyle}>Blueprints Available?</td>
                  <td style={valueCellStyle}>
                    {consultation.hasArchitecturalPlans === "yes" ? "Yes" : "No"}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </Section>

      {message && (
        <>
          <EmailText variant="small" bold>
            Your Message:
          </EmailText>
          <EmailCard variant="highlight">
            <EmailText variant="body" noMargin>
              &ldquo;{message}&rdquo;
            </EmailText>
          </EmailCard>
        </>
      )}

      <EmailDivider spacing="md" />
      <EmailText variant="muted" centered>
        Have questions? Feel free to contact us at amit@axiom-renovation.com
      </EmailText>
    </ActionTemplate>
  );
}

const detailsTableStyle: CSSProperties = {
  margin: `${spacing[4]} 0`,
};

const tableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: colors.gray50,
  borderRadius: "8px",
};

const labelCellStyle: CSSProperties = {
  fontFamily: fontFamily.sans,
  fontSize: fontSize.sm,
  fontWeight: fontWeight.semibold,
  color: colors.gray600,
  padding: `${spacing[3]} ${spacing[4]}`,
  borderBottom: `1px solid ${colors.gray200}`,
  width: "45%",
  verticalAlign: "top",
};

const valueCellStyle: CSSProperties = {
  fontFamily: fontFamily.sans,
  fontSize: fontSize.sm,
  fontWeight: fontWeight.normal,
  color: colors.black,
  padding: `${spacing[3]} ${spacing[4]}`,
  borderBottom: `1px solid ${colors.gray200}`,
  verticalAlign: "top",
};

export default ContactUserEmail;
