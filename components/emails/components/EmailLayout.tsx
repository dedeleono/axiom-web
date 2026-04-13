/**
 * EmailLayout Component
 * =====================
 *
 * Base layout wrapper for all Axiom emails.
 * Provides consistent structure, styling, and accessibility.
 */

import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Preview,
} from "@react-email/components";
import { colors, fontFamily, spacing } from "../design-system";
import type { CSSProperties, ReactNode } from "react";

interface EmailLayoutProps {
  preview: string;
  children: ReactNode;
  backgroundColor?: string;
}

export function EmailLayout({
  preview,
  children,
  backgroundColor = colors.gray50,
}: EmailLayoutProps) {
  return (
    <Html>
      <Head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="date=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="email=no" />
      </Head>
      <Body style={{ ...bodyStyle, backgroundColor } as CSSProperties}>
        <Preview>{preview}</Preview>
        <Container style={containerStyle}>
          <Section style={wrapperStyle}>{children}</Section>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle: CSSProperties = {
  fontFamily: fontFamily.sans,
  margin: 0,
  padding: 0,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
};

const containerStyle: CSSProperties = {
  margin: "0 auto",
  padding: spacing[5],
  maxWidth: "600px",
};

const wrapperStyle: CSSProperties = {
  backgroundColor: colors.white,
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
};

export default EmailLayout;
