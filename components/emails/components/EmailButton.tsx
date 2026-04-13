/**
 * EmailButton Component
 * =====================
 *
 * CTA button component for emails.
 * Supports multiple variants for different contexts.
 */

import { Link, Section } from "@react-email/components";
import {
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  spacing,
  borderRadius,
} from "../design-system";
import type { CSSProperties, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "dark" | "ghost";

interface EmailButtonProps {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  centered?: boolean;
  fullWidth?: boolean;
}

export function EmailButton({
  children,
  href,
  variant = "primary",
  centered = true,
  fullWidth = false,
}: EmailButtonProps) {
  const buttonStyle = getButtonStyle(variant, fullWidth);

  const button = (
    <Link href={href} target="_blank" style={buttonStyle}>
      {children}
    </Link>
  );

  if (centered) {
    return <Section style={centeredContainerStyle}>{button}</Section>;
  }

  return button;
}

function getButtonStyle(
  variant: ButtonVariant,
  fullWidth: boolean
): CSSProperties {
  const base: CSSProperties = {
    display: fullWidth ? "block" : "inline-block",
    fontFamily: fontFamily.sans,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    textDecoration: "none",
    textAlign: "center",
    borderRadius: borderRadius.lg,
  };

  const variants: Record<ButtonVariant, CSSProperties> = {
    primary: {
      ...base,
      backgroundColor: colors.primary,
      color: colors.white,
      padding: `${spacing[3]} ${spacing[6]}`,
      border: "none",
    },
    secondary: {
      ...base,
      backgroundColor: colors.white,
      color: colors.primary,
      padding: `${spacing[3]} ${spacing[6]}`,
      border: `2px solid ${colors.primary}`,
    },
    dark: {
      ...base,
      backgroundColor: colors.black,
      color: colors.white,
      padding: `${spacing[3]} ${spacing[6]}`,
      border: "none",
    },
    ghost: {
      ...base,
      backgroundColor: "transparent",
      color: colors.primary,
      padding: 0,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.medium,
      textDecoration: "underline",
      textUnderlineOffset: "2px",
      border: "none",
    },
  };

  return variants[variant];
}

const centeredContainerStyle: CSSProperties = {
  textAlign: "center",
  margin: `${spacing[6]} 0`,
};

export default EmailButton;
