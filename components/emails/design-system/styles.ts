/**
 * Axiom Email Design System - Base Styles
 * ========================================
 *
 * Pre-built style objects for consistent email rendering.
 * All styles are inline-compatible for maximum email client support.
 */

import {
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
  borderRadius,
} from "./tokens";
import type { CSSProperties } from "react";

// =============================================================================
// TYPOGRAPHY STYLES
// =============================================================================

export const typography = {
  h1: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    color: colors.black,
    margin: `0 0 ${spacing[4]} 0`,
  } satisfies CSSProperties,

  h2: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.tight,
    color: colors.black,
    margin: `0 0 ${spacing[3]} 0`,
  } satisfies CSSProperties,

  h3: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.normal,
    color: colors.black,
    margin: `0 0 ${spacing[2]} 0`,
  } satisfies CSSProperties,

  body: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.relaxed,
    color: colors.darkGray,
    margin: `0 0 ${spacing[4]} 0`,
  } satisfies CSSProperties,

  small: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    color: colors.gray600,
    margin: 0,
  } satisfies CSSProperties,

  caption: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    color: colors.gray500,
    margin: 0,
  } satisfies CSSProperties,

  mono: {
    fontFamily: fontFamily.mono,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    color: colors.black,
  } satisfies CSSProperties,

  link: {
    color: colors.primary,
    textDecoration: "underline",
    textUnderlineOffset: "2px",
  } satisfies CSSProperties,
};

// =============================================================================
// BUTTON STYLES
// =============================================================================

export const buttonStyles = {
  primary: {
    display: "inline-block",
    backgroundColor: colors.primary,
    color: colors.white,
    fontFamily: fontFamily.sans,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    textDecoration: "none",
    textAlign: "center" as const,
    padding: `${spacing[3]} ${spacing[6]}`,
    borderRadius: borderRadius.lg,
    border: "none",
  } satisfies CSSProperties,

  secondary: {
    display: "inline-block",
    backgroundColor: colors.white,
    color: colors.primary,
    fontFamily: fontFamily.sans,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    textDecoration: "none",
    textAlign: "center" as const,
    padding: `${spacing[3]} ${spacing[6]}`,
    borderRadius: borderRadius.lg,
    border: `2px solid ${colors.primary}`,
  } satisfies CSSProperties,

  ghost: {
    display: "inline-block",
    backgroundColor: "transparent",
    color: colors.primary,
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    textDecoration: "underline",
    textUnderlineOffset: "2px",
    padding: 0,
    border: "none",
  } satisfies CSSProperties,

  dark: {
    display: "inline-block",
    backgroundColor: colors.black,
    color: colors.white,
    fontFamily: fontFamily.sans,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    textDecoration: "none",
    textAlign: "center" as const,
    padding: `${spacing[3]} ${spacing[6]}`,
    borderRadius: borderRadius.lg,
    border: "none",
  } satisfies CSSProperties,
};

// =============================================================================
// CODE STYLES (OTP, verification codes)
// =============================================================================

export const codeStyles = {
  container: {
    backgroundColor: colors.gray50,
    borderRadius: borderRadius.lg,
    padding: `${spacing[6]} ${spacing[4]}`,
    margin: `${spacing[6]} 0`,
    textAlign: "center" as const,
  } satisfies CSSProperties,

  code: {
    fontFamily: fontFamily.mono,
    fontSize: "36px",
    fontWeight: fontWeight.bold,
    color: colors.black,
    letterSpacing: "0.15em",
    margin: 0,
  } satisfies CSSProperties,

  expiry: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm,
    color: colors.gray500,
    margin: `${spacing[3]} 0 0 0`,
  } satisfies CSSProperties,
};
