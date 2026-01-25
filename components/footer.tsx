import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

const quickLinks = [
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact", href: "#contact" }
]

const areasServed = [
    "San Jose", "Sunnyvale", "Palo Alto", "Mountain View", "Milpitas",
    "Cupertino", "Los Gatos", "Los Altos", "Saratoga", "Oakland",
    "Fremont", "Berkeley", "San Mateo", "Daly City", "Redwood City"
]

export function Footer() {
    return (
        <footer id="contact" className="bg-foreground text-background py-16">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-xl">A</span>
                            </div>
                            <div>
                                <span className="font-semibold text-lg text-background">Axiom</span>
                                <span className="text-background/70 text-lg"> Renovation</span>
                            </div>
                        </div>
                        <p className="text-background/70 mb-4 leading-relaxed">
                            Bay Area&apos;s trusted renovation experts. Transforming homes with quality craftsmanship since day one.
                        </p>
                        <p className="text-background/50 text-sm">
                            License #1105006
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-background mb-4">Contact Us</h4>
                        <div className="space-y-3">
                            <a href="tel:408-702-2022" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors">
                                <Phone className="w-4 h-4" />
                                408-702-2022
                            </a>
                            <a href="mailto:office@axiom-renovation.com" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors">
                                <Mail className="w-4 h-4" />
                                office@axiom-renovation.com
                            </a>
                            <div className="flex items-start gap-3 text-background/70">
                                <MapPin className="w-4 h-4 mt-1 shrink-0" />
                                <span>4030 Moorpark Ave, Suite 102<br />San Jose, CA</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-background mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-background/70 hover:text-background transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link href="#" className="text-background/70 hover:text-background transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Areas Served */}
                    <div>
                        <h4 className="font-semibold text-background mb-4">Areas We Serve</h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                            {areasServed.map((area) => (
                                <span key={area} className="text-background/60 text-sm">
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-background/10 mt-12 pt-8 text-center">
                    <p className="text-background/50 text-sm">
                        © {new Date().getFullYear()} Axiom Renovation. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
