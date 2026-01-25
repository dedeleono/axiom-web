import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/faq-section"
import { CTAStrip } from "@/components/cta-strip"

export const metadata: Metadata = {
    title: "FAQ | Axiom Renovation - Bay Area Home Remodeling Questions",
    description: "Find answers to common questions about kitchen remodeling, bathroom renovation, ADU construction, permits, costs, and timelines in the Bay Area.",
}

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />

            <section className="pt-32 pb-16 bg-secondary">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Get answers to common questions about our renovation services, process,
                            costs, and timelines. Can&apos;t find what you&apos;re looking for? Contact us directly.
                        </p>
                    </div>
                </div>
            </section>

            <FAQSection />
            <CTAStrip />
            <Footer />
        </main>
    )
}
