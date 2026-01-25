"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Menu, X } from "lucide-react"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-xl">A</span>
                        </div>
                        <div className="hidden sm:block">
                            <span className="font-semibold text-lg text-foreground">Axiom</span>
                            <span className="text-muted-foreground text-lg"> Renovation</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link href="/#services" className="text-muted-foreground hover:text-foreground transition-colors">
                            Services
                        </Link>
                        <Link href="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
                            Portfolio
                        </Link>
                        <Link href="/#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                            Testimonials
                        </Link>
                        <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                            FAQ
                        </Link>
                        <Link href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                            Contact
                        </Link>
                    </nav>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-3">
                        <a href="tel:408-702-2022" className="hidden md:flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                            <Phone className="w-4 h-4" />
                            <span className="font-medium">408-702-2022</span>
                        </a>
                        <Button className="hidden sm:inline-flex">
                            Free Consultation
                        </Button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 text-foreground"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-border">
                        <nav className="flex flex-col gap-4">
                            <Link href="/#services" className="text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Services
                            </Link>
                            <Link href="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Portfolio
                            </Link>
                            <Link href="/#testimonials" className="text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Testimonials
                            </Link>
                            <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsMenuOpen(false)}>
                                FAQ
                            </Link>
                            <Link href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Contact
                            </Link>
                            <a href="tel:408-702-2022" className="flex items-center gap-2 text-foreground">
                                <Phone className="w-4 h-4" />
                                <span className="font-medium">408-702-2022</span>
                            </a>
                            <Button className="w-full mt-2">Free Consultation</Button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}
