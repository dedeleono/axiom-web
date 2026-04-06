import type { Image as SanityImage } from "sanity";

/** Innovation (`service page`) row fields needed to resolve the detail hero image. */
export interface InnovationHeroVisualInput {
  title: string;
  /** Dedicated hero asset when set in Studio. */
  heroImage?: (SanityImage & { imgAlt?: string }) | null;
  /** Cover image; used when `heroImage` is empty. */
  image?: SanityImage | null;
  /** First image used when hero and cover are empty. */
  gallery?: SanityImage[] | null;
}

/**
 * Asset ref for the image shown in the service detail hero (dedicated hero → cover → first gallery).
 */
export function innovationHeroBackgroundAssetRef(
  row: InnovationHeroVisualInput
): string | undefined {
  const h = row.heroImage?.asset;
  if (h && typeof h === "object" && "_ref" in h && typeof h._ref === "string") {
    return h._ref;
  }
  const cov = row.image?.asset;
  if (cov && typeof cov === "object" && "_ref" in cov && typeof cov._ref === "string") {
    return cov._ref;
  }
  const g0 = row.gallery?.[0]?.asset;
  if (g0 && typeof g0 === "object" && "_ref" in g0 && typeof g0._ref === "string") {
    return g0._ref;
  }
  return undefined;
}

export function innovationHeroVisual(
  row: InnovationHeroVisualInput
): { image: SanityImage & { imgAlt?: string }; alt: string } | null {
  if (row.heroImage?.asset) {
    return {
      image: row.heroImage,
      alt: row.heroImage.imgAlt?.trim() || row.title,
    };
  }
  if (row.image?.asset) {
    return { image: row.image as SanityImage & { imgAlt?: string }, alt: row.title };
  }
  const first = row.gallery?.[0];
  if (first?.asset) {
    return { image: first, alt: row.title };
  }
  return null;
}
