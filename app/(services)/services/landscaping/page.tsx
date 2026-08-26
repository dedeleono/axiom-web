import Link from "next/link";

import JsonLd from "@/components/json-ld";
import { serviceJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "Bay Area Landscaping | Design, Hardscaping & Outdoor Living",
  description:
    "Bay Area landscape design and build services from Axiom Renovation. Create a complete outdoor space with hardscaping, patios, planting, and outdoor living features. Book a free consultation.",
};

const landscapingServiceJsonLd = serviceJsonLd({
  path: "/services/landscaping",
  name: "Bay Area Landscaping",
  serviceType: "Landscape design and construction",
  description: metadata.description,
});

const services = [
  {
    title: "Landscape Design & Build",
    description:
      "Bring the entire yard together with one coordinated plan for layout, grading, planting, irrigation, lighting, materials, and construction.",
  },
  {
    title: "Hardscaping",
    description:
      "Create durable, low-maintenance structure with patios, pavers, walkways, retaining walls, steps, and other masonry features.",
  },
  {
    title: "Outdoor Living",
    description:
      "Extend the way you live outside with gathering areas, outdoor kitchens, pergolas, fire features, and spaces designed for year-round use.",
  },
] as const;

const process = [
  {
    step: "01",
    title: "Consult and assess",
    description:
      "We learn how you want to use the space, review your property, and align on priorities, style, and budget.",
  },
  {
    step: "02",
    title: "Design and scope",
    description:
      "We develop a cohesive plan, select materials and features, and define the construction scope before work begins.",
  },
  {
    step: "03",
    title: "Build and complete",
    description:
      "Our team coordinates the work from site preparation through installation and final walkthrough, with one point of accountability.",
  },
] as const;

const containerClass =
  "max-w-[95%] xl:max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24";

export default function LandscapingPage() {
  return (
    <>
      <JsonLd data={landscapingServiceJsonLd} />

      <section className="bg-white pb-20 md:pb-28" aria-labelledby="landscaping-overview">
        <div className={`${containerClass} pt-4 md:pt-10`}>
          <div className="mx-auto w-full max-w-6xl border-t border-brand-light-gray pt-10">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray">
              Landscaping
            </p>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14 lg:gap-20">
              <div className="md:col-span-7">
                <h1
                  id="landscaping-overview"
                  className="text-balance text-3xl font-light leading-[1.1] tracking-tight text-brand-black md:text-5xl"
                >
                  A complete outdoor space, designed and built as one project.
                </h1>
                <p className="mt-8 max-w-3xl text-pretty text-lg font-light leading-relaxed text-brand-dark-gray md:text-xl">
                  Axiom Renovation plans and builds Bay Area landscapes that feel connected to your
                  home and work for daily life. From the first site conversation through the final
                  walkthrough, our design-build team coordinates the details so planting,
                  hardscaping, and outdoor living features come together in one cohesive result.
                </p>
                <Link
                  href="/contact"
                  className="mt-10 inline-flex items-center justify-center rounded-none border border-brand-black bg-brand-black px-10 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-brand-orange hover:bg-brand-orange"
                >
                  Book a free consultation
                </Link>
              </div>
              <aside className="border-t border-brand-light-gray pt-8 md:col-span-5 md:border-l md:border-t-0 md:pl-10 md:pt-0 lg:pl-14">
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray">
                  One accountable team
                </p>
                <ul className="space-y-4 text-base font-light leading-relaxed text-brand-black md:text-lg">
                  <li>Design decisions tied to real construction details</li>
                  <li>Coordinated hardscape, planting, lighting, and irrigation</li>
                  <li>Clear scope and communication from planning through completion</li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F5] py-20 md:py-28" aria-labelledby="landscaping-services">
        <div className={containerClass}>
          <div className="mx-auto w-full max-w-6xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray">
              What we build
            </p>
            <h2
              id="landscaping-services"
              className="max-w-3xl text-balance text-3xl font-light leading-[1.1] tracking-tight text-brand-black md:text-5xl"
            >
              Landscape services shaped around your property.
            </h2>
            <div className="mt-12 grid grid-cols-1 border-t border-black/10 md:grid-cols-3">
              {services.map((service, index) => (
                <article
                  key={service.title}
                  className="border-b border-black/10 py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                >
                  <span className="text-xs font-semibold tracking-[0.2em] text-brand-orange">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-2xl font-light tracking-tight text-brand-black">
                    {service.title}
                  </h3>
                  <p className="mt-5 text-base font-light leading-relaxed text-brand-dark-gray">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28" aria-labelledby="landscaping-process">
        <div className={containerClass}>
          <div className="mx-auto w-full max-w-6xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray">
              Our process
            </p>
            <h2
              id="landscaping-process"
              className="max-w-3xl text-balance text-3xl font-light leading-[1.1] tracking-tight text-brand-black md:text-5xl"
            >
              A clear path from yard to finished landscape.
            </h2>
            <div className="mt-12 max-w-4xl">
              {process.map((item) => (
                <article
                  key={item.step}
                  className="grid grid-cols-1 gap-5 border-b border-black/[0.08] py-9 first:pt-0 md:grid-cols-12 md:gap-10"
                >
                  <span className="text-4xl font-light text-brand-light-gray md:col-span-3 md:text-6xl">
                    {item.step}
                  </span>
                  <div className="md:col-span-9">
                    <h3 className="text-xl font-light tracking-tight text-brand-black md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-brand-dark-gray md:text-lg">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-black py-20 text-white md:py-24" aria-labelledby="landscaping-cta">
        <div className={containerClass}>
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                Start your project
              </p>
              <h2
                id="landscaping-cta"
                className="max-w-3xl text-balance text-3xl font-light leading-[1.1] tracking-tight md:text-5xl"
              >
                Ready to make more of your outdoor space?
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center rounded-none bg-brand-orange px-10 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#e04f1e]"
            >
              Book a free consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
