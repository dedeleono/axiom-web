"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqCategories = [
    {
        title: "General Questions",
        faqs: [
            {
                question: "What areas do you serve?",
                answer: "We serve homeowners across the Bay Area, including San Jose, Sunnyvale, Santa Clara, Palo Alto, Mountain View, Cupertino, Milpitas, Fremont, and surrounding cities."
            },
            {
                question: "Are you licensed and insured?",
                answer: "Yes. Axiom Renovation is fully licensed, bonded, and insured in California. We follow all local building codes and safety regulations."
            },
            {
                question: "Do you provide free estimates?",
                answer: "Yes. We offer free, no-obligation consultations and detailed project estimates."
            },
            {
                question: "How long have you been in business?",
                answer: "We have over 10 years of experience delivering high-quality home renovations throughout the Bay Area."
            },
            {
                question: "Do you handle permits and inspections?",
                answer: "Yes. We manage all required permits, city approvals, and inspections for your project."
            },
            {
                question: "Can I live in my home during the renovation?",
                answer: "In most cases, yes. We plan projects carefully to minimize disruption and keep your home safe and livable whenever possible."
            }
        ]
    },
    {
        title: "Kitchen Remodeling",
        faqs: [
            {
                question: "How long does a kitchen remodel take?",
                answer: "Most kitchen remodels take between 4 to 8 weeks depending on scope, materials, and permit timelines."
            },
            {
                question: "How much does a kitchen remodel cost in the Bay Area?",
                answer: "Typical projects range from $25,000 to $70,000+, depending on size, materials, layout changes, and finishes."
            },
            {
                question: "Do you help with kitchen design?",
                answer: "Yes. We assist with layout planning, material selection, cabinet design, countertops, lighting, and finishes."
            }
        ]
    },
    {
        title: "Bathroom Remodeling",
        faqs: [
            {
                question: "How long does a bathroom remodel take?",
                answer: "Most bathroom renovations take 2 to 4 weeks after materials are finalized."
            },
            {
                question: "Can you convert a bathtub into a walk-in shower?",
                answer: "Absolutely. Tub-to-shower conversions are one of our most common projects."
            },
            {
                question: "Do you offer waterproofing and mold protection?",
                answer: "Yes. We use professional waterproofing systems and moisture barriers to protect your bathroom long-term."
            }
        ]
    },
    {
        title: "ADU & Home Additions",
        faqs: [
            {
                question: "Do you build ADUs in San Jose and surrounding cities?",
                answer: "Yes. We design and build ADUs across San Jose, Sunnyvale, Santa Clara, Palo Alto, and nearby cities."
            },
            {
                question: "How long does an ADU project take?",
                answer: "Most ADU projects take 4 to 7 months from design to completion, depending on permits and construction complexity."
            },
            {
                question: "Can you help with ADU permits?",
                answer: "Yes. We handle planning, architectural coordination, permit submissions, and city approvals."
            },
            {
                question: "How much does an ADU cost in the Bay Area?",
                answer: "Most ADU projects range between $120,000 and $250,000 depending on size, type, and finishes."
            }
        ]
    }
]

export function FAQSection() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {faqCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="mb-12 last:mb-0">
                            <h2 className="text-2xl font-bold text-foreground mb-6">
                                {category.title}
                            </h2>
                            <Accordion type="single" collapsible className="space-y-3">
                                {category.faqs.map((faq, faqIndex) => (
                                    <AccordionItem
                                        key={faqIndex}
                                        value={`${categoryIndex}-${faqIndex}`}
                                        className="bg-card border border-border rounded-lg px-6 data-[state=open]:shadow-sm"
                                    >
                                        <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
