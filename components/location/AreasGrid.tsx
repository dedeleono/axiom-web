import Link from "next/link";

import type { LocationGridItem } from "@/lib/location-page";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allLocationsForGridQuery } from "@/sanity/lib/queries";

type AreasGridProps = {
  className?: string;
  /** When true, use compact text sizing (e.g. footer). */
  compact?: boolean;
};

function isGridItem(row: unknown): row is LocationGridItem {
  if (!row || typeof row !== "object") return false;
  const r = row as Record<string, unknown>;
  return typeof r.title === "string" && typeof r.slug === "string";
}

export default async function AreasGrid({ className = "", compact = false }: AreasGridProps) {
  const rows = await sanityFetch({
    query: allLocationsForGridQuery,
    stega: false,
  });

  const items = (Array.isArray(rows) ? rows : []).filter(isGridItem);

  if (items.length === 0) {
    return (
      <p
        className={`text-brand-dark-gray ${compact ? "text-[11px] sm:text-xs md:text-sm" : "text-sm"}`}
      >
        Service areas coming soon.
      </p>
    );
  }

  const textSize = compact
    ? "text-[11px] leading-snug sm:text-xs md:text-sm"
    : "text-sm md:text-base";

  return (
    <div
      className={`grid grid-cols-2 gap-x-2 gap-y-1 sm:grid-cols-3 md:grid-cols-3 md:gap-x-4 md:gap-y-2 ${className}`}
    >
      {items.map((item) => (
        <Link
          key={item.slug}
          href={`/areas/${item.slug}`}
          className={`${textSize} text-brand-dark-gray transition-colors hover:text-brand-orange`}
        >
          <span className="block">
            {item.title}, CA
            {item.county ? (
              <span className="block text-[0.85em] opacity-80">{item.county}</span>
            ) : null}
          </span>
        </Link>
      ))}
    </div>
  );
}
