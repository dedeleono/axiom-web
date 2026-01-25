import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTAStrip } from "@/components/cta-strip"
import { projects } from "@/components/portfolio-grid"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, CheckCircle2, ArrowLeft, Quote } from "lucide-react"

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const project = projects.find((p) => p.slug === slug)

    if (!project) {
        return {
            title: "Project Not Found | Axiom Renovation",
        }
    }

    return {
        title: `${project.title} | Axiom Renovation Portfolio`,
        description: `${project.overview} View our ${project.service.toLowerCase()} project in ${project.location}.`,
    }
}

export default async function CaseStudyPage({ params }: Props) {
    const { slug } = await params
    const project = projects.find((p) => p.slug === slug)

    if (!project) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-background">
            <Header />

            <section className="pt-32 pb-8">
                <div className="container mx-auto px-4">
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Portfolio
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
                            <Image
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div>
                            <Badge variant="secondary" className="mb-4">
                                {project.service}
                            </Badge>
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                                {project.title}
                            </h1>
                            <div className="flex items-center gap-2 text-muted-foreground mb-6">
                                <MapPin className="h-5 w-5" />
                                <span className="text-lg">{project.location}</span>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-foreground mb-2">Project Overview</h2>
                                    <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-foreground mb-3">Challenges</h2>
                                    <ul className="space-y-2">
                                        {project.challenges.map((challenge, index) => (
                                            <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                                {challenge}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-foreground mb-2">Our Solution</h2>
                                    <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    <Card className="bg-secondary border-0">
                        <CardContent className="p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle2 className="h-6 w-6 text-primary" />
                                <h2 className="text-xl font-semibold text-foreground">Results</h2>
                            </div>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {project.results}
                            </p>
                        </CardContent>
                    </Card>

                    {project.testimonial && (
                        <Card className="mt-8 border-primary/20 bg-primary/5">
                            <CardContent className="p-8">
                                <Quote className="h-10 w-10 text-primary/30 mb-4" />
                                <blockquote className="text-xl text-foreground italic leading-relaxed mb-4">
                                    &ldquo;{project.testimonial}&rdquo;
                                </blockquote>
                                <p className="text-muted-foreground">- Homeowner, {project.location}</p>
                            </CardContent>
                        </Card>
                    )}

                    <div className="mt-12 text-center">
                        <h3 className="text-2xl font-bold text-foreground mb-4">
                            Ready to Start Your Project?
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                            Contact us today for a free consultation and estimate on your renovation project.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild>
                                <a href="tel:+14084892966">Call (408) 489-2966</a>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href="/portfolio">View More Projects</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <CTAStrip />
            <Footer />
        </main>
    )
}
