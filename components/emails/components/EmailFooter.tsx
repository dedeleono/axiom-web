/**
 * EmailFooter Component
 * =====================
 *
 * Standard footer for all Axiom emails.
 */

import { Section, Text, Link, Hr, Img } from "@react-email/components";
import {
  colors,
  fontFamily,
  fontSize,
  spacing,
  urls,
  assets,
} from "../design-system";
import type { CSSProperties } from "react";

interface EmailFooterProps {
  showBorder?: boolean;
}

export function EmailFooter({ showBorder = true }: EmailFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <Section style={containerStyle}>
      {showBorder && <Hr style={dividerStyle} />}

      <Img
        src={assets.logo}
        width={160}
        height="auto"
        alt="Axiom Renovation"
        style={{
          display: "block",
          margin: "0 auto 16px auto",
          border: "0",
          outline: "none",
          borderRadius: "8px",
        }}
      />

      <Text style={linksStyle}>
        <Link href={urls.services} style={linkStyle}>
          Services
        </Link>
        {" · "}
        <Link href={urls.projects} style={linkStyle}>
          Projects
        </Link>
        {" · "}
        <Link href={urls.contact} style={linkStyle}>
          Contact
        </Link>
        {" · "}
        <Link href={urls.privacy} style={linkStyle}>
          Privacy
        </Link>
      </Text>

      <Text style={addressStyle}>
        Axiom Renovation · Los Angeles, CA
      </Text>

      <Text style={copyrightStyle}>
        © {currentYear} Axiom Renovation. All rights reserved.
      </Text>
    </Section>
  );
}

const containerStyle: CSSProperties = {
  padding: `${spacing[6]} ${spacing[6]} ${spacing[8]}`,
  textAlign: "center",
};

const dividerStyle: CSSProperties = {
  borderTop: `1px solid ${colors.gray200}`,
  borderBottom: "none",
  borderLeft: "none",
  borderRight: "none",
  margin: `0 0 ${spacing[6]} 0`,
};

const linksStyle: CSSProperties = {
  fontFamily: fontFamily.sans,
  fontSize: fontSize.sm,
  color: colors.gray600,
  margin: `0 0 ${spacing[3]} 0`,
};

const linkStyle: CSSProperties = {
  color: colors.primary,
  textDecoration: "none",
};

const addressStyle: CSSProperties = {
  fontFamily: fontFamily.sans,
  fontSize: fontSize.xs,
  color: colors.gray500,
  margin: `0 0 ${spacing[2]} 0`,
};

const copyrightStyle: CSSProperties = {
  fontFamily: fontFamily.sans,
  fontSize: fontSize.xs,
  color: colors.gray500,
  margin: 0,
};

export default EmailFooter;
