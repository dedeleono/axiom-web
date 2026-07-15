# Axiom-web — Website Build Plan (Landing Page Audit fixes)

Created: 2026-07-15 · Source: `Axiom Ads/Landing Page Audit.pdf` (May 5 2026) + Google Ads audit (checks G61/G60)
Repo: axiom-web (Next.js App Router + Sanity + Tailwind + bun) — live at axiom-remodel.com
Why: the Vercel rebuild already beats the old site, but these gaps are still open — and several directly lift Google Ads Quality Score, which is what's driving the ADU campaign's 58% rank-lost impression share.

## Brand facts to use
- Primary phone: 408-702-2022 (tappable `tel:`; drop the 650 number from primary nav for clean call attribution)
- CA contractor license: #1105006 (homeowners verify on CSLB.ca.gov)
- WhatsApp: 14087022022 · Stats: 30+ yrs, 4,000+ projects, 25+ areas
- Tracking: GTM-P8S2X875, `/thank-you` flow works, ADU page at `/services/adu`

## FAST FOUR (do first)
1. License # in header/footer — add "CA Lic. #1105006" (critical CA trust signal).
2. Single tel: phone — 408-702-2022 as a tappable `tel:` link; remove 650 from nav.
3. LocalBusiness + Service JSON-LD — schema component injected via root layout (QS landing-page-experience lever, rich results).
4. Homepage FAQ + FAQPage schema — Q&A on timeline, cost, permits, cleanup, warranty (pre-qualifies leads, helps QS).

## BIGGER LEVERS (then)
5. 3-field above-fold lead form (Name, Phone, Service) posting through the `/thank-you` flow — kills the `/contact` redirect (biggest CVR lift). Build reusable `<LeadForm/>`.
6. Campaign landing page `/adu-builder-san-jose` — keyword-matched headline for the ADU campaign (fixes message-match; strongest QS/CVR lever). Reuse LeadForm + FAQ. Later: `/kitchen-remodeling-bay-area`, `/bathroom-remodeling`.
7. Trust/CRO blocks — free-estimate anchor, business hours (Mon–Sat 8am–6pm), before/after gallery above fold.

## Verify while in the repo
- gclid/UTM capture on form submit (audit flagged Critical — needed for Ads attribution)
- Consent Mode v2 tag; GA4 pageview firing on the live domain

## Build approach (parallel subagents)
- Wave 1 (disjoint files): layout→JSON-LD schema · header/footer→license+tel: · shared components→`<LeadForm/>` + `<Faq/>`
- Wave 2: homepage integration (FAQ, form, hours, gallery) · `/adu-builder-san-jose` route (reuses shared components)
- Verify: typecheck / review diffs before committing back. Nothing deployed without review + local `bun dev`.
