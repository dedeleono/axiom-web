import type { Metadata } from "next";

import Footer from "@/components/footer";
import Header from "@/components/header";
import JsonLd from "@/components/json-ld";
import LeadForm from "@/components/lead-form";
import TrustBar from "@/components/trust-bar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  faqPageJsonLd,
  serviceJsonLd,
  type FaqEntry,
} from "@/lib/structured-data";

const PATH = "/adu-builder-san-jose";

const DESCRIPTION =
  "Design-build ADU contractor in San Jose. Custom site-built accessory dwelling units and garage conversions — plans, permits, and construction handled by one licensed team (CSLB #1105006). Free estimate.";

export const metadata: Metadata = {
  title: "ADU Builder in San Jose | Custom ADUs & Garage Conversions",
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: PATH,
    title: "ADU Builder in San Jose | Axiom Renovation",
    description: DESCRIPTION,
  },
};

const containerClass =
  "max-w-[95%] xl:max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24";

const highlights = [
  {
    title: "One accountable team",
    body: "Design, structural engineering, permits, and construction under one roof — from first sketch to final city sign-off.",
  },
  {
    title: "Built for San Jose lots",
    body: "Detached units, attached ADUs, and garage conversions planned around Santa Clara County setbacks and review times.",
  },
  {
    title: "Fixed, transparent scope",
    body: "A detailed line-item estimate before construction starts, so you know exactly what your ADU includes.",
  },
];

/** Static so the answers are in the server HTML and match the FAQPage JSON-LD
 * exactly. Copy mirrors the /services/adu page for message-match consistency. */
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
  path: PATH,
  name: "ADU Construction in San Jose",
  serviceType: "Accessory dwelling unit (ADU) construction",
  description: DESCRIPTION,
});

const aduFaqJsonLd = faqPageJsonLd(PATH, aduFaqs);

export default function AduBuilderSanJosePage() {
  return (
    <div className="min-h-screen bg-white text-brand-black">
      <JsonLd data={aduServiceJsonLd} />
      <JsonLd data={aduFaqJsonLd} />
      <Header />

      <main className="w-full">
        {/* Hero — dark, keyword-matched headline, lead form above the fold */}
        <section className="relative overflow-hidden bg-brand-black px-5 pb-16 pt-32 text-white md:pb-24 md:pt-40">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute left-1/2 top-0 h-[420px] w-[min(900px,95vw)] -translate-x-1/2 rounded-full bg-brand-orange/[0.10] blur-[120px]" />
          </div>
          <div className={`relative ${containerClass}`}>
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
              <div className="max-w-xl">
                <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">
                  ADU Construction · San Jose &amp; the Bay Area
                </p>
                <h1 className="text-balance text-4xl font-light uppercase leading-[0.95] tracking-tight md:text-6xl">
                  ADU Builder in{" "}
                  <span className="text-brand-orange">San Jose</span>
                </h1>
                <p className="mt-6 max-w-md text-base font-light leading-relaxed text-white/75 md:text-lg">
                  Custom, site-built accessory dwelling units and garage
                  conversions — designed, permitted, and built by one licensed
                  design-build team.
                </p>
                <p className="mt-8 text-sm font-light text-white/60">
                  Licensed design-build · CSLB #1105006 · 30+ years ·{" "}
                  <a
                    href="tel:+14087022022"
                    className="font-medium text-white transition-colors hover:text-brand-orange"
                  >
                    408-702-2022
                  </a>
                </p>
              </div>

              <div id="adu-estimate" className="w-full scroll-mt-28">
                <div className="bg-white p-6 text-brand-black shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)] md:p-8">
                  <p className="text-lg font-light tracking-tight text-brand-black">
                    Get your free ADU estimate
                  </p>
                  <p className="mb-6 mt-1 text-sm font-light text-brand-dark-gray">
                    One business day. No obligation.
                  </p>
                  <LeadForm
                    source="lp-adu-builder-san-jose"
                    submitLabel="Request my free estimate"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value props */}
        <section className="mask-overlap relative z-20 bg-white pt-14 md:pt-20">
          <div className={containerClass}>
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
              {highlights.map((item) => (
                <div key={item.title} className="border-t-2 border-brand-orange pt-6">
                  <h2 className="text-lg font-medium text-brand-black">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm font-light leading-relaxed text-brand-dark-gray">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust stats */}
        <section className="bg-white py-16 md:py-20">
          <div className={containerClass}>
            <TrustBar />
          </div>
        </section>

        {/* Garage conversion — message-match for the garage-conversion ad */}
        <section className="bg-white">
          <div className={containerClass}>
            <div className="mx-auto w-full max-w-6xl border-t border-brand-light-gray pt-12 md:pt-16">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray">
                Garage conversions
              </p>
              <h2 className="mb-8 max-w-3xl text-balance text-3xl font-light leading-[1.1] tracking-tight text-brand-black md:text-4xl">
                The fastest way to add an ADU in San Jose
              </h2>
              <div className="max-w-3xl space-y-6 text-lg font-light leading-relaxed text-brand-dark-gray">
                <p className="text-pretty">
                  A garage conversion reuses your existing foundation, walls, and
                  roof — usually the most cost-effective and fastest route to a
                  fully permitted ADU.
                </p>
                <p className="text-pretty">
                  Our team handles space planning, structural upgrades, plumbing
                  and electrical, city permits, and construction through final
                  inspection — a move-in-ready unit for rental income, family, or
                  a home office.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white pb-20 pt-4 md:pb-28" aria-labelledby="lp-faq-heading">
          <div className={containerClass}>
            <div className="mx-auto w-full max-w-3xl border-t border-brand-light-gray pt-12 md:pt-16">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray">
                FAQs
              </p>
              <h2
                id="lp-faq-heading"
                className="mb-8 text-balance text-3xl font-light leading-[1.1] tracking-tight text-brand-black md:text-4xl"
              >
                ADU questions, answered
              </h2>
              <Accordion
                type="multiple"
                defaultValue={aduFaqs.map((_, i) => `lp-faq-${i}`)}
                className="flex flex-col gap-3"
              >
                {aduFaqs.map((faq, i) => (
                  <AccordionItem
                    key={faq.question}
                    value={`lp-faq-${i}`}
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
        </section>

        {/* Closing CTA */}
        <section className="bg-brand-orange">
          <div className={`${containerClass} py-16 md:py-20`}>
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-xl">
                <h2 className="text-3xl font-light leading-[1.1] tracking-tight text-white md:text-4xl">
                  Ready to price your ADU?
                </h2>
                <p className="mt-4 text-base font-light text-white/90">
                  Tell us about your lot and we&apos;ll take it from there.
                </p>
              </div>
              <a
                href="#adu-estimate"
                className="group inline-flex h-auto shrink-0 items-center justify-center rounded-none border border-white bg-white px-10 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange transition-colors hover:bg-transparent hover:text-white"
              >
                Get my free estimate
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
