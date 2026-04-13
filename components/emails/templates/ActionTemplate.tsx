/**
 * Action Template
 * ===============
 *
 * Layout template for action-required emails:
 * - Contact confirmations
 * - Consultation scheduling confirmations
 * - Follow-ups
 *
 * Features:
 * - Clean, welcoming layout
 * - Optional CTA button
 * - Details section
 */

import { Section, Text, Link } from "@react-email/components";
import {
  EmailLayout,
  EmailHeader,
  EmailFooter,
  EmailContent,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
} from "../components";
import {
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  spacing,
} from "../design-system";
import type { CSSProperties, ReactNode } from "react";

interface DetailItem {
  label: string;
  value: string;
  isLink?: boolean;
}

interface ActionTemplateProps {
  preview: string;
  heading: string;
  greeting?: string;
  body: string[];
  details?: DetailItem[];
  ctaText?: string;
  ctaHref?: string;
  closingText?: string;
  children?: ReactNode;
}

export function ActionTemplate({
  preview,
  heading,
  greeting,
  body,
  details,
  ctaText,
  ctaHref,
  closingText,
  children,
}: ActionTemplateProps) {
  return (
    <EmailLayout preview={preview}>
      <EmailHeader />

      <EmailContent padding="lg">
        <EmailHeading as="h1">{heading}</EmailHeading>

        {greeting && <EmailText variant="body">{greeting}</EmailText>}

        {body.map((paragraph, index) => (
          <EmailText key={index} variant="body">
            {paragraph}
          </EmailText>
        ))}

        {details && details.length > 0 && (
          <EmailCard variant="highlight">
            {details.map((detail, index) => (
              <Section key={index} style={detailRowStyle}>
                <Text style={detailLabelStyle}>{detail.label}:</Text>
                {detail.isLink ? (
                  <Link href={detail.value} style={detailLinkStyle}>
                    {detail.value}
                  </Link>
                ) : (
                  <Text style={detailValueStyle}>{detail.value}</Text>
                )}
              </Section>
            ))}
          </EmailCard>
        )}

        {ctaText && ctaHref && (
          <EmailButton href={ctaHref} variant="primary">
            {ctaText}
          </EmailButton>
        )}

        {children}

        {closingText && (
          <EmailText variant="muted" centered>
            {closingText}
          </EmailText>
        )}
      </EmailContent>

      <EmailFooter />
    </EmailLayout>
  );
}

const detailRowStyle: CSSProperties = {
  marginBottom: spacing[2],
};

const detailLabelStyle: CSSProperties = {
  fontFamily: fontFamily.sans,
  fontSize: fontSize.sm,
  fontWeight: fontWeight.semibold,
  color: colors.gray600,
  margin: 0,
  display: "inline",
};

const detailValueStyle: CSSProperties = {
  fontFamily: fontFamily.sans,
  fontSize: fontSize.sm,
  color: colors.black,
  margin: 0,
  display: "inline",
  marginLeft: spacing[1],
};

const detailLinkStyle: CSSProperties = {
  fontFamily: fontFamily.sans,
  fontSize: fontSize.sm,
  color: colors.primary,
  textDecoration: "underline",
  marginLeft: spacing[1],
};

export default ActionTemplate;
