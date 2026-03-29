import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bath, ChefHat, Home, Building2 } from "lucide-react"

const services = [
    {
        icon: ChefHat,
        title: "Kitchen Remodeling",
        description: "Maximize space and style with custom cabinets, surfaces, and layouts that transform your kitchen into the heart of your home."
    },
    {
        icon: Bath,
        title: "Bathroom Remodeling",
        description: "From luxury upgrades to efficient redesigns — start and end your day right in a space designed just for you."
    },
    {
        icon: Building2,
        title: "Home Additions & ADUs",
        description: "Expand your space and property value with expert-built additions that seamlessly integrate with your existing home."
    },
    {
        icon: Home,
        title: "Full Home Renovation",
        description: "Seamlessly upgrade your entire home — inside and out — with comprehensive renovation services tailored to your vision."
    }
]

export function Services() {
    return (
        <section id="services" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <p className="text-primary uppercase tracking-wider text-sm font-medium mb-3">What We Do</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Our Services</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
                        We specialize in transforming homes with quality craftsmanship and attention to detail that exceeds expectations.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) => (
                        <Card key={service.title} className="group hover:shadow-lg transition-shadow duration-300 border-border bg-card">
                            <CardHeader>
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-none bg-primary/10 transition-colors group-hover:bg-primary/20">
                                    <service.icon className="w-7 h-7 text-primary" />
                                </div>
                                <CardTitle className="text-xl text-card-foreground">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-muted-foreground leading-relaxed">
                                    {service.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
