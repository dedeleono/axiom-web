"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

import type { LocationPageProps } from "@/lib/location-page";

const containerClass =
  "max-w-[95%] xl:max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24";

export default function LocationPage(props: LocationPageProps) {
  const {
    cityTitle,
    heroUrl,
    heroAlt,
    county,
    intro,
    neighborhoods,
    services,
    projectHighlight,
    testimonials,
    faqs,
  } = props;

  const headline = `Home Remodeling in ${cityTitle}, CA`;

  return (
    <div className="bg-white font-geist text-brand-black">
      {/* Hero */}
      <section className="relative flex w-full items-center justify-center overflow-visible">
        <div className="relative h-[600px] w-full md:h-[700px]">
          {heroUrl ? (
            <Image
              src={heroUrl}
              alt={heroAlt}
              fill
              className="object-cover object-[30%_center] md:object-center"
              priority
            />
          ) : (
            <div className="h-full w-full bg-[#18181a]" />
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white">
            <motion.div
              className="z-10 mx-auto w-full max-w-screen-2xl px-8 font-geist-mono md:px-24"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="max-w-4xl text-left text-4xl font-light uppercase leading-tight tracking-tight md:text-6xl">
                {headline}
              </h1>
              {county && (
                <p className="mt-4 flex items-center gap-2 text-sm uppercase tracking-widest text-white/80">
                  <MapPin className="h-4 w-4" aria-hidden />
                  {county}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro + Neighborhoods */}
      <section className="mask-overlap relative z-20 bg-white pt-10">
        <div className={`${containerClass} py-16 md:py-24`}>
          <motion.div
            className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lg:col-span-7">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray">
                About {cityTitle}
              </p>
              <div className="space-y-5 text-lg font-light leading-relaxed text-brand-dark-gray md:text-xl">
                {intro.split("\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <Link
                href="/contact"
                className="mt-10 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange transition-colors hover:text-brand-black"
              >
                Book a free consultation
                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>

            {neighborhoods.length > 0 && (
              <div className="lg:col-span-5 lg:border-l lg:border-brand-light-gray lg:pl-12">
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray">
                  Neighborhoods we serve
                </p>
                <ul className="columns-2 gap-x-6 space-y-2 md:columns-3 lg:columns-2">
                  {neighborhoods.map((n) => (
                    <li
                      key={n}
                      className="text-sm font-light leading-snug text-brand-black md:text-base"
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="mask-overlap relative z-10 bg-[#F5F5F5] pt-10">
        <div className={`${containerClass} py-16 md:py-24`}>
          <motion.div
            className="mx-auto max-w-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray">
                  Our services in {cityTitle}
                </p>
                <h2 className="text-3xl font-light leading-[1.1] tracking-tight text-brand-black md:text-4xl">
                  What we can build for you
                </h2>
              </div>
              <Link
                href="/services"
                className="inline-flex shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange transition-colors hover:text-brand-black"
              >
                All services
                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {services.map((name, idx) => (
                <motion.div
                  key={name}
                  className="flex items-center border border-brand-light-gray bg-white px-5 py-4 transition-colors hover:border-brand-black/20 md:px-6 md:py-5"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(idx * 0.05, 0.2),
                  }}
                >
                  <span className="text-sm font-light text-brand-black md:text-base">
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Highlight */}
      {projectHighlight && (
        <section className="mask-overlap relative z-10 bg-white pt-10">
          <div className={`${containerClass} py-16 md:py-24`}>
            <motion.div
              className="mx-auto max-w-6xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="mb-10 md:mb-14">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray">
                  Featured project
                </p>
                <h2 className="mb-4 text-3xl font-light tracking-tight text-brand-black md:text-4xl">
                  {projectHighlight.title}
                </h2>
                <p className="max-w-2xl text-base font-light leading-relaxed text-brand-dark-gray md:text-lg">
                  {projectHighlight.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                <motion.figure
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative aspect-3/2 w-full overflow-hidden border border-brand-light-gray bg-brand-light-gray/20">
                    <Image
                      src={projectHighlight.beforeUrl}
                      alt={projectHighlight.beforeAlt}
                      width={projectHighlight.imageWidth}
                      height={projectHighlight.imageHeight}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark-gray">
                    Before
                  </figcaption>
                </motion.figure>
                <motion.figure
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 }}
                >
                  <div className="relative aspect-3/2 w-full overflow-hidden border border-brand-light-gray bg-brand-light-gray/20">
                    <Image
                      src={projectHighlight.afterUrl}
                      alt={projectHighlight.afterAlt}
                      width={projectHighlight.imageWidth}
                      height={projectHighlight.imageHeight}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark-gray">
                    After
                  </figcaption>
                </motion.figure>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="mask-overlap relative z-10 bg-[#F5F5F5] pt-10">
          <div className={`${containerClass} py-16 md:py-24`}>
            <motion.div
              className="mx-auto max-w-6xl"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-10 text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray md:mb-14">
                What homeowners say
              </p>

              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
                {testimonials.map((t, idx) => (
                  <motion.blockquote
                    key={`${t.author}-${idx}`}
                    className="border-l-2 border-brand-orange pl-6"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                  >
                    <p className="text-base font-light leading-relaxed text-brand-dark-gray md:text-lg">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <footer className="mt-4">
                      <p className="text-sm font-semibold text-brand-black">
                        {t.author}
                      </p>
                      {t.location && (
                        <p className="text-xs text-brand-dark-gray">
                          {t.location}
                        </p>
                      )}
                    </footer>
                  </motion.blockquote>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="mask-overlap relative z-10 bg-white pt-10">
          <div className={`${containerClass} py-16 md:py-24`}>
            <motion.div
              className="mx-auto max-w-6xl"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray">
                    FAQs
                  </p>
                  <h2 className="text-3xl font-light leading-[1.1] tracking-tight text-brand-black md:text-4xl">
                    {cityTitle} remodeling questions
                  </h2>
                </div>

                <div className="space-y-3 lg:col-span-8">
                  {faqs.map((item, idx) => (
                    <motion.details
                      key={item.question}
                      className="group border border-brand-light-gray bg-white open:bg-[#fafafa]"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: Math.min(idx * 0.04, 0.2),
                      }}
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-sm font-medium text-brand-black marker:content-none md:text-base [&::-webkit-details-marker]:hidden">
                        {item.question}
                        <span className="shrink-0 text-brand-dark-gray transition group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <div className="border-t border-brand-light-gray px-6 py-5 text-sm font-light leading-relaxed text-brand-dark-gray md:text-base">
                        {item.answer}
                      </div>
                    </motion.details>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Final CTA - Orange */}
      <section className="mask-overlap relative z-10 bg-brand-orange pt-10">
        <div className={`${containerClass} py-20 text-center text-white md:py-28`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-3xl font-light tracking-tight md:text-5xl">
              Get a Free Estimate in {cityTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base font-light text-white/80 md:text-lg">
              Tell us about your project—we&apos;ll follow up to schedule a
              consultation.
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white bg-transparent px-10 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-brand-orange"
              >
                Contact us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
