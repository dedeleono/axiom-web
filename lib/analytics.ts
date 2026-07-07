"use client";

import { sendGTMEvent } from "@next/third-parties/google";

/**
 * Typed wrapper around the GTM dataLayer (container GTM-P8S2X875, loaded via
 * <GoogleTagManager /> in app/layout.tsx) for the events Google Ads
 * conversion tracking depends on. See docs/gtm-conversion-setup.md for the
 * GTM / Google Ads configuration that consumes these events.
 *
 * Import from client components only (`sendGTMEvent` touches `window`).
 *
 * Every export is fire-and-forget: it never throws into the caller and is a
 * no-op when `window` is unavailable, so a tracking failure can never block
 * a form submit or the /thank-you redirect.
 */

export type LeadFormId = "contact_form" | "consultation_stepper";

export interface TrackLeadSubmitInput {
  formId: LeadFormId;
  email?: string;
  phone?: string;
}

/** user_data shape consumed by Google Ads Enhanced Conversions for Leads. */
interface LeadUserData {
  email?: string;
  phone_number?: string;
}

function normalizeEmail(email: string | undefined): string | undefined {
  const normalized = email?.trim().toLowerCase();
  return normalized ? normalized : undefined;
}

/**
 * Best-effort E.164 normalization for US numbers: strip non-digits, prefix
 * "+1" for 10-digit numbers, prefix "+" for 11-digit numbers starting with
 * 1. Other non-empty inputs pass through as bare digits (Google re-normalizes
 * before hashing).
 */
function normalizePhone(phone: string | undefined): string | undefined {
  const digits = phone?.replace(/\D/g, "") ?? "";
  if (!digits) return undefined;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return digits;
}

/**
 * Pushes the `generate_lead` event GTM uses as the primary Google Ads
 * conversion trigger. `user_data` carries the raw (unhashed) email / phone
 * for Enhanced Conversions for Leads — Google's tag hashes it in the browser
 * before it is sent anywhere. Empty fields are omitted.
 *
 * Call synchronously right before redirectToThankYouPage(); it never throws
 * and never blocks.
 */
export function trackLeadSubmit(input: TrackLeadSubmitInput): void {
  try {
    if (typeof window === "undefined") return;

    const userData: LeadUserData = {};
    const email = normalizeEmail(input.email);
    const phoneNumber = normalizePhone(input.phone);
    if (email) userData.email = email;
    if (phoneNumber) userData.phone_number = phoneNumber;

    sendGTMEvent({
      event: "generate_lead",
      form_id: input.formId,
      ...(Object.keys(userData).length > 0 ? { user_data: userData } : {}),
    });
  } catch {
    // Tracking must never break the submit flow.
  }
}

/**
 * Pushes the `phone_click` event when a tel: link is clicked.
 * `location` identifies the placement, e.g. "footer" or "phone_dialog".
 */
export function trackPhoneClick(location: string): void {
  try {
    if (typeof window === "undefined") return;
    sendGTMEvent({ event: "phone_click", link_location: location });
  } catch {
    // Tracking must never break navigation to the dialer.
  }
}
