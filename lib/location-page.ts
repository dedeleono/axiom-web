import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { urlFor } from "@/sanity/lib/image";

/** Default service labels when a location document has no `services` override. */
export const DEFAULT_LOCATION_SERVICES: readonly string[] = [
  "Kitchen remodeling",
  "Bathroom remodeling",
  "Home additions & ADUs",
  "Full home renovation",
  "Design & planning",
  "Project management",
] as const;

export type SanityLocationImage = SanityImageSource & {
  imgAlt?: string | null;
};

export type LocationProjectHighlightQuery = {
  title?: string | null;
  description?: string | null;
  beforeImage?: SanityLocationImage | null;
  afterImage?: SanityLocationImage | null;
} | null;

export type LocationTestimonialQuery = {
  quote?: string | null;
  author?: string | null;
  location?: string | null;
};

export type LocationFaqQuery = {
  question?: string | null;
  answer?: string | null;
};

/** Raw shape returned by `locationBySlugQuery` (images unresolved). */
export type LocationBySlugQueryResult = {
  title: string | null;
  slug: string | null;
  county: string | null;
  intro: string | null;
  neighborhoods: string[] | null;
  services: string[] | null;
  projectHighlight: LocationProjectHighlightQuery;
  testimonials: LocationTestimonialQuery[] | null;
  faqs: LocationFaqQuery[] | null;
} | null;

export type LocationGridItem = {
  title: string;
  slug: string;
  county: string | null;
};

export type LocationPageHighlight = {
  title: string;
  description: string;
  beforeUrl: string;
  afterUrl: string;
  beforeAlt: string;
  afterAlt: string;
  imageWidth: number;
  imageHeight: number;
};

export type LocationPageProps = {
  cityTitle: string;
  county: string | null;
  intro: string;
  neighborhoods: string[];
  services: string[];
  projectHighlight: LocationPageHighlight | null;
  testimonials: Array<{
    quote: string;
    author: string;
    location: string | null;
  }>;
  faqs: Array<{ question: string; answer: string }>;
};

const HIGHLIGHT_W = 900;
const HIGHLIGHT_H = 600;

function resolveImageUrl(
  image: SanityLocationImage | null | undefined,
  width: number,
  height: number,
): string | undefined {
  if (!image || typeof image !== "object" || !("asset" in image)) {
    return undefined;
  }
  const ref = image.asset && "_ref" in image.asset ? image.asset._ref : undefined;
  if (!ref) return undefined;
  try {
    return urlFor(image).width(width).height(height).fit("crop").url() ?? undefined;
  } catch {
    return undefined;
  }
}

export function trimForMetaDescription(text: string, maxLen = 160): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= maxLen) return t;
  const cut = t.slice(0, maxLen - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > 40 ? cut.slice(0, lastSpace) : cut;
  return `${base}…`;
}

export function mapLocationQueryToPageProps(
  doc: LocationBySlugQueryResult,
): LocationPageProps | null {
  if (!doc?.title?.trim() || !doc.slug?.trim() || !doc.intro?.trim()) {
    return null;
  }

  const neighborhoods = (doc.neighborhoods ?? []).filter(
    (n): n is string => typeof n === "string" && n.trim().length > 0,
  );
  const servicesRaw = doc.services ?? [];
  const services =
    servicesRaw.filter((s): s is string => typeof s === "string" && s.trim().length > 0)
      .length > 0
      ? servicesRaw.filter((s): s is string => typeof s === "string" && s.trim().length > 0)
      : [...DEFAULT_LOCATION_SERVICES];

  const ph = doc.projectHighlight;
  let projectHighlight: LocationPageHighlight | null = null;
  if (ph?.title?.trim() && ph.description?.trim()) {
    const beforeUrl = resolveImageUrl(ph.beforeImage ?? null, HIGHLIGHT_W, HIGHLIGHT_H);
    const afterUrl = resolveImageUrl(ph.afterImage ?? null, HIGHLIGHT_W, HIGHLIGHT_H);
    if (beforeUrl && afterUrl) {
      const beforeAlt =
        (ph.beforeImage && "imgAlt" in ph.beforeImage && ph.beforeImage.imgAlt) ||
        `Before — ${ph.title}`;
      const afterAlt =
        (ph.afterImage && "imgAlt" in ph.afterImage && ph.afterImage.imgAlt) ||
        `After — ${ph.title}`;
      projectHighlight = {
        title: ph.title.trim(),
        description: ph.description.trim(),
        beforeUrl,
        afterUrl,
        beforeAlt: typeof beforeAlt === "string" ? beforeAlt : `Before — ${ph.title}`,
        afterAlt: typeof afterAlt === "string" ? afterAlt : `After — ${ph.title}`,
        imageWidth: HIGHLIGHT_W,
        imageHeight: HIGHLIGHT_H,
      };
    }
  }

  const testimonials = (doc.testimonials ?? [])
    .filter(
      (t): t is LocationTestimonialQuery & { quote: string; author: string } =>
        typeof t?.quote === "string" &&
        t.quote.trim().length > 0 &&
        typeof t?.author === "string" &&
        t.author.trim().length > 0,
    )
    .slice(0, 2)
    .map((t) => ({
      quote: t.quote.trim(),
      author: t.author.trim(),
      location:
        typeof t.location === "string" && t.location.trim().length > 0
          ? t.location.trim()
          : null,
    }));

  const faqs = (doc.faqs ?? [])
    .filter(
      (f): f is LocationFaqQuery & { question: string; answer: string } =>
        typeof f?.question === "string" &&
        f.question.trim().length > 0 &&
        typeof f?.answer === "string" &&
        f.answer.trim().length > 0,
    )
    .map((f) => ({
      question: f.question.trim(),
      answer: f.answer.trim(),
    }));

  return {
    cityTitle: doc.title.trim(),
    county: doc.county?.trim() ? doc.county.trim() : null,
    intro: doc.intro.trim(),
    neighborhoods,
    services,
    projectHighlight,
    testimonials,
    faqs,
  };
}
