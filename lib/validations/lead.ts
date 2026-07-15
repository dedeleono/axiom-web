import { z } from "zod";

/** Service options shown in the quick lead form's <select>. Values are the
 * source of truth reused by the form and the API. */
export const SERVICE_OPTIONS = [
  { value: "adu", label: "ADU / Garage Conversion" },
  { value: "kitchen", label: "Kitchen Remodel" },
  { value: "bathroom", label: "Bathroom Remodel" },
  { value: "addition", label: "Home Addition" },
  { value: "new-construction", label: "New Construction" },
  { value: "outdoor", label: "Outdoor Remodeling" },
  { value: "other", label: "Something else" },
] as const;

/**
 * Attribution captured from the ad click (gclid / gbraid / wbraid + utm_*).
 * All optional — a direct visitor submits with an empty object.
 */
export const attributionSchema = z
  .object({
    gclid: z.string().max(512).optional(),
    gbraid: z.string().max(512).optional(),
    wbraid: z.string().max(512).optional(),
    utm_source: z.string().max(256).optional(),
    utm_medium: z.string().max(256).optional(),
    utm_campaign: z.string().max(256).optional(),
    utm_term: z.string().max(256).optional(),
    utm_content: z.string().max(256).optional(),
    landing_page: z.string().max(1024).optional(),
    referrer: z.string().max(1024).optional(),
  })
  .partial();

export type Attribution = z.infer<typeof attributionSchema>;

/** Quick 3-field lead: Name, Phone, Service (+ optional page + attribution). */
export const quickLeadSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service: z.string().min(1, "Please choose a service").max(64),
  page: z.string().max(256).optional(),
  attribution: attributionSchema.optional(),
});

export type QuickLeadValues = z.infer<typeof quickLeadSchema>;
