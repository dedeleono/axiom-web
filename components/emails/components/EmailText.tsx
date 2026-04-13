/**
 * EmailText Component
 * ===================
 *
 * Typography component for body text in emails.
 * Supports multiple variants for different contexts.
 */

import { Text } from "@react-email/components";
import {
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
} from "../design-system";
import type { CSSProperties, ReactNode } from "react";

type TextVariant = "body" | "lead" | "small" | "muted" | "caption";

interface EmailTextProps {
  children: ReactNode;
  variant?: TextVariant;
  centered?: boolean;
  color?: string;
  bold?: boolean;
  noMargin?: boolean;
}

export function EmailText({
  children,
  variant = "body",
  centered = false,
  color,
  bold = false,
  noMargin = false,
}: EmailTextProps) {
  const textStyle = getTextStyle(variant, centered, color, bold, noMargin);

  return <Text style={textStyle}>{children}</Text>;
}

function getTextStyle(
  variant: TextVariant,
  centered: boolean,
  customColor?: string,
  bold?: boolean,
  noMargin?: boolean
): CSSProperties {
  const variants: Record<TextVariant, CSSProperties> = {
    body: {
      fontFamily: fontFamily.sans,
      fontSize: fontSize.base,
      fontWeight: bold ? fontWeight.semibold : fontWeight.normal,
      lineHeight: lineHeight.relaxed,
      color: customColor ?? colors.darkGray,
      margin: noMargin ? 0 : `0 0 ${spacing[4]} 0`,
      textAlign: centered ? "center" : "left",
    },
    lead: {
      fontFamily: fontFamily.sans,
      fontSize: fontSize.lg,
      fontWeight: bold ? fontWeight.semibold : fontWeight.normal,
      lineHeight: lineHeight.relaxed,
      color: customColor ?? colors.black,
      margin: noMargin ? 0 : `0 0 ${spacing[5]} 0`,
      textAlign: centered ? "center" : "left",
    },
    small: {
      fontFamily: fontFamily.sans,
      fontSize: fontSize.sm,
      fontWeight: bold ? fontWeight.medium : fontWeight.normal,
      lineHeight: lineHeight.normal,
      color: customColor ?? colors.gray600,
      margin: noMargin ? 0 : `0 0 ${spacing[3]} 0`,
      textAlign: centered ? "center" : "left",
    },
    muted: {
      fontFamily: fontFamily.sans,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.normal,
      lineHeight: lineHeight.normal,
      color: customColor ?? colors.gray500,
      margin: noMargin ? 0 : `0 0 ${spacing[3]} 0`,
      textAlign: centered ? "center" : "left",
    },
    caption: {
      fontFamily: fontFamily.sans,
      fontSize: fontSize.xs,
      fontWeight: fontWeight.normal,
      lineHeight: lineHeight.normal,
      color: customColor ?? colors.gray500,
      margin: noMargin ? 0 : `0 0 ${spacing[2]} 0`,
      textAlign: centered ? "center" : "left",
    },
  };

  return variants[variant];
}

export default EmailText;
