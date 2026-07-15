import type { Attribution } from "@/lib/validations/lead";

const STORAGE_KEY = "axiom_attribution";

const PARAM_KEYS: (keyof Attribution)[] = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

/**
 * Reads ad-click attribution (gclid/gbraid/wbraid + utm_*) from the current
 * URL, merges it with any first-touch values stored earlier this session,
 * persists the result, and returns it. First-touch wins so the original ad
 * that brought the visitor in is preserved across internal navigation.
 *
 * SSR-safe (returns {} when window is unavailable) and never throws — a
 * failure here must never block a lead submit.
 */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const stored = readStored();
    const params = new URLSearchParams(window.location.search);
    const fromUrl: Attribution = {};
    for (const key of PARAM_KEYS) {
      const value = params.get(key);
      if (value) fromUrl[key] = value.slice(0, 512);
    }
    // First-touch wins: keep stored values, fill gaps from the current URL.
    const merged: Attribution = { ...fromUrl, ...stored };
    if (!merged.landing_page) {
      merged.landing_page = window.location.pathname.slice(0, 1024);
    }
    if (!merged.referrer && document.referrer) {
      merged.referrer = document.referrer.slice(0, 1024);
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return {};
  }
}

function readStored(): Attribution {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    return parsed && typeof parsed === "object" ? (parsed as Attribution) : {};
  } catch {
    return {};
  }
}
