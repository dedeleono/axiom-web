export const THANK_YOU_PATH = "/thank-you";

/**
 * Opens the GTM conversion page in a new tab so the user can close it freely.
 * Popup blockers may reject window.open outside a fresh user gesture (e.g.
 * after an awaited fetch); in that case fall back to same-tab navigation so
 * the conversion pageview still fires.
 */
export function openThankYouPage() {
  if (typeof window === "undefined") return;
  const opened = window.open(THANK_YOU_PATH, "_blank");
  if (!opened) window.location.assign(THANK_YOU_PATH);
}
