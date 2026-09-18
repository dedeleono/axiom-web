import Link from "next/link";

import ServiceContent from "@/components/services/ServiceContent";
import JsonLd from "@/components/json-ld";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqPageJsonLd, serviceJsonLd, type FaqEntry } from "@/lib/structured-data";

export const metadata = {
  title: "ADU Construction",
  description:
    "Design and build the perfect accessory dwelling unit with Axiom Renovation. Detached ADUs, attached ADUs, and garage conversions in San Jose and the Bay Area. Free consultations.",
  alternates: { canonical: "/services/adu" },
};

const containerClass =
  "max-w-[95%] xl:max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24";

const garageConversionParagraphs = [
  "A garage conversion is often the fastest and most cost-effective way to add an ADU in San Jose — the foundation, walls, and roof are already in place, which keeps costs down and shortens the construction timeline.",
  "Our design-build team handles the entire garage-to-ADU conversion: space planning, structural upgrades, plumbing and electrical, city permits, and construction through final inspection — a fully permitted living space ready to serve as a rental unit, guest house, or home office.",
];

/**
 * Rendered in the visible FAQ section below AND serialized into the FAQPage
 * JSON-LD. Google requires the schema to match the on-page text exactly, so
 * both always read from this single array.
 */
const aduFaqs: FaqEntry[] = [
  {
    question: "How much does a custom ADU cost in the Bay Area?",
    answer:
      "Most of our custom site-built ADUs fall between $250,000 and $450,000 depending on size, site conditions, and the finishes you choose. Garage conversions typically cost less because the foundation and structure already exist. Every project gets a detailed line-item estimate before construction begins.",
  },
  {
    question: "How long does it take to design and build an ADU?",
    answer:
      "Plan on two phases: design and permitting typically take 3 to 5 months depending on your city's review times, and construction usually adds another 6 to 9 months. We give you a project-specific schedule during the design phase and keep you updated at every milestone.",
  },
  {
    question: "Do you handle ADU permits and city approvals?",
    answer:
      "Yes. As a design-build contractor, we manage the full approval process — architectural plans, structural engineering, permit submittals, and city inspections — so you have one accountable team from first sketch to final sign-off.",
  },
  {
    question: "Should I convert my garage or build a detached ADU?",
    answer:
      "A garage conversion is usually the fastest and most budget-friendly route because it reuses your existing foundation, walls, and roof. A detached ADU costs more but offers more flexibility in size, layout, and privacy. We walk you through both options during your free consultation.",
  },
  {
    question: "Do you build prefab ADUs?",
    answer:
      "No — every ADU we build is custom-designed and built on site for your specific property. Site-built construction gives you full control over layout, materials, and finishes, and lets the new unit blend seamlessly with your existing home — flexibility that factory-built prefab units don't offer.",
  },
];

const aduServiceJsonLd = serviceJsonLd({
  path: "/services/adu",
  name: "ADU Construction",
  serviceType: "Accessory dwelling unit (ADU) construction",
  description: metadata.description,
});

const aduFaqJsonLd = faqPageJsonLd("/services/adu", aduFaqs);

export default function AduConstructionPage() {
  return (
    <>
      <JsonLd data={aduServiceJsonLd} />
      <JsonLd data={aduFaqJsonLd} />

      <ServiceContent slug="adu" />

      {/* Garage conversions — statically rendered so crawlers always see it */}
      <section className="bg-white" aria-labelledby="garage-conversion-heading">
        <div className={containerClass}>
          <div className="mx-auto w-full max-w-6xl border-t border-brand-light-gray pt-12 mt-16 md:mt-24">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray mb-6">
              Garage Conversions
            </p>
            <h2
              id="garage-conversion-heading"
              className="text-balance text-3xl md:text-4xl font-light tracking-tight text-brand-black leading-[1.1] mb-8 max-w-3xl"
            >
              Turn your garage into a fully permitted ADU
            </h2>
            <div className="text-brand-dark-gray font-light text-lg md:text-xl leading-relaxed space-y-6 max-w-3xl">
              {garageConversionParagraphs.map((paragraph, i) => (
                <p key={i} className="text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center justify-center rounded-none border border-brand-black bg-brand-black px-10 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-brand-orange hover:bg-brand-orange"
            >
              Book a free consultation
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs — items open by default so answers are in the server HTML and
          always match the FAQPage JSON-LD above */}
      <section className="bg-white pb-20 md:pb-28" aria-labelledby="adu-faq-heading">
        <div className={containerClass}>
          <div className="mx-auto w-full max-w-6xl border-t border-brand-light-gray pt-12 mt-16 md:mt-24">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray mb-6">
              FAQs
            </p>
            <h2
              id="adu-faq-heading"
              className="text-balance text-3xl md:text-4xl font-light tracking-tight text-brand-black leading-[1.1] mb-8 max-w-3xl"
            >
              ADU questions, answered
            </h2>
            <div className="max-w-3xl">
              <Accordion
                type="multiple"
                defaultValue={aduFaqs.map((_, i) => `faq-${i}`)}
                className="flex flex-col gap-3"
              >
                {aduFaqs.map((faq, i) => (
                  <AccordionItem
                    key={faq.question}
                    value={`faq-${i}`}
                    className="rounded-none border border-brand-light-gray bg-white px-5 data-[state=open]:shadow-[0_24px_80px_-24px_rgba(0,0,0,0.08)] md:px-8"
                  >
                    <AccordionTrigger
                      chevron
                      className="py-5 text-left text-sm font-medium text-brand-black hover:no-underline data-[state=open]:text-brand-orange md:text-base"
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-pretty pb-5 text-sm leading-relaxed text-brand-dark-gray md:text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
