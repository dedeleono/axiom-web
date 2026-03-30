import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/**
 * Server-only: uses SANITY_API_WRITE_TOKEN. Import only from Route Handlers or
 * server actions — never from client components.
 */
export function getSanityWriteToken(): string | undefined {
  const raw = process.env.SANITY_API_WRITE_TOKEN;
  const token = raw?.trim();
  return token || undefined;
}

function getWriteClient(): SanityClient | null {
  const token = getSanityWriteToken();
  if (!token) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
}

export function getSanityWriteClient(): SanityClient {
  const client = getWriteClient();
  if (!client) {
    throw new Error("Missing SANITY_API_WRITE_TOKEN for Sanity uploads");
  }
  return client;
}
