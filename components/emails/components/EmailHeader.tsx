/**
 * EmailHeader Component
 * =====================
 *
 * Standard header for all Axiom emails.
 * Displays the logo on a dark background.
 */

import { Section, Img } from "@react-email/components";
import { colors, spacing, assets } from "../design-system";
import type { CSSProperties } from "react";

interface EmailHeaderProps {
  compact?: boolean;
  backgroundColor?: string;
}

export function EmailHeader({
  compact = false,
  backgroundColor = colors.black,
}: EmailHeaderProps) {
  const headerStyle: CSSProperties = {
    backgroundColor,
    padding: compact
      ? `${spacing[5]} ${spacing[6]}`
      : `${spacing[8]} ${spacing[6]}`,
    textAlign: "center",
  };

  return (
    <Section style={headerStyle}>
      <Img
        src={assets.logo}
        width={compact ? 160 : 220}
        height="auto"
        alt="Axiom Renovation"
        style={{
          display: "block",
          margin: "0 auto",
          border: "0",
          outline: "none",
        }}
      />
    </Section>
  );
}

export default EmailHeader;
