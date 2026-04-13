/**
 * EmailDivider Component
 * ======================
 *
 * Simple horizontal rule for separating content.
 */

import { Hr } from "@react-email/components";
import { colors, spacing } from "../design-system";
import type { CSSProperties } from "react";

interface EmailDividerProps {
  spacing?: "sm" | "md" | "lg";
}

export function EmailDivider({ spacing: spacingSize = "md" }: EmailDividerProps) {
  const marginMap = {
    sm: spacing[3],
    md: spacing[5],
    lg: spacing[8],
  };

  const dividerStyle: CSSProperties = {
    borderTop: `1px solid ${colors.gray200}`,
    borderBottom: "none",
    borderLeft: "none",
    borderRight: "none",
    margin: `${marginMap[spacingSize]} 0`,
  };

  return <Hr style={dividerStyle} />;
}

export default EmailDivider;
