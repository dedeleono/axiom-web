import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { LocationPageProps } from "@/lib/location-page";

const section = "mx-auto max-w-7xl px-5 md:px-8";

export default function LocationPage(props: LocationPageProps) {
  const { cityTitle, county, intro, neighborhoods, services, projectHighlight, testimonials, faqs } =
    props;

  const headline = `Home Remodeling in ${cityTitle}, CA`;

  return (
    <div className="w-full font-geist text-brand-black">
      {/* Hero */}
      <section className="border-b border-brand-light-gray bg-white py-14 md:py-20">
        <div className={`${section} text-center`}>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-brand-black md:text-4xl lg:text-5xl">
            {headline}
          </h1>
          {county ? (
            <p className="mt-3 text-sm uppercase tracking-widest text-brand-dark-gray md:text-base">
              {county}
            </p>
          ) : null}
          <div className="mt-8 flex justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-none bg-brand-black text-white hover:bg-brand-black/90"
            >
              <Link href="/contact">Get a free estimate</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Local intro */}
      <section className="border-b border-brand-light-gray bg-white py-12 md:py-16">
        <div className={section}>
          <p className="max-w-3xl text-base leading-relaxed text-brand-dark-gray md:text-lg">
            {intro}
          </p>
          {neighborhoods.length > 0 ? (
            <div className="mt-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-black">
                Neighborhoods we serve
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-dark-gray md:text-base">
                {neighborhoods.join(" · ")}
              </p>
            </div>
          ) : null}
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-brand-light-gray bg-[#fafafa] py-12 md:py-16">
        <div className={section}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-black md:text-sm">
            Services
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((name) => (
              <li
                key={name}
                className="border border-brand-light-gray bg-white px-4 py-3 text-sm text-brand-black md:text-base"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Project highlight */}
      {projectHighlight ? (
        <section className="border-b border-brand-light-gray bg-white py-12 md:py-16">
          <div className={section}>
            <h2 className="text-xl font-bold text-brand-black md:text-2xl">
              {projectHighlight.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-dark-gray md:text-base">
              {projectHighlight.description}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              <figure className="space-y-2">
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-brand-light-gray">
                  <Image
                    src={projectHighlight.beforeUrl}
                    alt={projectHighlight.beforeAlt}
                    width={projectHighlight.imageWidth}
                    height={projectHighlight.imageHeight}
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="text-xs uppercase tracking-wider text-brand-dark-gray">
                  Before
                </figcaption>
              </figure>
              <figure className="space-y-2">
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-brand-light-gray">
                  <Image
                    src={projectHighlight.afterUrl}
                    alt={projectHighlight.afterAlt}
                    width={projectHighlight.imageWidth}
                    height={projectHighlight.imageHeight}
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="text-xs uppercase tracking-wider text-brand-dark-gray">
                  After
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
      ) : null}

      {/* Testimonials */}
      {testimonials.length > 0 ? (
        <section className="border-b border-brand-light-gray bg-[#fafafa] py-12 md:py-16">
          <div className={section}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-black md:text-sm">
              What homeowners say
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
              {testimonials.map((t) => (
                <li key={`${t.author}-${t.quote.slice(0, 24)}`} className="border-l-2 border-brand-black pl-4">
                  <blockquote className="text-sm leading-relaxed text-brand-dark-gray md:text-base">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <p className="mt-3 text-sm font-semibold text-brand-black">{t.author}</p>
                  {t.location ? (
                    <p className="text-xs text-brand-dark-gray">{t.location}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* FAQs */}
      {faqs.length > 0 ? (
        <section className="border-b border-brand-light-gray bg-white py-12 md:py-16">
          <div className={section}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-black md:text-sm">
              FAQs
            </h2>
            <div className="mt-6 max-w-3xl space-y-2">
              {faqs.map((item) => (
                <details
                  key={item.question}
                  className="group border border-brand-light-gray bg-white open:bg-[#fafafa]"
                >
                  <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-brand-black marker:content-none md:text-base [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-2">
                      {item.question}
                      <span className="text-brand-dark-gray transition group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <div className="border-t border-brand-light-gray px-4 py-3 text-sm leading-relaxed text-brand-dark-gray">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Final CTA */}
      <section className="bg-brand-black py-14 text-white md:py-20">
        <div className={`${section} text-center`}>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Get a Free Estimate in {cityTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/80 md:text-base">
            Tell us about your project—we&apos;ll follow up to schedule a consultation.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-none border-white bg-transparent text-white hover:bg-white hover:text-brand-black"
            >
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
