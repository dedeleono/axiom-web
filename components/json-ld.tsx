type JsonLdProps = {
  data: object;
};

/**
 * Renders a schema.org JSON-LD script tag. Server component — the payload
 * is embedded in the HTML so crawlers see it without executing JS.
 * `<` is escaped so the payload can never close the script tag early.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
