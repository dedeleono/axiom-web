import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { WhyChooseUs } from "@/components/why-choose-us"
import { FeaturedProject } from "@/components/featured-project"
import { Testimonials } from "@/components/testimonials"
import { CTAStrip } from "@/components/cta-strip"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <WhyChooseUs />
      <FeaturedProject />
      <Testimonials />
      <CTAStrip />
      <Footer />
    </main>
  )
}
