/**
 * Contact Admin Email
 * ===================
 *
 * Email sent to admin when a contact form is submitted.
 * Uses SystemTemplate for a clean, informational layout.
 */

import { Link, Text } from "@react-email/components";
import { SystemTemplate } from "./templates";
import { EmailText, EmailCard, EmailDivider } from "./components";
import { projectTypeIdsToLabels } from "@/lib/consultation-project-options";
import { colors, fontFamily, fontSize } from "./design-system";
import type { CSSProperties } from "react";

interface ContactAdminEmailProps {
  intent: "consultation" | "general";
  name: string;
  email: string;
  phone?: string;
  message?: string;
  consultation?: {
    projectTypes: string[];
    hasArchitecturalPlans: "yes" | "no";
    startTimeline: string;
    planAttachments?: { url: string; filename: string }[];
  };
}

function intentLabel(intent: ContactAdminEmailProps["intent"]): string {
  return intent === "consultation" ? "Consultation Request" : "General Inquiry";
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

export function ContactAdminEmail({
  intent,
  name,
  email,
  phone,
  message,
  consultation,
}: ContactAdminEmailProps) {
  const details = [
    { label: "Name", value: name },
    { label: "Email", value: email },
    ...(phone ? [{ label: "Phone", value: phone }] : []),
    { label: "Type", value: intentLabel(intent) },
  ];

  if (intent === "consultation" && consultation) {
    details.push(
      { label: "Project Interests", value: projectTypeIdsToLabels(consultation.projectTypes) },
      { label: "Has Architectural Plans", value: consultation.hasArchitecturalPlans === "yes" ? "Yes" : "No" },
      { label: "Timeline", value: timelineLabel(consultation.startTimeline) }
    );
  }

  return (
    <SystemTemplate
      preview={`New ${intentLabel(intent).toLowerCase()} from ${name}`}
      alertType="info"
      heading={`New ${intentLabel(intent)}`}
      subtitle={`${name} has submitted a ${intent === "consultation" ? "consultation request" : "general inquiry"}.`}
      details={details}
    >
      {message && (
        <>
          <EmailDivider spacing="sm" />
          <EmailText variant="small" bold>
            Message:
          </EmailText>
          <EmailCard variant="bordered">
            <EmailText variant="body" noMargin>
              {message}
            </EmailText>
          </EmailCard>
        </>
      )}

      {consultation?.hasArchitecturalPlans === "yes" &&
        consultation?.planAttachments &&
        consultation.planAttachments.length > 0 && (
          <>
            <EmailDivider spacing="sm" />
            <EmailText variant="small" bold>
              Uploaded Drawings:
            </EmailText>
            <EmailCard variant="default">
              {consultation.planAttachments.map((attachment) => (
                <Text key={attachment.url} style={attachmentStyle}>
                  <Link href={attachment.url} style={attachmentLinkStyle}>
                    📎 {attachment.filename}
                  </Link>
                </Text>
              ))}
            </EmailCard>
          </>
        )}

      <EmailDivider spacing="md" />
      <EmailText variant="caption" centered>
        A confirmation email has been sent to {email}
      </EmailText>
    </SystemTemplate>
  );
}

const attachmentStyle: CSSProperties = {
  margin: "4px 0",
};

const attachmentLinkStyle: CSSProperties = {
  fontFamily: fontFamily.sans,
  fontSize: fontSize.sm,
  color: colors.primary,
  textDecoration: "underline",
};

export default ContactAdminEmail;
