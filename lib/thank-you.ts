export const THANK_YOU_PATH = "/thank-you";

/**
 * Redirects to the GTM conversion page after a successful form submission so
 * the conversion pageview always fires (same-tab navigation is never blocked
 * by popup blockers, unlike window.open after an awaited fetch).
 */
export function redirectToThankYouPage() {
  if (typeof window === "undefined") return;
  window.location.assign(THANK_YOU_PATH);
}
