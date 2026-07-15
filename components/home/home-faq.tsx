import JsonLd from "@/components/json-ld";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqPageJsonLd, type FaqEntry } from "@/lib/structured-data";
import { sanityFetch } from "@/sanity/lib/fetch";

const containerClass =
  "max-w-[95%] xl:max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24";

/**
 * Homepage FAQ. Pulls the same CMS-managed content as /faqs (the faqPage
 * document), flattened across categories, and shows the first few. Rendered
 * server-side with answers visible by default so the copy is in the static
 * HTML and matches the FAQPage JSON-LD exactly (a Google requirement). stega
 * is disabled so the schema/text carry no visual-editing metadata.
 */
const HOME_FAQ_QUERY = `*[_type == "faqPage" && _id == "faqPage"][0]{
  "faqs": categories[].faqs[]{ question, answer }
}`;

const MAX_HOME_FAQS = 6;

export default async function HomeFaq() {
  let faqs: FaqEntry[] = [];
  try {
    const data = (await sanityFetch({
      query: HOME_FAQ_QUERY,
      stega: false,
    })) as { faqs?: unknown } | null;

    const raw = Array.isArray(data?.faqs)
      ? (data?.faqs as unknown[]).flat(2)
      : [];
    faqs = raw
      .filter(
        (f): f is FaqEntry =>
          !!f &&
          typeof f === "object" &&
          typeof (f as FaqEntry).question === "string" &&
          typeof (f as FaqEntry).answer === "string" &&
          (f as FaqEntry).question.trim().length > 0 &&
          (f as FaqEntry).answer.trim().length > 0
      )
      .slice(0, MAX_HOME_FAQS);
  } catch {
    faqs = [];
  }

  if (faqs.length === 0) return null;

  return (
    <section className="bg-white pb-20 md:pb-28" aria-labelledby="home-faq-heading">
      <JsonLd data={faqPageJsonLd("/", faqs)} />
      <div className={containerClass}>
        <div className="mx-auto w-full max-w-3xl border-t border-brand-light-gray pt-12 md:pt-16">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray">
            FAQs
          </p>
          <h2
            id="home-faq-heading"
            className="mb-8 text-balance text-3xl font-light leading-[1.1] tracking-tight text-brand-black md:text-4xl"
          >
            Answers before you commit
          </h2>
          <Accordion
            type="multiple"
            defaultValue={faqs.map((_, i) => `home-faq-${i}`)}
            className="flex flex-col gap-3"
          >
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={`home-faq-${i}`}
                className="rounded-none border border-brand-light-gray bg-white px-5 data-[state=open]:shadow-[0_24px_80px_-24px_rgba(0,0,0,0.08)] md:px-8"
              >
                <AccordionTrigger
                  chevron
                  className="py-5 text-left text-sm font-medium text-brand-black hover:no-underline data-[state=open]:text-brand-orange md:text-base"
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-pretty pb-5 text-sm leading-relaxed text-brand-dark-gray md:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
