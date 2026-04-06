import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";

import { cn } from "@/lib/utils";

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      h2: ({ children }) => (
        <h2 className="mt-10 mb-4 text-2xl font-light tracking-tight text-brand-black md:text-3xl font-geist first:mt-0">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="mt-8 mb-3 text-xl font-light tracking-tight text-brand-black md:text-2xl font-geist">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="mt-6 mb-2 text-lg font-light text-brand-black md:text-xl font-geist">
          {children}
        </h4>
      ),
      h5: ({ children }) => (
        <h5 className="mb-2 text-sm font-semibold text-brand-black">{children}</h5>
      ),
      h6: ({ children }) => (
        <h6 className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-dark-gray">
          {children}
        </h6>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-6 border-l-2 border-brand-orange pl-5 text-brand-dark-gray font-light italic">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="my-4 list-disc space-y-2 pl-6 text-brand-dark-gray font-light marker:text-brand-orange">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="my-4 list-decimal space-y-2 pl-6 text-brand-dark-gray font-light marker:text-brand-orange marker:font-medium">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
      number: ({ children }) => <li className="leading-relaxed">{children}</li>,
    },
    marks: {
      link: ({ children, value }) => {
        const href = value?.href ?? "#";
        return (
          <a
            href={href}
            rel="noreferrer noopener"
            className="text-brand-orange underline-offset-4 transition-colors hover:text-brand-black hover:underline"
          >
            {children}
          </a>
        );
      },
      strong: ({ children }) => (
        <strong className="font-medium text-brand-black">{children}</strong>
      ),
    },
  };

  return (
    <div
      className={cn(
        "prose prose-neutral max-w-none",
        "prose-p:my-4 prose-p:font-light prose-p:leading-relaxed prose-p:text-brand-dark-gray",
        className,
      )}
    >
      <PortableText components={components} value={value} />
    </div>
  );
}
