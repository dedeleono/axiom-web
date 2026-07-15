import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

import AreasGrid from "@/components/location/AreasGrid";

import FooterClientActions from "./footer-client-actions";
import PhoneLink from "./phone-link";

const sitemapLinks = [
  { href: "/", label: "Home" },
  { href: "/services/bathroom-remodeling", label: "Bathroom remodeling" },
  { href: "/services/kitchen-remodeling", label: "Kitchen remodeling" },
  { href: "/services/home-addition", label: "Home addition" },
  { href: "/services/adu", label: "ADU construction" },
  { href: "/services/new-construction", label: "New construction" },
  { href: "/services/outdoor-remodeling", label: "Outdoor remodeling" },
  { href: "/projects", label: "Portfolio" },
  { href: "/faqs", label: "FAQs" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy policy" },
] as const;

export default async function Footer() {
  return (
    <footer className="border-t border-brand-light-gray bg-white pb-8 pt-12 font-geist text-brand-black md:pb-10 md:pt-20">
      <div className="mx-auto mb-10 grid max-w-7xl grid-cols-1 gap-8 px-5 md:mb-16 md:grid-cols-2 md:gap-12 md:px-8 xl:grid-cols-5">
        <div className="space-y-6 xl:col-span-1">
          <Link href="/" className="block">
            <h3 className="font-anton tracking-wider text-2xl font-bold">
              Axiom Renovation
            </h3>
            <span className="font-caveat tracking-wider text-lg font-bold text-brand-orange">
              Building Relationships
            </span>
          </Link>
          <div className="flex flex-col space-y-2 text-sm text-brand-dark-gray">
            <Link
              href="/blog"
              className="transition-colors hover:text-brand-black"
            >
              Newsroom &amp; Article
            </Link>
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-brand-black"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="xl:col-span-1">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-black md:mb-6">
            Sitemap
          </h4>
          <nav
            className="flex flex-col space-y-1 text-sm text-brand-dark-gray md:space-y-2"
            aria-label="Sitemap"
          >
            {sitemapLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="transition-colors hover:text-brand-orange"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/sitemap.xml"
              className="pt-2 text-xs text-brand-dark-gray/90 transition-colors hover:text-brand-black"
            >
              XML sitemap
            </Link>
          </nav>
        </div>

        <div className="md:col-span-2 xl:col-span-2">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-black md:mb-6">
            Areas We Serve
          </h4>
          <AreasGrid compact />
        </div>

        <div className="space-y-6 md:col-span-2 xl:col-span-1">
          <h4 className="text-sm font-bold uppercase tracking-widest text-brand-black">
            Find us here!
          </h4>

          <div className="space-y-4 text-sm text-brand-dark-gray">
            <div>
              <p className="font-medium text-brand-black">San Jose</p>
              <p>4030 Moorpark Ave, Suite 102</p>
              <p>San Jose, CA</p>
            </div>

            <div>
              <p className="font-medium text-brand-black">Encino</p>
              <p>17515 Ventura Blvd</p>
              <p>Encino, CA 91316</p>
            </div>
          </div>

          <div className="space-y-1 border-t border-brand-light-gray pt-4 text-sm text-brand-dark-gray">
            <p>
              <PhoneLink
                href="tel:+14087022022"
                location="footer"
                className="transition-colors hover:text-brand-black"
              >
                408-702-2022
              </PhoneLink>
            </p>
            <p>office@axiom-renovation.com</p>
            <p>Mon–Sat: 8am–6pm</p>
            <p className="text-brand-black">CA Lic. #1105006 · Licensed &amp; Insured</p>
          </div>

          <div className="flex space-x-4 border-t border-brand-light-gray pt-4">
            <Link
              href="https://www.instagram.com/axiomrenovation/"
              target="_blank"
              className="text-brand-black hover:text-brand-orange"
              aria-label="Axiom Renovation on Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.facebook.com/axiomrenovationinc"
              target="_blank"
              className="text-brand-black hover:text-brand-orange"
              aria-label="Axiom Renovation on Facebook"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UC8W6hYToT7_TEv6P6xKMM4Q"
              target="_blank"
              className="text-brand-black hover:text-brand-orange"
              aria-label="Axiom Renovation on YouTube"
            >
              <Youtube className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.tiktok.com/@axiomrenovation"
              target="_blank"
              className="text-brand-black hover:text-brand-orange"
              aria-label="Axiom Renovation on TikTok"
            >
              <span className="rounded-none border border-current px-1 text-xs font-bold">
                Tk
              </span>
            </Link>
          </div>
        </div>
      </div>

      <FooterClientActions />
    </footer>
  );
}
