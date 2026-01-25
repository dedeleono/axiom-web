import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PortfolioGrid } from "@/components/portfolio-grid"
import { CTAStrip } from "@/components/cta-strip"

export const metadata: Metadata = {
    title: "Portfolio | Axiom Renovation - Bay Area Renovation Projects",
    description: "Browse our portfolio of completed kitchen remodels, bathroom renovations, ADU construction, and full home renovations across San Jose, Sunnyvale, Palo Alto, and the Bay Area.",
}

export default function PortfolioPage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />

            <section className="pt-32 pb-16 bg-secondary">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                            Our Work
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Explore our portfolio of completed renovation projects across the Bay Area.
                            Each project showcases our commitment to quality craftsmanship and attention to detail.
                        </p>
                    </div>
                </div>
            </section>

            <PortfolioGrid />
            <CTAStrip />
            <Footer />
        </main>
    )
}
