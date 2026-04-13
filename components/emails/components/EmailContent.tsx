/**
 * EmailContent Component
 * ======================
 *
 * Main content section wrapper.
 * Provides consistent padding and spacing for email body content.
 */

import { Section } from "@react-email/components";
import { colors, spacing } from "../design-system";
import type { CSSProperties, ReactNode } from "react";

interface EmailContentProps {
  children: ReactNode;
  centered?: boolean;
  padding?: "sm" | "md" | "lg";
  backgroundColor?: string;
}

export function EmailContent({
  children,
  centered = false,
  padding = "md",
  backgroundColor = colors.white,
}: EmailContentProps) {
  const paddingMap = {
    sm: `${spacing[4]} ${spacing[5]}`,
    md: `${spacing[6]} ${spacing[6]}`,
    lg: `${spacing[8]} ${spacing[6]}`,
  };

  const contentStyle: CSSProperties = {
    backgroundColor,
    padding: paddingMap[padding],
    textAlign: centered ? "center" : "left",
  };

  return <Section style={contentStyle}>{children}</Section>;
}

export default EmailContent;
