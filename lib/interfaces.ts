import type { Image as SanityImage } from "sanity";

export interface HeroData {
  title?: string;
  pageName?: string;
  img?: {
    asset: SanityImage;
    imgAlt?: string;
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  };
  heroText?: string;
  heroSubText?: string;
}

interface SanityImageAsset extends SanityImage {
  _type: string;
  _ref: string;
}

export interface SanityImageObject {
  asset: SanityImageAsset;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface ProjectData {
  title: string;
  /** Scope of work (comma-separated or sentence). */
  services?: string;
  /** Timeline / duration (e.g. 6–8 weeks). */
  lengthOfProject?: string;
  /** Budget range or tier. */
  budget?: string;
  description1: string;
  description2?: string;
  image: SanityImageObject;
  highlightImages: SanityImageObject[];
  projectCarouselImages?: SanityImageObject[];
}
