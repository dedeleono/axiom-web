/**
 * Shared JSON-LD structured data (schema.org) for search engines.
 *
 * Every business fact below is sourced from visible site content:
 * - Name, slogan, address, phone, email, social links: components/footer.tsx
 * - CSLB license number: components/home/Hero.tsx ("License: 1105006")
 * - Description: app/layout.tsx metadata
 * - Logo: public/axiomLogo_dark.png (dark-on-white header variant)
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.axiom-remodel.com";

/** Stable node id so page-level Service schemas can reference the business. */
export const BUSINESS_ID = `${SITE_URL}/#business`;

const AREA_SERVED = [
  { "@type": "City", name: "San Jose" },
  { "@type": "AdministrativeArea", name: "Santa Clara County" },
];

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": BUSINESS_ID,
  name: "Axiom Renovation",
  slogan: "Building Relationships",
  description:
    "Transform your Bay Area home with Axiom Renovation. Licensed contractors specializing in kitchen remodeling, bathroom renovation, ADUs, and full home renovations. Free consultations.",
  url: SITE_URL,
  logo: `${SITE_URL}/axiomLogo_dark.png`,
  image: `${SITE_URL}/axiomLogo_dark.png`,
  telephone: "+14087022022",
  email: "office@axiom-renovation.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4030 Moorpark Ave, Suite 102",
    addressLocality: "San Jose",
    addressRegion: "CA",
    addressCountry: "US",
  },
  identifier: {
    "@type": "PropertyValue",
    propertyID: "CSLB License",
    value: "1105006",
  },
  areaServed: AREA_SERVED,
  sameAs: [
    "https://www.instagram.com/axiomrenovation/",
    "https://www.facebook.com/axiomrenovationinc",
    "https://www.youtube.com/channel/UC8W6hYToT7_TEv6P6xKMM4Q",
    "https://www.tiktok.com/@axiomrenovation",
  ],
};

type ServiceJsonLdInput = {
  /** Path under the site root, e.g. "/services/adu". */
  path: string;
  name: string;
  serviceType: string;
  description: string;
};

export function serviceJsonLd({
  path,
  name,
  serviceType,
  description,
}: ServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name,
    serviceType,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": BUSINESS_ID },
    areaServed: AREA_SERVED,
  };
}

export type FaqEntry = { question: string; answer: string };

/**
 * FAQPage schema. Google requires the entries to match the FAQ content
 * visible on the page exactly, so always build this from the same array
 * that renders the visible FAQ section.
 */
export function faqPageJsonLd(path: string, faqs: readonly FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
