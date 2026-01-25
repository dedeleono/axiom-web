"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function FeaturedProject() {
    const [showAfter, setShowAfter] = useState(true)

    return (
        <section id="portfolio" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <p className="text-primary uppercase tracking-wider text-sm font-medium mb-3">Our Work</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Featured Project</h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Before/After Image */}
                    <div className="relative">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src={showAfter ? "/bathroom-after.jpg" : "/bathroom-before.jpg"}
                                alt={showAfter ? "Bathroom after renovation" : "Bathroom before renovation"}
                                fill
                                className="object-cover transition-opacity duration-500"
                            />
                            <div className="absolute top-4 left-4 bg-foreground/80 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                                {showAfter ? "After" : "Before"}
                            </div>
                        </div>
                        <div className="flex justify-center gap-3 mt-6">
                            <button
                                onClick={() => setShowAfter(false)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${!showAfter
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                                    }`}
                            >
                                Before
                            </button>
                            <button
                                onClick={() => setShowAfter(true)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${showAfter
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                                    }`}
                            >
                                After
                            </button>
                        </div>
                    </div>

                    {/* Project Details */}
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                            San Jose Bathroom Transformation
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-6 text-pretty">
                            An outdated layout transformed into a spa-inspired retreat with modern tile, ambient lighting, and a custom floating vanity. This complete bathroom renovation showcases our attention to detail and commitment to creating beautiful, functional spaces.
                        </p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3 text-foreground">
                                <span className="w-2 h-2 bg-primary rounded-full" />
                                Custom floating double vanity with soft-close drawers
                            </li>
                            <li className="flex items-center gap-3 text-foreground">
                                <span className="w-2 h-2 bg-primary rounded-full" />
                                Large format porcelain tiles with heated flooring
                            </li>
                            <li className="flex items-center gap-3 text-foreground">
                                <span className="w-2 h-2 bg-primary rounded-full" />
                                Frameless glass shower enclosure with rain head
                            </li>
                            <li className="flex items-center gap-3 text-foreground">
                                <span className="w-2 h-2 bg-primary rounded-full" />
                                LED backlit mirror and ambient lighting
                            </li>
                        </ul>
                        <Button className="group">
                            View Full Portfolio
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
