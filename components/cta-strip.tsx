import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTAStrip() {
    return (
        <section className="py-16 md:py-20 bg-primary">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2 text-balance">
                            Need a free renovation estimate?
                        </h2>
                        <p className="text-primary-foreground/80 text-lg">
                            Let&apos;s talk about transforming your home.
                        </p>
                    </div>
                    <Button
                        size="lg"
                        variant="secondary"
                        className="bg-card text-primary hover:bg-card/90 group whitespace-nowrap"
                    >
                        Get Free Estimate
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
