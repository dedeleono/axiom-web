/** Canonical URLs for service detail pages live under `/services/[slug]`. */

export const SERVICE_PAGE_SLUGS = [
  "bathroom-remodeling",
  "kitchen-remodeling",
  "home-addition",
  "new-construction",
  "outdoor-remodeling",
] as const;

export type ServicePageSlug = (typeof SERVICE_PAGE_SLUGS)[number];

export const TITLE_TO_SERVICE_SLUG: Record<string, ServicePageSlug> = {
  "Bathroom Remodeling": "bathroom-remodeling",
  "Bathroom Remodel": "bathroom-remodeling",
  "Kitchen Remodeling": "kitchen-remodeling",
  "Kitchen Remodel": "kitchen-remodeling",
  "Home Addition": "home-addition",
  "Home Additions": "home-addition",
  "ADU & Home Additions": "home-addition",
  "Home Addition & ADU": "home-addition",
  "New Construction": "new-construction",
  "Custom Home Construction": "new-construction",
  "Outdoor Remodeling": "outdoor-remodeling",
  "Outdoor Remodel": "outdoor-remodeling",
  "Outdoor Living": "outdoor-remodeling",
};

export function serviceDetailHref(slug: string): string {
  return `/services/${slug}`;
}

/** Path segment after leading slash, with `/services/x` normalized to `x`. */
export function pathnameToServiceSlug(pathname: string): string {
  if (!pathname || pathname === "/") return "";
  const trimmed = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  const nested = /^services\/(.+)$/.exec(trimmed);
  if (nested?.[1]) return nested[1];
  return trimmed;
}

export function isServiceDetailSlug(segment: string): segment is ServicePageSlug {
  return (SERVICE_PAGE_SLUGS as readonly string[]).includes(segment);
}

/** Home services cards: honor CMS `link`, migrate legacy `/slug` to `/services/slug`, else map title → slug. */
export function resolveServiceCardHref(title: string, link: string | undefined): string {
  const trimmed = link?.trim();
  if (trimmed && trimmed !== "/contact") {
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    if (trimmed.startsWith("/services/")) return trimmed;
    const noLeading = trimmed.replace(/^\//, "");
    if (isServiceDetailSlug(noLeading)) return serviceDetailHref(noLeading);
    return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  }
  const slug = TITLE_TO_SERVICE_SLUG[title];
  if (slug) return serviceDetailHref(slug);
  return "/contact";
}
