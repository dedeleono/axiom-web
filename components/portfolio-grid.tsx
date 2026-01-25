import Image from "next/image"
import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const projects = [
    {
        slug: "san-jose-bathroom-remodel",
        title: "San Jose Bathroom Remodel",
        location: "San Jose, CA",
        service: "Bathroom Remodeling",
        image: "/portfolio/san-jose-bathroom.jpg",
        overview: "The homeowners wanted to modernize their outdated bathroom and create a clean, spa-inspired design with better lighting and storage.",
        challenges: ["Small layout", "Old plumbing", "Poor ventilation"],
        solution: "We redesigned the layout, installed a walk-in shower with custom tile, added modern LED lighting, new vanity cabinets, and upgraded ventilation.",
        results: "A bright, modern bathroom with improved functionality and increased home value.",
        testimonial: "Axiom Renovation made the process smooth and stress-free. Our bathroom looks incredible."
    },
    {
        slug: "sunnyvale-kitchen-transformation",
        title: "Sunnyvale Kitchen Transformation",
        location: "Sunnyvale, CA",
        service: "Kitchen Remodeling",
        image: "/portfolio/sunnyvale-kitchen.jpg",
        overview: "This project focused on opening up the kitchen space and creating a modern cooking and entertaining area.",
        challenges: ["Closed layout", "Limited counter space", "Outdated cabinets"],
        solution: "We removed walls, installed custom cabinets, quartz countertops, new flooring, and modern lighting fixtures.",
        results: "An open-concept kitchen perfect for family gatherings and daily use.",
        testimonial: "Professional, on time, and the quality exceeded expectations."
    },
    {
        slug: "santa-clara-adu",
        title: "Detached ADU Build in Santa Clara",
        location: "Santa Clara, CA",
        service: "ADU Construction",
        image: "/portfolio/santa-clara-adu.jpg",
        overview: "The homeowner wanted to add a rental unit in their backyard for additional income.",
        challenges: ["City zoning requirements", "Utility connections", "Limited lot space"],
        solution: "We designed a compact, modern detached ADU and handled all permitting and construction.",
        results: "A fully functional rental unit increasing property value and monthly income.",
        testimonial: null
    },
    {
        slug: "palo-alto-full-home-renovation",
        title: "Full Home Renovation in Palo Alto",
        location: "Palo Alto, CA",
        service: "Full Home Renovation",
        image: "/portfolio/palo-alto-home.jpg",
        overview: "A complete interior upgrade for a newly purchased home.",
        challenges: ["Outdated interiors", "Aging systems", "Layout inefficiencies"],
        solution: "New kitchen & bathrooms, flooring replacement, electrical & plumbing upgrades, painting & finishes.",
        results: "A fully modernized home ready for long-term living.",
        testimonial: null
    },
    {
        slug: "mountain-view-room-addition",
        title: "Room Addition in Mountain View",
        location: "Mountain View, CA",
        service: "Home Addition",
        image: "/portfolio/mountain-view-addition.jpg",
        overview: "The family needed an extra bedroom and home office.",
        challenges: ["Limited space", "Matching existing architecture", "Permit requirements"],
        solution: "We designed and built a seamless rear addition matching the existing structure.",
        results: "More space, improved comfort, and increased property value.",
        testimonial: null
    }
]

export function PortfolioGrid() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <Link
                            key={project.slug}
                            href={`/portfolio/${project.slug}`}
                            className="group"
                        >
                            <Card className="overflow-hidden border-border h-full transition-shadow hover:shadow-lg">
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={project.image || "/placeholder.svg"}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
                                </div>
                                <CardContent className="p-6">
                                    <Badge variant="secondary" className="mb-3">
                                        {project.service}
                                    </Badge>
                                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
                                        <MapPin className="h-4 w-4" />
                                        {project.location}
                                    </div>
                                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                                        {project.overview}
                                    </p>
                                    <span className="inline-flex items-center gap-1.5 text-primary font-medium text-sm group-hover:gap-2.5 transition-all">
                                        View Project <ArrowRight className="h-4 w-4" />
                                    </span>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
