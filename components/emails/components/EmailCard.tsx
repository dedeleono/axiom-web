/**
 * EmailCard Component
 * ===================
 *
 * Card container for grouping related content.
 * Supports multiple variants for different contexts.
 */

import { Section, Text } from "@react-email/components";
import {
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  spacing,
  borderRadius,
} from "../design-system";
import type { CSSProperties, ReactNode } from "react";

type CardVariant =
  | "default"
  | "bordered"
  | "highlight"
  | "success"
  | "warning"
  | "info";

interface EmailCardProps {
  children: ReactNode;
  variant?: CardVariant;
  title?: string;
  label?: string;
}

export function EmailCard({
  children,
  variant = "default",
  title,
  label,
}: EmailCardProps) {
  const cardStyle = getCardStyle(variant);

  return (
    <Section style={cardStyle}>
      {label && <Text style={labelStyle}>{label}</Text>}
      {title && <Text style={titleStyle}>{title}</Text>}
      {children}
    </Section>
  );
}

function getCardStyle(variant: CardVariant): CSSProperties {
  const base: CSSProperties = {
    borderRadius: borderRadius.lg,
    padding: spacing[5],
    margin: `${spacing[4]} 0`,
  };

  const variants: Record<CardVariant, CSSProperties> = {
    default: {
      ...base,
      backgroundColor: colors.gray100,
    },
    bordered: {
      ...base,
      backgroundColor: colors.white,
      border: `1px solid ${colors.gray200}`,
    },
    highlight: {
      ...base,
      backgroundColor: colors.white,
      borderLeft: `4px solid ${colors.primary}`,
      borderRadius: borderRadius.md,
    },
    success: {
      ...base,
      backgroundColor: colors.successBg,
      border: `1px solid #BBF7D0`,
    },
    warning: {
      ...base,
      backgroundColor: colors.warningBg,
      border: `1px solid #FDE68A`,
    },
    info: {
      ...base,
      backgroundColor: colors.infoBg,
      border: `1px solid #BFDBFE`,
    },
  };

  return variants[variant];
}

const labelStyle: CSSProperties = {
  fontFamily: fontFamily.sans,
  fontSize: fontSize.xs,
  fontWeight: fontWeight.semibold,
  color: colors.gray600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  margin: `0 0 ${spacing[1]} 0`,
};

const titleStyle: CSSProperties = {
  fontFamily: fontFamily.sans,
  fontSize: fontSize.lg,
  fontWeight: fontWeight.bold,
  color: colors.black,
  margin: `0 0 ${spacing[2]} 0`,
};

export default EmailCard;
