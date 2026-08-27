import WhoWeAre from "@/components/home/who-we-are";
import Philosophy from "@/components/home/philosophy";
// import Projects from "@/components/home/projects";
// import Awards from "@/components/home/awards";
import Services from "@/components/home/services";
import ServicesIntro from "@/components/home/services-intro";

import Testimonials from "@/components/home/testimonials";
import Footer from "@/components/footer";
import Hero from "@/components/home/Hero";
import Header from "@/components/header";

import { CTAStrip } from "@/components/cta-strip";
import LeadForm from "@/components/lead-form";
import HomeFaq from "@/components/home/home-faq";
import PhoneLink from "@/components/phone-link";

export default async function Home() {
  return (
    <div className="min-h-screen bg-white text-brand-black">
      <Header />
      <main className="w-full mx-auto">
        <Hero />

        {/* Above-the-fold lead capture — submits through the /thank-you
            conversion flow instead of bouncing visitors to /contact. */}
        <section
          id="get-estimate"
          className="mask-overlap relative z-30 scroll-mt-28 bg-white pt-6 md:pt-8"
        >
          <div className="mx-auto max-w-[95%] px-8 py-12 font-geist md:px-16 md:py-16 lg:px-24 xl:max-w-screen-2xl">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
              <div className="max-w-xl">
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray">
                  Free estimate
                </p>
                <h2 className="text-3xl font-light leading-[1.1] tracking-tight text-brand-black md:text-4xl lg:text-5xl">
                  Tell us about your project
                </h2>
                <p className="mt-5 max-w-md text-base font-light leading-relaxed text-brand-dark-gray md:text-lg">
                  Share a few details and our team gets back to you within one
                  business day — no obligation, no pressure.
                </p>
                <ul className="mt-8 space-y-3 text-sm text-brand-dark-gray">
                  <li className="flex items-center gap-3">
                    <span className="h-px w-6 shrink-0 bg-brand-orange" aria-hidden />
                    Licensed &amp; insured — CA Lic. #1105006
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-px w-6 shrink-0 bg-brand-orange" aria-hidden />
                    30+ years and 4,000+ Bay Area projects
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-px w-6 shrink-0 bg-brand-orange" aria-hidden />
                    Prefer to talk?{" "}
                    <PhoneLink
                      href="tel:+14087022022"
                      location="homepage_lead"
                      className="font-medium text-brand-black underline-offset-4 transition-colors hover:text-brand-orange hover:underline"
                    >
                      408-702-2022
                    </PhoneLink>
                  </li>
                </ul>
              </div>
              <div className="border border-brand-light-gray bg-white p-6 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.12)] md:p-8">
                <LeadForm source="homepage-hero" />
              </div>
            </div>
          </div>
        </section>

        <section className="mask-overlap bg-white relative z-30 pt-6 md:pt-8">
          <ServicesIntro />
        </section>

        <section className="mask-overlap bg-brand-black relative z-20 pt-0">
          <Services />
        </section>

        {/* <section className="mask-overlap bg-[#EBEBEB] relative z-20 pt-0"> */}
          <WhoWeAre />
        {/* </section> */}

        {/* <section className="mask-overlap bg-[#262626] relative z-20 pt-0">
          <WhyChooseUsGrid />
        </section> */}

        <section className="mask-overlap relative z-20 bg-brand-orange pt-0">
          <CTAStrip />
        </section>

        <section className="mask-overlap bg-white relative z-10 pt-10">
          <Testimonials />
        </section>

        <section className="mask-overlap relative z-10 bg-white pt-10">
          <Philosophy />
        </section>

        <HomeFaq />
      </main>

      <section className="mask-overlap bg-white mt-auto pt-10 relative z-20">
        <Footer />
      </section>
    </div>
  );
}
