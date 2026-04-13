import { z } from "zod";

import { CONSULTATION_PLAN_MAX_FILES } from "@/lib/consultation-upload-config";

export const contactIntentValues = ["consultation", "general"] as const;
export type ContactIntent = (typeof contactIntentValues)[number];

/** Simple contact — general inquiry */
export const generalInquirySchema = z.object({
  intent: z.literal("general"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type GeneralInquiryValues = z.infer<typeof generalInquirySchema>;

export const projectTypeIds = [
  "adu",
  "kitchen",
  "garage",
  "bathroom",
  "addition",
  "roof",
  "flooring",
  "painting",
] as const;

export type ProjectTypeId = (typeof projectTypeIds)[number];

/** Consultation — includes stepper answers */
export const consultationRequestSchema = z.object({
  intent: z.literal("consultation"),
  projectTypes: z
    .array(z.string())
    .min(1, "Select at least one project type"),
  hasArchitecturalPlans: z.enum(["yes", "no"]),
  /** Sanity CDN URLs from /api/uploadConsultationFile */
  planAttachments: z
    .array(
      z.object({
        url: z.string().url(),
        filename: z.string().min(1).max(500),
        assetId: z.string().min(1).max(256).optional(),
      })
    )
    .max(CONSULTATION_PLAN_MAX_FILES)
    .default([]),
  startTimeline: z.enum(["asap", "within_year", "over_year", "undecided"]),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().default(""),
  message: z.string().optional().default(""),
  scheduledEventUri: z.string().optional(),
});

export type ConsultationRequestValues = z.infer<
  typeof consultationRequestSchema
>;

export const contactSubmissionSchema = z.discriminatedUnion("intent", [
  generalInquirySchema,
  consultationRequestSchema,
]);

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
