/** Shared limits for consultation plan uploads (must match API route). */

export const CONSULTATION_PLAN_MAX_BYTES = 20 * 1024 * 1024; // 20 MB

export const CONSULTATION_PLAN_MAX_FILES = 5;

/** MIME types we accept for drawings / plans */
export const CONSULTATION_PLAN_ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
]);

export type PlanAttachmentRef = {
  url: string;
  filename: string;
  /** Sanity `sanity.fileAsset` document id — used to delete from CDN when user removes */
  assetId: string;
};

export function isAllowedPlanMimeType(mime: string): boolean {
  return CONSULTATION_PLAN_ALLOWED_MIME_TYPES.has(mime);
}
