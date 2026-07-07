"use client";

import type { ReactNode } from "react";

import { trackPhoneClick } from "@/lib/analytics";

/**
 * Minimal client-side tel: anchor that reports clicks to GTM (`phone_click`
 * event). Exists so server components (e.g. the footer) can render a tracked
 * phone link without becoming client components themselves.
 */
export default function PhoneLink({
  href,
  location,
  className,
  children,
}: {
  href: string;
  /** GTM `link_location` value, e.g. "footer". */
  location: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackPhoneClick(location)}
    >
      {children}
    </a>
  );
}
