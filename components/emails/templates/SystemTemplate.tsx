/**
 * System Template
 * ===============
 *
 * Layout template for system and notification emails:
 * - New contact form submissions (admin)
 * - Consultation requests (admin)
 * - System alerts
 *
 * Features:
 * - Clean, informational layout
 * - Optional alert styling
 * - Details list
 * - Optional CTA
 */

import { Section, Text } from "@react-email/components";
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

type AlertType = "info" | "warning" | "success";

interface SystemDetail {
  label: string;
  value: string;
}

interface SystemTemplateProps {
  preview: string;
  alertType?: AlertType;
  heading: string;
  subtitle?: string;
  body?: string[];
  details?: SystemDetail[];
  ctaText?: string;
  ctaHref?: string;
  notice?: string;
  children?: ReactNode;
}

export function SystemTemplate({
  preview,
  alertType = "info",
  heading,
  subtitle,
  body,
  details,
  ctaText,
  ctaHref,
  notice,
  children,
}: SystemTemplateProps) {
  const alertConfig = getAlertConfig(alertType);

  return (
    <EmailLayout preview={preview}>
      <EmailHeader />

      <Section
        style={{
          ...alertBannerStyle,
          backgroundColor: alertConfig.bannerBg,
        }}
      >
        <Text style={{ ...alertIconStyle, color: alertConfig.iconColor }}>
          {alertConfig.icon}
        </Text>
      </Section>

      <EmailContent padding="lg">
        <EmailHeading as="h1">{heading}</EmailHeading>

        {subtitle && (
          <EmailText variant="lead" color={colors.gray600}>
            {subtitle}
          </EmailText>
        )}

        {body?.map((paragraph, index) => (
          <EmailText key={index} variant="body">
            {paragraph}
          </EmailText>
        ))}

        {details && details.length > 0 && (
          <Section style={detailsContainerStyle}>
            {details.map((detail, index) => (
              <Section key={index} style={detailRowStyle}>
                <Text style={detailLabelStyle}>{detail.label}:</Text>
                <Text style={detailValueStyle}>{detail.value}</Text>
              </Section>
            ))}
          </Section>
        )}

        {notice && (
          <EmailCard variant={alertType === "warning" ? "warning" : "info"}>
            <EmailText variant="small" noMargin>
              {notice}
            </EmailText>
          </EmailCard>
        )}

        {ctaText && ctaHref && (
          <EmailButton href={ctaHref} variant="primary">
            {ctaText}
          </EmailButton>
        )}

        {children}
      </EmailContent>

      <EmailFooter />
    </EmailLayout>
  );
}

function getAlertConfig(type: AlertType) {
  const configs = {
    info: {
      icon: "📬",
      bannerBg: colors.primary,
      iconColor: colors.white,
    },
    warning: {
      icon: "⚠️",
      bannerBg: colors.warningBg,
      iconColor: colors.warning,
    },
    success: {
      icon: "✅",
      bannerBg: colors.successBg,
      iconColor: colors.success,
    },
  };
  return configs[type];
}

const alertBannerStyle: CSSProperties = {
  padding: spacing[4],
  textAlign: "center",
};

const alertIconStyle: CSSProperties = {
  fontSize: "28px",
  margin: 0,
};

const detailsContainerStyle: CSSProperties = {
  backgroundColor: colors.gray50,
  borderRadius: "8px",
  padding: spacing[4],
  margin: `${spacing[4]} 0`,
};

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

export default SystemTemplate;
