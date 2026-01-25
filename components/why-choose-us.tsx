import { Shield, Star, DollarSign, MapPin } from "lucide-react"

const features = [
    {
        icon: Shield,
        title: "Licensed & Insured",
        description: "Full protection for your project with CA License #1105006 and comprehensive insurance coverage."
    },
    {
        icon: Star,
        title: "5-Star Reviews",
        description: "Consistently rated 5 stars on Google and Yelp by our satisfied Bay Area customers."
    },
    {
        icon: DollarSign,
        title: "Transparent Pricing",
        description: "No hidden costs or surprises. Get detailed quotes and clear communication throughout your project."
    },
    {
        icon: MapPin,
        title: "25+ Bay Area Cities",
        description: "Proudly serving San Jose, Sunnyvale, Palo Alto, Mountain View, and communities throughout the Bay Area."
    }
]

export function WhyChooseUs() {
    return (
        <section id="why-us" className="py-20 md:py-28 bg-muted/50">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div>
                        <p className="text-primary uppercase tracking-wider text-sm font-medium mb-3">Why Choose Us</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                            Inspire Your Space Through Expert Craftsmanship
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8 text-pretty">
                            At Axiom Renovation, we combine years of experience with a passion for transforming homes. Our team of skilled professionals is dedicated to delivering exceptional results that exceed your expectations, on time and within budget.
                        </p>
                        <div className="flex items-center gap-8">
                            <div>
                                <p className="text-4xl font-bold text-primary">10+</p>
                                <p className="text-muted-foreground">Years Experience</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-primary">500+</p>
                                <p className="text-muted-foreground">Projects Completed</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-primary">100%</p>
                                <p className="text-muted-foreground">Satisfaction</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="bg-card p-6 rounded-xl border border-border hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-semibold text-card-foreground mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
