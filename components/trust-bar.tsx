import { cn } from "@/lib/utils";

type TrustBarProps = {
  className?: string;
  variant?: "light" | "dark";
};

const STATS: { value: string; label: string }[] = [
  { value: "30+", label: "Years in business" },
  { value: "4,000+", label: "Projects completed" },
  { value: "25+", label: "Bay Area cities served" },
  { value: "#1105006", label: "CA Contractor License" },
];

/**
 * Reusable trust / credibility strip. Server component so it renders in the
 * static HTML (crawlers + no client JS). Used on the homepage and campaign
 * landing pages. Facts mirror the visible site + JSON-LD in lib/structured-data.ts.
 */
export default function TrustBar({ className, variant = "light" }: TrustBarProps) {
  const isDark = variant === "dark";
  return (
    <div
      className={cn(
        "w-full font-geist",
        isDark ? "text-white" : "text-brand-black",
        className
      )}
    >
      <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <dt className="sr-only">{stat.label}</dt>
            <dd className="m-0">
              <span className="block text-3xl font-light tracking-tight md:text-4xl">
                {stat.value}
              </span>
              <span
                className={cn(
                  "mt-2 block text-[11px] font-medium uppercase tracking-[0.18em]",
                  isDark ? "text-white/60" : "text-brand-dark-gray"
                )}
              >
                {stat.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
