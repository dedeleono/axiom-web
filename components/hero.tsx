import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-kitchen.jpg"
                    alt="Luxury kitchen renovation by Axiom Renovation"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-foreground/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
                <div className="max-w-3xl">
                    <p className="text-primary-foreground/80 text-sm md:text-base uppercase tracking-wider mb-4">
                        Bay Area&apos;s Trusted Renovation Experts
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 text-balance">
                        We Turn Homes Into Timeless Living Spaces
                    </h1>
                    <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl text-pretty">
                        Kitchens, bathrooms, ADUs, and more — transforming Bay Area homes with expert craftsmanship and personalized design since day one.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="text-base px-8">
                            Book Free Consultation
                        </Button>
                        <Button size="lg" variant="outline" className="text-base px-8 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-foreground">
                            <Phone className="w-5 h-5 mr-2" />
                            Call Now
                        </Button>
                    </div>
                    <p className="mt-6 text-primary-foreground/70 text-sm">
                        License #1105006 • Licensed & Insured
                    </p>
                </div>
            </div>
        </section>
    )
}
