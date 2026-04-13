/**
 * EmailHeading Component
 * ======================
 *
 * Typography component for email headings.
 * Supports h1, h2, h3 levels with consistent styling.
 */

import { Heading } from "@react-email/components";
import {
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
} from "../design-system";
import type { CSSProperties, ReactNode } from "react";

type HeadingLevel = "h1" | "h2" | "h3";

interface EmailHeadingProps {
  children: ReactNode;
  as?: HeadingLevel;
  centered?: boolean;
  color?: string;
}

export function EmailHeading({
  children,
  as = "h1",
  centered = false,
  color,
}: EmailHeadingProps) {
  const headingStyle = getHeadingStyle(as, centered, color);

  return (
    <Heading as={as} style={headingStyle}>
      {children}
    </Heading>
  );
}

function getHeadingStyle(
  level: HeadingLevel,
  centered: boolean,
  customColor?: string
): CSSProperties {
  const base: CSSProperties = {
    fontFamily: fontFamily.sans,
    color: customColor ?? colors.black,
    textAlign: centered ? "center" : "left",
  };

  const levels: Record<HeadingLevel, CSSProperties> = {
    h1: {
      ...base,
      fontSize: fontSize["2xl"],
      fontWeight: fontWeight.bold,
      lineHeight: lineHeight.tight,
      margin: `0 0 ${spacing[4]} 0`,
    },
    h2: {
      ...base,
      fontSize: fontSize.xl,
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.tight,
      margin: `0 0 ${spacing[3]} 0`,
    },
    h3: {
      ...base,
      fontSize: fontSize.lg,
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.normal,
      margin: `0 0 ${spacing[2]} 0`,
    },
  };

  return levels[level];
}

export default EmailHeading;
