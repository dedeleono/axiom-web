/**
 * Axiom Renovation Email Design System
 * =====================================
 *
 * Professional email design system aligned with Axiom brand.
 * Inspired by: Stripe, Linear, Vercel
 *
 * Design Principles:
 * - Minimalistic and clean
 * - Clear visual hierarchy
 * - Mobile-first, email-client safe
 * - Accessible (WCAG AA contrast ratios)
 */

// =============================================================================
// COLORS (Axiom brand from globals.css)
// =============================================================================

export const colors = {
  // Brand Primary (Orange)
  primary: "#F25623",
  primaryLight: "#FF7A4D",
  primaryDark: "#D94411",

  // Neutrals
  black: "#171717",
  darkGray: "#4D4D4D",
  gray600: "#6B7280",
  gray500: "#9CA3AF",
  gray400: "#D1D5DB",
  gray200: "#E5E7EB",
  gray100: "#F3F4F6",
  gray50: "#F9FAFB",
  lightGray: "#DEDEDE",

  // Semantic
  success: "#059669",
  successBg: "#ECFDF5",
  warning: "#D97706",
  warningBg: "#FFFBEB",
  error: "#DC2626",
  errorBg: "#FEF2F2",
  info: "#0284C7",
  infoBg: "#EFF6FF",

  // Base
  white: "#FFFFFF",
} as const;

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const fontFamily = {
  sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  mono: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace",
} as const;

export const fontSize = {
  xs: "11px",
  sm: "13px",
  base: "15px",
  lg: "17px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "32px",
} as const;

export const fontWeight = {
  normal: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
} as const;

export const lineHeight = {
  tight: "1.25",
  normal: "1.5",
  relaxed: "1.75",
} as const;

export const letterSpacing = {
  tight: "-0.01em",
  normal: "0",
  wide: "0.02em",
  wider: "0.05em",
  widest: "0.1em",
} as const;

// =============================================================================
// SPACING
// =============================================================================

export const spacing = {
  0: "0",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
} as const;

// =============================================================================
// BORDERS & RADIUS
// =============================================================================

export const borderRadius = {
  none: "0",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  full: "9999px",
} as const;

export const borderWidth = {
  none: "0",
  thin: "1px",
  medium: "2px",
  thick: "3px",
} as const;

// =============================================================================
// LAYOUT CONSTANTS
// =============================================================================

export const layout = {
  maxWidth: "600px",
  contentPadding: "32px",
  mobilePadding: "20px",
  headerHeight: "80px",
  footerPadding: "24px",
} as const;

// =============================================================================
// COMMON URLS
// =============================================================================

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://axiom-web-six.vercel.app";

export const urls = {
  base: BASE_URL,
  home: BASE_URL,
  services: `${BASE_URL}/services`,
  projects: `${BASE_URL}/projects`,
  contact: `${BASE_URL}/contact`,
  privacy: `${BASE_URL}/privacy-policy`,
  areas: `${BASE_URL}/areas`,
} as const;

// =============================================================================
// ASSET URLS
// =============================================================================

export const assets = {
  logo: `${BASE_URL}/email-logo.png`,
} as const;
